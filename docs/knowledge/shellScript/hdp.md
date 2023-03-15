### 1. 在/bin目录下创建 hdp 文件

```Shell
cd /bin && vim hdp
```

### 2. Hadoop集群管理Shell脚本

```Shell
#判断用户是否传参
if [ $# -ne 1 ];then
    echo "无效参数，用法为: $0  {start|stop}"
    exit
fi
#获取用户输入的命令
cmd=$1
#定义函数功能
function hadoopManger(){
    case $cmd in
    start)
        echo "启动服务"        
        remoteExecutionstart
        ;;
    stop)
        echo "停止服务"
        remoteExecutionstop
        ;;
    *)
        echo "无效参数，用法为: $0  {start|stop}"
        ;;
    esac
}

#启动Hadoop
function remoteExecutionstart(){ 
    echo "启动historyserver"
    ssh slave2 "source /etc/profile; mapred --daemon start historyserver"
    
    echo "启动HDFS和YARM"        
    ssh master  "source /etc/profile; start-all.sh"
}

#关闭HADOOP
function remoteExecutionstop(){   
    echo "关闭HDFS和YARM"        
    ssh master  "source /etc/profile; stop-all.sh"  
    
    echo "关闭historyserver"
    ssh slave2 "source /etc/profile; mapred --daemon stop historyserver"
}
#调用函数
hadoopManger
```

### 3. 给予`hdp`文件可执行权限,并分发到其他节点上

```Shell
chmod 777 hdp && xsync hdp
```

### 4. 测试`hdp`脚本

```Shell
hdp start
hdp stop
```

