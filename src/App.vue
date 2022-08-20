<template>
  <!--  <div>-->
  <!--    <h1>Vue 3 Project</h1>-->
  <!--    <ButtonComponent />-->
  <!--    <TableComponent />-->
  <!--    <JSXComponent />-->
  <!--  </div>-->
  <!-- <div class="main-layout-container" ref="contentRef">
    <router-view v-slot="{ Component }">
      <template v-if="Component && selectedKey">
        <keep-alive>
          <component :is="Component" :key="selectedKey" />
        </keep-alive>
      </template>
    </router-view>
  </div> -->
  <router-view />
</template>

<script lang="ts">
export default {
  name: 'App',
}
</script>

<script lang="ts" setup>
import ButtonComponent from '@vue3Base/ButtonComponent'
import TableComponent from '@vue3Base/TableComponent'
import JSXComponent from '@vue3Base/JSXComponent'
</script>

<style lang="less" scoped>
#app {
  height: 100vh;
  width: 100vw;
}
</style>
