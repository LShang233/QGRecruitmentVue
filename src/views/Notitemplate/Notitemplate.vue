<style lang="scss" scoped>
@import "./../../views/EnrollInfo/EnrollInfo";
@import "Notitemplate";
</style>
<template>
  <div>
    <Tabs :title="'通知模板'" />
    <div class="tab-content">
      <div id="enroll-info">
        <Notice
          :key="'000'"
          :noticeId="'000'"
          :article="`#模板名一定要备注组别#

#请在需要填写的地方使用#
占位符：
名字：#name#
地点：#address#
时间：#time#

#较长信息可以滚动查看#`"
          :title="'模板使用注意事项'"
        />
        <Notice
          v-for="(item, index) in notices"
          :key="index"
          :index="index"
          :noticeId="item.id"
          :title="item.title"
          :article="item.content"
          @toDad="changeNotice"
        />
        <div id="noti-add" @click="addNotice()">
          <svg
            t="1596026190951"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1303"
          >
            <path
              d="M511.3 736.2c-20.7 0-37.3-16.7-37.3-37.3V325.5c0-20.6 16.7-37.3 37.3-37.3 20.6 0 37.3 16.7 37.3 37.3v373.3c0.1 20.7-16.6 37.4-37.3 37.4"
              p-id="1304"
            ></path>
            <path
              d="M698 549.5H324.7c-20.7 0-37.3-16.7-37.3-37.3 0-20.6 16.7-37.3 37.3-37.3H698c20.6 0 37.3 16.7 37.3 37.3 0 20.6-16.7 37.3-37.3 37.3"
              p-id="1305"
            ></path>
            <path
              d="M510.8 960.2c-118.7 0-231-45.9-316.3-131.2C91.1 725.6 45.6 582.5 69.6 436.5 101 244.4 258.4 92.8 452.3 67.9c154.5-19.7 305.5 39.5 404.2 158.6 13.2 15.9 10.9 39.4-5 52.6-15.9 13.2-39.4 10.9-52.6-5-82.2-99.2-208-148.8-337.2-132.1-161.4 20.7-292.3 146.8-318.5 306.6-20 122 17.9 241.3 104.1 327.5 86.2 86.2 205.6 124.1 327.5 104.1C735 854 864.3 717.2 882.3 555c4.2-37.3 2.8-74.6-3.7-110.8-2.6-14.1-6-28.2-10.3-41.7-6-19.8 5.1-40.6 24.8-46.6 19.8-6.2 40.6 5 46.6 24.7 5 16.3 9.2 33.2 12.2 50.2 8 43.4 9.5 88 4.6 132.4C934.6 761.2 782.6 921.9 587 954c-25.6 4.1-51 6.2-76.2 6.2"
              p-id="1306"
            ></path>
          </svg>
          <div>点击新增</div>
        </div>
      </div>
    </div>
    <section id="noti-sec" class="secti hide">
      <div class="noti-div-sec">
        <div class="sec-de" @click="toggleNoti()">
          <svg viewBox="0 0 16 13">
            <g transform="translate(1.000000, 0.000000)" fill="white">
              <path
                d="M10.164,11.063 C9.982,11.063 9.845,10.991 9.776,10.922 L8.009,9.157 L6.314,10.852 C6.248,10.918 6.095,10.998 5.891,10.998 C5.738,10.998 5.507,10.952 5.288,10.733 C5.067,10.513 5.018,10.295 5.017,10.153 C5.013,9.965 5.086,9.823 5.157,9.753 L6.881,8.028 L5.201,6.35 C5.049,6.197 4.922,5.723 5.321,5.325 C5.546,5.1 5.767,5.053 5.914,5.053 C6.097,5.053 6.234,5.125 6.301,5.194 L8.009,6.9 L9.705,5.204 C9.773,5.137 9.925,5.058 10.129,5.058 C10.283,5.058 10.514,5.104 10.733,5.324 C11.111,5.703 11.035,6.134 10.864,6.304 L9.138,8.03 L10.875,9.766 C10.942,9.834 11.021,9.986 11.021,10.19 C11.021,10.344 10.976,10.573 10.756,10.792 C10.531,11.016 10.311,11.063 10.164,11.063 L10.164,11.063 L10.164,11.063 Z"
              ></path>
            </g>
          </svg>
        </div>
        <div class="noti-sec-main">
          <textarea v-model="content"></textarea>
        </div>
        <div class="noti-bot">
          <div class="noti-new-name">
            模板名称：
            <input
              class="noti-input"
              placeholder="输入模板名"
              v-model="title"
            />
          </div>
          <input
            type="submit"
            value="确   定"
            class="de-sub"
            @click="addOrChangeNotice()"
          />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Tabs from "../../components/Tabs/Tabs";
import Notice from "../../components/Notice/Notice";
//import { $ajax } from "../../assets/main.js";
export default {
  name: "Notitemplate",
  components: {
    Tabs,
    Notice,
  },
  data() {
    return {
      notices: [],
      content: "",
      title: "",
      changeIndex: "",
    };
  },
  methods: {
    //获取子组件下标
    changeNotice(data) {
      this.content = this.notices[data].content;
      this.title = this.notices[data].title;
      this.changeIndex = this.notices[data].id;
      this.toggleNoti();
    },
    //标记新建
    addNotice() {
      this.content = "";
      this.title = "";
      this.toggleNoti();
      this.changeIndex = "new";
    },

    //添加或修改模板
    addOrChangeNotice() {
      if (!this.title || !this.content) {
        this.$Message.error("标题与内容不能为空！");
        return;
      }
      this.toggleNoti();
      let url = "model/save";
      let msg = "添加";
      let myData = {
        title: this.title,
        content: this.content,
      };
      if (this.changeIndex != "new") {
        myData = {
          id: this.changeIndex,
          title: this.title,
          content: this.content,
        };
        url = "model/update";
        msg = "修改";
      }

      const lmsg = this.$Message.loading({
        content: `${msg}中...`,
        duration: 0,
      });

      let noticePromise = new Promise((resolve) => {
        this.$.ajax({
          url: this.domain + url,
          data: myData,
          xhrFields: {
            withCredentials: true, // 发送Ajax时，Request header中会带上 Cookie 信息。
          },
          headers: {
            QGer: "I am a QGer",
          },
          methods: "POST",
          success: (result) => {
            resolve(result);
          },
          error: (xhr, status, thrown) => {
            setTimeout(lmsg, 0);
            this.$Message.error(`${msg}失败`);
          },
        });
      });
      noticePromise.then((result) => {
        let obj = JSON.parse(result);
        setTimeout(lmsg, 0);
        if (obj.status == true) {
          this.content = "";
          this.$Message.success(`${msg}成功`);
          this.title = "";
          setTimeout(() => {
            location.reload();
          }, 300);
        } else {
          this.$Message.error(obj.message);
        }
      });
    },

    //开关section
    toggleNoti() {
      document.getElementById("noti-sec").classList.toggle("hide");
    },

    //获取notice
    getNoticeList() {
      const lmsg = this.$Message.loading({
        content: "获取中...",
        duration: 0,
      });
      this.$http
        .post(this.domain + "model/list")
        .then((res) => {
          setTimeout(lmsg, 0);
          if (res.data.status == true) {
            this.$Message.success("获取成功");
            this.notices = JSON.parse(res.data.data);
          } else {
            this.$Message.error(res.data.msg);
          }
        })
        .catch((err) => {
          setTimeout(lmsg, 0);
          this.$Message.error("获取失败");
        });
    },
  },
  mounted() {
    this.addLiBorder(4);
    this.getNoticeList();
  },
};
</script>