// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReplaySubject, Subscription, timer} from 'rxjs';
import {filter, take, takeUntil} from 'rxjs/operators';

import {CanvasOverlayColor, KeyCodes, LONGCLICK_DURATION_MS, MessageTypes, RotateDirection, SNACKBAR_DURATION_MS, SwipeDirection} from '../constants/constants';
import {Point, Rect} from '../constants/rect';
import {ScreenValidationFlowComponent} from '../screen_validation_flow/screen_validation_flow';
import {BackendManagerService} from '../services/backend_manager_service';
import {ControlMessage, ControlMessageService} from '../services/control_message_service';
import {DeviceInfo, DevicesManagerService} from '../services/devices_manager_service';
import {LogService, Message} from '../services/log_service';
import {MinicapService} from '../services/minicap_service';

/** Custom event for the pan swipe action from Hammerjs  */
export interface PanSwipeEvent {
  isFinal: boolean;
  srcEvent: PointerEvent;
  deltaX: number;
  deltaY: number;
}

/**
 * The component for streaming the device's screen to frontend.
 */
@Component({
  selector: 'screen-cast',
  templateUrl: './screen_cast.ng.html',
  styleUrls: ['./screen_cast.css'],
})
export class ScreenCastComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('phoneScreen', {static: false}) phoneScreen!: ElementRef;
  @ViewChild('overlayHovered', {static: false}) overlayHovered!: ElementRef;
  @ViewChild('overlaySelected', {static: false}) overlaySelected!: ElementRef;
  private currentStream: Subscription|null = null;

  constructor(
      private readonly dialog: MatDialog,
      private readonly minicapService: MinicapService,
      private readonly snackBar: MatSnackBar,
      private readonly backendManagerService: BackendManagerService,
      private readonly controlMessageService: ControlMessageService,
      private readonly devicesManagerService: DevicesManagerService,
      private readonly logService: LogService) {
    this.logService.getMessages()
        .pipe(
            takeUntil(this.destroyed),
            )
        .subscribe((data: Message) => {
          const dInfo = this.devicesManagerService.getCurrentDevice();
          // Small hack here to tell the reboot is ready, need match
          // the backend string in the log.
          if (data.text.includes('Reboot Done. DeviceId') && dInfo) {
            this.initFEMiniCap(dInfo.minicapPort);
          }
        });
  }
  canvasWidth = 360;
  canvasHeight = 640;

  rotated = false;
  canvasWrapperCss = 'canvas-wrapper';
  canvasPhoneCss = 'phone-canvas-widget';
  inspectMode = false;
  loading = false;
  readonly swipeDirection = SwipeDirection;
  readonly rotateDirection = RotateDirection;

  currentRotateDirection = RotateDirection.PORTRAIT;

  dragCoordinates: Point[] = [];
  timeOfLastPan = 0;
  PAN_THRESHOLD_MS = 500;
  PAN_DISTANCE_THRESHOLD = 80;
  inDragMode = false;

  /** Handle on-destroy Subject, used to unsubscribe. */
  private readonly destroyed = new ReplaySubject<void>(1);

  clearOverlayCanvas(ctx: CanvasRenderingContext2D) {
    if (this.currentRotateDirection === RotateDirection.LANDSCAPE) {
      ctx.canvas.width = this.canvasHeight;
      ctx.canvas.height = this.canvasWidth;
    } else {
      ctx.canvas.width = this.canvasWidth;
      ctx.canvas.height = this.canvasHeight;
    }
  }

  getScreenCanvasCtx() {
    return this.phoneScreen.nativeElement.getContext('2d');
  }

  getOverlayHoveredCanvasCtx() {
    return this.overlayHovered.nativeElement.getContext('2d');
  }

  getOverlaySelectedCanvasCtx() {
    return this.overlaySelected.nativeElement.getContext('2d');
  }

  highlightScreenElement(
      coordinates: string, color: string, ctx: CanvasRenderingContext2D) {
    this.clearOverlayCanvas(ctx);

    const oriRect = Rect.createFromCoordinatesStr(coordinates);
    let srcRect = this.devicesManagerService.getDevicePhysicalScreenSize();
    let targetRect = new Rect(0, 0, this.canvasWidth, this.canvasHeight);
    if (this.currentRotateDirection === RotateDirection.LANDSCAPE) {
      targetRect = new Rect(0, 0, this.canvasHeight, this.canvasWidth);
      if (srcRect.width < srcRect.height) {
        srcRect = new Rect(0, 0, srcRect.height, srcRect.width);
      }
    }
    const rectToDraw = oriRect.scaleToTargetSurface(srcRect, targetRect);

    ctx.rect(rectToDraw.x, rectToDraw.y, rectToDraw.width, rectToDraw.height);
    ctx.fillStyle = color;
    ctx.fill();
  }

  highlightOCRElement(
      boundsList: string[], color: string, ctx: CanvasRenderingContext2D) {
    this.clearOverlayCanvas(ctx);
    for (const bounds of boundsList) {
      const oriRect = Rect.createFromBoundsStr(bounds);
      let srcRect = this.devicesManagerService.getDevicePhysicalScreenSize();
      let targetRect = new Rect(0, 0, this.canvasWidth, this.canvasHeight);
      if (this.currentRotateDirection === RotateDirection.LANDSCAPE) {
        targetRect = new Rect(0, 0, this.canvasHeight, this.canvasWidth);
        if (srcRect.width < srcRect.height) {
          srcRect = new Rect(0, 0, srcRect.height, srcRect.width);
        }
      }
      const rectToDraw = oriRect.scaleToTargetSurface(srcRect, targetRect);
      ctx.rect(rectToDraw.x, rectToDraw.y, rectToDraw.width, rectToDraw.height);
    }

    ctx.strokeStyle = color;
    ctx.stroke();
  }

  initFEMiniCap(port: number) {
    // For unit test in the main page, screen cast does not contains native
    // elements, need do a check here
    if (!this.phoneScreen) {
      return;
    }
    const g = this.getScreenCanvasCtx();

    const URL = window.URL;
    const img = new Image();
    let objUrl = '';
    img.onload = () => {
      this.canvasWidth = img.width;
      this.canvasHeight = img.height;
      if (g != null) {
        g.drawImage(img, 0, 0);
      }
      // need revokeObjectURL, otherwise will be memory leak.
      URL.revokeObjectURL(objUrl);
      // assign all to null or empty object to avoid memory leak.
    };
    if (this.currentStream) {
      this.currentStream.unsubscribe();
    }
    this.currentStream = this.minicapService.connect(port)
                             .pipe(takeUntil(this.destroyed))
                             .subscribe((output: string) => {
                               let blob =
                                   new Blob([output], {type: 'image/jpeg'});
                               // Old code: objUrl = URL.createObjectURL(blob).
                               // Error message from iblaze:
                               // TS21228: [tsetse] Do not call
                               // URL.createObjectURL, as this can
                               // lead to XSS due to content sniffing.
                               objUrl = URL.createObjectURL(blob);
                               img.src = objUrl;
                               objUrl = '';
                               blob = {} as Blob;
                             });
    this.controlMessageService.sendHideOverlayMsg();
  }

  /**
   * Send message to subscribers via observable subject workflow component
   * listens for messages to know when to refresh the workflow
   */
  sendRefreshWorkflowMsg() {
    this.controlMessageService.sendRefreshWorkflowMsg();
  }

  sendRefreshXmlMsg() {
    this.controlMessageService.sendMessage(
        {messageType: MessageTypes.REFRESH_XML, extra: 'from screen cast'});
  }

  /** Checks whether user press control key */
  isControlPressed(event: PointerEvent) {
    if (window.navigator.userAgent.indexOf('Mac') !== -1) {
      if (event.metaKey) {
        return true;
      }
    } else if (event.ctrlKey) {
      return true;
    }
    return false;
  }

  selectRectArea(selectedRect: Rect, isFinal: boolean) {
    if (isFinal) {
      const ctx = this.getOverlayHoveredCanvasCtx();
      this.clearOverlayCanvas(ctx);
      const dialogRef = this.dialog.open(
          ScreenValidationFlowComponent,
          {data: {bounds: selectedRect.toBounds()}, width: '1000px'});
      dialogRef.afterClosed().subscribe(() => {
        this.sendRefreshWorkflowMsg();
      });
      return;
    }
    this.strokeHoveredCanvas(selectedRect);
  }

  updateDragCoordinates(endPoint: Point) {
    if (this.dragCoordinates.length === 0) {
      this.dragCoordinates.push(endPoint);
      return;
    }
    const currentTime = new Date().getTime();
    if (currentTime - this.timeOfLastPan > this.PAN_THRESHOLD_MS) {
      // Update the timestamp
      this.timeOfLastPan = currentTime;
      this.dragCoordinates.push(endPoint);
      return;
    }

    if (this.dragCoordinates.length > 0) {
      const lastPoint = this.dragCoordinates[this.dragCoordinates.length - 1];
      if (endPoint.getDistance(lastPoint) > this.PAN_DISTANCE_THRESHOLD) {
        this.dragCoordinates.push(endPoint);
        return;
      }
    }
    // In a single drag action, frontend will emit multiple pan events, need
    // manually merge those events, otherwise during the replay it will be too
    // slow.
    this.dragCoordinates[this.dragCoordinates.length - 1] = endPoint;
  }

  performDrag(endPoint: Point, isFinal: boolean) {
    const ctx = this.getOverlayHoveredCanvasCtx();
    this.updateDragCoordinates(endPoint);

    if (isFinal) {
      this.inDragMode = false;
      this.backendManagerService.dragStop(endPoint.x, endPoint.y)
          .pipe(take(1), takeUntil(this.destroyed))
          .subscribe(() => {});
      this.backendManagerService.addDragAction(this.dragCoordinates)
          .subscribe(() => {
            this.dragCoordinates = [];
            this.sendRefreshWorkflowMsg();
            this.sendRefreshXmlMsg();
            this.clearOverlayCanvas(ctx);
          });
      return;
    }

    ctx.strokeStyle = 'red';
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();

    this.backendManagerService.dragMove(endPoint.x, endPoint.y)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(() => {});
  }

  pan(event: PanSwipeEvent) {
    if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
      return;
    }
    const startPoint = new Point(
        event.srcEvent.offsetX - event.deltaX,
        event.srcEvent.offsetY - event.deltaY);

    if (this.isControlPressed(event.srcEvent)) {
      this.selectRectArea(
          new Rect(startPoint.x, startPoint.y, event.deltaX, event.deltaY),
          event.isFinal);

    } else {
      if (this.inDragMode) {
        this.performDrag(
            new Point(event.srcEvent.offsetX, event.srcEvent.offsetY),
            event.isFinal);
      } else if (event.isFinal) {
        // This is a swipe event.
        const endPoint =
            new Point(event.srcEvent.offsetX, event.srcEvent.offsetY);
        this.drawLineOnHoveredCanvas(startPoint, endPoint);
        this.backendManagerService
            .swipe(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
            .pipe(take(1), takeUntil(this.destroyed))
            .subscribe(() => {
              this.sendRefreshWorkflowMsg();
              this.sendRefreshXmlMsg();
            });
        // Clear the on screen swipe hint, we could add in the swipe subscribe,
        // but due to the animation the swipe will take more than 500ms to
        // return.
        timer(250).subscribe(() => {
          this.clearOverlayCanvas(this.getOverlayHoveredCanvasCtx());
        });
      }
    }
  }

  press(event: PointerEvent) {
    if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
      this.snackBar.open(
          'Please connect device or exit the UI Viewer Mode', 'OK',
          {duration: SNACKBAR_DURATION_MS});
      return;
    }
    const point = new Point(event.offsetX, event.offsetY);
    console.log(`start press at (${point.x}, ${point.y})`);
    if (!this.isControlPressed(event)) {
      this.inDragMode = true;
      this.timeOfLastPan = new Date().getTime();

      const ctx = this.getOverlayHoveredCanvasCtx();
      // Start to draw the drag path
      ctx.strokeStyle = 'red';
      ctx.moveTo(point.x, point.y);
      this.dragCoordinates.push(point);
      this.backendManagerService.dragStart(point.x, point.y)
          .pipe(take(1), takeUntil(this.destroyed))
          .subscribe(() => {
            this.sendRefreshWorkflowMsg();
            this.sendRefreshXmlMsg();
          });
    }
  }

  pressup(event: PointerEvent) {
    // Pressup event is only called when there is a press and
    // it is not followed by any pan events. This means, when
    // this event is fired, user actually performed a long click.
    this.inDragMode = false;
    const point = this.dragCoordinates[0];
    this.dragCoordinates = [];
    this.backendManagerService
        .longClick(point.x, point.y, LONGCLICK_DURATION_MS)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(() => {
          this.sendRefreshWorkflowMsg();
          this.sendRefreshXmlMsg();
        });
  }

  strokeHoveredCanvas(rect: Rect) {
    const ctx = this.getOverlayHoveredCanvasCtx();
    this.clearOverlayCanvas(ctx);
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.strokeStyle = 'red';
    ctx.stroke();
  }

  drawLineOnHoveredCanvas(startPoint: Point, endPoint: Point) {
    const ctx = this.getOverlayHoveredCanvasCtx();
    // Start to draw the drag path
    ctx.lineCap = 'round';
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#28a6da99';  // blue with transparent
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
  }

  tap(event: PointerEvent) {
    if (!this.devicesManagerService.getCurrentDevice()) {
      this.snackBar.open(
          'Please connect device', 'OK', {duration: SNACKBAR_DURATION_MS});
      return;
    }
    if (this.inspectMode) {
      // send message to tree component and select that component
      const screenCoordinate = new Rect(event.offsetX, event.offsetY, 0, 0);

      let srcRect = new Rect(0, 0, this.canvasWidth, this.canvasHeight);
      let targetRect = this.devicesManagerService.getDevicePhysicalScreenSize();
      if (this.currentRotateDirection === RotateDirection.LANDSCAPE) {
        srcRect = new Rect(0, 0, this.canvasHeight, this.canvasWidth);
        if (targetRect.width < targetRect.height) {
          targetRect = new Rect(0, 0, targetRect.height, targetRect.width);
        }
      }
      const deviceCoordinate =
          screenCoordinate.scaleToTargetSurface(srcRect, targetRect);

      this.controlMessageService.sendMessage({
        messageType: MessageTypes.INSPECT_CLICKED_NODE,
        extra: JSON.stringify(deviceCoordinate),
      });
    } else {
      if (this.isControlPressed(event)) {
        console.log('tap control on');
        return;
      }
      this.backendManagerService.tap(event.offsetX, event.offsetY, true)
          .pipe(take(1), takeUntil(this.destroyed))
          .subscribe(() => {
            this.sendRefreshWorkflowMsg();
            this.sendRefreshXmlMsg();
          });
    }
  }

  quickSwipe(direction: SwipeDirection) {
    if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
      this.snackBar.open(
          'Please connect device or exit the UI Viewer Mode', 'OK',
          {duration: SNACKBAR_DURATION_MS});
      return;
    }
    this.backendManagerService.quickSwipe(direction)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(() => {
          this.sendRefreshWorkflowMsg();
          this.sendRefreshXmlMsg();
        });
  }

  rotateScreen(direction: RotateDirection) {
    if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
      this.snackBar.open(
          'Please connect device or exit the UI Viewer Mode', 'OK',
          {duration: SNACKBAR_DURATION_MS});
      return;
    }
    if (direction === RotateDirection.LANDSCAPE) {
      this.canvasPhoneCss = 'phone-canvas-widget-rotated';
      this.canvasWrapperCss = 'canvas-wrapper-rotated';

    } else {
      this.canvasPhoneCss = 'phone-canvas-widget';
      this.canvasWrapperCss = 'canvas-wrapper';
    }
    this.currentRotateDirection = direction;

    this.loading = true;
    this.backendManagerService.rotateScreen(direction)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(returnInfo => {
          console.log(returnInfo);
          this.loading = false;
          this.sendRefreshWorkflowMsg();
          this.sendRefreshXmlMsg();
        });
    this.clearOverlayCanvas(this.getOverlayHoveredCanvasCtx());
    this.clearOverlayCanvas(this.getOverlaySelectedCanvasCtx());
  }

  power() {
    this.performKeyPressAction(KeyCodes.KEYCODE_POWER);
  }

  volumeUp() {
    this.performKeyPressAction(KeyCodes.KEYCODE_VOLUME_UP);
  }

  volumeDown() {
    this.performKeyPressAction(KeyCodes.KEYCODE_VOLUME_DOWN);
  }

  back() {
    this.performKeyPressAction(KeyCodes.KEYCODE_BACK);
  }

  home() {
    this.performKeyPressAction(KeyCodes.KEYCODE_HOME);
  }

  overview() {
    this.performKeyPressAction(KeyCodes.KEYCODE_OVERVIEW);
  }

  private performKeyPressAction(keyCode: KeyCodes) {
    if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
      return;
    }
    this.backendManagerService.pressKey(keyCode)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(() => {
          this.sendRefreshWorkflowMsg();
        });
  }

  ngOnInit() {
    this.devicesManagerService.getCurrentDeviceSubject()
        .pipe(takeUntil(this.destroyed))
        .subscribe((d: DeviceInfo) => {
          this.initFEMiniCap(d.minicapPort);
        });

    this.controlMessageService.getControlMessageSubject()
        .pipe(
            takeUntil(this.destroyed),
            filter(
                (msg: ControlMessage) =>
                    msg.messageType === MessageTypes.NODE_HOVERED ||
                    msg.messageType === MessageTypes.NODE_SELECTED ||
                    msg.messageType === MessageTypes.CLEAR_CANVAS ||
                    msg.messageType === MessageTypes.SET_INSPECT_MODE ||
                    msg.messageType === MessageTypes.HIGHLIGHT_OCR))
        .subscribe((msg: ControlMessage) => {
          if (msg.messageType === MessageTypes.CLEAR_CANVAS) {
            this.clearOverlayCanvas(this.getOverlayHoveredCanvasCtx());
            if (msg.extra.toLowerCase() === 'all') {
              this.clearOverlayCanvas(this.getOverlaySelectedCanvasCtx());
            }
          } else if (msg.messageType === MessageTypes.NODE_SELECTED) {
            this.highlightScreenElement(
                msg.extra, CanvasOverlayColor.SELECTED,
                this.getOverlaySelectedCanvasCtx());
          } else if (msg.messageType === MessageTypes.NODE_HOVERED) {
            this.highlightScreenElement(
                msg.extra, CanvasOverlayColor.HOVER,
                this.getOverlayHoveredCanvasCtx());
          } else if (msg.messageType === MessageTypes.SET_INSPECT_MODE) {
            this.inspectMode = msg.extra.toLowerCase() === 'true';
          } else if (msg.messageType === MessageTypes.HIGHLIGHT_OCR) {
            this.highlightOCRElement(
                msg.extra.split('|'), CanvasOverlayColor.OCR_SELECT,
                this.getOverlaySelectedCanvasCtx());
          }
        });
  }

  ngAfterViewInit() {
    // see go/strict-prop-init-fix for more details
  }

  ngOnDestroy() {
    // Unsubscribes all pending subscriptions.
    this.destroyed.next();
  }
}
