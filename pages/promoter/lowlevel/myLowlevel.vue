<template>
  <view>
    <view class="u-m-p-50 bg-white">
      <view class="u-demo-area u-flex u-row-center">
        <u-dropdown :close-on-click-mask="mask" ref="uDropdown">
          <u-dropdown-item
            @change="change1"
            v-model="value1"
            title="排序条件"
            :options="options1"
          ></u-dropdown-item>
          <u-dropdown-item
            @change="change2"
            v-model="value2"
            title="升序/降序"
            :options="options2"
          ></u-dropdown-item>
        </u-dropdown>
      </view>
    </view>
    <view class="wrap">
      <view v-if="Members.length" class="lowLevel-list" style="padding-top: 0">
        <view class="row" v-for="(row, index) in Members" :key="index">
          <view class="carrier">
            <view class="goods-info" @tap="toLowLevel(row)">
              <view class="info">
                <view
                  class="title"
                  style="
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 95%;
                    overflow: hidden;
                    padding: 0 10upx;
                  "
                  >{{ row.Account }}
                </view>
                <view class="spec" style="white-space: nowrap"
                  >身份:{{ getRoleName(row.Role) }}
                  <span style="color: #ff3333; padding: 0 20upx">{{
                    row.Disabled ? "已冻结" : "正常"
                  }}</span>
                  <span>分成:{{ row.ShareRatio }}%</span>
                </view>
                <view class="price-number1">
                  <view class="price" style="padding: 0 10upx"
                    >下级总数:<span
                      style="color: #0a98d5; margin-left: 10upx"
                      >{{ row.LowerTotal }}</span
                    ></view
                  >
                  <view class="price"
                    >本月业绩:<span
                      style="color: #0a98d5; margin-left: 10upx"
                      >{{ row.Income }}</span
                    ></view
                  >
                </view>
                <view class="price-number">
                  <view class="price" style="padding: 0 10upx"
                    >今日推广:<span style="color: #0a98d5; margin-left: 10upx"
                      >{{ row.Today }}人次</span
                    ></view
                  >
                  <view class="price"
                    >本月推广:<span style="color: #0a98d5; margin-left: 10upx"
                      >{{ row.PeopleNum }}人次</span
                    ></view
                  >
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 没有下级 -->
      <scroll-view v-else scroll-y style="height: 100%; width: 100%">
        <view class="page-box">
          <view>
            <view class="centre">
              <image
                src="https://cdn.uviewui.com/uview/template/taobao-order.png"
                mode=""
              ></image>
              <view class="explain"> 您还没有下级 </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import timeConvert from "../../../utils/timeConvert.js";
export default {
  data() {
    return {
      state: 0, //Sort 0 升序 1降序  state 0 全部 1-待核销 2--已核销 3--已过期
      sort: 0,
      //顶部下拉列表
      mask: true,
      value1: 0,
      value2: 0,
      options1: [
        {
          label: "今日推广",
          value: 0,
        },
        {
          label: "本月业绩",
          value: 1,
        },
        {
          label: "本月推广",
          value: 2,
        },
        {
          label: "下级总数",
          value: 3,
        },
      ],
      options2: [
        {
          label: "升序",
          value: 0,
        },
        {
          label: "降序",
          value: 1,
        },
      ],
      //列表
      Members: [],
      //上拉加载更多
      page: 0, //总页面数量
      pageIndex: 0, //当前页面
      pageCount: 10, //一页显示个数
      loadStatus: "loadmore",
      BeiZhu: false,
      currUserID: undefined,
    };
  },
  onLoad(option) {
    //初始化参数
    console.log("-1111", this.$store.getters, option.UserID);
    this.currUserID = option.UserID;
    this.sort = 0;
    this.state = 0;
    this.getOrderList(0);
    uni.$on("changeUserDisabled", (res) => {
      this.Members.find((p) => p.UserID === res.UserID).Disabled = res.Disabled;
    });
  },
  onunload() {
    uni.$off("changeUserDisabled");
  },
  methods: {
    // 页面数据
    async getOrderList(pageIndex) {
      if (pageIndex) {
        if (pageIndex + 1 > this.page) {
          this.loadStatus = "nomore";
          return;
        }
      }
      //Sort:排序1升序 0 降序；筛选条件 下级总数||月业绩||月推广|| 今日推广
      let filter = { Sort: this.sort };
      switch (this.state) {
        case 0:
          filter.Tody = 1;
          break;
        case 1:
          filter.Incom = 1;
          break;
        case 2:
          filter.Spread = 1;
          break;
        case 3:
          filter.Lower = 1;
          break;
      }
      const params = {
        FilterData: filter,
        PageIndex: pageIndex,
        currUserID: this.currUserID, 
        PageCount: this.pageCount,
      };
      const res = await this.$api.LowerList(params);
      console.log(
        "--pageIndex--",
        this.pageIndex,
        "--我的下级数据--",
        JSON.stringify(res.data)
      );
      this.page = Math.ceil(res.data.Count / this.pageCount); //总页数
      this.Members.push(...res.data.List);
      this.pageIndex++;
    },
    getRoleName(r) {
      return this.$customEnum.Identity[r];
    },
    //工具类
    timeConvert(time, format) {
      return timeConvert(time, format);
    },
    //顶部筛选
    change1(index) {
      this.state = index;
      this.loadStatus = "loadmore";
      this.pageIndex = 0;
      this.Members = [];
      this.getOrderList(this.pageIndex);
    },
    change2(index) {
      this.sort = index;
      this.loadStatus = "loadmore";
      this.pageIndex = 0;
      this.Members = [];
      this.getOrderList(this.pageIndex);
    },
    toLowLevel(msg) {
      console.log("----", JSON.stringify(msg));
      uni.navigateTo({
        url: `./detail?Msg=${JSON.stringify(msg)}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.centre {
  text-align: center;
  margin: 200rpx auto;
  font-size: 32rpx;
  image {
    width: 164rpx;
    height: 164rpx;
    border-radius: 50%;
    margin-bottom: 20rpx;
  }
  .tips {
    font-size: 24rpx;
    color: #999999;
    margin-top: 20rpx;
  }
  .btn {
    margin: 80rpx auto;
    width: 200rpx;
    border-radius: 32rpx;
    line-height: 64rpx;
    color: #ffffff;
    font-size: 26rpx;
    background: linear-gradient(
      270deg,
      rgba(249, 116, 90, 1) 0%,
      rgba(255, 158, 1, 1) 100%
    );
  }
}
.wrap {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top));
  width: 100%;
}
.lowLevel-list {
  width: 100%;
  padding: 20upx 0 120upx 0;

  .tis {
    width: 100%;
    height: 60upx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32upx;
  }

  .row {
    width: calc(92%);
    height: calc(22vw + 40upx);
    margin: 20upx auto;

    border-radius: 15upx;
    box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    z-index: 4;
    border: 0;

    .menu {
      .icon {
        color: #fff;
        // font-size: 25upx;
      }

      position: absolute;
      width: 30%;
      height: 100%;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: red;
      color: #fff;
      z-index: 2;
    }

    .carrier {
      @keyframes showMenu {
        0% {
          transform: translateX(0);
        }

        100% {
          transform: translateX(-30%);
        }
      }

      @keyframes closeMenu {
        0% {
          transform: translateX(-30%);
        }

        100% {
          transform: translateX(0);
        }
      }

      &.open {
        animation: showMenu 0.25s linear both;
      }

      &.close {
        animation: closeMenu 0.15s linear both;
      }

      background-color: #fff;

      .checkbox-box {
        padding-left: 20upx;
        flex-shrink: 0;
        height: 22vw;
        margin-right: 20upx;
      }

      position: absolute;
      width: 100%;
      padding: 0 0;
      height: 100%;
      z-index: 3;
      display: flex;
      align-items: center;

      .goods-info {
        width: 100%;
        display: flex;
        padding-right: 20upx;

        .img {
          width: 22vw;
          height: 22vw;
          border-radius: 90upx;
          overflow: hidden;
          flex-shrink: 0;
          margin-right: 10upx;

          image {
            width: 22vw;
            height: 22vw;
          }
        }

        .info {
          width: 100%;
          height: 22vw;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          position: relative;

          .title {
            width: 100%;
            font-size: 28upx;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            // text-align: justify;
            overflow: hidden;
          }

          .spec {
            font-size: 28upx;
            background-color: #f3f3f3;
            color: #a7a7a7;
            height: 30upx;
            display: flex;
            align-items: center;
            padding: 0 10upx;
            border-radius: 15upx;
            margin-bottom: 20vw;
          }

          .price-number1 {
            position: absolute;
            width: 91.5%;
            bottom: 35upx;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-size: 28upx;
            height: 60upx;

            .number {
              display: flex;
              justify-content: center;
              align-items: flex-end;

              .input {
                width: 60upx;
                height: 60upx;
                margin: 0 10upx;
                background-color: #f3f3f3;

                input {
                  width: 60upx;
                  height: 60upx;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  font-size: 26upx;
                }
              }

              .sub,
              .add {
                width: 45upx;
                height: 45upx;
                background-color: #f3f3f3;
                border-radius: 5upx;

                .icon {
                  font-size: 22upx;
                  width: 45upx;
                  height: 45upx;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }

          .price-number {
            position: absolute;
            width: 100%;
            bottom: 0upx;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-size: 28upx;
            height: 60upx;

            .number {
              display: flex;
              justify-content: center;
              align-items: flex-end;

              .input {
                width: 60upx;
                height: 60upx;
                margin: 0 10upx;
                background-color: #f3f3f3;

                input {
                  width: 60upx;
                  height: 60upx;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  font-size: 26upx;
                }
              }

              .sub,
              .add {
                width: 45upx;
                height: 45upx;
                background-color: #f3f3f3;
                border-radius: 5upx;

                .icon {
                  font-size: 22upx;
                  width: 45upx;
                  height: 45upx;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
