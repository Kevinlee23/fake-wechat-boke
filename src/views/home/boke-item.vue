<script lang="ts" setup>
import { PropType } from 'vue';
import { Star, StarFilled, MoreFilled, Comment as IconComment } from '@element-plus/icons-vue'
import { format } from 'timeago.js'
import type { Blog } from 'types/blog/index.ts'
import type { Comment } from 'types/comment/index.ts';
import avatar from '@/assets/wallhaven-3l7vqy.jpg'

const props = defineProps({
  model: { type: Object as PropType<Blog>, required: true },
  allComment: { type: Array as PropType<Comment[]>, default: []}
})

const commentList = computed<Comment[]>(() => props.allComment.filter(item => item.bokeId === props.model.id))

</script>
<template>
  <div class="px-5 pt-5">
    <div class="flex">
      <el-image class="w-9 h-9 rounded-[8px]" :src="avatar" />
      <div class="flex-1 flex flex-col gap-y-1 ml-3">
        <div class="text-[#576b95]">麓下雪</div>
        <div>{{ model.content }}</div>
        <template v-if="model.imgSrcList?.length">
          <el-image class="w-[288px]" :src="model.imgSrcList[0]" :preview-src-list="model.imgSrcList" />
        </template>

        <div v-if="model.address" class="text-[12px] text-[#576b95]">{{ model.address }}</div>

        <div class="flex justify-between">
          <div class="text-[12px] text-[#9ca3af]">{{ format(model.createTime, 'zh_CN') }}</div>
          <el-dropdown class="boke-drop" trigger="click" placement="left" :teleported="false">
            <el-icon class="cursor-pointer"><MoreFilled /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon class="mr-1" :size="18"><StarFilled /></el-icon>
                  点赞
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-icon  class="mr-1" :size="18"><IconComment /></el-icon>
                  评论
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <div class="bg-[#f7f7f7] px-2 py-1">
          <div class="mb-3 flex items-center">
            <el-icon class="mr-1" :size="18"><Star /></el-icon>
            {{ model.likeNum }}位访客赞过
          </div>
          <div v-for="(item, index) in commentList" :key="item.id" class="flex" :class="{'mb-1': index !== commentList.length-1}">
            <div class="flex gap-x-1 text-[#576b95]">
              <span>{{ item.authorName }}</span>
              <template  v-if="item.parentId">
                <span>回复</span>
                <span>{{ item.parantName }}</span>
              </template>
              <span>:</span>
            </div>
            <div class="ml-2 cursor-pointer">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <el-divider class="boke-divider" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.boke-divider) {
  @apply my-[12px];
}

.boke-drop {
  :deep(.el-dropdown-menu) {
    @apply flex p-1;
  }
}
</style>