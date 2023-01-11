import algorithmConfig from "./algorithmConfig";
import webConfig from "./webConfig";
import codeConfig from "./codeConfig";
import scalaConfig from "./scalaConfig";
import knowledgeConfig from "./knowledgeConfig";
import researchConfig from "./researchConfig";
import dailyConfig from "./dailyConfig";
import aboutConfig from "./aboutConfig";

export default {
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
    algorithmConfig,
    codeConfig,
    scalaConfig,
    webConfig,
    knowledgeConfig,
    researchConfig,
    dailyConfig,
    aboutConfig,
};