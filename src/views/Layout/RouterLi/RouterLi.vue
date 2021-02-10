<template>
  <div id="side-nav">
    <ul>
      <li class="side-tabs">
        <router-link to="/Statistic">数据统计</router-link>
      </li>
      <li class="side-tabs">
        <router-link to="/EnrollInfo">报名信息</router-link>
      </li>
      <li class="side-tabs">
        <router-link to="/TestResult">考试结果</router-link>
      </li>
      <li class="side-tabs">
        <router-link to="/NoticeStatus">通知状态</router-link>
      </li>
      <li class="side-tabs">
        <router-link to="/Notitemplate">通知模板</router-link>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
#side-nav {
  flex: 2;
  margin: 10px 0;
  background-color: #fff;
  border-radius: 10px;
  ul {
    min-width: 160px;
    padding: 0;
    margin: 10px 0;

    .side-tabs {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      list-style: none;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      border-radius: 10px 0 0 10px;
      user-select: none;

      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        color: black;
      }

      &:hover {
        background-color: #ccc;
      }
    }
  }
}
/* impor */
.side-active {
  border-right: 5px rgb(162, 125, 210) solid;
}
</style>