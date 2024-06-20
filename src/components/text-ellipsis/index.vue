<script lang="ts" setup>
import { useElementSize } from '@vueuse/core'
const props = defineProps({
  text: { type: String, required: true },
  line: { type: Number, default: 2 },
})

const textEl = ref<HTMLElement | null>(null)
const { width } = useElementSize(textEl)
const elStyle = computed<CSSStyleDeclaration | string>(() => {
  return textEl.value ? getComputedStyle(textEl.value) : ''
})
const isEllipsis = computed<boolean>(() => {
  if (elStyle.value) {
    // 通过字体大小和最大行高来判断 text 文本是否超出行数
    return width.value * props.line <= Number((elStyle.value as CSSStyleDeclaration).fontSize.replace('px', '')) * props.text.length
  } else {
    return false
  }
})
const isToggle = ref<boolean>(true)
</script>
<template>
  <div ref="textEl">
    <el-text v-if="isToggle" :line-clamp="line">{{ text }}</el-text>
    <div v-else>{{ text }}</div>
  </div>  
  <div v-if="isEllipsis" class="w-fit text-[#576b95] cursor-pointer" @click="isToggle = !isToggle">{{ isToggle ? '全文' : '收起' }}</div>
</template>