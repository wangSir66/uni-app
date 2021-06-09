<template>
	<view>
		<u-table :align="align" :borderColor="borderColor">
			<u-tr class="u-tr">
				<u-th class="u-th" width="300rpx">今日</u-th>
				<u-th class="u-th" width="300rpx">明日</u-th>
				<u-th class="u-th" width="300rpx">三日</u-th>
				<u-th class="u-th" width="300rpx">四日</u-th>
				<u-th class="u-th" width="300rpx">五日</u-th>
				<u-th class="u-th" width="300rpx">六日</u-th>
				<u-th class="u-th" width="300rpx">七日</u-th>
			</u-tr>
			<u-tr class="u-tr" v-for="(row,indexRow) in tableList" :key="indexRow">
				<u-td class="u-td" style="width: 300rpx;" v-for="(col,indexCol) in row" :key="indexCol">
					<view @click="detail(col.indexID)">
						<u-row>
							<u-col span="6">
								<u-tag text="64人" size="mini" shape="circleRight" type="error"></u-tag>
							</u-col>
							<u-col span="6">
								{{col.time}}
							</u-col>
						</u-row>
						<view style="min-width: 300rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
							{{col.name}}</view>
						<view>{{col.diamond}}钻</view>
					</view>
				</u-td>
			</u-tr>
		</u-table>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tableList:[
					[{indexID:1,time:'16:00',name:'血战到底',diamond:100},//1
					{indexID:1,time:'--:--',name:'---',diamond:'--'},
					{indexID:1,time:'16:00',name:'血战到底',diamond:300},
					{indexID:1,time:'16:00',name:'血战到底',diamond:400},
					{indexID:1,time:'16:00',name:'血战到底',diamond:500},
					{indexID:1,time:'16:00',name:'血战到底',diamond:600},
					{indexID:1,time:'16:00',name:'血战到底',diamond:700}],//2
					[{indexID:1,time:'16:00',name:'血战到底',diamond:100},
					{indexID:1,time:'--:--',name:'---',diamond:'--'},
					{indexID:1,time:'16:00',name:'血战到底',diamond:300},
					{indexID:1,time:'16:00',name:'血战到底',diamond:400},
					{indexID:1,time:'16:00',name:'血战到底',diamond:500},
					{indexID:1,time:'16:00',name:'血战到底',diamond:600},
					{indexID:1,time:'16:00',name:'血战到底',diamond:700}],
					[{indexID:1,time:'16:00',name:'血战到底',diamond:100},//3
					{indexID:1,time:'--:--',name:'---',diamond:'--'},
					{indexID:1,time:'16:00',name:'血战到底',diamond:300},
					{indexID:1,time:'16:00',name:'血战到底',diamond:400},
					{indexID:1,time:'16:00',name:'血战到底',diamond:500},
					{indexID:1,time:'16:00',name:'血战到底',diamond:600},
					{indexID:1,time:'16:00',name:'血战到底',diamond:700}],
				],
				borderColor: '#e4e7ed',
				align: 'center',
				thStyle: {
					width: '100rpx',
					backgroundColor: '#b50e3b'
				},
				//弹出框
				show:false
			}
		},
		methods: {
			detail(indexID){
				console.log(123,indexID);
				this.show = true
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
