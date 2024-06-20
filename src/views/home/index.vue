<script setup lang="ts">
import { ref } from 'vue'
import bokeItem from './boke-item.vue'
import { initialState } from '@/to-rem.ts'
import avatar from '@/assets/wallhaven-3l7vqy.jpg'
import { getBlogList } from '@/apis/home/home.js'
import type { Blog } from 'types/blog/index.ts'
import type { Response } from 'types/request'

const bokeList = ref<Blog[]>([])

const handleToGithub = () => {
  location.href = "https://github.com/Kevinlee23"
}

getBlogList().then(res => {
  bokeList.value = (res as unknown as Response<{rows: Blog[], total: string}>).data.rows
})

</script>

<template>
  <div class="type-page relative bg-white">
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
      <boke-item v-for="item in bokeList" :key="item._id" :model="item" :comments="item.commentIds"></boke-item>
      <div class="text-[12px] text-center">-- 暂无更多内容 --</div>
    </div>

    <div v-if="initialState.device === 'desktop'" class="fixed bottom-[24px] left-[48px] text-[12px] text-[#576b95] flex align-baseline gap-x-[4px]">
      <div class="border-b-[1px] border-b-[#576b95] cursor-pointer" @click="handleToGithub">
        Snowinlu
      </div>
      <div class="text-[14px] font-bold">©</div>
      <div>2024</div>
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