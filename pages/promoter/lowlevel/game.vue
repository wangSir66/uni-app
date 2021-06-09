<template>
  <view>
    <view
      v-if="
        (PublicGames && PublicGames.length) ||
        (myPrivateGames && myPrivateGames.length)
      "
    >
      <uni-collapse v-if="PublicGames && PublicGames.length">
        <uni-collapse-item title="公有游戏" :open="true">
          <view class="grid col-3 text-left margin-bottom margin-left">
            <view v-for="(item, index) of PublicGames" :key="index">
              {{ item.Name }}
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
      <uni-collapse v-if="myPrivateGames && myPrivateGames.length">
        <uni-collapse-item title="私有游戏" :open="true">
          <view class="grid col-3 text-left margin-bottom margin-left">
            <view v-for="(item, index) of myPrivateGames" :key="index">
              {{ item.Name }}
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>
    <view v-else class="text-center margin">没有任何游戏权限~</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      UserID: undefined,
      PublicGames: [],
      privateGames: [],
      myPrivateGames: [],
    };
  },
  onLoad(option) {
    this.UserID = +option.UserID;
    console.log("--比赛权限--", this.UserID);
  },
  methods: {
    async fetchData() {
      if (!this.UserID) {
        uni.showToast({
          title: "参数缺失",
          icon: "none",
        });
        return;
      }
      try {
        //查询所有可配置的游戏
        const res = await this.$api.QueryPlatformGames();
        const res1 = await this.$api.QueryGames({ UserID: this.UserID });
        console.log("---0000", res1.data);
        this.games = res.data.filter(
          (item) => res1.data.Games.indexOf(item.GameID) > -1
        );
        //找到所有公用游戏
        this.PublicGames = res.data.filter(
          (item) => Number(item.IsPublic) === 1
        );
        //找到所有私有游戏
        this.privateGames = res.data.filter(
          (item) => Number(item.IsPublic) === 0
        );
        //找到我的私有游戏
        this.myPrivateGames = this.privateGames.filter(
          (item) => res1.data.Games.indexOf(item.GameID) > -1
        );
        console.log("---我的私有", this.myPrivateGames);
      } catch (e) {
        //TODO handle the exception
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../common/colorUI/icon.css";
@import "../../../common/colorUI/main.css";
</style>
