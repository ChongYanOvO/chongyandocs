import { inBrowser } from 'vitepress'
import type { Theme } from 'vitepress'
import DefaultTheme from "vitepress/theme";
import ChoLayout from "./components/ChongyanLayout.vue";
import "./styles/main.css";
import "./styles/utils.css";
import "./styles/vars.css";

const theme: Theme = {
  ...DefaultTheme,
  Layout: ChoLayout,
  enhanceApp({ router }) {
    if (inBrowser) {
    }
  },
};

export default theme;
