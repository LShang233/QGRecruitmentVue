<template>
  <div id="header">
    <div id="header-sign">
      <img id="header-logo" src="./../../../assets/QG.png" />
      <h3>QG工作室招新平台</h3>
    </div>
    <div id="header-opt">
      <div><a href="#" @click="exit()">退出登录</a></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  methods: {
    exit() {
      localStorage.clear();
      window.location.href = "/login";
    },
  },
};
</script>
<style lang="scss" scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  width: 100%;
  background-color: #fff;

  #header-sign {
    padding-left: 30px;
    display: flex;
    justify-content: start;
    align-items: center;
    height: 60%;
    width: auto;
    user-select: none;
    img {
      height: 100%;
      margin-right: 16px;
    }
    h3 {
      font-size: 24px;
      font-weight: 500;
    }
  }
  #header-opt {
    padding-right: 30px;
    font-size: 16px;
    font-weight: 500;
    user-select: none;
    a {
      color: rgb(162, 125, 210);
      text-decoration: underline;
    }
  }
}
</style>