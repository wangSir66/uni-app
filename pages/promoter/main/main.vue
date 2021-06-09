<template>
  <view>
    <view class="header text-center" style="padding-top: 3rem">
      <view class="text-bold text-black text-xl">{{ appTitle }}</view>
      <view class="text-black">{{ agentPhone }}</view>
      <view class="text-black">{{ appWelcomeText }}</view>
    </view>
    <view class="card-item" style="margin: 20rpx">
      <view class="card-item-content uni-flex uni-row">
        <view v-for="(item, index) in dataList" :key="index" class="flex-sub">
          <view>{{ item.title }}</view>
          <view class="text-bold">{{ item.value || 0 }}</view>
        </view>
      </view>
    </view>
    <view
      class="card-item"
      v-for="(card, index) in featuresList"
      :key="index"
      style="margin: 20rpx"
    >
      <view class="card-item-header">{{ card.title }}</view>
      <view class="card-item-content uni-flex uni-row">
        <view
          v-for="(item, index1) in card.agentContentList"
          :key="index1"
          @tap="navigator(item.url)"
        >
          <view class="icon-wrap">
            <image
              :src="'../../static/main/' + item.icon + '.png'"
              mode=""
            ></image>
          </view>
          <view>{{ item.text }}</view>
        </view>
      </view>
    </view>
    <view class="u-m-t-20">
      <u-cell-group>
        <view style="text-align: center; padding: 25rpx 0" @tap="logout"
          >退出</view
        >
      </u-cell-group>
    </view>
    <!-- 底部导航栏 -->
    <u-tabbar
      :bg-color="bgColor"
      :border-top="borderTop"
      :list="list"
      inactive-color="#909399"
      activeColor="#5098FF"
    ></u-tabbar>
    <!-- 展示比赛权限 -->
    <u-popup
      v-model="matchShow"
      style="width: 100%"
      mode="center"
      :closeable="true"
    >
      <u-card title="比赛区域">
        <view
          style="display: flex; flex-wrap: wrap; justify-content: space-between"
          slot="body"
        >
          <view v-for="item in city" :key="item.IndexID" style="margin: 10upx"
            >{{ item.ProvinceName }}-{{ item.CityName }}</view
          >
        </view>
      </u-card>
      <u-card title="比赛游戏">
        <view style="display: flex; flex-wrap: wrap; justify-content: space-between" slot="body">
          <view v-for="item in game" :key="item.GameID" style="margin: 10upx">{{ item.Name }}</view>
        </view>
      </u-card>
    </u-popup>
  </view>
</template>
<script>
export default {
  data() {
    return {
      dataList: [
        {
          title: "新增玩家",
          value: 0,
        },
        {
          title: "比赛推广",
          value: 0,
        },
        {
          title: "今日收入",
          value: 0,
        },
      ],
      bgColor: "#ffffff",
      borderTop: true,
      list: [
        {
          iconPath: "home",
          selectedIconPath: "home-fill",
          pagePath: "/pages/promoter/main/main",
          text: "首页",
          count: 0,
          isDot: true,
          customIcon: false,
        },
        {
          iconPath: "account",
          selectedIconPath: "account-fill",
          pagePath: "/pages/mine/mine",
          text: "我的",
          count: 0,
          isDot: false,
          customIcon: false,
        },
      ],
      //核销码对话框
      codeDialogShow: false,
      //
      showCancel: false,
      confirmText: "", //底部按钮
      code: "", //核销码
      title: "核销码",
      dialogShow: false,
      content: "慈母手中线，游子身上衣",
      contentSlot: false,
      showTitle: true,
      asyncClose: false,
      //核销码输入
      mode: "middleLine",
      maxlength: 16,
      bold: true,
      //优惠券
      couponShow: false,
      good: {}, //商品参数
      //核销按钮
      hairLine: true,
      type: "primary",
      size: "default",
      shape: "square",
      plain: false,
      ripple: true,
      loading: false,
      //比赛权限展示
      matchShow: false,
      city: [],
      game: [],
    };
  },
  computed: {
    appTitle() {
      return "XXXX推广系统";
    },
    appWelcomeText() {
      const { roleLv, code } = this.user;
      return `欢迎【${this.$customEnum.Identity[roleLv]}】登录推广系统，你的推广码：${code}`;
    },
    agentPhone() {
      return `手机：${this.$store.getters.Phone}`;
    },
    featuresList() {
      const role = this.user ? Number(this.user.roleLv) : 4;
      let nextLv = { title: "下级相关", agentContentList: [] };
      if (role < this.$customEnum.IdNum.ThirdLv) {
        nextLv.agentContentList.push(
          {
            icon: "authorize",
            text: "开通下级",
            url: "../lowlevel/create",
          },
          {
            icon: "log",
            text: "开通记录",
            url: "../lowlevel/log",
          },
          {
            icon: "team",
            text: "我的下级",
            url: "../lowlevel/myLowlevel",
          }
        );
      }
      nextLv.agentContentList.push({
        icon: "game",
        text: "我的比赛权限",
        url: "../match/permission",
      });
      return [
        nextLv,
        {
          title: "比赛推广",
          agentContentList: [
            {
              icon: "award",
              text: "今日比赛",
              url: "../match/todayMatch",
            },
            {
              icon: "week",
              text: "七日比赛",
              url: "../match/weekMatch",
            },
            {
              icon: "tuiguang",
              text: "推广二维码",
              url: "../order/detail",
            },
          ],
        },
        {
          title: "收入数据",
          agentContentList: [
            {
              icon: "earning",
              text: "收入明细",
              url: "../code/input",
            },
            {
              icon: "cash",
              text: "提现",
              url: "../code/scan",
            },
          ],
        },
      ];
    },
  },
  onLoad() {
    this.user = this.$store.getters.UserInfo;
    console.log("--推广员数据--", JSON.stringify(this.user));
    this.city = this.user.city;
    this.game = this.user.game;
    this.Main();
  },
  methods: {
    //测试--登出
    logout() {
      console.log(111);
      uni.clearStorage();
      uni.navigateTo({
        url: "../../login/loginRole",
      });
    },
    //请求首页数据
    Main() {
      const param = {
        MerchantID: this.$store.getters.MerchantID,
      };
      this.$api.Main(param).then((res) => {
        if (Number(this.role) === 1) {
          this.dataList[0].value = res.data.Users;
          this.dataList[1].value = res.data.People;
          this.dataList[2].value = res.data.Income;
          this.$store.commit("SET_Balance", res.data.Remain);
        } else {
        }
      });
    },
    //跳转页面
    navigator(e) {
      if (e === "../code/input") {
        this.code = "";
        this.codeDialogShow = true;
      } else if (e === "../code/scan") {
        this.scan();
      } else if (e === "../match/permission") {
        this.matchShow = true;
      } else {
        console.log(e);
        uni.navigateTo({
          url: e,
        });
      }
    },
  },
};
</script>
<style lang="scss">
page {
  background-color: #ededed;
}

.header {
  background-image: linear-gradient(
    40deg,
    rgb(210, 166, 95) 0%,
    rgb(239, 201, 142) 100%
  );
  padding: 50upx 30upx;
  margin-bottom: 30upx;
  position: relative;
}

//优惠券
.taobao {
  width: 100%;
  background-color: white;
  padding: 30rpx 20rpx 20rpx;
  border-radius: 20rpx;

  .ticket {
    display: flex;

    .left {
      width: 75%;
      padding: 30rpx 20rpx;
      background-color: rgb(255, 245, 244);
      border-radius: 20rpx;
      border-right: dashed 2rpx rgb(224, 215, 211);
      display: flex;

      .picture {
        margin: auto 0;
        width: 172rpx;
        border-radius: 20rpx;
      }

      .introduce {
        margin-left: 10rpx;

        .top {
          color: $u-type-warning;
          font-size: 25rpx;

          .big {
            font-size: 60rpx;
            font-weight: bold;
            margin-right: 10rpx;
          }
        }

        .type {
          font-size: 25rpx;
          word-break: break-all;
          color: $u-type-info-dark;
        }

        .date {
          margin-top: 10rpx;
          font-size: 25rpx;
          color: $u-type-info-dark;
        }
      }
    }

    .right {
      width: 25%;
      padding: 10rpx 0;
      background-color: rgb(255, 245, 244);
      border-radius: 20rpx;
      display: flex;
      align-items: center;

      .use {
        height: auto;
        padding: 0 20rpx;
        font-size: 24rpx;
        border-radius: 40rpx;
        color: #ffffff !important;
        background-color: $u-type-warning !important;
        line-height: 40rpx;
        color: rgb(117, 142, 165);
        margin-left: 20rpx;
      }
    }
  }
}
</style>
