<template lang="pug">
  v-app#app
    v-card(height="60px" flat tile)
      v-app-bar(
        :color="toolbarColor"
        height="60px" prominent dense absolute dark
        elevate-on-scroll scroll-target=".main-content"
      )
        v-toolbar-title DynamoDB Local Console
    v-content.main-content.overflow-y-auto
      SideMenu(@setTableName="setTableName")
      Home(:tableName="tableName")
</template>

<script lang="ts">
import Vue from "vue"
import { AppVueData } from "@/types"
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import SideMenu from "@/components/sideMenu/SideMenu.vue"
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Home from "@/views/home/Home.vue"

export default Vue.extend({
  components: {
    SideMenu,
    Home
  },
  data(): AppVueData {
    return {
      toolbarColor: "#1867c0",
      tableName: ""
    }
  },
  methods: {
    setTableName(tableName: string): void {
      this.tableName = tableName
    }
  }
})
</script>

<style lang="scss">
body {
  margin: 0;

  // スクロールバー非表示
  ::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar {
    width: 0px;
  }

  // &::-webkit-scrollbar-track {
  //   background-color: $scrollbar-track-color;
  // }

  // &::-webkit-scrollbar-thumb {
  //   background: rgba($scrollbar-thumb-color, .6);
  //   border-radius: 8px;
  // }
}

#app {
  font-family: "Avenir", "Helvetica Neue", "Helvetica", "Arial", "Hiragino Sans",
    "ヒラギノ角ゴシック", YuGothic, "Yu Gothic", "メイリオ", Meiryo,
    "ＭＳ Ｐゴシック", "MS PGothic";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #303030;
}
</style>
