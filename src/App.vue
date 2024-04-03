<script setup lang="ts">
import Home from '@/view/home/index.vue'

useMutationObserver(
  document.head,
  () => {
    const naiveStyles = Array.from(
      document.head.querySelectorAll("style[cssr-id]")
    );

    if (
      naiveStyles.find((style) =>
        style.nextElementSibling
          ? !style.nextElementSibling.hasAttribute("cssr-id")
          : false
      )
    ) {
      naiveStyles.forEach((style) => {
        document.head.appendChild(style);
      });
    }
  },
  {
    childList: true,
  }
);

</script>

<template>
  <div>
    <Home></Home>
  </div>
</template>