const visitorInfo = ref(null)

export default function () {
  function setVisitor(visitor: any) {
    visitorInfo.value = visitor
  }

  function getVisitor() {
    return visitorInfo.value
  }

  return { setVisitor, getVisitor }
}
