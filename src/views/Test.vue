<template>
  <div>{{ route.fullPath.slice(1) }}</div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import useAsyncRouterView from '@vue3Base/useAsyncRouterView'

const route = useRoute()
useAsyncRouterView(async tab => {
  tab.label = `${route.fullPath.slice(1)}`
})
</script>

<style scoped></style>
