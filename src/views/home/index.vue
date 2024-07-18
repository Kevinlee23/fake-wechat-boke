<script setup lang="ts">
import { ref } from 'vue'
import { useScroll } from '@vueuse/core'
import type { Blog } from 'types/blog/index.ts'
import type { Response } from 'types/request'
import bokeItem from './boke-item.vue'
import { initialState } from '@/to-rem.ts'
import avatar from '@/assets/wallhaven-3l7vqy.jpg'
import { getBlogList } from '@/apis/home/home.js'
import useScrollEl from '@/hooks/use-scroll-el'

const finish = ref(false)
const bokeList = ref<Blog[]>([])
const pagination = reactive({
  page: 1,
  size: 5,
  total: 0,
})

function handleToGithub() {
  location.href = 'https://github.com/Kevinlee23'
}

function getList() {
  getBlogList(pagination).then((res) => {
    bokeList.value = [...bokeList.value, ...(res as unknown as Response<{ rows: Blog[], total: string }>).data.rows]
    pagination.total = res.data.total
    pagination.page++
    if (bokeList.value.length === pagination.total)
      finish.value = true
  })
}

getList()

const text = 'A week is 2% of a year'

const typeEl = ref<HTMLElement | null>(null)
let index = 0
const flag = ref(false)
function addNextCharacter() {
  if (index < text.length) {
    typeEl.value && (typeEl.value.textContent += text[index])
    index++
    setTimeout(addNextCharacter, Math.random() * 150 + 30)
  }
  else {
    flag.value = true
  }
}

function handleLike(blog: Blog, num: number) {
  blog.likeNum += num
}

const { scrollEl } = useScrollEl()
const { arrivedState } = useScroll(scrollEl, { offset: { bottom: 50 }, throttle: 200 })

watch(() => arrivedState.bottom, () => {
  if (!finish.value)
    getList()
})

onMounted(() => {
  typeEl.value && (typeEl.value.textContent = '')
  addNextCharacter()
})
</script>

<template>
  <div class="type-page relative bg-white">
    <div class="header w-full h-[308px] mb-12 relative">
      <div class="absolute -bottom-[64px] right-6">
        <div class="flex items-center justify-end mb-3">
          <div class="mr-[16px] text-[white]">
            麓下雪
          </div>
          <el-image class="w-[60px] h-[60px] rounded-[8px]" :src="avatar" />
        </div>
        <div class="text-3 text-[#666666] font-medium">
          <span ref="typeEl" />
          <span class="pl-1 font-bold" :class="{ 'typed-cursor': flag }">|</span>
        </div>
      </div>
    </div>
    <div class="w-full min-h-screen">
      <boke-item v-for="item in bokeList" :key="item._id" :model="item" :comments="item.commentIds" @like-operate="(num) => handleLike(item, num)" />
      <div v-if="finish" class="text-3 text-center">
        -- 暂无更多内容 --
      </div>
    </div>

    <div v-if="initialState.device === 'desktop'" class="fixed bottom-6 left-[48px] text-3 text-[#4792b9] flex align-baseline gap-x-1">
      <div class="c-decoration cursor-pointer" @click="handleToGithub">
        Snowinlu
      </div>
      <div class="text-[14px] font-bold">
        ©
      </div>
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
