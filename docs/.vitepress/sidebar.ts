const algorithmConfig = {
    text: "LeetCode刷题分享",
    collapsible: true,
    collapsed: false,
    items: [
        {text: "简介", link: "/algorithm/"},
        {text: "No1. 两数之和", link: "/algorithm/1"},
    ],
};

const codeConfig = {
    text: "编程学习",
    collapsible: true,
    collapsed: false,
    items: [
        {text: "简介", link: "/code/"},
    ],
};

const webConfig = {
    text: "云原生",
    collapsible: true,
    collapsed: false,
    items: [
        {text: "简介", link: "/web/"},
    ],
};

const knowledgeConfig = {
    text: "大数据知识体系",
    collapsible: true,
    collapsed: false,
    items: [
        {text: "简介", link: "/knowledge/"},
    ],
};

const researchConfig = {
    text: "不务正业的研究",
    collapsible: true,
    collapsed: false,
    items: [
        {text: "简介", link: "/research/"},
    ],
};

const dailyConfig = {
    text: "小韩的日常 🎒",
    collapsible: true,
    collapsed: false,
    items: [
        {text: "简介", link: "/daily/"},
    ],
};

const aboutConfig = {
    text: "关于我",
    collapsible: true,
    collapsed: false,
    items: [
        {text: "关于小韩", link: "/about/"},
    ],
};
const scalaConfig = {
    text: "Scala学习",
    collapsible: true,
    collapsed: false,
    items: [
        {text: "导读", link: "/scala/"},
        {text: "Scala 泛型", link: "/scala/generic"},
        {text: "Scala Actor 并发编程模型及框架", link: "/scala/concurrencymodel"},
        {text: "Scala 高阶函数及函数柯里化", link: "/scala/highfunction"},
        {text: "Scala 偏函数", link: "/scala/partialfunction"},
        {text: "Scala 模式匹配", link: "/scala/patternmatch"},
        {text: "通过 Akka 构建简单的 Spark 通信框架", link: "/scala/akkaspark"},
    ],
};


const rootConfig = {
    text: "开始阅读",
    collapsible: false,
    collapsed: false,
    items: [
        {text: "简介", link: "/guide"},
        {text: "LeetCode刷题分享", link: "/algorithm/"},
        {text: "编程学习", link: "/code/"},
        {text: "云原生及前后端", link: "/web/"},
        {text: "大数据知识体系", link: "/knowledge/"},
        {text: "不务正业的研究", link: "/research/"},
        {text: "小韩的日常 🎒", link: "/daily/"},
    ],

};
export default {
    "/": [
        rootConfig
    ],
    '/algorithm/': [
        algorithmConfig,
    ],
    '/code/': [
        codeConfig,
        scalaConfig
    ],
    '/web/': [
        webConfig,
    ],
    '/knowledge/': [
        knowledgeConfig,
    ],
    '/research/': [
        researchConfig,
    ],
    '/daily/': [
        dailyConfig,
    ],
    '/about/': [
        aboutConfig,
    ],
};
