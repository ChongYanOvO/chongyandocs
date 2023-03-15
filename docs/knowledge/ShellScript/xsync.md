### 1. 在/bin目录下创建`xsync`文件

```Shell
cd /bin && vim xsync
```

### 2. `xsync`集群分发同步Shell脚本

```Shell
#!/bin/bash
#1. 判断参数个数
if [ $# -lt 1 ]
then
    echo Not Enough Arguement!
    exit;
fi
#2. 遍历集群所有机器
for host in master slave1 slave2
do
    echo ====================    $host    ====================
    #3. 遍历所有目录，挨个发送
    for file in $@
    do
        #4 判断文件是否存在
        if [ -e $file ]
        then
            #5. 获取父目录
            pdir=$(cd -P $(dirname $file); pwd)
            #6. 获取当前文件的名称
            fname=$(basename $file)
            ssh $host "mkdir -p $pdir"
          rsync -av $pdir/$fname $host:$pdir
        else
            echo $file does not exists!
        fi
    done
done
```

### 3. 安装 `rsync`

```Shell
apt install rsync -y
```

### 4. 给予 `xsync` 文件可执行权限,并分发到其他节点上

```Shell
chmod +x xsync && xsync xsync
```



