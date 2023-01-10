export default {
    "/": [
        {
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
        },
    ],
    '/algorithm/': [
        {
            text: "LeetCode刷题分享",
            collapsible: true,
            collapsed: false,
            items: [
                {text: "简介", link: "/algorithm/"},
                {text: "No1. 两数之和", link: "/algorithm/1"},
            ],
        },
    ],
    '/code/': [
        {
            text: "编程学习",
            collapsible: true,
            collapsed: false,
            items: [
                {text: "简介", link: "/code/"},
            ],
        },
    ],
    '/web/': [
        {
            text: "云原生",
            collapsible: true,
            collapsed: false,
            items: [
                {text: "简介", link: "/web/"},
            ],
        },
    ],
    '/knowledge/': [
        {
            text: "大数据知识体系",
            collapsible: true,
            collapsed: false,
            items: [
                {text: "简介", link: "/knowledge/"},
            ],
        },
    ],
    '/research/': [
        {
            text: "不务正业的研究",
            collapsible: true,
            collapsed: false,
            items: [
                {text: "简介", link: "/research/"},
            ],
        },
    ],
    '/daily/': [
        {
            text: "小韩的日常 🎒",
            collapsible: true,
            collapsed: false,
            items: [
                {text: "简介", link: "/daily/"},
            ],
        },
    ],
    '/about/': [
        {
            text: "关于我",
            collapsible: true,
            collapsed: false,
            items: [
                {text: "关于小韩", link: "/about/"},
            ],
        },
    ],
};
