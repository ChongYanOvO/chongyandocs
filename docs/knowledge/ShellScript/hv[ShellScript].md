### 1. 在/bin目录下创建`hv`文件

```Shell
cd /bin && vim hv
```

### 2. Hive集群管理Shell脚本

```Shell
#!/bin/bash

HIVE_LOG_DIR=$HIVE_HOME/logs

# 创建日志目录
if [ ! -d $HIVE_LOG_DIR ]
then
	mkdir -p $HIVE_LOG_DIR
fi

# 检查进程是否运行正常,参数 1 为进程名,参数 2 为进程端口
function check_process()
{
	pid=$(ps -ef 2>/dev/null | grep -v grep | grep -i $1 | awk '{print $2}')
	ppid=$(netstat -nltp 2>/dev/null | grep $2 | awk '{print $7}' | cut -d '/' -f 1)
	echo $pid
	[[ "$pid" =~ "$ppid" ]] && [ "$ppid" ] && return 0 || return 1
}

# 启动服务
function hive_start()
{
	# 启动Metastore
	metapid=$(check_process HiveMetastore 9083)
	cmd="nohup hive --service metastore >$HIVE_LOG_DIR/metastore.log 2>&1 &"
	[ -z "$metapid" ] && eval $cmd || echo -e "\033[47;36m Metastroe 服务已启动\033[0m"

	# 启动HiveServer2
	server2pid=$(check_process HiveServer2 10000)
	cmd="nohup hiveserver2 >$HIVE_LOG_DIR/hiveServer2.log 2>&1 &"
	[ -z "$server2pid" ] && eval $cmd || echo -e "\033[47;36m HiveServer2 服务已启动\033[0m"
}

# 停止服务
function hive_stop()
{
	# 停止Metastore
	metapid=$(check_process HiveMetastore 9083)
	[ "$metapid" ] && kill $metapid || echo -e "\033[47;33m Metastore 服务未启动\033[0m"

	# 停止HiveServer2
	server2pid=$(check_process HiveServer2 10000)
	[ "$server2pid" ] && kill $server2pid || echo -e "\033[47;33m HiveServer2 服务未启动\033[0m"
}

# 脚本参数菜单
case $1 in
"start")
echo -e "\033[47;32m 服务启动中,HiveServer2启动时间较长,请等待！\033[0m"
hive_start
;;

"stop")
echo -e "\033[47;32m 服务停止中,请等待！\033[0m"
hive_stop
;;

"restart")
echo -e "\033[47;32m 服务重启中,HiveServer2启动时间较长,请等待！\033[0m"
hive_stop
sleep 2
hive_start
;;

"status")
check_process HiveMetastore 9083 >/dev/null && echo -e "\033[47;36m Metastore 服务运行正常\033[0m" || echo -e "\033[47;31m Metastore 服务运行异常\033[0m"
check_process HiveServer2 10000 >/dev/null && echo -e "\033[47;36m HiveServer2 服务运行正常\033[0m" || echo -e "\033[47;31m HiveServer2 服务运行异常\033[0m"
;;

*)
echo -e "\033[47;31m  Invalid Args!\033[0m"
echo 'Usage: '$(basename $0)' start|stop|restart|status'
;;
esac
```

### 3. 给予`hv`文件可执行权限,并分发到其他节点上

```Shell
chmod 777 hv && xsync hv
```

### 4. 测试`hv`脚本

```Shell
hv start 
hv stop
```



