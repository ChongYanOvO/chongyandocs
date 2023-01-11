## Scala Akka 并发编程框架

### 什么是 `Akka`?

`Akka`是一个用于构建高并发、分布式和可扩展的基于事件驱动的应用程序工具包。`Akka`是使用 Scala 开发的库，可以支持 Scala 和 Java 语言来开发基于 `Akka` 的应用程序。

### `Akka`的特性

- 通过基于异步非阻塞、高性能的事件驱动编程模型
- 内置容错机制，是循序`Actor`在出错是进行恢复或者重置操作
- 超级轻量级的事件处理(每 GB 对内存可以运行几百万`Actor`)
- 使用`Akka`可以在单机上构建高并发程序，也可以在网络中构建分布式程序

### `Akka`通讯过程

<img src="http://chongyan-blog.test.upcdn.net/md-images/image-20220723201001929.png" alt="image-20220723201001929" style="zoom:50%;" />

1. 学生创建一个`ActorSystem`
2. 通过`ActorSystem`来创建一个`ActorRef`（老师的引用），并将消息发送给`ActorRef`
3. `ActorRef`将消息发送给`Message Dispatcher`（消息分发器）
4. `Message Dispatcher`将消息按照顺序保存到目标Actor的MailBox中
5. `Message Dispatcher`将`MailBox`放到一个线程中
6. `MailBox`按照顺序取出消息，最终将它递给`TeacherActor`接受的方法中

### 创建`Actor`

​	`Akka`中，也是基于`Actor`来进行编程的。类似于`Actor`。但是`Akka`中的`Actor`的编写、创建方法和之前有一些不一样。

#### API介绍

- `ActorSystem`: 它负责创建和监督`Actor`

> 1. 在`Akka`中，`ActorSystem`是一个重量级的结构，它需要分配多个线程
> 1. 在实际应用中， `ActorSystem`通常是一个单例对象， 可以使用它创建很多`Actor`
> 1. 直接使用`context.system`就可以获取到管理该`Actor`的`ActorSystem`的引用

- 实现`Actor`类

> 1. 定义类或者单例对象继承`Actor`**（注意：要导入akka.actor包下的Actor）**
> 2. 实现`receive`方法，`receive`方法中**直接处理消息**即可，不需要添加`loop`和`react`方法调用. Akka会自动调用receive来接收消息
> 3. 还可以实现`preStart()`方法， 该方法在`Actor`对象构建后执行，在`Actor`生命周期中仅执行一次.

- 加载`Actor`

> 1. 要创建Akka的`Actor`，必须要先获取创建一个`ActorSystem`。需要给`ActorSystem`指定一个名称，并可以去加载一些配置项
> 2.  调用`ActorSystem.actorOf(Props(Actor对象)， "Actor名字")`来加载`Actor`

#### Actor Path

每一个`Actor`都有一个`Path`，这个路径可以被外部引用。路径的格式如下：

| **Actor类型** | **路径**                                     | **示例**                                     |
| ------------- | -------------------------------------------- | -------------------------------------------- |
| 本地Actor     | akka://actorSystem名称/user/Actor名称        | akka://SimpleAkkaDemo/user/senderActor       |
| 远程Actor     | akka.tcp://my-sys@ip地址:port/user/Actor名称 | akka.tcp://192.168.10.17:5678/user/service-b |

#### 创建实例

1. 定义`SenderActor`类
2. 定义`ReceiverActor`类
3. 定义`Entrance`主运行类

```scala
import akka.actor.Actor

/**
 * 在 Actor 编程模型中:实现 act() 方法，如果想持续接收消息，需要通过 loop() + react() 组合方式实现
 * 在 Akka 编程模型中:实现 receive() 方法，直接在该方法中提供偏函数来处理数据即可
 */
object SenderActor extends Actor {
  override def receive: Receive = {
    case x => println(x)
  }
}
```

```scala
import akka.actor.Actor

object ReceiverActor extends Actor {
  override def receive: Receive = {
    case x => println(x)
  }
}

```

```scala
object Entrance {
  def main(args: Array[String]): Unit = {
    val actorSystem: ActorSystem = ActorSystem("actorSystem"， ConfigFactory.load())

    val senderActor: ActorRef = actorSystem.actorOf(Props(SenderActor)， "senderActor")
    val receiverActor: ActorRef = actorSystem.actorOf(Props(ReceiverActor)， "receiverActor")
  }
}
```

### 发送和接收消息

1. 使用样例类封装消息

- `SubmitTaskMessage`提交任务消息
- `SuccessSubmitTaskMessage`任务提交成功消息

2. 使用`!`发送消息

`SenderActor.scala`

```scala
object SenderActor extends Actor {
  override def receive: Receive = {
    // 1. 接收 Entrance 发送过来的消息
    case "start" =>
      // 2. 获取 ReceiverActor 的路径
      val receiverActorSelection: ActorSelection = context.actorSelection("akka://actorSystem/user/receiverActor")
      // 3. 给 ReceiverActor 返回消息，用样例类封装
      receiverActorSelection ! SubmitTaskMessage("我是 SenderActor ，我在给你发消息")
    // 4. 接收 ReceiverActor 返回的消息
    case SuccessSubmitTaskMessage(msg) =>
      println(s"SenderActor 接收到的消息是，$msg")
  }
}
```

`ReceiverActor.scala`

```scala
object ReceiverActor extends Actor {
  override def receive: Receive = {
    case SubmitTaskMessage(msg) =>
      println(s"我是 ReceiverActor ，我接收到的消息是:$msg")
      sender ! SuccessSubmitTaskMessage("我是 ReceiverActor ，接收成功")
  }
}
```

`Entrance.scala`

```scala
object Entrance {
  def main(args: Array[String]): Unit = {
    val actorSystem: ActorSystem = ActorSystem("actorSystem"， ConfigFactory.load())
    val senderActor: ActorRef = actorSystem.actorOf(Props(SenderActor)， "senderActor")
    val receiverActor: ActorRef = actorSystem.actorOf(Props(ReceiverActor)， "receiverActor")
    senderActor ! "start"
  }
}
```

### `Akka`定时任务 

通过 `ActorSystem.scheduler.schedule()方法`， 启动定时任务

- 方式一：采用`发送消息`方式实现

```scala
final def schedule(
  initialDelay : FiniteDuration, // 首次开始， 按此设定的时间， 延迟后执行
  interval : FiniteDuration, // 每隔多久执行一次(首次开始， 立马执行， 不延时)
  receiver : ActorRef, // 设置目标接收消息的 Actor
  message : Any) // 要发送的消息
(implicit executor : ExecutionContext, sender : ActorRef = {}) // 隐式参数， 需导入
```

- 方式二：采用`自定义消息`方式实现

```scala
final def schedule(
	initialDelay : FiniteDuration, // 首次开始， 按此设定的时间， 延迟后执行
	interval : FiniteDuration // 每隔多久执行一次(首次开始， 立马执行， 不延时
)(f : => Unit) // 定期要执行的函数(消息
(implicit executor : ExecutionContext) // 隐式参数， 需导入
```

**具体实现代码：**

```scala
object MainActor {
  object ReceiverActor extends Actor {
    override def receive: Receive = {
      case msg => println(msg)
    }
  }

  def main(args: Array[String]): Unit = {
    // 创建ActorSystem, 用来负责创建和监督 Actor
    val actorSystem: ActorSystem = ActorSystem("actorSystem"， ConfigFactory.load())
    // 通过 ActorSystem来加载自定义 Actor对象
    val receiverActor: ActorRef = actorSystem.actorOf(Props(ReceiverActor)， "receiverActor")

    // 导入隐式参数和隐式转换
    import actorSystem.dispatcher
    import scala.concurrent.duration._

    // 通过定时器，定时给 ReceiverActor 发送消息
    // 方式 1: 采用提供的 Any 数据类型参数的消息
    actorSystem.scheduler.schedule(0 seconds,
      2 seconds,
      receiverActor,
      "Hello ReceiverActor!， 方式 1...")

    // 方式 2: 采用自定义函数的消息
    actorSystem.scheduler.schedule(0 seconds, 2 seconds) {
      receiverActor ! "Hello ReceiverActor!， 方式 2..."
    }
  }
}
```

### 实现两个进程间的通信

基于`Akka`实现两个**进程**之间发送、接收消息。

1. `WorkerActor`启动后去连接`MasterActor`，并发送消息给`MasterActor`
2. `WorkerActor`在接收到消息后，再回复消息给`MasterActor`

<img src="http://chongyan-blog.test.upcdn.net/md-images/image-20220724053601951.png" alt="image-20220724051541509" style="zoom:50%;" />

##### `MasterActor.scala`

```scala
package com.chongyan.masterAndWorker.master
import akka.actor.Actor
object MasterActor extends Actor {
  override def receive: Receive = {
    case "setup" => println("MasterActor started!")
    // 接收 WorkerActor发的消息
    case "connect" =>
      println("MasterActor, received: connect!")
      // 给发送者(WorkerActor)返回的回执信息
      sender ! "success"
  }
}
```

##### `MasterEntrance.scala`

```scala
package com.chongyan.masterAndWorker.master
import akka.actor.{ActorRef, ActorSystem, Props}
import com.typesafe.config.ConfigFactory
object MasterEntrance {
  def main(args: Array[String]): Unit = {
    val actorSystem: ActorSystem = ActorSystem("actorSystem"， ConfigFactory.load())
    val masterActor: ActorRef = actorSystem.actorOf(Props(MasterActor)， "masterActor")
    // 给 MasterActor发送消息
    masterActor ! "setup"
  }
}
```

##### `WorkerActor.scala`

```scala
package com.chongyan.masterAndWorker.worker
import akka.actor.{Actor, ActorSelection}
object WorkerActor extends Actor {
  override def receive: Receive = {
    case "setup" =>
      println("WorkerActor started!")
      // 远程获取 MasterActor
      val masterActor: ActorSelection = context
        .system
        .actorSelection("akka.tcp://actorSystem@127.0.0.1:8888/user/masterActor")
      // 给 MasterActor发送字符串 connect
      masterActor ! "connect"
    // 接收 MasterActor发的消息
    case "success" => println("MasterActor, received: success!")
  }
}
```

`WorkerEntrance.scala`

```scala
package com.chongyan.masterAndWorker.worker
import akka.actor.{ActorRef, ActorSystem, Props}
import com.typesafe.config.ConfigFactory
object WorkerEntrance {
  def main(args: Array[String]): Unit = {
    val actorSystem: ActorSystem = ActorSystem("actorSystem"， ConfigFactory.load())
    val workerActor: ActorRef = actorSystem.actorOf(Props(WorkerActor)， "workerActor")
    // 给 WorkerActor发送消息
    workerActor ! "setup"
  }
}
```
