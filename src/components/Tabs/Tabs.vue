<style lang="scss" scoped>
.nav-tabs {
  border-bottom: none;
}

.opt-tabs {
  background-color: #fff;
  width: 120px;
  height: 40px;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  user-select: none;
}

.opt-tabs:hover {
  background-color: rgb(135, 68, 212);
  color: #fff;
}

.opt-active {
  background-color: rgb(165, 123, 212);
  color: #fff;
}
</style>
<template>
  <ul class="nav-tabs">
    <li class="opt-active opt-tabs">{{ title }}</li>
  </ul>
</template>
<script>
export default {
  name: "Tabs",
  props: ["title"],
};
</script>