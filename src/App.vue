<script setup lang="ts">
import Home from 'views/home/index.vue'
import useScrollEl from '@/hooks/use-scroll-el'
import useVisitorInfo from '@/hooks/use-visitor-info'
import { getVisitorInfo } from '@/apis/visitor/index.js'

const { setScroll } = useScrollEl()

const scrollbar = ref<any>(null)

watch(scrollbar, () => {
  if (scrollbar.value)
    setScroll(scrollbar.value.wrapRef)
})

const { setVisitor } = useVisitorInfo()
onMounted(async () => {
  const getInfoRes = await getVisitorInfo()
  setVisitor(getInfoRes.data)
})
</script>

<template>
  <div class="w-full h-[100vh] overflow-auto">
    <el-scrollbar ref="scrollbar" class="w-full h-full">
      <div class="min-h-[100vh]">
        <Home />
      </div>
    </el-scrollbar>
  </div>
</template>
