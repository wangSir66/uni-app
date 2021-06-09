<template>
  <view>
    <view
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f2f2f2;
        text-align: center;
        height: 150rpx;
        justify-content: center;
      "
    >
      <span style="font-size: 32rpx"
        ><b>{{ Account }}</b>
        <span>（ID：{{ UserID }} &nbsp;身份：{{ Identity }}）</span></span
      >
    </view>
    <u-table>
      <u-tr>
        <u-th>日期</u-th>
        <u-th>下级</u-th>
        <u-th>新增下级</u-th>
        <u-th>参赛人次</u-th>
        <u-th>业绩</u-th> 
      </u-tr>
      <view v-if="!!msg">
        <u-tr v-for="(item, index) in msg" :key="index">
          <u-td>{{item.Creater}}</u-td>
          <u-td>{{item.LowerTotal}}</u-td>
          <u-td>{{item.NewLower}}</u-td>
          <u-td>{{item.InMatchPerson}}</u-td>
          <u-td>{{item.Achievement}}</u-td>
        </u-tr>
      </view>
      <p v-else style="text-align: center;background-color: #f2f2f2;">无数据</p>
    </u-table>
  </view>
</template>

<script>
export default {
  data() {
    return {
      Account: "玩家昵称",
      UserID: "xxx",
      Identity: "xxx",
      msg: null,
    };
  },
  onLoad(option) {
    this.UserID = option.UserID;
    this.Account = option.Account;
    this.Identity = this.$customEnum.Identity[option.Identity];
    console.log("--玩家信息--", option);
    this.freshData();
  },
  methods: {
    async freshData() {
      const res = await this.$api.MonthDataDetailInfo({ UserID: +this.UserID });
      console.log("--玩家数据--", JSON.stringify(res));
      if (res.data) this.msg = res.data;
    },
  },
};
</script>

<style>
</style>
