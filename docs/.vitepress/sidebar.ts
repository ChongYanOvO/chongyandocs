import codeConfig from "./indexConfig/codeConfig";
import algorithmConfig from "./indexConfig/algorithmConfig";
import researchConfig from "./indexConfig/researchConfig";
import knowledgeConfig from "./indexConfig/knowledgeConfig";
import webConfig from "./indexConfig/webConfig";
import dailyConfig from "./indexConfig/dailyConfig";
import aboutConfig from "./indexConfig/aboutConfig";
import rootConfig from "./indexConfig/rootConfig";
import scalaConfig from "./indexConfig/scalaConfig";
import shellScriptConfig from "./indexConfig/shellScriptConfig";
import javaConfig from "./indexConfig/javaConfig";
import dockerConfig from "./indexConfig/dockerConfig";


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
    ],
    '/algorithm/': [
        algorithmConfig,
    ],
    '/code/': [
        codeConfig,
        scalaConfig,
        javaConfig,
        dockerConfig,
    ],
    '/web/': [
        webConfig,
    ],
    '/knowledge/': [
        shellScriptConfig,
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
