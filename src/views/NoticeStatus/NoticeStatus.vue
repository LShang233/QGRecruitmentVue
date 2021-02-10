<style lang="scss">
@import "./../../views/EnrollInfo/EnrollInfo";
.opt-select {
  height: 30px;
}
.change-status {
  padding: 32px;

  .noti-sec-main {
    padding: 0 32px;
    font-size: 14px;
    text-align: left;
    > div {
      margin: 4px;
      height: 30px;
      line-height: 30px;
    }
    label {
      display: inline-block;
      width: 64px;
    }
    span {
      text-align: center;
      display: inline-block;
      width: 128px;
      color: rgb(185, 123, 212);
    }
  }
}
</style>
<template>
  <div>
    <Tabs :title="'通知状态'" />
    <div class="tab-content">
      <div class="opt-header">
        <Select v-model="model.isRead" style="width: 125px; margin-right: 12px">
          <Option
            v-for="item in readList"
            default-label="0"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
        <Select v-model="model.type" style="width: 125px; margin-right: 12px">
          <Option
            v-for="item in turnList"
            default-label="0"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
        <Select
          v-model="model.isPassed"
          style="width: 125px; margin-right: 12px"
        >
          <Option
            v-for="item in passList"
            default-label="0"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
        <Select v-model="model.group" style="width: 125px; margin-right: 12px">
          <Option
            v-for="item in groupList"
            default-label="0"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
        <Btn :value="'筛选'" @click.native="findList()" />
      </div>
      <div class="opt-list">
        <Table ref="selection" :columns="columns" :data="appearList"></Table>
      </div>
      <Page :total="total" show-elevator class="page" @on-change="changePage" />
    </div>

    <section id="noti-sec" class="secti hide">
      <div class="noti-div-sec change-status">
        <div class="sec-de" @click="toggleSection()">
          <svg viewBox="0 0 16 13">
            <g transform="translate(1.000000, 0.000000)" fill="white">
              <path
                d="M10.164,11.063 C9.982,11.063 9.845,10.991 9.776,10.922 L8.009,9.157 L6.314,10.852 C6.248,10.918 6.095,10.998 5.891,10.998 C5.738,10.998 5.507,10.952 5.288,10.733 C5.067,10.513 5.018,10.295 5.017,10.153 C5.013,9.965 5.086,9.823 5.157,9.753 L6.881,8.028 L5.201,6.35 C5.049,6.197 4.922,5.723 5.321,5.325 C5.546,5.1 5.767,5.053 5.914,5.053 C6.097,5.053 6.234,5.125 6.301,5.194 L8.009,6.9 L9.705,5.204 C9.773,5.137 9.925,5.058 10.129,5.058 C10.283,5.058 10.514,5.104 10.733,5.324 C11.111,5.703 11.035,6.134 10.864,6.304 L9.138,8.03 L10.875,9.766 C10.942,9.834 11.021,9.986 11.021,10.19 C11.021,10.344 10.976,10.573 10.756,10.792 C10.531,11.016 10.311,11.063 10.164,11.063 L10.164,11.063 L10.164,11.063 Z"
              ></path>
            </g>
          </svg>
        </div>
        <div class="noti-sec-main">
          <div>
            <label>学号：</label>
            <span>{{ nowList.studentNum }}</span>
          </div>
          <div>
            <label>类型：</label>
            <span>{{ nowList.type }}</span>
          </div>
          <div>
            <label>状态：</label>
            <Select v-model="nowList.isRead" style="width: 128px; height: 30px">
              <Option
                v-for="item in readList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </div>
        </div>
        <button class="de-sub" @click="changeStatus">提交并保存</button>
      </div>
    </section>
  </div>
</template>
<script>
import Btn from "../../components/Btn/Btn";
import Tabs from "../../components/Tabs/Tabs";
export default {
  name: "NoticeStatus",
  components: {
    Tabs,
    Btn,
  },
  data() {
    return {
      model: {
        isRead: "0",
        type: "笔试",
        isPassed: "0",
        group: "0",
      },
      nowList: {
        studentNum: "",
        type: "",
        isRead: "0",
      },
      passList: [
        {
          label: "通过状态",
          value: "0",
        },
        {
          label: "通过",
          value: "是",
        },
        {
          label: "未通过",
          value: "否",
        },
      ],
      turnList: [
        {
          label: "笔试",
          value: "笔试",
        },
        {
          label: "一轮面试",
          value: "一轮面试",
        },
        {
          label: "二轮面试",
          value: "二轮面试",
        },
      ],
      groupList: [
        {
          label: "全部",
          value: "0",
        },
        {
          label: "前端组",
          value: "前端组",
        },
        {
          label: "后台组",
          value: "后台组",
        },
        {
          label: "移动组",
          value: "移动组",
        },
        {
          label: "数据挖掘组",
          value: "数据挖掘组",
        },
        {
          label: "设计组",
          value: "设计组",
        },
        {
          label: "嵌入式组",
          value: "嵌入式组",
        },
        {
          label: "图形组",
          value: "图形组",
        },
      ],
      readList: [
        {
          value: "0",
          label: "阅读状态",
        },
        {
          value: "已读",
          label: "已读",
        },
        {
          value: "未读",
          label: "未读",
        },
      ],
      columns: [
        {
          title: "姓名",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person",
                },
              }),
              h("strong", params.row.name),
            ]);
          },
        },
        {
          title: "性别",
          align: "center",
          key: "gender",
        },
        {
          title: "学号",
          align: "center",
          key: "studentNum",
        },
        {
          title: "类型",
          align: "center",
          key: "type",
        },
        {
          title: "组别",
          align: "center",
          key: "group",
        },
        {
          title: "是否通过",
          key: "isPassed",
        },
        {
          title: "通知内容",
          align: "center",
          key: "information",
        },
        {
          title: "通知状态",
          align: "center",
          key: "isRead",
        },
        {
          title: "QQ",
          align: "center",
          key: "qq",
        },
        {
          title: "操作",
          key: "action",
          width: 70,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.changeList(params.index);
                    },
                  },
                },
                "修改"
              ),
            ]);
          },
        },
      ], // table标题
      appearList: [], // 显示的内容
      msgList: [], // 获取的内容
      total: 0, // 数据条数
    };
  },
  methods: {
    //点击筛选
    findList() {
      //未完成 List的value是否对应相应数据格式要求
      //组别是全部，根据轮数获取列表
      if (this.model.group == "0") {
        this.getList(
          "/test/list",
          { status: this.model.type },
          this.model.isRead,
          this.model.isPassed,
          this.model.group,
          "0"
        );
      } else {
        //根据组别获取列表
        this.getList(
          "/test/groupby",
          { group: this.model.group },
          this.model.isRead,
          this.model.isPassed,
          "0",
          this.model.type
        );
      }
    },
    //根据键值对删除数组
    deleteList(isRead, isPassed, group, type) {
      //是否阅读
      if (isRead != "0")
        this.msgList = this.msgList.filter((value) => {
          return value.isRead == isRead ? true : false;
        });
      //是否通过
      if (isPassed != "0")
        this.msgList = this.msgList.filter((value) => {
          return value.isPassed == isPassed ? true : false;
        });
      //组别
      if (group != "0")
        this.msgList = this.msgList.filter((value) => {
          return value.group == group ? true : false;
        });
      //面试轮数
      if (type != "0")
        this.msgList = this.msgList.filter((value) => {
          return value.type == type ? true : false;
        });
      //添加显示，更新页码
      this.total = this.msgList.length;
      this.$Message.success(`筛选成功`);
      this.toPage(1);
    },
    //修改通知状态
    changeStatus() {
      //未完成
      console.log(this.nowList.isRead);
    },
    toggleSection() {
      document.getElementById("noti-sec").classList.toggle("hide");
    },
    //点击修改
    changeList(index) {
      console.log(index);
      this.nowList.studentNum = this.appearList[index].studentNum;
      this.nowList.type = this.appearList[index].type;
      this.toggleSection();
    },
    //获取数据
    getList(url, data, isRead, isPassed, group, type) {
      const lmsg = this.$Message.loading({
        content: `获取中...`,
        duration: 0,
      });
      let listPromise = new Promise((resolve) => {
        this.$.ajax({
          method: "POST",
          xhrFields: {
            withCredentials: true,
          },
          data: data,
          headers: {
            QGer: "I am a QGer",
          },
          url: this.domain + url,
          success: function (result) {
            setTimeout(lmsg, 0);
            resolve(result);
          },
          error: (xhr, status, thrown) => {
            setTimeout(lmsg, 0);
            this.$Message.error(`获取失败`);
          },
        });
      });
      listPromise.then((result) => {
        let obj = JSON.parse(result);
        this.msgList = JSON.parse(obj.data);
        this.total = this.msgList.length;
        this.$Message.success(`获取成功`);
        this.toPage(1);
        if (type != null) this.deleteList(isRead, isPassed, group, type);
      });
    },
    // 显示第n页
    toPage(n) {
      let one = 10;
      this.appearList = this.msgList.slice(one * (n - 1), one * n);
    },
    //点击分页
    changePage(index) {
      this.toPage(index);
    },
  },
  mounted() {
    this.addLiBorder(3);
    this.getList("/test/list", null, null, null, null, null);
  },
};
</script>