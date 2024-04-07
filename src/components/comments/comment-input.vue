<script lang="ts" setup>
import { useMagicKeys, onClickOutside } from '@vueuse/core'
import { Emoji16Regular } from '@vicons/fluent'
import { EMOJI } from '@/constant/emoji.ts'
import type { Comment } from '@/types/comment/index.ts'

defineProps({
  selected: { type: Object as PropType<Comment> }
})

const inputEl = ref<HTMLElement | null>(null)
const show = ref<boolean>(false)
const text = ref<string>('')
onClickOutside(inputEl, () => {
  show.value = false
})

const focused = ref<boolean>(false)
const { control, enter } = useMagicKeys()

watchEffect(() => {
  if (focused.value && control.value && enter.value) {
    console.log(text.value)
  }
})

const showEmoji = ref<boolean>(false)
const tapEmoji = () => {
  showEmoji.value = !showEmoji.value
}

const onShow = () => {
  show.value = true
}

defineExpose({ onShow })
</script>
<template>
  <div ref="inputEl" v-show="show">
    <div class="mb-2 flex gap-x-2 items-center">
      <el-input v-model="text" :placeholder="selected ? `回复 ${selected.authorName}` : '评论'" @focus="focused = true" @blur="focused = false"></el-input>
      <el-icon class="cursor-pointer" size="24" @click=tapEmoji><Emoji16Regular /></el-icon>
    </div>
    <div v-if="showEmoji" class="flex flex-wrap gap-x-0.5">
      <el-icon v-for="item in [...EMOJI, ...EMOJI, ...EMOJI, ...EMOJI]" class="cursor-pointer" size="24">
        <component :is="item.element" />
      </el-icon>
    </div>
  </div>
</template>