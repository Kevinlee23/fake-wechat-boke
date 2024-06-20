<script lang="ts" setup>
import Cplayer from 'cplayer'
import { IAudioItem } from 'cplayer/lib/interfaces';

const props = defineProps({
  playList: { type: Array<IAudioItem>, required: true }
})
const playerEl = ref()

let player: Cplayer
onMounted(() => {
  player = new Cplayer({
    element: playerEl.value,
    playlist: props.playList
  })
})
</script>

<template>
  <div ref="playerEl"></div>
</template>