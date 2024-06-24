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

const text = "A week is 2% of a year"

const typeEl = ref<HTMLElement | null>(null)
let index = 0;
let flag = ref(false)
function addNextCharacter() {
  if (index < text.length) {
    typeEl.value && (typeEl.value.textContent += text[index]);
    index++;
    setTimeout(addNextCharacter, Math.random() * 150 + 30);
  } else {
    flag.value = true
  }
}

onMounted(() => {
  typeEl.value && (typeEl.value.innerText = '')
  addNextCharacter();
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
          <span ref="typeEl"></span>
          <span class="pl-[4px] font-bold" :class="{ 'typed-cursor': flag }">|</span>
        </div>
      </div>
    </div>
    <div class="w-full min-h-screen">
      <boke-item v-for="item in bokeList" :key="item._id" :model="item" :comments="item.commentIds"></boke-item>
      <div class="text-[12px] text-center">-- 暂无更多内容 --</div>
    </div>

    <div v-if="initialState.device === 'desktop'" class="fixed bottom-[24px] left-[48px] text-[12px] text-[#4792b9] flex align-baseline gap-x-[4px]">
      <div class="c-decoration cursor-pointer" @click="handleToGithub">
        Snowinlu
      </div>
      <div class="text-[14px] font-bold">©</div>
      <div>2024</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.header {
  background-image: url('@/assets/wallhaven-6dexwq.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

.c-decoration {
  @apply relative w-fit px-[2px] hover:text-white;
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 66%;
    left: -.1em;
    right: -.1em;
    bottom: 0;
    transition: top .2s cubic-bezier(0,.8,.13,1);
    background-color: #4792b9;
  }

  &:hover::after {
    top: 0
  }
}

@keyframes typedJsBlink {
  50% {
    opacity: 0.0;
  }
}

.typed-cursor {
  animation: typedJsBlink 0.7s infinite;
}
</style>