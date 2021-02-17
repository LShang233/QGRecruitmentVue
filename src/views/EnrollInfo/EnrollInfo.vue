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

.no-border {
  input,
  textarea,
  div {
    border: none !important;
    &:hover {
      border: none !important;
    }
    &:focus {
      border: none !important;
      box-shadow: none !important;
    }
  }
}

.cannot-use {
  input,
  textarea,
  div {
    pointer-events: none;
  }
  .base-input {
    input {
      color: black;
    }
  }
}

//新增
.tab-content {
  > p {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
    color: black;
  }

  > input {
    display: block;
    text-align: center;
    margin: 12px auto;
  }

  .opt-form {
    width: 70%;
    margin: 0 auto;
    align-self: flex-start;
    padding: 0;
    font-size: 14px;

    //input边框
    > div {
      > div {
        input,
        textarea {
          border: 1px solid #dcdee2;
          transition: all 0.2s ease-in-out;
          border-radius: 4px;
          &:hover {
            border: 1px rgb(165, 123, 212) solid;
          }
          &:focus {
            border: 1px rgb(165, 123, 212) solid;
            box-shadow: 0 0 0 2px rgba(165, 123, 212, 0.2);
          }
        }
      }
    }

    .base-input,
    .middle-input {
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      > div {
        display: flex;
        justify-content: space-between;

        label {
          width: 25%;
          min-width: 40px;
          display: inline-block;
        }

        input,
        > div {
          width: 70%;
          min-width: 115px;
          margin: 0;
          height: 100%;
          outline: none;
          resize: none;
        }
      }
    }

    .base-input {
      > div {
        margin: 5px 10px;
        flex: 0 0 30%;
      }
    }

    .middle-input {
      > div {
        margin: 5px 10px;
        flex: 0 0 calc(100% - 30px);
      }
    }

    .bottom-input {
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      > div {
        display: flex;
        flex-direction: column;
        margin: 5px 10px;
        flex: 0 0 calc(100% - 30px);

        &:first-child,
        &:nth-child(2) {
          flex: 0 0 calc(50% - 25px);
        }

        label {
          width: 100%;
        }

        input,
        > div {
          width: 100%;
        }
      }
    }
  }
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
        <Btn :value="'新增+'" @click.native="showHtml(2)" />
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
    <div class="tab-content" v-show="htmlId != 1">
      <p>个人信息</p>
      <div class="opt-form" v-bind:class="{ 'cannot-use': htmlId == 4 }">
        <div class="base-input">
          <div>
            <label>姓名：</label>
            <input
              type="text"
              v-model="student.name"
              placeholder="请输入汉字姓名"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入汉字姓名'"
              @blur="checkMaxLength(student.name, 15)"
            />
          </div>
          <div>
            <label>年龄：</label>
            <input
              v-model="student.age"
              type="number"
              max="25"
              min="15"
              placeholder="15-25"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='15-25'"
              @blur="checkRange(student.age, 15, 25)"
            />
          </div>
          <div>
            <label>C实验成绩：</label>
            <input
              v-model="student.cexperiment"
              type="number"
              max="100"
              min="0"
              placeholder="0-100"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='0-100'"
              @blur="checkRange(student.cexperiment, 1, 100)"
            />
          </div>
          <div>
            <label>性别：</label>
            <Select v-model="student.gender">
              <Option
                v-for="item in genderList"
                default-label="0"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </div>
          <div>
            <label>宿舍：</label>
            <input
              v-model="student.dormitory"
              type="text"
              placeholder="如：西三110"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='如：西三110'"
              @blur="checkMaxLength(student.dormitory, 9)"
            />
          </div>
          <div>
            <label>英语(1)成绩：</label>
            <input
              v-model="student.english"
              type="number"
              max="100"
              min="0"
              placeholder="0-100"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='0-100'"
              @blur="checkRange(student.cexperiment, 1, 100)"
            />
          </div>
          <div>
            <label>组别：</label>
            <Select v-model="student.groupId">
              <Option
                v-for="item in groupIdList"
                default-label="0"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </div>
          <div>
            <label>上学期期末排名：</label>
            <input
              v-model="student.classRank"
              type="number"
              placeholder="未知请输入0"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='未知请输入0'"
            />
          </div>
          <div>
            <label>大一上绩点：</label>
            <input
              v-model="student.gradePoint"
              type="number"
              max="5.0"
              min="0"
              placeholder="0-5.0"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='0-5.0'"
              @blur="checkRange(student.gradePoint, 0, 5.0)"
            />
          </div>
          <div>
            <label>年级：</label>
            <Select v-model="student.grade">
              <Option
                v-for="item in gradeList"
                default-label="0"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </div>
          <div>
            <label>班级职务：</label>
            <input
              v-model="student.duty"
              type="text"
              placeholder="请输入班级职务"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入班级职务'"
            />
          </div>
          <div>
            <label>邮箱：</label>
            <input
              v-model="student.email"
              type="email"
              placeholder="请输入电子邮箱"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入电子邮箱'"
              @blur="checkEmail(student.email)"
            />
          </div>
          <div>
            <label>专业班级：</label>
            <input
              v-model="student.majorClass"
              type="text"
              placeholder="完整专业+x班"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='完整专业+x班'"
              @blur="checkMaxLength(student.majorClass, 20)"
            />
          </div>
          <div>
            <label>是否挂科：</label>
            <Select v-model="student.isFailed">
              <Option
                v-for="item in isFailed"
                default-label="0"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </div>
          <div>
            <label>手机：</label>
            <input
              v-model="student.phoneNum"
              type="text"
              placeholder="请输入11位手机号"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入11位手机号'"
              @blur="checkLength(student.phoneNum, 11)"
            />
          </div>
          <div>
            <label>学号：</label>
            <input
              v-model="student.studentNum"
              type="text"
              placeholder="请输入10位学号"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入10位学号'"
              @blur="checkLength(student.studentNum, 10)"
            />
          </div>
          <div>
            <label>C理论成绩：</label>
            <input
              v-model="student.ctheory"
              type="number"
              max="100"
              min="0"
              placeholder="0-100"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='0-100'"
              @blur="checkRange(student.cexperiment, 1, 100)"
            />
          </div>
          <div>
            <label>QQ：</label>
            <input
              v-model="student.qq"
              type="text"
              placeholder="请输入QQ号"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入QQ号'"
            />
          </div>
        </div>
        <div class="middle-input">
          <div>
            <label>参加其他学生科技社团普通社团情况说明：</label>
            <input
              v-model="student.explanation"
              type="text"
              placeholder="请输入"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入'"
              @blur="checkMaxLength(student.explanation, 30)"
            />
          </div>
          <div>
            <label>是否组队报名，填写同组同学姓名(限3人)：</label>
            <input
              v-model="student.isTeam"
              type="text"
              placeholder="请输入"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入'"
              @blur="checkMaxLength(student.isTeam, 34)"
            />
          </div>
        </div>
        <div class="bottom-input">
          <div>
            <label>爱好：</label>
            <textarea
              cols="40"
              rows="10"
              v-model="student.hobby"
              @blur="checkMaxLength(student.hobby, 50)"
            ></textarea>
          </div>
          <div>
            <label>座右铭：</label>
            <textarea
              cols="40"
              rows="10"
              v-model="student.motto"
              @blur="checkMaxLength(student.motto, 28)"
            ></textarea>
          </div>
          <div>
            <label
              >奖惩情况和实践经历(社会实践或者计算机相关技术学习掌握情况)</label
            >
            <textarea
              cols="40"
              rows="10"
              v-model="student.experience"
              @blur="checkMaxLength(student.experience, 170)"
            ></textarea>
          </div>
          <div>
            <label>自我评价</label>
            <textarea
              cols="40"
              rows="10"
              v-model="student.selfEvaluation"
              @blur="checkMaxLength(student.selfEvaluation, 230)"
            ></textarea>
          </div>
          <div>
            <label
              >简述能体现你四个方面的一件事(1)善于协作(2)刻苦努力(3)甘于奉献(4)持之以恒</label
            >
            <textarea
              cols="40"
              rows="10"
              v-model="student.exampleThing"
              @blur="checkMaxLength(student.exampleThing, 290)"
            ></textarea>
          </div>
          <div>
            <label>请说一下大学四年的个人规划以及为什么希望加入QG工作室</label>
            <textarea
              cols="40"
              rows="10"
              v-model="student.reasonForQg"
              @blur="checkMaxLength(student.reasonForQg, 580)"
            ></textarea>
          </div>
        </div>
      </div>
      <Btn
        :value="'提  交'"
        @click.native="addNewStudent('stu/save')"
        v-show="htmlId == 2"
      />
      <Btn
        :value="'提  交'"
        @click.native="addNewStudent('stu/update')"
        v-show="htmlId == 3"
      />
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
      student: {
        gender: "男",
        age: "",
        dormitory: "",
        classRank: "",
        grade: 1,
        majorClass: "",
        duty: "",
        isFailed: "否",
        ctheory: "",
        cexperiment: "",
        english: "",
        gradePoint: "",
        explanation: "",
        email: "",
        studentNum: "",
        phoneNum: "",
        qq: "",
        hobby: "",
        motto: "",
        isTeam: "",
        experience: "",
        selfEvaluation: "",
        exampleThing: "",
        reasonForQg: "",
        groupId: 1,
        name: "",
        academy: "",
      },
      groupSelect: "0",
      htmlId: 1, // 1列表 2新增 3修改 4详细
      genderList: [
        {
          label: "男",
          value: "男",
        },
        {
          label: "女",
          value: "女",
        },
      ],
      isFailed: [
        {
          label: "是",
          value: "是",
        },
        {
          label: "否",
          value: "否",
        },
      ],
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
      gradeList: [
        {
          label: "大一",
          value: 1,
        },
        {
          label: "大二",
          value: 2,
        },
        {
          label: "大三",
          value: 3,
        },
      ],
      groupIdList: [
        {
          label: "前端组",
          value: 1,
        },
        {
          label: "后台组",
          value: 2,
        },
        {
          label: "移动组",
          value: 7,
        },
        {
          label: "数据挖掘组",
          value: 4,
        },
        {
          label: "设计组",
          value: 5,
        },
        {
          label: "嵌入式组",
          value: 3,
        },
        {
          label: "图形组",
          value: 6,
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
                      this.showDetail(params.index, 4);
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
                      this.showDetail(params.index, 3);
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
      lockAdd: true,
    };
  },
  methods: {
    //表单验证
    checkAll() {
      let isOk = true;
      if (!this.checkMaxLength(this.student.name, 15)) {
        isOk = false;
        this.$Message.error("请重新检查姓名");
      }
      if (!this.checkRange(this.student.age, 15, 25)) {
        isOk = false;
        this.$Message.error("请重新检查年龄");
      }
      if (!this.checkRange(this.student.cexperiment, 1, 100)) {
        isOk = false;
        this.$Message.error("请重新检查C实验成绩");
      }
      if (!this.checkMaxLength(this.student.dormitory, 9)) {
        isOk = false;
        this.$Message.error("请重新检查宿舍");
      }
      if (!this.checkRange(this.student.cexperiment, 1, 100)) {
        isOk = false;
        this.$Message.error("请重新检查英语(1)成绩");
      }
      if (!this.checkRange(this.student.gradePoint, 0, 5.0)) {
        isOk = false;
        this.$Message.error("请重新检查大一上绩点");
      }
      if (!this.checkEmail(this.student.email)) {
        isOk = false;
        this.$Message.error("请重新检查邮箱");
      }
      if (!this.checkMaxLength(this.student.majorClass, 20)) {
        isOk = false;
        this.$Message.error("请重新检查专业班级");
      }
      if (!this.checkLength(this.student.phoneNum, 11)) {
        isOk = false;
        this.$Message.error("请重新检查手机");
      }
      if (!this.checkLength(this.student.studentNum, 10)) {
        isOk = false;
        this.$Message.error("请重新检查学号");
      }
      if (!this.checkRange(this.student.cexperiment, 1, 100)) {
        isOk = false;
        this.$Message.error("请重新检查C理论成绩");
      }
      if (!this.checkMaxLength(this.student.explanation, 30)) {
        isOk = false;
        this.$Message.error("请重新检查社团说明");
      }
      if (!this.checkMaxLength(this.student.isTeam, 34)) {
        isOk = false;
        this.$Message.error("请重新检查组队信息");
      }
      if (!this.checkMaxLength(this.student.hobby, 50)) {
        isOk = false;
        this.$Message.error("请重新检查爱好");
      }
      if (!this.checkMaxLength(this.student.motto, 28)) {
        isOk = false;
        this.$Message.error("请重新检查座右铭");
      }
      if (!this.checkMaxLength(this.student.experience, 170)) {
        isOk = false;
        this.$Message.error("请重新检查实践经历");
      }
      if (!this.checkMaxLength(this.student.selfEvaluation, 230)) {
        isOk = false;
        this.$Message.error("请重新检查自我评价");
      }
      if (!this.checkMaxLength(this.student.exampleThing, 290)) {
        isOk = false;
        this.$Message.error("请重新检查简述");
      }
      if (!this.checkMaxLength(this.student.reasonForQg, 580)) {
        isOk = false;
        this.$Message.error("请重新检查个人规划和原因");
      }
      return isOk;
    },
    //点击修改或详细
    showDetail(index, html) {
      let number = this.appearList[index].studentNum;
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
          data: {
            studentNum: number,
          },
          headers: {
            QGer: "I am a QGer",
          },
          url: this.domain + "stu/select",
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
        if (html == 3) this.showHtml(3);
        else if (html == 4) this.showHtml(4);
        this.student = JSON.parse(result);
        this.$Message.success(`获取成功`);
      });
    },
    // 清空详细信息
    initStudent() {
      for (let i in this.student) {
        this.student[i] = "";
      }
      this.student.gender = "男";
      this.student.grade = 1;
      this.student.isFailed = "否";
      this.student.groupId = 1;
    },
    //新增或修改学生
    addNewStudent(url) {
      if (this.checkAll() == false) return;
      let tips = "";
      if (url == "stu/save") tips = "添加";
      else tips = "修改";
      if (this.lockAdd == true) {
        this.lockAdd = false;
        const lmsg = this.$Message.loading({
          content: `${tips}中...`,
          duration: 0,
        });
        let promise = new Promise((resolve) => {
          $.ajax({
            url: this.domain + url,
            data: {
              gender: this.student.gender,
              age: this.student.age,
              dormitory: this.student.dormitory,
              classRank: this.student.classRank,
              grade: this.student.grade,
              majorClass: this.student.majorClass,
              duty: this.student.duty,
              isFailed: this.student.isFailed,
              ctheory: this.student.ctheory,
              cexperiment: this.student.cexperiment,
              english: this.student.english,
              gradePoint: this.student.gradePoint,
              explanation: this.student.explanation,
              email: this.student.email,
              studentNum: this.student.studentNum,
              phoneNum: this.student.phoneNum,
              qq: this.student.qq,
              hobby: this.student.hobby,
              motto: this.student.motto,
              isTeam: this.student.isTeam,
              experience: this.student.experience,
              selfEvaluation: this.student.selfEvaluation,
              exampleThing: this.student.exampleThing,
              reasonForQg: this.student.reasonForQg,
              groupId: this.student.groupId,
              name: this.student.name,
              academy: this.student.academy,
            },
            xhrFields: {
              withCredentials: true,
            },
            headers: {
              QGer: "I am a QGer",
            },
            methods: "POST",
            success: (result) => {
              setTimeout(lmsg, 0);
              this.lockAdd = true;
              let obj = JSON.parse(result);
              if (obj.status == true) {
                this.$Message.success(`${tips}成功`);
                this.getList("stu/list", null);
                if (url == "stu/save") this.initStudent(); //添加学生清空信息
              } else{
                this.$Message.error(obj.message);
              }
            },
            error: (xhr, status, thrown) => {
              this.lockAdd = true;
              setTimeout(lmsg, 0);
              this.$Message.error(`${tips}失败`);
            },
          });
        });
      }
    },
    //切换
    showHtml(num) {
      this.htmlId = num;
      this.initStudent();
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
          this.msgList = this.msgList.filter((value) => {
            return value.studentNum != number ? true : false;
          });
          //更新数据
          this.total = this.msgList.length;
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
        this.msgList = JSON.parse(result);
        this.total = this.msgList.length;
        this.$Message.success(`获取成功`);
        this.toPage(1);
      });
    },
    // 校验范围
    checkRange(obj, min, max) {
      obj = Number(obj);
      if (obj > max || obj < min) {
        this.$Message.error(`数据范围为${min} ~ ${max}`);
        return false;
      } else {
        return true;
      }
    },
    // 校验邮箱
    checkEmail(email) {
      if (
        !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          email
        )
      ) {
        this.$Message.error(`邮箱格式错误`);
        return false;
      } else {
        return true;
      }
    },
    // 校验学号和电话号码长度
    checkLength(obj, maxLength) {
      if (obj.length != maxLength) {
        console.log(obj.length);
        this.$Message.error(`请输入${maxLength}长度的字符`);
        return false;
      } else return true;
    },
    //长度以内
    checkMaxLength(obj, maxLength) {
      if (obj.length > maxLength) {
        this.$Message.error(`请输入${maxLength}长度以内的字符`);
        return false;
      } else return true;
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
    student: {
      //学生列表表单验证
      handler(val, oldVal) {
        //console.log(this.student);
      },
      deep: true,
    },
  },
};
</script>