### 1. 在/bin目录下创建 hb 文件

```Shell
cd /bin && vim hb
```

### 2. HBase集群管理Shell脚本

```Shell
#! /bin/bash

case $1 in
"start"){
    echo -e "\033[47;31m --------启动HBase------- \033[0m"
    ssh master "/usr/local/src/hbase/bin/start-hbase.sh"
};;
"stop"){
    echo -e "\033[47;31m --------停止HBase------- \033[0m"
    ssh master "/usr/local/src/hbase/bin/stop-hbase.sh"
};;
esac
```

### 3. 给予 hb 文件可执行权限,并分发到其他节点上

```Shell
chmod 777 hb && xsync hb
```

### 4. 测试 hb 脚本

```Shell
hb start 
hb stop
```



