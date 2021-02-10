<style lang="scss">
@import "./../../views/EnrollInfo/EnrollInfo";
.opt-send-btn {
  position: absolute;
  right: -25px;
  height: 30px;
}
.opt-header {
  position: relative;
  min-width: 1000px;
}
.change-status {
  padding: 32px;

  .border {
    border: 1px solid #a57bd4;
    border-radius: 4px;
    overflow: hidden;
  }

  .score-num {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    width: 128px;
    text-align: center;
  }

  .noti-sec-main {
    padding: 0 32px;
    font-size: 14px;
    text-align: left;
    > div {
      margin: 4px;
      min-height: 30px;
      line-height: 30px;
      &:last-child {
        margin: 8px 4px;
      }
    }
    label {
      display: inline-block;
      width: 64px;
    }
    span {
      text-align: center;
      display: inline-block;
      width: 128px;
    }
  }
}
</style>
<template>
  <div>
    <Tabs :title="'考试结果'" />
    <div class="tab-content">
      <!-- 按钮 -->
      <div class="opt-header">
        <Searchinput
          :placeholder="'姓名、班级、学号或组别'"
          @toDad="searchList"
        />
        <Btn
          :value="'批量录入'"
          class="hide"
          @click.native="toggleSection(2)"
        />
        <Btn
          :value="'批量通过'"
          class="hide"
          @click.native="toggleSection(3)"
        />
        <Select
          v-model="selectList.type"
          style="width: 125px; margin-right: 12px"
        >
          <Option
            v-for="item in turnList"
            default-label="0"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
        <Select
          v-model="selectList.group"
          style="width: 125px; margin-right: 12px"
        >
          <Option
            v-for="item in groupList"
            default-label="0"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
        <Btn
          :value="'搜索'"
          @click.native="
            getList('test/list', null, selectList.group, selectList.type)
          "
        />
        <Btn
          :value="'发送通知'"
          class="opt-send-btn"
          @click.native="toggleSection(4)"
        />
      </div>
      <div class="opt-list">
        <Table ref="selection" :columns="columns" :data="studentList"></Table>
      </div>
      <Page :total="total" show-elevator class="page" @on-change="changePage" />
    </div>

    <section id="noti-sec" class="secti hide">
      <div class="noti-div-sec change-status">
        <div class="sec-de" @click="toggleSection(1)">
          <svg viewBox="0 0 16 13">
            <g transform="translate(1.000000, 0.000000)" fill="white">
              <path
                d="M10.164,11.063 C9.982,11.063 9.845,10.991 9.776,10.922 L8.009,9.157 L6.314,10.852 C6.248,10.918 6.095,10.998 5.891,10.998 C5.738,10.998 5.507,10.952 5.288,10.733 C5.067,10.513 5.018,10.295 5.017,10.153 C5.013,9.965 5.086,9.823 5.157,9.753 L6.881,8.028 L5.201,6.35 C5.049,6.197 4.922,5.723 5.321,5.325 C5.546,5.1 5.767,5.053 5.914,5.053 C6.097,5.053 6.234,5.125 6.301,5.194 L8.009,6.9 L9.705,5.204 C9.773,5.137 9.925,5.058 10.129,5.058 C10.283,5.058 10.514,5.104 10.733,5.324 C11.111,5.703 11.035,6.134 10.864,6.304 L9.138,8.03 L10.875,9.766 C10.942,9.834 11.021,9.986 11.021,10.19 C11.021,10.344 10.976,10.573 10.756,10.792 C10.531,11.016 10.311,11.063 10.164,11.063 L10.164,11.063 L10.164,11.063 Z"
              ></path>
            </g>
          </svg>
        </div>
        <div class="noti-sec-main" v-if="secIndex == 1">
          <div>
            <label>姓名：</label>
            <span>{{ nowList.name }}</span>
          </div>
          <div>
            <label>类型：</label>
            <span>{{ nowList.type }}</span>
          </div>
          <div>
            <label>成绩：</label>
            <input
              type="number"
              max="100"
              min="0"
              class="score-num border"
              v-model="nowList.score"
            />
          </div>
          <div>
            <label>状态：</label>
            <Select
              v-model="nowList.isPassed"
              style="width: 128px; height: 30px"
            >
              <Option
                v-for="item in passList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </div>
          <div>
            <label>评价：</label>
            <textarea
              cols="30"
              rows="3"
              class="border"
              v-model="nowList.evaluation"
            ></textarea>
          </div>
        </div>
        <div class="noti-sec-main" v-if="secIndex == 2">
          <div>
            <label>类型：</label>
            <span>{{ selectList.type }}</span>
          </div>
          <div>
            <label>成绩：</label>
            <input
              type="number"
              max="100"
              min="0"
              class="score-num border"
              v-model="nowList.score"
            />
          </div>
        </div>
        <div class="noti-sec-main" v-if="secIndex == 3">
          <div>
            <label>类型：</label>
            <span>{{ selectList.type }}</span>
          </div>
          <div>
            <label>状态：</label>
            <Select
              v-model="nowList.isPassed"
              style="width: 128px; height: 30px"
            >
              <Option
                v-for="item in passList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </div>
        </div>
        <div
          class="noti-sec-main"
          v-if="secIndex == 4"
          style="text-align: center"
        >
          <div>
            <textarea
              class="border"
              cols="40"
              rows="8"
              disabled="disabled"
              style="resize: none"
              >{{ appearNotice.content }}</textarea
            >
          </div>
          <div>
            <Select
              v-model="appearNotice.index"
              style="width: 195px; height: 30px; margin-bottom: 12px"
            >
              <Option
                v-for="(item, index) in noticeList"
                :value="index"
                :key="item.id"
                >{{ item.title }}</Option
              >
            </Select>
          </div>
          <div>
            <label>时间：</label>
            <input
              type="text"
              class="score-num border"
              placeholder="#time#"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='#time#'"
            />
          </div>
          <div>
            <label>地点：</label>
            <input
              type="text"
              class="score-num border"
              placeholder="#address#"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='#address#'"
            />
          </div>
        </div>
        <button class="de-sub" @click="changeStudent" v-if="secIndex == 1">
          提交并保存
        </button>
        <button class="de-sub" @click="addScore" v-if="secIndex == 2">
          提交并保存
        </button>
        <button class="de-sub" @click="addPass" v-if="secIndex == 3">
          提交并保存
        </button>
        <button class="de-sub" @click="addPass" v-if="secIndex == 4">
          提交并保存
        </button>
      </div>
    </section>
  </div>
</template>
<script>
import Btn from "../../components/Btn/Btn";
import Tabs from "../../components/Tabs/Tabs";
import Searchinput from "../../components/Searchinput/Searchinput";
export default {
  name: "TestResult",
  components: {
    Tabs,
    Searchinput,
    Btn,
  },
  data() {
    return {
      appearNotice: {
        index: "",
        title: "",
        id: "",
        content: "",
      },
      noticeList: [],
      secIndex: 3, // 1修改  2批量修改成绩  3批量通过  4发送通知
      nowList: {
        studentNum: "",
        type: "",
        score: "",
        isPassed: "",
        evaluation: "",
      }, //当前的那个人
      nowIndex: "", //当前的下标
      selectList: {
        type: "笔试",
        group: "0",
      },
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
      passList: [
        {
          label: "通过",
          value: "是",
        },
        {
          label: "未通过",
          value: "否",
        },
      ],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          align: "center",
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
          align: "center",
          title: "学号",
          key: "studentNum",
        },
        {
          align: "center",
          title: "组别",
          key: "group",
        },
        {
          align: "center",
          title: "评价",
          key: "evaluation",
        },
        {
          align: "center",
          title: "考试轮次",
          key: "type",
        },
        {
          align: "center",
          title: "成绩",
          key: "score",
        },
        {
          align: "center",
          title: "是否通过",
          key: "isPassed",
        },
        {
          title: "操作",
          key: "action",
          width: 150,
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
                      this.changeTest(params.index);
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
                      this.removeStudent(params.index);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      studentList: [], // 获取数组
      appearList: [], // 显示数组
      total: 0, // 数据条数
      nowPage: 1,
    };
  },
  methods: {
    //获取notice列表
    getNoticeList() {
      let listPromise = new Promise((resolve) => {
        this.$.ajax({
          method: "POST",
          xhrFields: {
            withCredentials: true,
          },
          headers: {
            QGer: "I am a QGer",
          },
          url: this.domain + "model/list",
          success: function (result) {
            let obj = JSON.parse(result);
            if (obj.status == true) resolve(obj.data);
            else console.log(obj.message);
          },
          error: (xhr, status, thrown) => {
            console.log(thrown);
          },
        });
      });
      listPromise.then((result) => {
        this.noticeList = JSON.parse(result);
      });
    },
    //批量录入
    addScore() {
      if (this.getSelected())
        this.addManyAjax("test/batchUpdateScore", {
          studentNumSerial: this.getSelected(),
          typeId: this.getTypeId(this.selectList.type),
          score: this.nowList.score,
        });
      else this.$Message.error("请选择学生");
    },
    //批量通过
    addPass() {
      if (this.getSelected())
        this.addManyAjax("test/batchUpdatePs", {
          studentNumSerial: this.getSelected(),
          typeId: this.getTypeId(this.selectList.type),
          isPassed: this.nowList.isPassed,
        });
      else this.$Message.error("请选择学生");
    },
    //批量的ajax
    addManyAjax(url, data) {
      this.toggleSection(2);
      const lmsg = this.$Message.loading({
        content: `修改中...`,
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
            let obj = JSON.parse(result);
            if (obj.status == true) resolve(obj.data);
            else this.$Message.error(obj.message);
          },
          error: (xhr, status, thrown) => {
            setTimeout(lmsg, 0);
            this.$Message.error(`修改失败`);
          },
        });
      });
      listPromise.then((result) => {
        this.$Message.success(`修改成功`);
        this.getList(
          "test/list",
          null,
          this.selectList.group,
          this.selectList.type
        );
      });
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
    //修改信息 数据未重新获取
    changeStudent() {
      this.toggleSection(1);
      const lmsg = this.$Message.loading({
        content: `修改中...`,
        duration: 0,
      });
      let listPromise = new Promise((resolve) => {
        this.$.ajax({
          method: "POST",
          xhrFields: {
            withCredentials: true,
          },
          data: {
            studentNum: this.nowList.studentNum,
            typeId: this.getTypeId(this.nowList.type),
            score: this.nowList.score,
            isPassed: this.nowList.isPassed,
            evaluation: this.nowList.evaluation,
          },
          headers: {
            QGer: "I am a QGer",
          },
          url: this.domain + "test/update",
          success: function (result) {
            setTimeout(lmsg, 0);
            let obj = JSON.parse(result);
            if (obj.status == true) resolve(obj.data);
            else this.$Message.error(obj.message);
          },
          error: (xhr, status, thrown) => {
            setTimeout(lmsg, 0);
            this.$Message.error(`修改失败`);
          },
        });
      });
      listPromise.then((result) => {
        //更新列表
        let list = this.appearList[this.nowIndex];
        list.score = this.nowList.score;
        list.isPassed = this.nowList.isPassed;
        list.evaluation = this.nowList.evaluation;
        this.$Message.success(`修改成功`);
      });
    },
    //打开关闭section
    toggleSection(num) {
      this.secIndex = num;
      document.getElementById("noti-sec").classList.toggle("hide");
    },
    //点击修改
    changeTest(index) {
      console.log(index);
      console.log(this.appearList);
      let list = this.appearList[index];
      console.log(list);
      this.nowIndex = index;
      this.nowList.name = list.name;
      this.nowList.studentNum = list.studentNum;
      this.nowList.type = list.type;
      this.nowList.score = list.score;
      this.nowList.isPassed = list.isPassed;
      this.nowList.evaluation = list.evaluation;
      //section模式1
      this.toggleSection(1);
    },
    // 获取轮次id
    getTypeId(str) {
      if (str == "一轮面试") return 2;
      if (str == "二轮面试") return 3;
      if (str == "笔试") return 1;
    },
    //删除结果  未重新获取列表
    removeStudent(index) {
      if (confirm("是否确认删除？")) {
        let number = this.appearList[index].studentNum;
        let turn = this.appearList[index].type;
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
            url: this.domain + "test/remove",
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
          this.studentList = this.studentList.filter((value) => {
            return value.type != turn ? true : false;
          });
          //更新数据
          this.total = this.studentList.length;
          this.$Message.success(`删除成功`);
          this.toPage(1);
        });
      }
    },
    //搜索框
    searchList(data) {
      this.getList("test/groupby", { group: data }, null, null);
      //隐藏按钮
      let btn = document
        .querySelector(".opt-header")
        .getElementsByTagName("input");
      btn[2].classList.add("hide");
      btn[3].classList.add("hide");
    },
    //根据键值对删除数组
    deleteList(group, type) {
      //组别
      if (group != "0")
        this.studentList = this.studentList.filter((value) => {
          return value.group == group ? true : false;
        });
      //面试轮数
      if (type != "0")
        this.studentList = this.studentList.filter((value) => {
          return value.type == type ? true : false;
        });
      //添加显示，更新页码
      this.total = this.studentList.length;
      this.$Message.success(`筛选成功`);
      this.toPage(1);
      //显示按钮
      let btn = document
        .querySelector(".opt-header")
        .getElementsByTagName("input");
      btn[2].classList.remove("hide");
      btn[3].classList.remove("hide");
    },
    //获取列表
    getList(url, data, group, type) {
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
            let obj = JSON.parse(result);
            if (obj.status == true) resolve(obj.data);
            else this.$Message.error(obj.message);
          },
          error: (xhr, status, thrown) => {
            setTimeout(lmsg, 0);
            this.$Message.error(`获取失败`);
          },
        });
      });
      listPromise.then((result) => {
        let obj = JSON.parse(result);
        this.studentList = obj;
        this.total = this.studentList.length;
        this.$Message.success(`获取成功`);
        this.toPage(1);
        if (group != null) this.deleteList(group, type);
      });
    },
    // 显示第n页
    toPage(n) {
      let one = 10;
      this.nowPage = n;
      this.appearList = this.studentList.slice(one * (n - 1), one * n);
    },
    //点击分页
    changePage(index) {
      this.toPage(index);
    },
  },
  mounted() {
    this.addLiBorder(2);
    this.getList("test/list", null, null, null);
    this.getNoticeList();
  },
  computed: {
    newScore() {
      return this.nowList.score;
    },
    noticeContent() {
      return this.appearNotice.index;
    },
  },
  watch: {
    newScore(val) {
      if (val < 0) {
        this.$Message.error("成绩为1~100的整数");
        this.nowList.score = 0;
      } else if (val > 100) {
        this.$Message.error("成绩为1~100的整数");
        this.nowList.score = 100;
      }
    },
    noticeContent(val) {
      this.appearNotice.content = this.noticeList[val].content;
      this.appearNotice.id = this.noticeList[val].id;
    },
  },
};
</script>