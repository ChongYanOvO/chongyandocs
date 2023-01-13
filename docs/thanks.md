> 嘿嘿🤤,感谢`Chocolate`的开源 `ChoDocs` 构建方案,在此基础上我又做了点魔改

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
  <VPTeamMembers :members="members"></VPTeamMembers>
</VPTeamPage>

