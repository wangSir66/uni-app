<template>
	<view style="padding-top:30rpx ;">
		<view v-for="item in matchList" :key="item" class="card-item" style="height: 200rpx;" @click="detail(item)">
				<u-row>
					<u-col span="2" style="text-align: center;height: 200rpx;display: flex;flex-direction: column;justify-content: space-around;">
						<u-image src="../../../static/lowlevel/default.png" width="110rpx" height="110rpx"></u-image>
						<div style="font-weight: bold;font-size: smaller;">我的推广</div>
					</u-col>
					<u-col span="8" style="height: 200rpx;">
						<view style="height: 100%;display: flex;flex-direction: column;justify-content: space-around;">
							<view>
								<u-row>
									<u-col span="4" style="text-align: center;">
										<div style="font-weight: bold;">比赛名称</div>
										<div>游戏名称</div>
									</u-col>
									<u-col span="4" style="text-align: center;">
										<div style="font-weight: bold;">500钻石</div>
										<div>16/64</div>
									</u-col>
									<u-col span="4" style="text-align: center;">
										<div>16:00</div>
										<div>即将开始</div>
									</u-col>
								</u-row>
							</view>
							<view style="background-color: #0A98D5;">
								<u-row>
									<view style="width: 100%;display: flex;justify-content: space-around;">
										<div><u-icon name="account"></u-icon><span style="font-weight: bold;">(我)5人</span></div>
										<div><u-icon name="account-fill"></u-icon><span style="font-weight: bold;">(代)5人</span></div>
									</view>
								</u-row>
							</view>
						</view>
					</u-col>
					<u-col span="2" style="background-color: #d7d7d7; height: 200rpx;line-height: 200rpx;text-align: center;">推广</u-col>
				</u-row>
			</view>
			<u-popup v-model="show" mode="center" :closeable="true" style="padding:20rpx;">
				<view style="margin: 50rpx;">
					<view>2020-11-11 19:00:00</view>
					<view>报名人数：64人</view>
					<view>开赛前XXX停止报名</view>
					<view>报名费用：500钻石 业绩：5</view>
					<view>赛事奖励</view>
					<view style="display: flex;justify-content: space-between;">
						<u-image width="120rpx" height="120rpx" src="http://match-99.oss-cn-chengdu.aliyuncs.com/34051621e625d2d7fa1e91c699e98ffc.jpeg"></u-image>
						<u-image width="120rpx" height="120rpx" src="http://match-99.oss-cn-chengdu.aliyuncs.com/34051621e625d2d7fa1e91c699e98ffc.jpeg"></u-image>
						<u-image width="120rpx" height="120rpx" src="http://match-99.oss-cn-chengdu.aliyuncs.com/34051621e625d2d7fa1e91c699e98ffc.jpeg"></u-image>
					</view>
				</view>
			</u-popup>
		<view style="width: 90%;margin: 0 auto;">
			<u-button type="primary">全部推广</u-button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				matchList:[1,2],
				show:false
			}
		},
		methods:{
			detail(item){
				console.log(item);
				this.show = true
			}
		}
	}
</script>

<style scoped>
	page{
		background-color: #f2f2f2;
	}
</style>
