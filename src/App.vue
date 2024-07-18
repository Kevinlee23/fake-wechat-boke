<script setup lang="ts">
import Home from 'views/home/index.vue'
import type { Visitor } from './types/comment'
import useScrollEl from '@/hooks/use-scroll-el'
import useVisitorInfo from '@/hooks/use-visitor-info'
import { getVisitorInfo, updateNickname } from '@/apis/visitor/index.js'

const { setScroll } = useScrollEl()

const scrollbar = ref<any>(null)

watch(scrollbar, () => {
  if (scrollbar.value)
    setScroll(scrollbar.value.wrapRef)
})

const { setVisitor, getVisitor } = useVisitorInfo()
const visitorInfo = computed<Visitor | null>(() => {
  return getVisitor()
})

const showUpdate = ref(false)
const newName = ref('')
function handleTapUpdate() {
  newName.value = ''
  showUpdate.value = true
}
function handleUpdate() {
  updateNickname(newName.value).then(() => {
    setVisitor({ ...visitorInfo.value, nickname: newName.value })
    showUpdate.value = false
  })
}

onMounted(async () => {
  const res = await getVisitorInfo()
  setVisitor(res.data)
})
</script>

<template>
  <div class="relative w-full h-[100vh] overflow-auto">
    <el-scrollbar ref="scrollbar" class="w-full h-full">
      <div class="min-h-[100vh]">
        <Home />
      </div>
    </el-scrollbar>

    <div v-if="visitorInfo" class="visitor-nickname" @click="handleTapUpdate">
      {{ visitorInfo.nickname || visitorInfo.uuid.slice(0, 8) }}
    </div>

    <el-dialog v-model="showUpdate" width="400">
      <div class="w-[300px]">
        <el-input v-model="newName" placeholder="New Name" />
      </div>
      <div class="mt-2 text-right">
        <el-button type="primary" @click="handleUpdate">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.visitor-nickname {
  @apply absolute top-2 right-4 cursor-pointer hover:text-blue-400
}

@media (max-width: 991.9px) {
  .visitor-nickname {
    @apply hidden;
  }
}
</style>
