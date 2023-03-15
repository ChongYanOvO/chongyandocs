### 1. 在/bin目录下创建`zk`文件

```Shell
cd /bin && vim zk
```

#### 2. ZooKeeper集群管理Shell脚本

```Shell
#!/bin/bash

case $1 in
"start"){
	for i in master slave1 slave2
	do
        echo -e "\033[47;36m ---------- zookeeper $i 启动 ------------ \033[0m "
		ssh $i "source /etc/profile; zkServer.sh start"
	done
};;
"stop"){
	for i in master slave1 slave2
	do
				echo -e "\033[47;36m ---------- zookeeper $i 停止 ------------ \033[0m "
		ssh $i "source /etc/profile; zkServer.sh stop"
	done
};;
"status"){
	for i in master slave1 slave2
	do
        echo -e "\033[47;36m ---------- zookeeper $i 状态 ------------ \033[0m "  
		ssh $i "source /etc/profile; zkServer.sh status"
	done
};;
esac
```

### 3. 给予`zk`文件可执行权限,并分发到其他节点上

```Shell
chmod 777 zk && xsync zk
```

### 4. 测试`zk`脚本

```Shell
zk start
zk status
zk stop
```

