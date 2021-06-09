<template>
	<view>
		<u-card title="玩家信息">
			<view slot="body" style="display: flex;justify-content: space-around;">
				<view style="width: 150rpx;">
					<u-image shape="circle" width="100%" height="100rpx" src="http://match-99.oss-cn-chengdu.aliyuncs.com/237abf7ef2d9084ac9165861fb9fb497.jpeg"></u-image>
				</view>
				<view>玩家昵称6个字 （ID:888888 身份：市代）</view>
			</view>
		</u-card>
		<u-table>
			<u-tr>
				<u-th>序号</u-th>
				<u-th>当月下级</u-th>
				<u-th>当月新增下级</u-th>
				<u-th>当月参赛人次</u-th>
				<u-th>当月业绩</u-th>
			</u-tr>
			<u-tr>
				<u-td>2017/07</u-td>
				<u-td>45</u-td>
				<u-td>2</u-td>
				<u-td>6789</u-td>
				<u-td>8999</u-td>
			</u-tr>
		</u-table>
	</view>
</template>

<script>
</script>

<style>
</style>
