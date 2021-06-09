<template>
  <view style="width: 90%; margin: 0 auto">
    <u-search
      v-model="input"
      placeholder="请输入游戏"
      @custom="custom"
      @clear="clear"
      @search="search"
    ></u-search>

    <u-card title="游戏" :full="true">
      <view slot="body">
        <u-form-item label="筛选类型" label-width="160rpx">
          <u-radio-group v-model="typeRadio">
            <u-radio
              v-for="item in radioList"
              :key="item.type"
              :name="item.type"
              @change="refreshGame(item.type)"
              >{{ item.name }}</u-radio
            >
          </u-radio-group>
        </u-form-item>
        <u-checkbox name="全选" v-model="selectGames" @change="selectAll">{{
          selectGames ? "取消全选" : "全选"
        }}</u-checkbox>
        <u-form-item label-width="160rpx">
          <u-checkbox-group>
            <u-checkbox
              v-model="item.checked"
              v-for="item in checkList"
              :key="item.indexId"
              :name="item.indexId"
              @change="selectGame(item.indexId)"
            >
              {{ item.name }}</u-checkbox
            >
          </u-checkbox-group>
        </u-form-item>
      </view>
    </u-card>
    <view style="width: 90%; margin: 0 auto">
      <u-button type="primary" @click="clickSureBtn">确定</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      checkList: [],
      selectGames: false,
      radioList: [],
      typeRadio: 0,
      city: [],
      game: [],
      games: [],
      userId: 0,
    };
  },
  onLoad(option) {
    this.typeRadio = 0;
    this.radioList = [
      {
        type: 0,
        name: "全部",
      },
    ];
    const game = this.$store.getters.UserInfo?.game || [];
    this.city = !!option?.AllCities
      ? option.AllCities.split(",").map((val) => +val)
      : [];
    this.game = !!option?.AllGames ? option.AllGames.split(",").map((val) => +val) : [];
    this.userId = !!option?.UserID ? Number(option.UserID) : 0;
    console.log(
      "--游戏数据--",
      JSON.stringify(game),
      "--传的参数是--",
      JSON.stringify(option)
    );
    //筛选游戏
    this.games = game.filter(
      (g) =>
        g.Cities instanceof Array &&
        this.city.filter((c) => g.Cities.includes(c)).length > 0
    );
    console.log("games", JSON.stringify(this.games));
    this.refreshGame();
    //获取游戏类型
    this.$api.GameTypeList().then((res) => {
      const data = res.data.sort((d1, d2) => d2.OrderID - d1.OrderID);
      console.log("--游戏类型数据", JSON.stringify(data));
      data.map((d) => {
        this.radioList.push({
          type: d.IndexID,
          name: d.Name,
        });
      });
    });
  },
  methods: {
    clickSureBtn() {
      const param = {
        UserID: this.userId,
        Cities: this.city,
        GameIDs: this.game,
      };
      console.log("--编辑推广员信息--", JSON.stringify(param));
      //编辑推广员信息
      this.$api.EditLower(param).then((res) => {
        uni.$emit("showLog", res);
        uni.navigateBack({ delta: 2 });
      });
    },
    selectGame(gID) {
      const item = this.checkList.filter((c) => c.indexId === gID)[0];
      item.checked = !item.checked;
      this.selectGames =
        this.checkList.filter((c) => c.checked).length ===
        this.checkList.length;
      this.changeGame(item.indexId, item.checked);
    },
    selectAll() {
      this.selectGames = !this.selectGames;
      this.checkList.map((c) => {
        c.checked = this.selectGames;
        this.changeGame(c.indexId, c.checked);
      });
    },
    changeGame(gID, checked) {
      const fg = false;
      for (let _i = 0; _i < this.game.length; _i++) {
        const id = this.game[_i];
        if (gID === id) {
          if (!checked) this.game.splice(_i, 1);
          fg = true;
          break;
        }
      }
      if (!fg && checked) this.game.push(gID);
    },
    refreshGame(indx) {
      console.log("typeRadio", this.typeRadio);
      if (indx != undefined) this.typeRadio = indx;
      this.checkList = [];
      this.selectGames = false;
      for (let _i = 0; _i < this.games.length; _i++) {
        const g = this.games[_i];
        if (!!this.typeRadio && this.typeRadio != g.TypeID) continue;
        this.checkList.push({
          indexId: g.GameID,
          name: `${g.Name}`,
          checked: this.game.includes(g.GameID),
        });
      }
      this.selectGames =
        this.checkList.length > 0 &&
        this.checkList.filter((c) => c.checked).length ===
          this.checkList.length;
      console.log("checkList", JSON.stringify(this.checkList));
    },
    clear() {
      this.input = "";
    },
    search() {
      console.log(2222);
    },
    custom(value) {
      console.log("用户输入", value);
    },
  },
};
</script>

<style>
</style>
