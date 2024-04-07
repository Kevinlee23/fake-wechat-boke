<script setup lang="ts">
import { ref } from 'vue'
import avatar from '@/assets/wallhaven-3l7vqy.jpg'
import type { Blog } from 'types/blog/index.ts'
import type { Comment } from 'types/comment/index.ts'
import bokeItem from './boke-item.vue'


const bokeList = ref<Blog[]>([
  {
    id: "1",
    content: "自从自己做饭加上班带饭之后感觉整个人都舒服了很多。少吃了很多外卖，下班逛菜市场，买菜、配菜、炒菜和洗碗。 收益不止是人的规律作息，钱包的富余，吃的也稍微健康了。总之结婚带给我的利远远大于弊，照顾自己，照顾喜欢的人，学会生活",
    likeNum: 0,
    address: '湖南·长沙 岳麓区',
    createDate: '2024/4/2',
    createTime: '2024/4/2 11:00',
    imgSrcList: ['https://kevinlee23.github.io/vitepress-til/images/ordinary-2024-3-12-1.jpg']
  },
  {
    id: "2",
    content: "捣鼓良久，搭建了这个博客。虽然纯粹是为了记录生活随笔。但倘若刚巧你发现了这个秘密花园。嘘！悄悄地看就好。寒山寺的钟声还在回荡。新年快乐！",
    likeNum: 10,
    createDate: '2023/3/15',
    createTime: '2023/3/15 8:00'
  }
])
const comments = ref<Comment[]>([
  {
    id: "1001",
    authorName: "missian",
    content: "牛",
    bokeId: "2",
    isOriginal: false,
    createDate: '2023/3/15',
    createTime: '2023/3/15 9:00'
  },
  {
    id: "1002",
    authorName: "舒克的坦克",
    content: "看起来很好吃",
    bokeId: "1",
    isOriginal: false,
    createDate: '2023/4/20',
    createTime: '2023/4/20 9:00'
  },
  {
    id: "1003",
    authorName: "麓下雪",
    content: "谢谢",
    parentId: "1002",
    parantName: "舒克的坦克",
    bokeId: "1",
    isOriginal: true,
    createDate: '2023/4/20',
    createTime: '2023/4/20 12:00'
  },
])

</script>

<template>
  <div class="type-page bg-white">
    <div class="header w-full h-[308px] mb-[48px] relative">
      <div class="absolute -bottom-[40px] right-[24px]">
        <div class="flex items-center justify-end mb-[12px]">
          <div class="mr-[16px] text-white">麓下雪</div>
          <el-image class="w-[60px] h-[60px] rounded-[8px]" :src="avatar" />
        </div>
        <div class="text-[12px] text-[#666666] font-medium">
          我怎么信仰 就怎么生活
        </div>
      </div>
    </div>
    <div class="w-full min-h-screen">
      <boke-item v-for="item in bokeList" :key="item.id" :model="item" :allComment="comments"></boke-item>
      <div class="text-[12px] text-center">-- 暂无更多内容 --</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  background-image: url('@/assets/wallhaven-6dexwq.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

@media (max-width: 991.9px) {
  .type-page {
    width: 100%;
  }
}
@media (min-width: 992px) {
  .type-page {
    @apply w-[567px] mx-auto;
  }
}
</style>