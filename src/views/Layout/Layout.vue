<template>
  <div id="layout">
    <Header />
    <div id="content">
      <RouterLi />
      <router-view id="router"></router-view>
    </div>
  </div>
</template>
<script>
import Header from "./Header/Header";
import RouterLi from "./RouterLi/RouterLi";
export default {
  name: "Layout",
  components: {
    RouterLi,
    Header,
  },
};
</script>
<style>
.hide {
  display: none !important;
}
#layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
#content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: calc(100% - 100px);
  width: 100%;
  overflow: auto;
}
#router {
  height: 88%;
  margin: 10px;
  flex: 14;
  height: calc(100% - 20px);
  /* overflow: auto; */
}
</style>