<template>
  <view style="width: 90%; margin: 0 auto">
    <u-top-tips
      ref="uTips"
      :navbar-height="statusBarHeight + navbarHeight"
    ></u-top-tips>
    <u-search
      v-model="input"
      placeholder="请输入地区"
      @custom="custom"
      @clear="clear"
      @search="search"
    ></u-search>
    <u-card title="地区" :full="true">
      <view slot="body">
        <u-button
          type="success"
          size="mini"
          plain
          class="margin-bottom"
          @click="selectAll"
          >{{ selectName }}
        </u-button>
        <u-checkbox-group>
          <u-checkbox
            v-model="item.checked"
            v-for="item in checkList"
            :key="item.indexId"
            :name="item.indexId"
          >
            {{ item.name }}</u-checkbox
          >
        </u-checkbox-group>
      </view>
    </u-card>
    <view style="width: 90%; margin: 0 auto">
      <u-button type="primary" @click="handleGame">下一步</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      checkList: [],
      selectName: "全选",
      city: [],
      game: [],
      userId: 0,
    };
  },
  onLoad(option) {
    this.checkList = [];
    const cities = this.$store.getters.UserInfo?.city || [];
    this.city = option?.AllCities || [];
    this.game = option?.AllGames || [];
    this.userId = option?.UserID || 0;
    console.log(
      "--地域数据--",
      JSON.stringify(cities),
      "--传的参数是",
      JSON.stringify(option)
    );
    for (let _i = 0; _i < cities.length; _i++) {
      const c = cities[_i];
      this.checkList.push({
        indexId: c.IndexID,
        name: `${c.ProvinceName}-${c.CityName}`,
        checked: this.city.includes(c.IndexID),
      });
    }
    this.selectName =
      this.checkList.length === this.checkList.filter((c) => c.checked).length
        ? "取消全选"
        : "全选";
  },
  methods: {
    handleGame() {
      const Cities = this.checkList
        .filter((c1) => c1.checked)
        .map((c2) => c2.indexId);
      if (!Cities.length) {
        this.$refs.uTips.show({
          title: "地域必须选择一个！",
          type: "error",
          duration: "1000",
        });
        return;
      }
      console.log("--下一步--", JSON.stringify(Cities));
      uni.navigateTo({
        url: `./editGame?AllCities=${Cities}&AllGames=${this.game}&UserID=${this.userId}`,
      });
    },
    selectAll() {
      if (this.selectName === "全选") {
        this.checkList.forEach((item) => {
          item.checked = true;
        });
        this.selectName = "取消全选";
      } else {
        this.checkList.forEach((item) => {
          item.checked = false;
        });
        this.selectName = "全选";
      }
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
