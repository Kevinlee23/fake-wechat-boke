import { reactive, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'

const WIDTH = 992
const initialState = reactive({
  isBrowser: true,
  device: 'desktop'
})

const { width } = useWindowSize()
watchEffect(() => {
  const device = width.value - 1 < WIDTH ? 'mobile' : 'desktop'
  // 视图变化了才切换，防止频繁操作
  if (device !== initialState.device) {
    initialState.device = device
    initialState.isBrowser = device === 'desktop' ? true : false
  }
})


// 设置 rem 函数
function setRem() {
  // 375 默认大小37.5px; 375px = 10rem ; 每个元素px基础上/37.5
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  // 得到html的Dom元素
  const htmlDom = document.getElementsByTagName('html')[0]

  // 设置根元素字体大小
  if (htmlWidth < 992) {
    htmlDom.style.fontSize = (htmlWidth / 10) + 'px'
  } else {
    htmlDom.style.fontSize = '37.5px'
  }
}

// 初始化, 监听是否是浏览器端打开
watch(
  () => initialState.isBrowser,
  () => {
    setRem()
  },
  { immediate: true }
)

// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
