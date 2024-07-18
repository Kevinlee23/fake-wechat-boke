import type { Visitor } from '@/types/comment'

const visitorInfo = ref<Visitor | null>(null)

export default function () {
  function setVisitor(visitor: any) {
    visitorInfo.value = visitor
  }

  function getVisitor(): Visitor | null {
    return visitorInfo.value
  }

  return { setVisitor, getVisitor }
}
