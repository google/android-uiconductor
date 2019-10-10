# Frontend
UIConductor Frontend

To start in Google3 run

```shell
~/google3/testing/mobile/uicd$ iblaze run src:devserver
```

Sometimes the iblaze will stuck and show '5432: bind: address already in use',
use the following command to find the PID and kill.

```shell
~/google3/testing/mobile/uicd$ lsof -i :5432
```

For the github version use regular Angular CLI instead.
If you want to use ng internally please use git5, otherwise npm install is super
slow in citc and fig.

```shell
~$ ng serve --aot
```
