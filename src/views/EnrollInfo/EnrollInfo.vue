<style lang="scss">
@import "EnrollInfo";
.nav-tabs {
  display: flex;
  border-bottom: none;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
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
  <div>
    <ul class="nav-tabs" v-show="htmlId == 1">
      <li class="opt-active opt-tabs">报名信息</li>
    </ul>
    <ul class="nav-tabs" v-show="htmlId != 1">
      <li class="opt-tabs" @click="showHtml(1)">报名信息</li>
      <li class="opt-active opt-tabs" v-show="htmlId == 2">新增 +</li>
      <li class="opt-active opt-tabs" v-show="htmlId == 3">修改信息</li>
      <li class="opt-active opt-tabs" v-show="htmlId == 4">详细信息</li>
    </ul>
    <div class="tab-content" v-show="htmlId == 1">
      <div class="opt-header">
        <Searchinput
          :placeholder="'搜索姓名、班级或学号'"
          @toDad="searchList"
        />
        <Btn :value="'导出'" @click.native="outputStu" />
        <Btn :value="'新增+'" @click.native="showHtml(2)"/>
        <Select v-model="groupSelect" style="width: 125px; margin-right: 12px">
          <Option
            v-for="item in groupList"
            default-label="0"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
      <div class="opt-list">
        <Table ref="selection" :columns="columns" :data="msgList"></Table>
      </div>
      <Page :total="total" show-elevator class="page" @on-change="changePage" />
    </div>
    <div class="tab-content" v-show="htmlId == 2">
      <div class="opt-list">
        <Table ref="selection" :columns="columns" :data="msgList"></Table>
      </div>
      <Page :total="total" show-elevator class="page" @on-change="changePage" />
    </div>
  </div>
</template>
<script>
import Btn from "../../components/Btn/Btn";
import Searchinput from "../../components/Searchinput/Searchinput";
export default {
  name: "EnrollInfo",
  components: {
    Searchinput,
    Btn,
  },
  data() {
    return {
      groupSelect: "0",
      htmlId: 2, // 1列表 2新增 3修改 4详细
      groupList: [
        {
          label: "全部",
          value: "0",
        },
        {
          label: "前端组",
          value: "前端",
        },
        {
          label: "后台组",
          value: "后台",
        },
        {
          label: "移动组",
          value: "移动",
        },
        {
          label: "数据挖掘组",
          value: "数据挖掘",
        },
        {
          label: "设计组",
          value: "设计",
        },
        {
          label: "嵌入式组",
          value: "嵌入式",
        },
        {
          label: "图形组",
          value: "图形",
        },
      ],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
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
          title: "班级",
          key: "majorClass",
        },
        {
          title: "学号",
          key: "studentNum",
        },
        {
          title: "组别",
          key: "group",
        },
        {
          title: "电话",
          key: "phoneNum",
        },
        {
          title: "QQ",
          key: "qq",
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    },
                  },
                },
                "详细"
              ),
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
                      this.remove(params.index);
                    },
                  },
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.removeStu(params.index);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      appearList: [], // 显示的内容
      msgList: [], // 获取的内容
      total: 0, // 数据条数
    };
  },
  methods: {
    //切换
    showHtml(num) {
      this.htmlId = num;
    },
    //删除结果  未重新获取列表 未测试
    removeStu(index) {
      if (confirm("是否确认删除？")) {
        let number = this.appearList[index].studentNum;
        const lmsg = this.$Message.loading({
          content: `删除中...`,
          duration: 0,
        });
        let listPromise = new Promise((resolve) => {
          this.$.ajax({
            method: "POST",
            xhrFields: {
              withCredentials: true,
            },
            data: {
              studentNum: number,
              typeId: this.getTypeId(turn),
            },
            headers: {
              QGer: "I am a QGer",
            },
            url: this.domain + "stu/remove",
            success: function (result) {
              setTimeout(lmsg, 0);
              let obj = JSON.parse(result);
              if (obj.status == true) resolve(obj.data);
              else this.$Message.error(obj.message);
            },
            error: (xhr, status, thrown) => {
              setTimeout(lmsg, 0);
              this.$Message.error(`删除失败`);
            },
          });
        });
        listPromise.then((result) => {
          //过滤列表
          this.studentList = this.studentList.filter((value) => {
            return value.studentNum != number ? true : false;
          });
          //更新数据
          this.total = this.studentList.length;
          this.$Message.success(`删除成功`);
          this.toPage(1);
        });
      }
    },
    //获取多选框学号信息
    getSelected() {
      let selectedList = this.$refs.selection.getSelection();
      let str = "";
      for (let i in selectedList) {
        str += selectedList[i].studentNum + "-";
      }
      return str.substring(0, str.length - 1);
    },
    //批量导出学生
    outputStu() {
      let str = this.getSelected();
      if (str) {
        window.open(this.domain + "stu/export?studentNumSerial=" + str);
      } else {
        this.$Message.error("请选择需要导出的学生");
      }
    },
    //搜索框
    searchList(data) {
      this.getList("stu/condition", { condition: data });
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
    //获取列表
    getList(url, data) {
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
          data: data /* {
            condition: str
          } */,
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
      });
    },
  },
  created() {
    this.addLiBorder(1);
    this.getList("stu/list", null);
  },
  watch: {
    groupSelect(val) {
      // 点击原本的不会搜索，改变搜索
      if (val == "0") this.getList("stu/list", null);
      else this.getList("stu/condition", { condition: val });
    },
  },
};
</script>