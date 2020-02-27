import {Component} from '@angular/core';

/**
 * Pdb debugger component for python in UICD
 */

@Component({
  selector: 'python-debugger-dialog',
  templateUrl: './python_debugger_dialog.ng.html',
  styleUrls: ['./python_debugger_dialog.css']
})
export class PythonDebuggerDialog {
  pythonScript = '';
  pdbDebuggerOption = '';

  pdbDebuggerOptions = [
    'N',
    'S',
    'C',
    'R',
    'B',
  ];

  runDebugger() {}
}