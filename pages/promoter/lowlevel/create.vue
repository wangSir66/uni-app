<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :error-type="['message']">
			<u-form-item label-position="left" label="推广员级别" prop="lowlevelType" label-width="170">
				<u-radio-group v-model="model.lowlevelType" @change="radioGroupChange">
					<u-radio shape="circle" v-for="(item, index) in radioList" :key="index" :name="item.name">{{ item.name }}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" label-position="left" label="手机号码" prop="phone" label-width="170">
				<u-input :border="false" placeholder="请输入要添加为推广员的手机号" v-model="model.phone" type="number" maxlength="11"></u-input>
			</u-form-item>
			<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" label-position="left" label="备注" prop="beizhu" label-width="170">
				<u-input :border="false" placeholder="请输入备注信息" v-model="model.beizhu"></u-input>
			</u-form-item>
			<u-form-item>
				<span class="text-red">
					{{tip}}
				</span>
			</u-form-item>
		</u-form>
		<u-button type="primary" @click="submit" :loading="userLoading">查询用户信息</u-button>
		<!--展示查询结果-->
		<u-card v-if="showResult">
			<view slot="head" class="text-center text-bold text-xl">
				查询结果
			</view>
			<view class="" slot="body">
				<view class="text-center margin-bottom text-red">
					{{queryTip}}
				</view>
				<view v-if="!phoneUsed" class="text-center">
					<span style="margin-right:20rpx ;">分成比例设置：</span>
					<u-number-box v-model="ratio" input-width="160" color="red" :max="100"></u-number-box>
				</view>
			</view>
			<view v-if="!phoneUsed" slot="foot">
				<u-button type="primary" @click="handleConfirm">确定开通</u-button>
			</view>
		</u-card>
		<u-modal :value="showModal" :show-cancel-button="true" @confirm="confirm" @cancel="cancel" :contentStyle="{textAlign:'center'}">
			<view>开通比例：<span class="text-red">{{ratio}}%</span></view>
			<view>备注：<span class="text-red">{{this.model.beizhu}}</span></view>
		</u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return {
				model:{
					lowlevelType:'一级推广员',
					phone:'',
					beizhu:''
				},
				radioList: [
					{
						name: '一级推广员',
						checked: true,
						disabled: false
					}
				],
				ratio:0,
				showModal:false,
				queryTip:'',
				rules:{
					lowlevelType: [
						{
							required: true,
							message: '请选择任意一种推广员级别',
							trigger: 'blur',
						}
					],
					phone:[
						{
							required: true,
							message: '请输入手机号',
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['blur'],
						}
					]
				},
				showResult:false,
				phoneUsed:false,
				userLoading:false
			}
		},
		computed:{
			tip(){
				if(this.model.lowlevelType === '一级推广员'){
					return '注:一级推广员可以开通二级推广员'
				}else if(this.model.lowlevelType === '二级推广员'){
					return '注:二级推广员可以开通三级推广员'
				}else{
					return '注:三级推广员无权开通下级'
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods:{
			// radio选择发生变化
			radioGroupChange(e) {
				this.model.lowlevelType = e;
			},
			submit(){
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						try{
							this.userLoading = true
							console.log('验证通过');
							this.showResult = true
							//TODO-调接口查询
							const param = {Phone:this.model.phone}
							const res = await this.$api.QueryPhone(param)
							console.log('--ss',res);
							this.userLoading = false
							if(!res.data){
								this.queryTip = '该手机号可以开通代理'
								this.phoneUsed = false
							}else{
								this.queryTip = '该手机号被占用'
								this.phoneUsed = true
							}
						}catch(e){
							//TODO handle the exception
							console.log(e);
						}
					} else {
						console.log('验证失败');
					}
				});
			},
			handleConfirm(){
				this.showModal = true
			},
			async confirm(){
				//todo开通接口
				const param = {Account:this.model.phone,Remarks:this.model.beizhu,ShareRatio:this.ratio}
				const res = await this.$api.LowerLevel(param)
				console.log('--0',res);
				if(res.data){
					this.showToast('开通成功','success')
					uni.navigateBack({ delta: 1 });
				}else{
					this.showToast('开通失败','error')
				}
				this.showResult = false
				this.showModal = false
			},
			cancel(){
				this.showModal = false
			},
			showToast(tip,type){
				this.$refs.uToast.show({
					title: tip,
					type: type
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.wrap {
	padding: 30rpx;
}
.u-body-item {
	font-size: 32rpx;
	color: #333;
	padding: 20rpx 10rpx;
}
</style>
