<template>
  <view style="padding: 20rpx">
    <view class="card-item" style="margin-top: 20rpx">
      <u-row>
        <u-col :span="10">
          <u-row>
            <u-col :span="10">
              <view>{{ getTopTitle() }}</view>
              <view>备注：{{ msg.Remarks || "无" }}</view>
              <view
                >加入时间：{{
                  timeFormat(msg.CreateTime, "{y}-{m}-{d} {h}:{i}:{s}")
                }}</view
              >
            </u-col>
            <u-col :span="2">
              <u-button
                v-if="!msg.Disabled"
                type="success"
                size="mini"
                @click="disHandler"
                >冻结</u-button
              >
              <u-button v-else type="primary" size="mini" @click="disHandler"
                >解冻</u-button
              >
            </u-col>
          </u-row>
          <u-row>
            <u-col :span="6"
              >下级总数：<span style="color: rgb(22, 155, 213)">{{
                msg.LowerTotal
              }}</span></u-col
            >
            <u-col :span="6"
              >本月业绩：<span style="color: rgb(22, 155, 213)">{{
                msg.Income
              }}</span></u-col
            >
          </u-row>
          <u-row>
            <u-col :span="6"
              >今日参赛人次：<span style="color: rgb(22, 155, 213)">{{
                msg.Today
              }}</span></u-col
            >
            <u-col :span="6"
              >本月参赛人次：<span style="color: rgb(22, 155, 213)">{{
                msg.PeopleNum
              }}</span></u-col
            >
          </u-row>
          <u-row>
            <u-col
              >总业绩：<span style="color: rgb(22, 155, 213)">{{
                msg.PerformTotal
              }}</span></u-col
            >
          </u-row>
        </u-col>
      </u-row>
    </view>
    <u-cell-group>
      <u-cell-item
        icon="phone"
        title="月业绩详情"
        @click="changeTip(1)"
      ></u-cell-item>
      <!-- <u-cell-item
        icon="fingerprint"
        title="下级列表"
        @click="changeTip(2)"
      ></u-cell-item> -->
      <u-cell-item
        icon="server-man"
        title="比赛权限"
        @click="changeTip(3)"
      ></u-cell-item>
      <u-cell-item
        icon="level"
        title="七日推广情况"
        @click="changeTip(4)"
      ></u-cell-item>
    </u-cell-group>
  </view>
</template>
<script>
import timeConvert from "../../../utils/timeConvert.js";
export default {
  data() {
    return {
      msg: null,
    };
  },
  onLoad(option) {
    this.msg = JSON.parse(option.Msg);
    console.log("--详情--", JSON.stringify(this.msg));
  },
  methods: {
    changeTip(val) {
      if (!this.msg) return;
      let url = undefined;
      switch (val) {
        case 1:
          url = `./monthData?UserID=${this.msg.UserID}&Account=${this.msg.Account}&Identity=${this.msg.Role}`;
          break;
        case 2:
          url = `./myLowlevel?UserID=${this.msg.UserID}`;
          break;
        case 3:
          url = `./game?UserID=${this.msg.UserID}`;
          break;
        case 4:
          url = `./sevenData?UserID=${this.msg.UserID}`;
          break;
      }
      console.log("--跳转--", url);
      if (url) uni.navigateTo({ url });
    },
    getTopTitle() {
      if (!this.msg) return "数据错误";
      return `${this.msg.Account}（${
        this.$customEnum.Identity[this.msg.Role]
      }）`;
    },
    timeFormat(...t) {
      return timeConvert(...t);
    },
    async disHandler() {
      if (!this.msg) return;
      const res = await this.$api.Frozen({ UserID: this.msg.UserID });
      console.log("--冻结、解冻--", JSON.stringify(res));
      if (res.data) {
        this.msg.Disabled = !this.msg.Disabled;
        uni.$emit("changeUserDisabled", {
          UserID: this.msg.UserID,
          Disabled: this.msg.Disabled,
        });
      }
    },
  },
};
</script>
