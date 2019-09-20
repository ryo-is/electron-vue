<template lang="pug">
  v-app#app
    v-content.main-content
      router-view
</template>

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
  }
}
</style>
