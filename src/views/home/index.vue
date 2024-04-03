<script setup lang="ts">
import { NImage } from 'naive-ui'
import avatar from '@/assets/wallhaven-3l7vqy.jpg'

</script>

<template>
  <div class="w-[567px] mx-auto bg-white">
    <div class="header w-full h-[308px] mb-[48px] relative">
      <div class="absolute -bottom-[40px] right-[24px]">
        <div class="flex items-center justify-end mb-[12px]">
          <div class="mr-[16px] text-white">麓下雪</div>
          <n-image class="w-[60px] h-[60px] rounded-[8px]" :src="avatar" preview-disabled />
        </div>
        <div class="text-[12px] text-[#666666] font-medium">
          我怎么信仰 就怎么生活
        </div>
      </div>
    </div>
    <div class="w-full min-h-screen"></div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  background-image: url('@/assets/wallhaven-6dexwq.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>