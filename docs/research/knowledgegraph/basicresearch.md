## 1. 什么是知识图谱

​	知识图谱是一种比较通用的语义知识的形式化描述框架，用来描述真实世界中存在的各种实体和概念，以及他们之间的关系，可以认为是一种语义网络。

​	相比传统的语义网络，知识图谱因为简易的数据表征方式、多样化的知识表示和多层次的语义表达等优点，使得其能够在数据量大、场景复杂的情况下有效运用于挖掘关联知识和复杂关系。

## 2. 知识图谱的通用表示方式

**在知识图谱中**

- 用`节点`表示`语义符号`
- 用`边`表示符号之间的`语义关系`

形式化的表述用事实`三元组`（实体，关系，实体）来记录

**实体（Entity）-关系（Relationship）-实体（Entity）**

- `实体`: 指的是具有可区别性且独立存在的某种事物。实体是知识图谱中的最基本元素，不同的实体间存在不同的关系。
- `关系`: 关系是连接不同的实体，指代实体之间的联系。通过关系节点把知识图谱中的节点连接起来，形成一张大图。

实体还存在着一些`属性`，实体的基本信息可以作为实体的属性

## 3. 数据类型和存储方式

知识图谱的三类原始数据类型

- **结构化数据（Structed Data）**：如关系数据库
- **半结构化数据（Semi-Structed Data）**：如XML、JSON、百科
- **非结构化数据（UnStructed Data）**：如图片、音频、视频、文本

知识图谱的两种存储方式

- 通过 `RDF（资源描述框架）`这样的规范存储格式来进行存储
- 使用`图数据库`来进行存储，常用的有 `Neo4j`

在知识图谱方面，图数据库比关系数据库灵活的多。

因为知识图谱需要相当复杂的储存系统，在涉及到2,3度的关联查询时，基于图数据库的效率会比关系数据库的效率高出几千倍甚至几百万倍，而关系数据库的查询效率不够支持知识图谱的的使用。

## 4. 知识图谱的架构

**知识图谱**在架构上可以为**逻辑架构和技术架构**

### 4.1 逻辑架构

**知识图谱**在逻辑上可分为**模式层**与**数据层**两个层次

- **模式层：实体-关系-实体，实体-属性-属性值**
  ​	模式层构建在数据层之上，是知识图谱的核心，通常采用本体库来管理知识图谱的模式层
  ​	本体是结构化知识库的概念模板，通过本体库而形成的知识库不仅层次结构较强，并且冗余程度较小

- **数据层：比尔盖茨-妻子-梅琳达·盖茨，比尔盖茨-总裁-微软**
  数据层主要是由一系列的`事实`组成，而知识将以事实为单位进行存储
  如果用(实体1，关系，实体2)、(实体、属性，属性值)这样的三元组来表达事实，可选择图数据库作为存储介	质，例如开源的Neo4j、Twitter的FlockDB、sones的GraphDB等

### 4.2 技术架构

1. 虚线框的最左边是三种输入数据结构，结构化数据（Structed Data）、半结构化数据（Semi-Structed Data）、非结构化数据（UnStructed Data）。这些数据可以来自任何地方，只要它对要构建的这个知识图谱有帮助。
2. 虚线框里面的是整个的知识图谱的构建过程。其中主要包含了3个阶段，信息抽取、知识融合、知识加工。

- **信息抽取**：从各种类型的数据源中提取出实体、属性以及实体间的相互关系，在此基础上形成本体化的知识表达；
- **知识融合**：在获得新知识之后，需要对其进行整合，以消除矛盾和歧义，比如某些实体可能有多种表达，某个特定称谓也许对应于多个不同的实体等；
- **知识加工**：对于经过融合的新知识，需要经过`质量评估`之后（部分需要人工参与甄别），才能将合格的部分加入到知识库中，以确保知识库的质量。

3. 最右边是生成的知识图谱，而且这个技术架构是循环往复，迭代更新的过程。知识图谱不是一次性生成，是慢慢积累的过程。

## 5. 知识图谱的构建过程

### 5.1 信息抽取

#### 5.1.1 实体抽取(Entity Extraction)

实体抽取又称为`命名实体识别`（named entity recognition，NER），是指从文本数据集中自动识别出命名实体。实体抽取的质量（准确率和召回率）对后续的知识获取效率和质量影响极大，因此是信息抽取中最为`基础和关键`的部分。

**实体抽取的方式**

- 自适应感知机算法实现了对实体的自动分类 `2012年`
- 人工预定义实体分类体系 (难适应时代的需求，进而使用`面向开放域的实体识别和分类研究`)
- 根据已知的实体实例进行`特征建模`，利用该模型处理海量数据集得到新的命名实体列表，然后针对新实体建模，迭代地生成实体标注语料库
- 利用搜索引擎的服务器日志，事先并不给出实体分类等信息，而是基于实体的语义特征从搜索日志中识别出命名实体，然后采用聚类算法对识别出的实体对象进行聚类

#### 5.1.2 关系抽取(Relation Extraction)

​	文本语料经过实体抽取，得到的是一系列离散的命名实体，为了得到语义信息，还需要从相关的语料中提取出实体之间的`关联关系`，通过关联关系将实体（概念）联系起来，才能够形成网状的知识结构，研究关系抽取技术的目的，就是解决如何从文本语料中抽取实体间的关系这一基本问题。

**关系抽取的方式**

- 人工构造语法和语义规则（模式匹配）`例如 Scala 的模式匹配实现?`
- 统计机器学习方法
- 基于特征向量或核函数的有监督学习方法
- 研究重点转向半监督和无监督
- 开始研究面向开放域的信息抽取方法
- 将面向开放域的信息抽取方法和面向封闭领域的传统方法结合

#### 5.1.3 属性抽取(Attribute Extraction)

属性抽取的目标是从不同信息源中采集特定实体的`属性信息`。
例如针对某个公众人物，可以从网络公开信息中得到其昵称、生日、国籍、教育背景等信息。
属性抽取技术能够从多种数据来源中汇集这些信息，实现对实体属性的完整勾画。

**属性抽取的方式**

- 将实体的属性视作实体与属性值之间的一种名词性关系，将属性抽取任务转化为关系抽取任务
- 基于规则和启发式算法，抽取结构化数据
- 基于百科类网站的半结构化数据，通过自动抽取生成训练语料，用于训练实体属性标注模型，然后将其应用于对非结构化数据的实体属性抽取
- 采用数据挖掘的方法直接从文本中挖掘实体属性和属性值之间的关系模式，据此实现对属性名和属性值在文本中的定位

### 5.2 知识融合

通过信息抽取，从原始的非结构化和半结构化数据中获取到了实体、关系以及实体的属性信息。
将接下来的过程比喻成拼图的话，那么这些信息就是拼图碎片，散乱无章，甚至还有从其他拼图里跑来的碎片、本身就是用来干扰我们拼图的错误碎片。
拼图碎片（信息）之间的关系是扁平化的，缺乏层次性和逻辑性；
拼图（知识）中还存在大量冗杂和错误的拼图碎片（信息）
那么如何解决这一问题，就是在知识融合这一步里我们需要做的了。
知识融合包括两部分内容：**实体链接**，**知识合并**

#### 5.2.1 实体链接

**实体链接（entity linking）**：是指对于从文本中抽取得到的实体对象，将其链接到知识库中对应的正确实体对象的操作。
其基本思想是首先根据给定的实体指称项，从知识库中选出一组候选实体对象，然后通过**相似度计算**将指称项链接到正确的实体对象。
研究历史：

1. 仅关注如何将从文本中抽取到的实体链接到知识库中，忽视了位于同一文档的实体间存在的语义联系。
2. 开始关注利用实体的共现关系，同时将多个实体链接到知识库中。即集成实体链接（collective entity linking）

**实体链接的流程：**

1. 从文本中通过实体抽取得到实体指称项。
2. 进行**实体消歧**和**共指消解**，判断知识库中的同名实体与之是否代表不同的含义以及知识库中是否存在其他命名实体与之表示相同的含义。

- **实体消歧**：专门用于解决同名实体产生歧义问题的技术，通过实体消歧，就可以根据当前的语境，准确建立实体链接，实体消歧主要采用聚类法。其实也可以看做基于上下文的分类问题，类似于**词性消歧和词义消歧**。
- **共指消解**：**主要用于解决多个指称对应同一实体对象的问题**。在一次会话中，多个指称可能指向的是同一实体对象。利用共指消解技术，可以将这些指称项关联（合并）到正确的实体对象，由于该问题在信息检索和自然语言处理等领域具有特殊的重要性，吸引了大量的研究努力。共指消解还有一些其他的名字，比如`对象对齐`、`实体匹配`和`实体同义`。

3. 在确认知识库中对应的正确实体对象之后，将该实体指称项链接到知识库中对应实体。

#### 5.2.2 知识合并

在构建知识图谱时，可以从第三方知识库产品或已有结构化数据获取知识输入。
常见的知识合并需求有两个，一个是`合并外部知识库`，另一个是`合并关系数据库`。

将外部知识库融合到本地知识库需要处理两个层面的问题：

1. 数据层的融合，包括实体的指称、属性、关系以及所属类别等，主要的问题是如何避免实例以及关系的冲突问题，造成不必要的冗余
2. 通过模式层的融合，将新得到的本体融入已有的本体库中
   然后是合并关系数据库，在知识图谱构建过程中，一个重要的高质量知识来源是企业或者机构自己的关系数据库。为了将这些结构化的历史数据融入到知识图谱中，可以采用资源描述框架（RDF）作为数据模型。业界和学术界将这一数据转换过程形象地称为RDB2RDF，其实质就是将关系数据库的数据换成RDF的三元组数据

### 5.3 知识加工

​	通过**信息抽取**，从原始语料中提取出了实体、关系与属性等知识要素，并且经过**知识融合**，消除实体指称项与实体对象之间的歧义，得到一系列基本的事实表达。
然而事实本身并不等于知识。要想最终获得结构化，网络化的知识体系，还需要经历知识加工的过程。
知识加工主要包括3方面内容：**本体构建、知识推理和质量评估**。

#### 5.3.1 本体构建

`本体`（ontology）是指工人的**概念集合、概念框架**，如“人”、“事”、“物”等。
本体可以采用人工编辑的方式手动构建（借助本体编辑软件），也可以以数据驱动的自动化方式构建本体。因为人工方式工作量巨大，且很难找到符合要求的专家，因此当前主流的全局本体库产品，都是从一些面向特定领域的现有本体库出发，采用自动构建技术逐步扩展得到的。

**自动化本体构建的三个阶段**

1. 实体并列关系相似度计算
2. 实体上下位关系抽取
3. 本体的生成

实体并列关系相似度计算:当知识图谱刚得到“阿里巴巴”、“腾讯”、“手机”这三个实体的时候，可能会认为它们三个之间并没有什么差别，但当它去计算三个实体之间的相似度后，就会发现，阿里巴巴和腾讯之间可能更相似，和手机差别更大一些。
实体上下位关系抽取:知识图谱实际上还是没有一个上下层的概念，它还是不知道，阿里巴巴和手机，根本就不隶属于一个类型，无法比较。因此我们在实体上下位关系抽取这一步，就需要去完成这样的工作，从而生成第三步的本体。
本体的生成:阿里巴巴和腾讯，其实都是公司这样一个实体下的细分实体。它们和手机并不是一类。

#### 5.3.2 知识推理

在完成了本体构建之后，一个知识图谱的雏形便已经搭建好了。
但在这个时候，知识图谱之间大多数关系都是残缺的，缺失值非常严重，在这时候，可以使用知识推理技术，去完成进一步的知识发现。

可以发现：如果A是B的配偶，B是C的主席，C坐落于D，那么我们就可以认为，A生活在D这个城市。
根据这一条规则，我们可以去挖掘一下在图里，是不是还有其他的path满足这个条件，那么我们就可以将AD两个关联起来。

知识推理的对象也并不局限于实体间的关系，也可以是实体的属性值，本体的概念层次关系等。

推理属性值：已知某实体的生日属性，可以通过推理得到该实体的年龄属性；
推理概念：已知(老虎，科，猫科)和（猫科，目，食肉目）可以推出（老虎，目，食肉目）
这一块的算法主要可以分为3大类，基于**逻辑的推理、基于图的推理和基于深度学习的推理**。

#### 5.3.3 质量评估

对知识的可信度进行量化，通过舍弃置信度较低的知识来保障知识库的质量。

## 6. 知识更新

从逻辑上看，知识库的更新包括**概念层的更新和数据层的更新**。

`概念层`的更新是指新增数据后获得了新的概念，需要自动将新的概念添加到知识库的概念层中。
`数据层`的更新主要是新增或更新实体、关系、属性值，对数据层进行更新需要考虑数据源的可靠性、数据的一致性（是否存在矛盾或冗杂等问题）等可靠数据源，并选择在各数据源中出现频率高的事实和属性加入知识库。

知识图谱的`内容更新`有两种方式：

- **全面更新**：指以更新后的全部数据为输入，从零开始构建知识图谱。这种方法比较简单，但资源消耗大，而且需要耗费大量人力资源进行系统维护；
- **增量更新**：以当前新增数据为输入，向现有知识图谱中添加新增知识。这种方式资源消耗小，但目前仍需要大量人工干预（定义规则等），因此实施起来十分困难。

## 7. 知识图谱的应用

### 7.1NLP领域应用

1. 搜索和问答领域。

2. 自然语言理解类的场景，比如在具体的机器翻译领域，句法分析相关的工作。

### 7.2 辅助大数据分析

​	知识图谱也可以用于辅助进行数据分析与决策。不同来源的知识通过知识融合进行集成，通过知识图谱和语义技术增强数据之间的关联，用户可以更直观地对数据进行分析。此外知识图谱也被广泛用于作为先验知识从文本中抽取实体和关系，也被用来辅助实现文本中的实体消歧，指代消解等。
