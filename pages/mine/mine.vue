<template>
	<view>
		<u-navbar :is-back="false" title="　" :border-bottom="false">
		</u-navbar>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">超人不会飞</view>
				<view class="u-font-14 u-tips-color">手机号:{{$store.getters.Phone || '******'}}</view>
			</view>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="rmb-circle" title="余额">
					<span style="margin-right: 220upx;">{{$store.getters.Balance}}元</span>提现
				</u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="phone" title="手机号">
					更改
				</u-cell-item>
				<u-cell-item icon="fingerprint" title="登录密码">设置</u-cell-item>
				<u-cell-item icon="server-man" title="联系客服"></u-cell-item>
				<u-cell-item icon="level" title="当前版本">{{$store.getters.Version}}</u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="download" title="游戏下载链接"></u-cell-item>
				<u-cell-item icon="download" title="助手下载链接"></u-cell-item>
				<u-cell-item icon="file-text" title="用户协议"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<view style="text-align: center;padding:25rpx 0;" @tap="logout">退出</view>
			</u-cell-group>
		</view>
		<!-- 底部导航栏 -->
		<u-tabbar
		    v-model="current"
		    :show="show"
		    :bg-color="bgColor"
		    :border-top="borderTop"
		    :list="list"
			:mid-button="midButton"
			:inactive-color="inactiveColor"
			:activeColor="activeColor"
		></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'/static/start/start.png',
				show:true,
				current: 1,
				show: true,
				bgColor: '#ffffff',
				borderTop: true,
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						pagePath:'/pages/merchant/main/main',
						count: 0,
						isDot: true,
						customIcon: false,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						pagePath:'/pages/mine/mine',
						count: 0,
						isDot: false,
						customIcon: false,
					},
				],
				midButton: false,
				inactiveColor: '#909399',
				activeColor: '#5098FF'
			}
		},
		methods: {
			scan(){
				uni.scanCode({
					success: (res) => {
						console.log('--',res);
						plus.runtime.openURL(res.result)
					}
				})
			},
			logout(){
				uni.clearStorage()
				uni.navigateTo({
					url:'../login/loginRole'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #ededed;
	}
.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
