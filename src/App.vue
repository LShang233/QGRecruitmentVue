<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  font-family: inherit;
  box-sizing: border-box;
}
html,body{
  height: 100%;
  width: 100%;
}
#app {
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgb(240, 237, 241);
  height: 100%;
  width: 100%;
}
a {
  text-decoration: none;
}
.pointer {
  cursor: pointer;
  text-align: center;
}
.hide {
  display: none;
}
.not-allowed {
  cursor: not-allowed;
}
li {
  list-style: none;
}
input,
textarea,
select {
  border: transparent;
  outline: none;
  padding-left: 5px;
}
</style>
