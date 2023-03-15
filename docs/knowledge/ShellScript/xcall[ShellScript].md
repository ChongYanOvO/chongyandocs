### 1. 在/bin目录下创建`xcall`文件

```Shell
cd /bin && vim xcallshell
```

### 2. 集群进程查看Shell脚本

```Shell
#! /bin/bash
 
for i in master slave1 slave2
do
    echo --------- $i ----------
    ssh $i "source /etc/profile; $*"
done
```

### 3. 给予`xcall`文件可执行权限,并分发到其他节点上

```Shell
chmod 777 xcall && xsync xcall
```

