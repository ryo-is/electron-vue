<template lang="pug">
  v-app#app
    SideMenu
    v-content.main-content
      router-view
</template>

<script lang="ts">
import Vue from "vue"
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import SideMenu from "@/components/sideMenu/SideMenu.vue"

export default Vue.extend({
  components: {
    SideMenu
  }
})
</script>

<style lang="scss">
#app {
  font-family: "Avenir", "Helvetica Neue", "Helvetica", "Arial", "Hiragino Sans",
    "ヒラギノ角ゴシック", YuGothic, "Yu Gothic", "メイリオ", Meiryo,
    "ＭＳ Ｐゴシック", "MS PGothic";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #303030;

  .main-content {
    background-color: #ededed;
    padding-left: 256px;
  }
}
</style>
