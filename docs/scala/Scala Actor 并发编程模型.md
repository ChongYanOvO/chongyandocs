## Scala Actor 并发编程模型

​	`Actor`并发编程模型，是 Scala 提供的一直与 Java 完全不一样的并发编程模型，是一直基于事件模型的并发机制。`Actor`并发编程模型是一种不共享数据，依赖消息传递的并发编程模型，有效避免了资源争夺、死锁等现象。

<img src="http://chongyan-blog.test.upcdn.net/md-images/image-20220722002202875.png" alt="image-20220722002202875" style="zoom:50%;" />

`Actor`是一种基于事件(消息)的并发编程模型，不共享数据，有效避免了共享数据加锁问题。

### Java并发编程对比 Actor 并发编程模型

| Java并发编程                                            |           `Actor` 并发编程模型           |
| ------------------------------------------------------- | :--------------------------------------: |
| 共享数据锁模型(share data and lock)                     |              share nothing               |
| 每个 object 都有一个`monitor`，用来监视对共享数据的访问 | 不共享数据，`Actor`直接通过`Message`通讯 |
| 加锁代码使用`synchronized`标识                          |                                          |
| 死锁问题                                                |       每个`Actor`内部是顺序执行的        |
| 每个线程内部是顺序执行的                                |       每个`Actor`内部是顺序执行的        |

Scala 在 2.11 及之后的版本中加入了`Akka`并发编程框架，`Actor`并发编程模型已经被废弃了。

### 创建 Actor

可以通过类(Class)或者单例对象(Object)继承`Actor`特质的方式来创建`Actor`对象

#### 通过类实现创建`Actor`对象

````scala
  class myActor1 extends Actor {
    override def act(): Unit = {
      for (i <- 1 to 10) println("myActor1---" + i)
    }
  }

  class myActor2 extends Actor {
    override def act(): Unit = {
      for (i <- 11 to 20) println("myActor2---" + i)
    }
  }

  def main(args: Array[String]): Unit = {
    val myActor1: myActor1 = new myActor1()
    myActor1.start()
    new myActor2().start()
  }
````

通过单例对象实现创建`Actor`对象

```scala
  object myActor1 extends Actor {
    override def act(): Unit = {
      for (i <- 1 to 10) println("myActor1---" + i)
    }
  }

  object myActor2 extends Actor {
    override def act(): Unit = {
      for (i <- 11 to 20) println("myActor2---" + i)
    }
  }

  def main(args: Array[String]): Unit = {
    myActor1.start()
    myActor2.start()
  }
```

### 发送以及接收消息

#### 发送消息

1. `!`：发送异步消息，没有返回值
2. `!?`：发送同步消息，等待返回值
3. `!!`：发送异步消息，返回值是 `Future[Any]`

如下给`myActor1`发送一个异步字符串消息

```scala
myActor1 ! "你好"
```

#### 接收消息

`Actor`中使用`receive` 方法来接收消息，需要传入一个偏函数
`receive` 方法值接收一次消息，接收完成后进行执行`act()`方法

```scala
  object ActorSender extends Actor {
    override def act(): Unit = {
      ActorReceiver ! "你好"
    }
  }

  object ActorReceiver extends Actor {
    override def act(): Unit = {
      receive {
        case msg: String => println(msg)
      }
    }
  }

  def main(args: Array[String]): Unit = {
    ActorSender.start()
    ActorReceiver.start()
  }
```

#### 持续发送和接收消息

用 `while`循环来持续不断的发送和接收消息

```scala
  object ActorSender extends Actor {
    override def act(): Unit = {
      while (true){
        ActorReceiver ! "你好"
        Thread sleep 1000
      }
    }
  }

  object ActorReceiver extends Actor {
    override def act(): Unit = {
      while (true){
        receive {
          case msg: String => println(msg)
        }
      }
    }
  }

  def main(args: Array[String]): Unit = {
    ActorSender.start()
    ActorReceiver.start()
  }
```

**问题**：

1. 如果当前`Actor`没有接收到消息，线程就会处于阻塞状态。如果很多的`Actor`，就会导致很多线程处于阻塞状态
2. 每次有新的消息进来，都会重新创建新的线程来处理。这种频繁的线程创建、销毁和切换会影响影响效率

**解决办法**：通过`loop()`结合`react()`来复用多线程

```scala
  object ActorSender extends Actor {
    override def act(): Unit = {
      loop {
        ActorReceiver ! "你好"
        Thread sleep 1000
      }
    }
  }

  object ActorReceiver extends Actor {
    override def act(): Unit = {
      loop {
        react {
          case msg: String => println(msg)
        }
      }
    }
  }

  def main(args: Array[String]): Unit = {
    ActorSender.start()
    ActorReceiver.start()
  }
```

#### 发送和接收自定义消息

在此之前我们发送的消息都是字符串类型的，显然这样并不常见，因此我们需要能够自定义发送的消息类型。例如可以用`样例类`封装消息，然后进行发送处理

##### 发送接收同步有返回消息

> **使用`!?`**

```scala
  case class Message(id: Int, message: String)

  case class ReplyMessage(message: String, name: String)

  object MessageActor extends Actor {
    override def act(): Unit = {
      loop {
        react {
          case Message(id: Int, message: String) =>
            println(s"id = $id,message = $message ")
            sender ! ReplyMessage("你也好"，"MessageActor")
        }
      }
    }
  }

  def main(args: Array[String]): Unit = {
    MessageActor.start()
    val res: Any = MessageActor !? Message(1, "hello")
    val replyMessage: ReplyMessage = res.asInstanceOf[ReplyMessage]
    println(s"MainActor接收到MessageActor返回的消息是: ${replyMessage.message} and ${replyMessage.name}")
  }
```

##### 发送异步无返回消息

> **使用`!`**

```scala
 object MessageActor extends Actor {
    override def act(): Unit = {
      loop {
        react {
          case Message(id: Int, message: String) =>
            println(s"id = $id,message = $message ")
        }
      }
    }
  }

  def main(args: Array[String]): Unit = {
    MessageActor.start()
    MessageActor ! Message(1, "hello")
  }
```

##### 发送接收异步有返回消息

> **使用`!!`**

```scala
 object MessageActor extends Actor {
    override def act(): Unit = {
      loop {
        react {
          case Message(id: Int, message: String) =>
            println(s"id = $id,message = $message ")
            sender ! ReplyMessage("你也好"， "MessageActor")
        }
        }
      }
    }
  }

  def main(args: Array[String]): Unit = {
    MessageActor.start()
    MessageActor !! Message(1, "hello")
    println("继续执行...")
    val replyMessage: ReplyMessage = res.asInstanceOf[ReplyMessage]
      println(s"MainActor接收到MessageActor返回的消息是: ${replyMessage.message} from ${replyMessage.name}")
    println("MainActor接收成功...")
  }
```

##### 同步消息和异步消息区别

`同步消息`：必须接收到回复信息，程序才会继续执行
`异步消息`：即使没有接收到回复信息，程序也会继续执行

### Actor 实现 WordCount 案例

```scala
package com.chongyan.wordcount

import java.io.File
import scala.actors.{Actor, Future}
import scala.io.Source


object MainActor {
  def main(args: Array[String]): Unit = {
    // 1. 获取所有要统计的文件的路径
    // 1.1 定义变量 dir,记录保存的所有文件的文件夹路径
    var dir = "./data/"
    // 1.2 获取文件夹下所有的文件名
    var fileNameList = new File(dir).list().toList
    //println(fileNameList)
    // 1.3 对获取到的文件名进行拼接
    val fileDirList: List[String] = fileNameList.map(dir + _)
    //println(fileDirList)

    // 2. 根据文件数量创建对应个数的 WordCountActor 对象
    // 2.1 先创建 WordCountActor 类，用来获取 WordCountActor 对象
    case class WordCountTask(fileName: String)
    case class WordCountResult(WordCountList: List[(String, Int)])
    class WordCountActor extends Actor {
      override def act(): Unit = {
        loop {
          // 3.4 接收具体任务
          react {
            case WordCountTask(fileName) =>
            // 3.5 打印具体任务
            println(s"获取到的任务是 $fileName")
            // 4. 统计接收到的文件中的每个单词的数量
            // 4.1 获取指定文件中的所有单词
            val linesList: List[String] = Source.fromFile(fileName).getLines().toList
            // 4.2 将上述获取的数据，转换成一个个的单词
            val wordsList: List[String] = linesList.flatMap(_.split(" "))
            // 4.3 给每个字符串(单词)后面都加上次数，默认为 1
            val wordsTimesList: List[(String, Int)] = wordsList.map((_, 1))
            // 4.4 安按照字符串内容(单词本身的值)进行分组
            val wordsCountList: Map[String, List[(String, Int)]] = wordsTimesList.groupBy(_._1)
            // 4.5 对分组后的内容进行排序，统计每个单词的总数量
            val WordCountList: List[(String, Int)] = wordsCountList.map {
              wordsCountMap =>
              (wordsCountMap._1, wordsCountMap._2.map(_._2).sum)
            }.toList
            // 4.6 打印统计后的结果
            println(WordCountList)

            // 5. 将统计后的结果返回给 MainActor
            // 5.1 返回具体的值
            sender ! WordCountResult(WordCountList)
          }
        }
      }
    }
    // 2.2 根据文件数量创建对应个数的 WordCountActor 对象
    val wordCountActorsList: List[WordCountActor] = fileNameList.map(_ => new WordCountActor)
    // 2.3 将 WordCountActor 对象和文件的全路径关联在一起
    val actorWithFile: List[(WordCountActor, String)] = wordCountActorsList.zip(fileDirList)
    //println(actorWithFile)

    // 3. 启动所有 WordCountActor 对象，并发送单词统计任务消息给每个 WordCountActor 对象
    val fatureList: List[Future[Any]] = actorWithFile.map {
      actorAndFile =>
      // 3.1 获取启动具体 WordCountActor 对象
      val actor: WordCountActor = actorAndFile._1
      val fileName: String = actorAndFile._2
      // 3.2 启动具体 WordCountActor 对象
      actor.start()
      // 3.3 给每个 WordCountActor 发送具体任务(文件路径)，异步有返回
      val fature: Future[Any] = actor !! WordCountTask(fileName)
      fature
    }
    // 5.2 判断所有的 fature 是否都是返回值，如果都是返回值，则继续往下执行
    while (fatureList.exists(!_.isSet)) {}
    // 5.3 从每个 fature 中获取数据
    val WordCountLists: List[List[(String, Int)]] = fatureList
    .map(_.apply()
         .asInstanceOf[WordCountResult]
         .WordCountList)

    val WordCountList: List[(String, Int)] = WordCountLists.flatten.groupBy(_._1).map {
      wordsCountMap =>
      (wordsCountMap._1, wordsCountMap._2.map(_._2).sum)
    }.toList
    // 6. 统计并打印
    println(WordCountList)
  }
}
```