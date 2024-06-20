<script lang="ts" setup>
import { PropType } from 'vue';
import { Star, StarFilled, MoreFilled, Comment as IconComment } from '@element-plus/icons-vue'
import { format } from 'timeago.js'
import MusicPlayer from '@/components/music-player/index.vue'
import CommentInput from '@/components/comments/comment-input.vue'
import avatar from '@/assets/wallhaven-3l7vqy.jpg'
import type { Blog } from 'types/blog/index.ts'
import type { Comment } from 'types/comment/index.ts';

const props = defineProps({
  model: { type: Object as PropType<Blog>, required: true },
  allComment: { type: Array as PropType<Comment[]>, default: []}
})

const inputEl = ref<InstanceType<typeof CommentInput> | null>(null)
// FIXME: 从接口中获取
const commentList = computed<Comment[]>(() => props.allComment.filter(item => item.blogId === props.model._id))
const musicList = computed(() => {
  return props.model.musicList && props.model.musicList.map(item => {
    // FIXME: 暂时静态文件, 后续替换成 oss 地址
    item.src = new URL(`../../assets/${item.src}`, import.meta.url).href
    item.poster = new URL(`../../assets/${item.poster}`, import.meta.url).href

    return item
  })
})

const selected = ref<Comment>()
const tapInput = (item?: Comment) => {
  if (item) {
    selected.value = item
  } else {
    selected.value = undefined
  }

  inputEl.value && inputEl.value.onShow()
}
const handleEvent = (command: string) => {
  if (command === 'comment') {
    tapInput()
  }
}
</script>
<template>
  <div class="px-[20px] pt-[20px]">
    <div class="flex mb-[16px]">
      <el-image class="w-[36px] h-[36px] rounded-[8px]" :src="avatar" />
      <div class="flex-1 flex flex-col gap-y-[4px] ml-[12px]">
        <div class="text-[#576b95]">麓下雪</div>
        <text-ellipsis :text="model.content"></text-ellipsis>

        <!-- IMAGE -->
        <template v-if="model.imageList?.length">
          <el-image class="w-[288px]" :src="model.imageList[0]" :preview-src-list="model.imageList" />
        </template>

        <!-- MUSIC -->
        <template v-if="model.musicList?.length">
          <music-player :playList="musicList || []"></music-player>
        </template>

        <div v-if="model.address" class="text-[12px] text-[#576b95]">{{ model.address }}</div>

        <div class="flex justify-between">
          <div class="group/item">
            <div class="text-[12px] text-[#9ca3af] hidden group-hover/item:block">{{ model.createTime }}</div>
            <div class="text-[12px] text-[#9ca3af] group-hover/item:hidden">{{ format(model.createTime, 'zh_CN') }}</div>
          </div>
          <el-dropdown class="boke-drop" trigger="click" placement="left" :teleported="false" @command="handleEvent">
            <el-icon class="cursor-pointer"><MoreFilled /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon class="text-[18px] mr-[4px]"><StarFilled /></el-icon>
                  点赞
                </el-dropdown-item>
                <el-dropdown-item command="comment">
                  <el-icon  class="text-[18px] mr-[4px]"><IconComment /></el-icon>
                  评论
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <div class="bg-[#f7f7f7] px-[8px]" :class="{'py-[4px]': model.likeNum > 0 || commentList.length > 0}">
          <div v-if="model.likeNum" class="mb-[12px] flex items-center">
            <el-icon class="text-[18px] mr-[4px]"><Star /></el-icon>
            {{ model.likeNum }}位访客赞过
          </div>
          <div v-for="(item, index) in commentList" :key="item._id" class="flex" :class="{'mb-[4px]': index !== commentList.length-1}">
            <div class="flex gap-x-[4px] text-[#576b95]">
              <span>{{ item.authorName }}</span>
              <template  v-if="item.parentId">
                <span>回复</span>
                <span>{{ item.parantName }}</span>
              </template>
              <span>:</span>
            </div>
            <div class="ml-[8px] cursor-pointer" @click="tapInput(item)">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <comment-input ref="inputEl" :selected="selected"></comment-input>
    <el-divider class="boke-divider" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.boke-divider) {
  @apply my-[12px];
}

.boke-drop {
  :deep(.el-dropdown-menu) {
    @apply flex p-[4px];
  }
}
</style>