### 1. 在/bin目录下创建`kf`文件

```Shell
cd /bin && vim kf 
```

### 2. Kafka集群管理Shell脚本

```Shell
  #! /bin/bash

  case $1 in
  "start"){
      for i in master slave1 slave2
      do  
          echo -e "\033[47;36m --------启动 $i Kafka------- \033[0m"
          ssh $i "source /etc/profile; kafka-server-start.sh -daemon /usr/local/src/kafka/config/server.properties"
      done
  };;
  "stop"){
      for i in master slave1 slave2
      do
          echo -e "\033[47;36m --------停止 $i Kafka------- \033[0m"
          ssh $i "source /etc/profile; kafka-server-stop.sh stop"
      done
  };;
  esac
```

### 3. 给予`kf`文件可执行权限,并分发到其他节点上

```Shell
chmod 777 kf && xsync kf
```

### 4. 测试 kf 脚本

```Shell
kf start
kf stop
```

