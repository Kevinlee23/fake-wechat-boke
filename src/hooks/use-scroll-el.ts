const scrollEl = ref<HTMLElement | null>(null)

export default function () {
  function setScroll(el: HTMLElement) {
    scrollEl.value = el
  }

  function getScroll() {
    return scrollEl.value
  }

  return { setScroll, getScroll, scrollEl }
}
