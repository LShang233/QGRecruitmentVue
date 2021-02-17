<style lang="scss">
.opt-btn {
  margin-right: 25px;
  border: transparent;
  border-radius: 5px;
  color: #fff;
  background-color: rgb(165, 123, 212);
  height: 30px;
  padding: 0 20px;
  transition: background-color 0.3s;
  cursor: pointer;
}
.opt-btn:hover {
  background-color: rgb(135, 68, 212);
}
</style>
<template>
  <input class="opt-btn" type="button" :value="value" />
</template>
<script>
export default {
  name: "Btn",
  props: ["value"],
};
</script>