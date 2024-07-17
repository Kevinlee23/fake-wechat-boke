<script setup lang="ts">
import Home from 'views/home/index.vue'
import useScrollEl from '@/hooks/use-scroll-el'

const { setScroll } = useScrollEl()

const scrollbar = ref<any>(null)

watch(scrollbar, () => {
  if (scrollbar.value)
    setScroll(scrollbar.value.wrapRef)
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
