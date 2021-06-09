<template>
	<view>
		<view class="header text-center" style="padding-top: 3rem;">
			<view class="text-bold text-black text-xl">{{appTitle}}</view>
			<view class="text-black">{{agentPhone}}</view>
			<view class="text-black">{{appWelcomeText}}</view>
		</view>
		<view class="card-item" style="margin:20rpx;">
			<view class="card-item-content uni-flex uni-row">
				<view v-for="(item,index) in dataList" :key="index" class="flex-sub">
					<view>{{item.title}}</view>
					<view class="text-bold">{{item.value || 0}}</view>
				</view>
			</view>
		</view>
		<view class="card-item" v-for="(card,index) in featuresList" :key="index" style="margin:20rpx;">
			<view class="card-item-header">{{card.title}}</view>
			<view class="card-item-content uni-flex uni-row">
				<view v-for="( item, index1 ) in card.agentContentList" :key="index1" @tap="navigator(item.url)">
					<view class="icon-wrap">
						<image :src="'../../static/main/' + item.icon + '.png'" mode=""></image>
					</view>
					<view>{{ item.text }}</view>
				</view>
			</view>
		</view>
		<!-- 底部导航栏 -->
		<u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list"
			:mid-button="midButton" :inactive-color="inactiveColor" :activeColor="activeColor"></u-tabbar>
		<!-- 输入核销码对话框 -->
		<u-modal ref="uInputModal" title="核销码" v-model="codeDialogShow" :title-style="{fontSize:'45rpx'}"
			:show-cancel-button="true" @confirm="confirmInput" confirm-text="查询">
			<u-input v-model="code" placeholder="请输入十六位数核销码" :focus="true" type="number" maxlength="16"
				style="margin: 10rpx 50rpx 0 50rpx;"></u-input>
		</u-modal>
		<!-- 展示核销券对话框 -->
		<u-modal ref="uModal" title="确认订单" v-model="dialogShow" :title-style="{fontSize:'45rpx'}"
			:show-cancel-button="true" :show-confirm-button="false" @confirm="confirm" :content="content"
			cancel-text="关闭">
			<view v-if="couponShow">
				<view class="taobao">
					<view class="ticket">
						<view class="left">
							<image class="picture" :src="good.icon" mode="widthFix"></image>
							<view class="introduce">
								<view class="top">
									订单时间：{{timeConvert(good.time) || '2020-03-18'}}
								</view>
								<view class="type">核销码：{{good.code || '2021031263153786'}}</view>
								<view class="date u-line-1">用户手机:{{good.phone || '13022225565'}}</view>
							</view>
						</view>
						<view class="right">
							<view class="use immediate-use" :round="true" @click="writeOff">去核销</view>
						</view>
					</view>
				</view>
			</view>
		</u-modal>
		<!-- 展示比赛权限 -->
		<u-popup v-model="matchShow" mode="center" :closeable="true">
			<u-card title="比赛区域">
				<view style="display: flex;justify-content: space-around;" slot="body">
					<view>地区1</view>
					<view>地区2</view>
					<view>地区3</view>
				</view>
			</u-card>
			<u-card title="比赛游戏">
				<view style="display: flex;justify-content: space-around;" slot="body">
					<view style="margin-right:30rpx ;">游戏名称</view>
					<view style="margin-right:30rpx ;">游戏名称</view>
					<view>游戏名称</view>
				</view>
				<view style="display: flex;justify-content: space-around;" slot="body">
					<view style="margin-right:30rpx ;">游戏名称</view>
					<view style="margin-right:30rpx ;">游戏名称</view>
					<view>游戏名称</view>
				</view>
				<view style="display: flex;justify-content: space-around;" slot="body">
					<view style="margin-right:30rpx ;">游戏名称</view>
					<view style="margin-right:30rpx ;">游戏名称</view>
					<view>游戏名称</view>
				</view>
			</u-card>
		</u-popup>
	</view>
</template>
<script>
	import timeConvert from '../../../utils/timeConvert.js'
	export default {
		data() {
			return {
				dataList: [{
						title: '今日订单',
						value: 500
					},
					{
						title: '今日XX',
						value: 500
					},
					{
						title: '今日收入',
						value: 500
					},
					{
						title: '余 额',
						value: 505445.5
					}
				],
				current: 0,
				show: true,
				bgColor: '#ffffff',
				borderTop: true,
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						pagePath: '/pages/merchant/main/main',
						text: '首页',
						count: 0,
						isDot: true,
						customIcon: false,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						pagePath: '/pages/mine/mine',
						text: '我的',
						count: 0,
						isDot: false,
						customIcon: false,
					},
				],
				midButton: false,
				inactiveColor: '#909399',
				activeColor: '#5098FF',
				//核销码对话框
				codeDialogShow: false,
				//
				showCancel: false,
				confirmText: '', //底部按钮
				code: '', //核销码
				title: '核销码',
				dialogShow: false,
				content: '慈母手中线，游子身上衣',
				contentSlot: false,
				showTitle: true,
				asyncClose: false,
				//核销码输入
				mode: 'middleLine',
				maxlength: 16,
				bold: true,
				//优惠券
				couponShow: false,
				good: {}, //商品参数
				//核销按钮
				hairLine: true,
				type: 'primary',
				size: 'default',
				shape: 'square',
				plain: false,
				ripple: true,
				loading: false,
				//比赛权限展示
				matchShow: false
			}
		},
		computed: {
			appTitle(){
				console.warn('商户助手')
				if(Number(this.role) === 0){
					return 'xxxx推广系统'
				}else{
					return '商户助手'
				}
			},
			appWelcomeText(){
				if(Number(this.role) === 0){
					return `欢迎【管理员】登录推广系统，你的推广码：123456`
				}else{
					return `欢迎【商户${this.$store.getters.Phone}】登录系统！`
				}
			},
			agentPhone(){
				if(Number(this.role) === 0){
					return `手机：${this.$store.getters.Phone}`
				}else{
					return ''
				}
			},
			featuresList() {
				if (Number(this.role) === 1) {
					return [{
						title: '核销相关',
						agentContentList: [{
								icon: 'input',
								text: '输入核销码',
								url: '../code/input'
							},
							{
								icon: 'scan',
								text: '扫码核销',
								url: '../code/scan'
							},
							{
								icon: 'shopping_cart',
								text: '订单详情',
								url: '../order/detail'
							},
							{
								icon: 'earning',
								text: '收入提现',
								url: '../income/withdraw'
							},
						]
					}, ]
				} else if (Number(this.role) === 0) {
					return [{
							title: '下级相关',
							agentContentList: [{
									icon: 'authorize',
									text: '开通下级',
									url: '../lowlevel/create'
								},
								{
									icon: 'log',
									text: '开通记录',
									url: '../lowlevel/log'
								},
								{
									icon: 'team',
									text: '我的下级',
									url: '../lowlevel/myLowlevel'
								},
								{
									icon: 'game',
									text: '我的比赛权限',
									url: '../match/permission'
								}
							]
						},
						{
							title: '比赛推广',
							agentContentList: [{
									icon: 'award',
									text: '今日比赛',
									url: '../match/todayMatch'
								},
								{
									icon: 'week',
									text: '七日比赛',
									url: '../match/weekMatch'
								},
								{
									icon: 'tuiguang',
									text: '推广二维码',
									url: '../order/detail'
								}
							]
						},
						{
							title: '收入数据',
							agentContentList: [{
									icon: 'earning',
									text: '收入明细',
									url: '../code/input'
								},
								{
									icon: 'cash',
									text: '提现',
									url: '../code/scan'
								}
							]
						}
					]
				}
			}
		},
		onLoad(option) {
			console.log('--11', this.$store.getters.Phone, option.role);
			this.role = option.role
			console.log('--12', this.$store.getters.MerchantID);
			this.Main()
		},
		methods: {
			//请求首页数据
			Main() {
				const param = {
					MerchantID: this.$store.getters.MerchantID
				}
				this.$api.Main(param).then(res => {
					if (Number(this.role) === 1) {
						this.dataList[0].value = res.data.Order
						this.dataList[1].value = res.data.WriteOff
						this.dataList[2].value = res.data.Income
						this.dataList[3].value = res.data.Remain
						this.$store.commit('SET_Balance', res.data.Remain)
					} else {

					}
				})
			},
			navigator(e) {
				if (e === '../code/input') {
					this.code = ''
					this.codeDialogShow = true
				} else if (e === '../code/scan') {
					this.scan()
				} else if (e === '../match/permission') {
					this.matchShow = true
				} else {
					console.log(e);
					uni.navigateTo({
						url: e
					})
				}
			},
			//输入核销码
			confirmInput() {
				if (!this.code || this.code === '' || this.code.length < 16) {
					uni.showToast({
						title: '核销码有误',
						icon: 'none'
					})
					return false
				}
				this.queryOrder()
			},
			//查询订单
			confirm() {
				this.queryOrder()
			},
			async queryOrder() {
				const params = {
					MerchantID: this.$store.getters.MerchantID,
					Code: this.code
				}
				const res = await this.$api.OrderMsg(params)
				this.good = res.data
				this.code = Number(this.code)
				this.dialogShow = true
				this.couponShow = true
			},
			//核销
			async writeOff() {
				const params = {
					MerchantID: this.$store.getters.MerchantID,
					Code: this.code
				}
				const res = await this.$api.WriteOff(params)
				console.log('--11', res);
				if (!res.data.error) {
					uni.showToast({
						title: '核销成功',
						icon: 'none'
					})
					this.dialogShow = false
				}
			},
			finish(e) {
				//检测输入是否正常
				console.log('---', e);
				this.code = e
			},
			//扫码核销
			scan() {
				uni.scanCode({
					success: async (res) => {
						this.code = res.result
						if (this.code) {
							//确认订单
							this.queryOrder()
						}
					}
				})
			},
			//工具类
			timeConvert(time) {
				return timeConvert(time, '{y}-{m}-{d} {h}:{i}:{s}')
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #ededed;
	}

	.header {
		background-image: linear-gradient(40deg, rgb(210, 166, 95) 0%, rgb(239, 201, 142) 100%);
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
