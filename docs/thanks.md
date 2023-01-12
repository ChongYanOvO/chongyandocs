### 特别感谢 [Chocolate](https://github.com/Chocolate1999) 开源的[chodocs](https://github.com/Chocolate1999/chodocs)
### 各位如果也喜欢这个博客文档的的话,欢迎去给 Chocolate 点点 start

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme';
import { icons } from './public/socialIcons';

const members = [
  {
    avatar: 'https://www.github.com/Chocolate1999.png',
    name: 'Choi Yang',
    title: 'open source developer, creator of ChoDocs.',
    links: [
      { icon: 'github', link: 'https://github.com/Chocolate1999' },
      { icon: 'twitter', link: 'https://twitter.com/ycyChocolate' },
      {
       icon: { svg: icons.bilibili } ,link: "https://space.bilibili.com/351534170",
      },
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      感谢以下所有人的贡献与参与
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>