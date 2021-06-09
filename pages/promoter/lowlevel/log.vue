<template>
  <view style="width: 100%">
    <view style="background-color: #f2f2f2; text-align: center">
      <h2>总开通人数</h2>
      <h3>{{ total }}</h3>
    </view>
    <view style="background-color: #fff; padding: 10upx 10upx">
      <u-calendar
        v-model="show"
        :mode="mode"
        @change="changeCalendar"
      ></u-calendar>
      <p>
        开通人数记录查询：<span style="color: #f24f52"
          >共{{ record }}条记录</span
        >
      </p>
      <p>
        <span
          @click="show = true"
          style="border: 2upx solid #d9d9d9; padding: 10upx 5upx"
          >{{ startTime }}</span
        >至
        <span
          @click="show = true"
          style="border: 2upx solid #d9d9d9; padding: 10upx 5upx"
          >{{ endTime }}</span
        >
      </p>
    </view>
    <u-table style="overflow-x: scroll">
      <u-tr class="u-tr">
        <u-th class="u-th" width="80rpx">序号</u-th>
        <u-th class="u-th">时间</u-th>
        <u-th class="u-th">手机号/备注</u-th>
        <u-th class="u-th">代理级别</u-th>
        <u-th class="u-th">开通玩法</u-th>
      </u-tr>
      <u-tr class="u-tr" v-for="(item, index) in tableData" :key="index">
        <u-td class="u-td" width="80rpx" style="height: 130rpx">{{
          index + 1
        }}</u-td>
        <u-td class="u-td" style="height: 130rpx">{{
          getYMDHIS(item.Time) || "/"
        }}</u-td>
        <u-td class="u-td" style="height: 130rpx"
          >{{ item.Account
          }}<span style="font-size: 10upx"> {{ item.Remarks }} </span></u-td
        >
        <u-td class="u-td" style="height: 130rpx">{{
          $customEnum.Identity[item.Role]
        }}</u-td>
        <u-td class="u-td" style="height: 130rpx">
          <u-button type="error" size="mini" @click="handleGame(item)"
            >编辑</u-button
          >
        </u-td>
      </u-tr>
    </u-table>
  </view>
</template>

<script>
import timeConvert from "../../../utils/timeConvert.js";
export default {
  data() {
    return {
      tableData: [],
      show: false,
      mode: "range",
      startTime: timeConvert(new Date(), `{y}-{m}-{d}`),
      endTime: timeConvert(new Date(), `{y}-{m}-{d}`),
      total: 0,
      record: 0,
    };
  },
  onLoad() {
    uni.$on("showLog", (msg) => {
      console.log("--返回--", JSON.stringify(msg));
      this.refreshData();
    });
    this.refreshData();
  },
  onunload() {
    uni.$off("showLog");
  },
  methods: {
    changeCalendar(evt) {
      this.startTime = evt.startDate;
      this.endTime = evt.endDate;
      this.refreshData();
    },
    handleGame(item) {
      console.log("--编辑--", JSON.stringify(item));
      uni.navigateTo({
        url: `./editArea?AllCities=${item.Cities}&AllGames=${item.GameIDs}&UserID=${item.UserID}`,
      });
    },
    refreshData() {
      const param = {
        StartTime: this.startTime, //开始时间
        EndTime: this.endTime, //结束时间
      };
      console.log("--开通记录，请求参数", JSON.stringify(param));
      this.$api.Record(param).then((res) => {
        const data = res.data;
        console.log("--返回数据", JSON.stringify(data));
        this.tableData = data.List;
        this.total = data.Total;
        this.record = data.Count;
      });
    },
    getYMDHIS(t) {
      if (!!t) return timeConvert(new Date(t));
    },
  },
};
</script>

<style>
</style>
