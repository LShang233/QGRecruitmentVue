<style lang="scss" scoped>
@import "./../../views/EnrollInfo/EnrollInfo";
.opt-pane {
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
#opt-panes {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
#opt-up {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

#opt-down {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.opt-digital-pane {
  flex: 0 0 33%;
  border: transparent;
  box-shadow: 0 0.7px 3px rgba(126, 98, 121, 0.7);
}
.opt-up-pane {
  flex: 0 0 49%;
  border: transparent;
  box-shadow: 0 0.7px 3px rgba(126, 98, 121, 0.7);
}
</style>
<template>
  <div>
    <!-- 标签 -->
    <Tabs :title="'数据统计'" />
    <div class="tab-content">
      <!-- 往这里写内容 -->
      <div class="opt-pane fade in" id="opt-panes">
        <div id="opt-up">
          <div
            class="opt-up-pane"
            id="opt-gender"
            style="width: 420px; height: 300px"
          ></div>
          <div
            class="opt-up-pane"
            id="opt-group"
            style="width: 420px; height: 300px"
          ></div>
        </div>
        <div id="opt-down">
          <div
            class="opt-digital-pane"
            id="opt-written"
            style="width: 420px; height: 300px"
          ></div>
          <div
            class="opt-digital-pane"
            id="opt-first"
            style="width: 420px; height: 300px"
          ></div>
          <div
            class="opt-digital-pane"
            id="opt-second"
            style="width: 420px; height: 300px"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tabs from "../../components/Tabs/Tabs";
export default {
  name: "Statistic",
  components: {
    Tabs,
  },
  methods: {
    //获取信息
    addRes() {
      const lmsg = this.$Message.loading({
        content: "获取信息中...",
        duration: 0,
      });
      /* let data = new FormData();
      data.append("graphic", this.periodicalId); //期刊id */
      this.$http
        .post(this.domain + "/graphic")
        .then((res) => {
          setTimeout(lmsg, 0);
          if (res.data.status == true) {
            let data = JSON.parse(res.data.data);
            let group = data.groupNum;
            this.twoChoiceChart(
              "opt-gender",
              "报名人数男女比例",
              "男",
              "女",
              data.maleNum,
              data.femaleNum
            );
            this.twoChoiceChart(
              "opt-written",
              "笔试通过状态",
              "通过",
              "未通过",
              data.writtenPassed,
              data.writtenNoPassed
            );
            this.twoChoiceChart(
              "opt-first",
              "一轮通过状态",
              "通过",
              "未通过",
              data.firstRoundPassed,
              data.firstRoundNoPassed
            );
            this.twoChoiceChart(
              "opt-second",
              "二轮通过状态",
              "通过",
              "未通过",
              data.secondRoundPassed,
              data.secondRoundNoPassed
            );
            this.groupChart(
              group.前端组,
              group.后台组,
              group.图形组,
              group.数据挖掘组,
              group.嵌入式组,
              group.移动组,
              group.设计组
            );
            this.$Message.success("获取成功");
          } else {
            this.$Message.error(res.data.msg);
          }
        })
        .catch((err) => {
          setTimeout(lmsg, 0);
          this.$Message.error("获取失败");
        });
    },
    // 两种选择的比例图
    twoChoiceChart(oId, oTitle, oFirst, oSecond, oFdigit, oSdigit) {
      var myChart = this.$echarts.init(document.getElementById(oId));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: oTitle,
          x: 10,
          y: 10,
        },
        tooltip: {},
        legend: {
          data: [oFirst, oSecond],
          formatter: function (name) {
            var index = 0;
            var clientlabels = [oFirst, oSecond];
            var clientcounts = [oFdigit, oSdigit];
            clientlabels.forEach(function (value, i) {
              if (value == name) {
                index = i;
              }
            });
            return name + "  " + clientcounts[index];
          },
          orient: "vertical",
          top: "bottom",
          right: "20px",
        },
        series: [
          {
            name: oTitle,
            type: "pie",
            radius: "50%",
            label: {
              normal: {
                formatter: "{b}: ({d}%)",
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 15,
                },
              },
            },
            data: [
              { value: oFdigit, name: oFirst },
              { value: oSdigit, name: oSecond },
            ],
          },
        ],
        //设置调色盘
        color: [
          "#69cad0",
          "#ec9399",
          "#f8e086",
          "#a1dda7",
          "#9b83e1",
          "#e9d7b3",
          "#eeab7e",
          "#76b2e8",
          "#b989e4",
          "#ea9e8c",
          "#db708f",
          "#cde781",
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 组别
    groupChart(Dfront, Dback, Dgraphic, Dstatis, Dembed, Dmobile, Ddesign) {
      var myChart = this.$echarts.init(document.getElementById("opt-group"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "各组人员数量统计",
          x: 10,
          y: 10,
        },
        tooltip: {},
        legend: {
          data: [
            "前端组",
            "后台组",
            "图形组",
            "数据挖掘组",
            "嵌入式组",
            "移动组",
            "设计组",
          ],
          formatter: function (name) {
            var index = 0;
            var clientlabels = [
              "前端组",
              "后台组",
              "图形组",
              "数据挖掘组",
              "嵌入式组",
              "移动组",
              "设计组",
            ];
            var clientcounts = [
              Dfront,
              Dback,
              Dgraphic,
              Dstatis,
              Dembed,
              Dmobile,
              Ddesign,
            ];
            clientlabels.forEach(function (value, i) {
              if (value == name) {
                index = i;
              }
            });
            return name + " " + clientcounts[index];
          },
          orient: "vertical",
          top: "bottom",
          right: "0",
        },
        series: [
          {
            name: "各组人员数量统计",
            type: "pie",
            radius: "50%",
            label: {
              normal: {
                formatter: "{b}: ({d}%)",
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 13,
                },
              },
            },
            data: [
              { value: Dfront, name: "前端组" },
              { value: Dback, name: "后台组" },
              { value: Dgraphic, name: "图形组" },
              { value: Dstatis, name: "数据挖掘组" },
              { value: Dembed, name: "嵌入式组" },
              { value: Dmobile, name: "移动组" },
              { value: Ddesign, name: "设计组" },
            ],
          },
        ],
        //设置调色盘
        color: [
          "#f8e086",
          "#a1dda7",
          "#9b83e1",
          "#ec9399",
          "#e9d7b3",
          "#eeab7e",
          "#69cad0",
          "#76b2e8",
          "#b989e4",
          "#ea9e8c",
          "#db708f",
          "#cde781",
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.addRes();
    this.addLiBorder(0);
  },
};
</script>
