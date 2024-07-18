<script lang="ts" setup>
import type { PropType } from 'vue'
import { Comment as IconComment, MoreFilled, Star, StarFilled } from '@element-plus/icons-vue'
import { format } from 'timeago.js'
import { LayoutGrid } from 'lucide-vue-next'
import type { Blog } from 'types/blog/index.ts'
import type { Comment } from 'types/comment/index.ts'
import MusicPlayer from '@/components/music-player/index.vue'
import CommentInput from '@/components/comments/comment-input.vue'
import avatar from '@/assets/wallhaven-3l7vqy.jpg'
import useVisitorInfo from '@/hooks/use-visitor-info'
import { likeOperate } from '@/apis/visitor'

const props = defineProps({
  model: { type: Object as PropType<Blog>, required: true },
  comments: { type: Array as PropType<Comment[]>, default: () => [] },
})
const emit = defineEmits(['likeOperate'])

const { getVisitor, setVisitor } = useVisitorInfo()
const visitorInfo = computed<any>(() => {
  return getVisitor()
})
const likeState = computed(() => {
  if (visitorInfo.value)
    return visitorInfo.value.likes.find((item: string) => item === props.model._id) ? 1 : 0
  else return 0
})

const inputEl = ref<InstanceType<typeof CommentInput> | null>(null)

const selected = ref<Comment>()
function tapInput(item?: Comment) {
  if (item)
    selected.value = item
  else
    selected.value = undefined

  inputEl.value && inputEl.value.onShow()
}
function handleEvent(command: string) {
  if (command === 'comment')
    tapInput()
  else
    handleLike(props.model._id)
}

function handleLike(blogId: string) {
  const cal = likeState.value === 1 ? 'cancel' : 'add'
  likeOperate(blogId, cal).then(() => {
    let likes = []
    if (cal === 'add')
      likes = [...visitorInfo.value.likes, blogId]
    else
      likes = visitorInfo.value.likes.filter((id: string) => id !== blogId)

    setVisitor({ ...visitorInfo.value, likes })
    emit('likeOperate', cal === 'add' ? 1 : -1)
  })
}
</script>

<template>
  <div class="px-[20px] pt-[20px]">
    <div class="flex mb-[16px]">
      <el-image class="w-[36px] h-[36px] rounded-[8px]" :src="avatar" />
      <div class="flex-1 flex flex-col gap-y-1 ml-3">
        <div class="text-[#576b95]">
          麓下雪
        </div>
        <text-ellipsis :text="model.content" />

        <!-- IMAGE -->
        <template v-if="model.imageList?.length">
          <div class="relative w-fit">
            <el-image class="w-[288px]" :src="model.imageList[0]" :preview-src-list="model.imageList" />
            <div v-if="model.imageList.length > 1" class="absolute bottom-2 right-2 p-0.5 bg-white rounded-sm" title="多张图片">
              <LayoutGrid color="#000" :size="20" />
            </div>
          </div>
        </template>

        <!-- MUSIC -->
        <template v-if="model.musicList?.length">
          <MusicPlayer :play-list="model.musicList || []" />
        </template>

        <div v-if="model.address" class="text-3 text-[#576b95]">
          {{ model.address }}
        </div>

        <div class="flex justify-between">
          <div class="group/item">
            <div class="text-3 text-[#9ca3af] hidden group-hover/item:block">
              {{ model.createTime }}
            </div>
            <div class="text-3 text-[#9ca3af] group-hover/item:hidden">
              {{ format(model.createTime, 'zh_CN') }}
            </div>
          </div>
          <el-dropdown class="boke-drop" trigger="click" placement="left" :teleported="false" @command="handleEvent">
            <el-icon class="cursor-pointer">
              <MoreFilled />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon class="text-[18px] mr-1">
                    <StarFilled />
                  </el-icon>
                  {{ likeState === 0 ? '点赞' : '取消点赞' }}
                </el-dropdown-item>
                <el-dropdown-item command="comment">
                  <el-icon class="text-[18px] mr-1">
                    <IconComment />
                  </el-icon>
                  评论
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <div class="px-[8px]bg-[#f7f7f7]" :class="{ 'py-1': model.likeNum > 0 || comments.length > 0 }">
          <div v-if="model.likeNum" class="flex items-center" :class="{ 'mb-3': comments.length > 0 }">
            <el-icon class="text-[18px] mr-1">
              <Star />
            </el-icon>
            {{ model.likeNum }}位访客赞过
          </div>
          <div v-for="(item, index) in comments" :key="item._id" class="flex" :class="{ 'mb-1': index !== comments.length - 1 }">
            <div class="flex gap-x-1 text-[#576b95]">
              <span>{{ item.authorName }}</span>
              <template v-if="item.parentId">
                <span>回复</span>
                <span>{{ item.parantName }}</span>
              </template>
              <span>:</span>
            </div>
            <div class="ml-2 cursor-pointer" @click="tapInput(item)">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <CommentInput ref="inputEl" :selected="selected" />
    <el-divider class="boke-divider" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.boke-divider) {
  @apply my-3;
}

.boke-drop {
  :deep(.el-dropdown-menu) {
    @apply flex p-1;
  }
}
</style>
