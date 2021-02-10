<style lang="scss" scoped>
@import "Notice";
</style>
<template>
  <div class="noti-div">
    <div class="noti-de" v-if="noticeId != '000'" @click="deleteNotice(id)">
      <svg viewBox="0 0 16 13">
        <g transform="translate(1.000000, 0.000000)" fill="white">
          <path
            d="M10.164,11.063 C9.982,11.063 9.845,10.991 9.776,10.922 L8.009,9.157 L6.314,10.852 C6.248,10.918 6.095,10.998 5.891,10.998 C5.738,10.998 5.507,10.952 5.288,10.733 C5.067,10.513 5.018,10.295 5.017,10.153 C5.013,9.965 5.086,9.823 5.157,9.753 L6.881,8.028 L5.201,6.35 C5.049,6.197 4.922,5.723 5.321,5.325 C5.546,5.1 5.767,5.053 5.914,5.053 C6.097,5.053 6.234,5.125 6.301,5.194 L8.009,6.9 L9.705,5.204 C9.773,5.137 9.925,5.058 10.129,5.058 C10.283,5.058 10.514,5.104 10.733,5.324 C11.111,5.703 11.035,6.134 10.864,6.304 L9.138,8.03 L10.875,9.766 C10.942,9.834 11.021,9.986 11.021,10.19 C11.021,10.344 10.976,10.573 10.756,10.792 C10.531,11.016 10.311,11.063 10.164,11.063 L10.164,11.063 L10.164,11.063 Z"
          ></path>
        </g>
      </svg>
    </div>
    <div class="noti-main">
      <textarea cols="40" rows="10" disabled="disabled">{{ article }}</textarea>
    </div>
    <div class="noti-name">{{ title }}</div>
    <div class="noti-change" v-if="noticeId != '000'" @click="change()">
      <svg
        t="1596024524831"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3436"
      >
        <path
          d="M853.319 551.563c0-18.85 15.28-34.132 34.131-34.132s34.132 15.28 34.132 34.132V802.1c0 65.223-48.815 119.462-110.928 119.462H196.279c-62.112 0-110.928-54.24-110.928-119.462V204.791c0-65.221 48.816-119.462 110.928-119.462H465.83c18.85 0 34.133 15.281 34.133 34.133s-15.281 34.132-34.133 34.132H196.28c-22.715 0-42.665 22.167-42.665 51.198V802.1c0 29.031 19.95 51.198 42.664 51.198h614.375c22.714 0 42.665-22.167 42.665-51.198V551.563z m-303.01-4.109c-12.523 14.09-34.097 15.358-48.186 2.835s-15.358-34.098-2.835-48.186l341.32-383.985c12.522-14.089 34.097-15.358 48.186-2.834s15.357 34.097 2.834 48.186L550.31 547.454z"
          p-id="3437"
        ></path>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: "Notice",
  props: ["noticeId", "title", "article", "index"],
  methods: {
    //删除
    deleteNotice(id) {
      if (confirm("是否确认删除？")) {
        const lmsg = this.$Message.loading({
          content: `删除中...`,
          duration: 0,
        });
        let myData = {
          id: this.noticeId,
        };
        let deletePromise = new Promise((resolve) => {
          this.$.ajax({
            url: this.domain + "model/remove",
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
              this.$Message.error(`删除失败`);
            },
          });
        });
        deletePromise.then((result) => {
          let obj = JSON.parse(result);
          setTimeout(lmsg, 0);
          if (obj.status == true) {
            this.$Message.success(`删除成功`);
            setTimeout(() => {
              location.reload();
            }, 1000);
          } else {
            this.$Message.error(obj.message);
          }
        });

        /* let formdata = new FormData();
        formdata.append("id", this.noticeId);
        this.$http
          .post(this.domain + "model/remove", formdata, {
            headers: {
              QGer: "I am a QGer",
            },
          })
          .then((res) => {
            if (res.data.status == true) {
              this.$Message.success("删除成功");
              setTimeout(() => {
                location.reload();
              }, 1000);
            } else {
              this.$Message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$Message.error("删除失败");
          });*/
      }
    },
    //传给父组件
    change() {
      this.$emit("toDad", this.index);
    },
  },
  mounted() {
    //console.log(this.noticeId);
  },
};
</script>