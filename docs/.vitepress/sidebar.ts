import codeConfig from "./indexConfig/codeConfig";
import algorithmConfig from "./indexConfig/algorithmConfig";
import researchConfig from "./indexConfig/researchConfig";
import knowledgeConfig from "./indexConfig/knowledgeConfig";
import webConfig from "./indexConfig/webConfig";
import dailyConfig from "./indexConfig/dailyConfig";
import aboutConfig from "./indexConfig/aboutConfig";
import rootConfig from "./indexConfig/rootConfig";
import scalaConfig from "./indexConfig/scalaConfig";


export default {
    "/": [
        rootConfig,
        algorithmConfig,
        codeConfig,
        scalaConfig,
        webConfig,
        knowledgeConfig,
        researchConfig,
        dailyConfig,
        aboutConfig,
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
