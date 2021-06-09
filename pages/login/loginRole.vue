<template>
  <view class="zai-box">
    <image
      src="../../static/zaizai-login/login.png"
      mode="aspectFit"
      class="zai-logo"
    ></image>
    <view class="zai-title">
      <view style="font-size: 58upx; margin-top: 320upx">XXXX</view>
      <view style="font-size: 58upx">比赛助手</view>
    </view>
    <view class="zai-form">
      <button
        class="zai-btn"
        :disabled="update"
        style="background-color: #007aff; margin-bottom: 50upx"
        @tap="PromoterLogin"
      >
        XX员登录
      </button>
      <button
        class="zai-btn"
        :disabled="update"
        style="background-color: #22ac38; margin-bottom: 50upx"
        @tap="MerchantLogin"
      >
        XX商户登录
      </button>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      update: false,
    };
  },
  onLoad() {
    uni.getStorage({
      key: "update",
      success: (res) => {
        this.update = res.data;
      },
    });
  },
  methods: {
    //24小时storage失效
    oneDayStorage(storage, role, cb) {
      const current = new Date().getTime();
      uni.getStorage({
        key: storage,
        success: (res) => {
          if (current - res.data < 86400000) {
            //先分发action等待commit执行完毕再跳转
            uni.getStorage({
              key: "userinfo",
              success: async (res) => {
                //先保存信息再跳转
                await this.$store.dispatch("saveUserinfo", res.data);
                uni.reLaunch({
                  url: `..${
                    Number(role) === this.$customEnum.Role.PROMOTER
                      ? "/promoter"
                      : "/merchant"
                  }/main/main?role=${role}`,
                });
              },
              fail: () => {
                cb();
              },
            });
          } else {
            cb();
          }
        },
        fail: () => {
          cb();
        },
      });
    },
    PromoterLogin() {
      uni.getStorage({
        key: "lastLoginMethod",
        success: (res) => {
          if (res.data === "promoter") {
            this.oneDayStorage(
              "loginTime",
              this.$customEnum.Role.PROMOTER,
              () => {
                uni.navigateTo({
                  url: `./login?role=${this.$customEnum.Role.PROMOTER}`,
                });
              }
            );
          } else {
            uni.navigateTo({
              url: `./login?role=${this.$customEnum.Role.PROMOTER}`,
            });
          }
        },
        fail: () => {
          uni.navigateTo({
            url: `./login?role=${this.$customEnum.Role.PROMOTER}`,
          });
        },
      });
    },
    MerchantLogin() {
      uni.getStorage({
        key: "lastLoginMethod",
        success: (res) => {
          if (res.data === "merchant") {
            this.oneDayStorage(
              "loginTime",
              this.$customEnum.Role.MERCHANT,
              () => {
                uni.navigateTo({
                  url: `./login?role=${this.$customEnum.Role.MERCHANT}`,
                });
              }
            );
          } else {
            uni.navigateTo({
              url: `./login?role=${this.$customEnum.Role.MERCHANT}`,
            });
          }
        },
        fail: () => {
          uni.navigateTo({
            url: `./login?role=${this.$customEnum.Role.MERCHANT}`,
          });
        },
      });
    },
  },
};
</script>
<style>
.btn-login {
  margin-top: 50upx;
  border-radius: 50upx;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(to right, #88a1f9, #9ac6ff);
}

.btn-login-active {
  background: linear-gradient(to right, #365fff, #36bbff);
}

.btn-login-hover {
  background: linear-gradient(to right, #365fdd, #36bbfa);
}
.zai-box {
  padding: 250upx 100upx;
  position: relative;
}
.zai-logo {
  width: 100%;
  width: 100%;
  height: 310upx;
}
.zai-title {
  position: absolute;
  top: 0;
  line-height: 360upx;
  font-size: 68upx;
  color: #fff;
  text-align: center;
  width: 100%;
  margin-left: -100upx;
}
.zai-form {
  margin-top: 300upx;
}
.zai-input {
  background: #e2f5fc;
  margin-top: 30upx;
  border-radius: 100upx;
  padding: 20upx 40upx;
  font-size: 36upx;
}
.input-placeholder,
.zai-input {
  color: #94afce;
}
.zai-btn {
  background: #ff65a3;
  color: #fff;
  border: 0;
  border-radius: 100upx;
  font-size: 36upx;
}
.zai-btn:after {
  border: 0;
}
/*按钮点击效果*/
.zai-btn.button-hover {
  transform: translate(1upx, 1upx);
}
</style>

