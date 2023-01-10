import {generateSitemap as sitemap} from 'sitemap-ts'
import sidebar from "./sidebar";
import socialLinks from "./link";
import algolia from "./algolia";
import type {SiteConfig} from "vitepress";


export default {
    outDir: '../dist',
    title: "ChongyanDocs",
    description: "BigData learning document collection",
    lastUpdated: true,
    markdown: {
        theme: "material-palenight",
        lineNumbers: true,
    },
    themeConfig: {
        outline: 'deep',
        recommend: {},
        footer: {
            message: "Released under the MIT License.",
            copyright: "Copyright © 2022-PRESENT Chongyan and ChongyanDocs contributors",
        },
        nav: [
            {text: "算法", link: "/algorithm/"},
            {text: "编程学习", link: "/code/"},
            {text: "云原生", link: "/web/"},
            {text: "知识体系", link: "/knowledge/"},
            {text: "日常", link: "/daily/"},
        ],
        editLink: {
            pattern: "https://github.com/ChongyanOvO/chongyandocs/edit/master/docs/:path",
        },
        algolia,
        sidebar,
        socialLinks,
    },
    async buildEnd(siteConfig: SiteConfig) {
        await sitemap({hostname: 'https://www.chongyan.xyz/'});
    }
}
