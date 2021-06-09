<template>
	<view>
		<view class="u-m-p-50 bg-white">
			<view class="u-demo-area u-flex u-row-center">
				<u-dropdown :close-on-click-mask="mask" ref="uDropdown">
					<u-dropdown-item @change="change1" v-model="value1" title="是否核销" :options="options1"></u-dropdown-item>
					<u-dropdown-item @change="change2" v-model="value2" title="排序" :options="options2"></u-dropdown-item>
				</u-dropdown>
			</view>
		</view>
		<view class="wrap">
			<scroll-view loading='true' v-if="this.orderList.length" scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
				<view class="page-box">
					<view class="order" v-for="(item, index) in orderList" :key="index">
						<view class="top">
							<view class="left">
								<view class="store">{{item?orderState(item.state):'未知状态' }}</view>
							</view>
							<view class="right">{{ item.state === 2?'2021-01-02 15:02:00':'' }}</view>
						</view>
						<view class="item">
							<view class="left"><image :src="item.icon[0]" mode="aspectFill"></image></view>
							<view class="content">
								<view>下单时间 {{ timeConvert(item.time,'{y}-{m}-{d} {h}:{i}:{s}') }}</view>
								<view>核销码:{{item.code}}</view>
								<view>用户手机:{{item.phone}}</view>
							</view>
						</view>
					</view>
					<u-loadmore :status="loadStatus" bgColor="#f2f2f2"></u-loadmore>
				</view>
			</scroll-view>
			<!-- 没有订单 -->
			<scroll-view v-else scroll-y style="height: 100%;width: 100%;">
				<view class="page-box">
					<view>
						<view class="centre">
							<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
							<view class="explain">
								您还没有相关的订单
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import timeConvert from '../../../utils/timeConvert.js'
export default {
	data() {
		return {
			MerchantID:undefined,//商户id
			state:0,//Sort 0 升序 1降序  state 0 全部 1-待核销 2--已核销 3--已过期
			sort:0,
			//顶部下拉列表
			mask:true,
			value1:0,
			value2:0,
			options1: [{
					label: '全部',
					value: 0,
				},
				{
					label: '待核销',
					value: 1,
				},
				{
					label: '已核销',
					value: 2,
				},
				{
					label: '已过期',
					value: 3,
				}
			],
			options2: [{
					label: '最新订单在前',
					value: 0,
				},
				{
					label: '历史订单在前',
					value: 1,
				},
			],
			//列表
			orderList: [],
			//上拉加载更多
			page:0,//总页面数量
			pageIndex:0,//当前页面
			pageCount:10,//一页显示个数
			loadStatus: 'loadmore'
		};
	},
	onLoad() {
		//初始化参数
		this.MerchantID = this.$store.getters.MerchantID
		console.log('-1111',this.$store.getters);
		this.sort = 0
		this.state = 0
		this.getOrderList(0);
	},
	methods: {
		// 页面数据
		async getOrderList(pageIndex) {
			//Sort 0 升序 1降序  state 0 全部 1-待核销 2--已核销 3--已过期
			//当前页是0，直接请求；当前页面非0，判断是否超过总页面
			if(pageIndex){
				if(pageIndex + 1 > this.page) {
					this.loadStatus = 'nomore'
					return
				}
			}
			const params ={
				MerchantID:this.$store.getters.MerchantID,
				Sort:this.sort,
				State:this.state,
				PageIndex:pageIndex,
				PageCount:this.pageCount
				}
			const res = await this.$api.OrderList(params)
			this.page = Math.ceil(res.data.count/this.pageCount)//总页数
			this.orderList.push(...res.data.details)
			this.pageIndex++
		},
		//工具类
		timeConvert(time,format){
			return timeConvert(time,format)
		},
		orderState(val){
			if(val === 1){
				return '待核销'
			}else if(val === 2){
				return '已核销'
			}else if(val === 3){
				return '已过期'
			}else{
				return '未知状态'
			}
		},
		//顶部筛选
		change1(index) {
			this.state = index
			this.loadStatus = 'loadmore'
			this.pageIndex = 0
			this.orderList = []
			this.getOrderList(this.pageIndex)
		},
		change2(index) {
			this.sort = index
			this.loadStatus = 'loadmore'
			this.pageIndex = 0
			this.orderList = []
			this.getOrderList(this.pageIndex)
		},
		//底部加载更多
		reachBottom() {
			if(this.loadStatus === 'nomore') return
			this.loadStatus = 'loading'
			setTimeout(() => {
				this.getOrderList(this.pageIndex)
			},1000)
		}
	}
};
</script>

<style lang="scss" scoped>
.order {
	width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.store {
				margin: 0 10rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.right {
			color: $u-type-warning-dark;
		}
	}
	.item {
		display: flex;
		justify-content: space-around;
		margin: 20rpx 0 0;
		.left {
			margin-right: 20rpx;
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			.title {
				font-size: 28rpx;
				line-height: 50rpx;
			}
			.type {
				margin: 10rpx 0;
				font-size: 24rpx;
				color: $u-tips-color;
			}
			.delivery-time {
				color: #e5d001;
				font-size: 24rpx;
			}
		}
	}
	.total {
		margin-top: 20rpx;
		text-align: right;
		font-size: 24rpx;
		.total-price {
			font-size: 32rpx;
		}
	}
	.bottom {
		display: flex;
		margin-top: 40rpx;
		padding: 0 10rpx;
		justify-content: space-between;
		align-items: center;
		.btn {
			line-height: 52rpx;
			width: 160rpx;
			border-radius: 26rpx;
			border: 2rpx solid $u-border-color;
			font-size: 26rpx;
			text-align: center;
			color: $u-type-info-dark;
		}
		.evaluate {
			color: $u-type-warning-dark;
			border-color: $u-type-warning-dark;
		}
	}
}
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
		background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>
