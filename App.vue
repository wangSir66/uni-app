<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
				this.$store.commit('Set_Version', widgetInfo.version)
				this.$api.AppVersion().then(result => {
					console.log('--0',result);
					if (result.data.error) return
					var data = result.data;
					switch (uni.getSystemInfoSync().platform) {
						case 'android':
							console.log('安卓设备')
							this.checkUpdate(data,data.AndroidVersion,data.AndroidDownloadUrl,widgetInfo)
							break;
						case 'ios':
							console.log('ios设备')
							this.checkUpdate(data,data.iOSVersion,data.iOSDownloadUrl,widgetInfo)
							break;
						default:
							console.log('运行在开发者工具上')
							break;
					}
				})
			});
			// #endif
		},
		methods: {
			/* 检查更新，分为整包更新和热更新 */
			checkUpdate(data,version,downloadUrl,widgetInfo) {
				if (version === widgetInfo.version) return //无更新
				var resultVersions = version.split('.');
				var currentVersions = widgetInfo.version.split('.');
				if (currentVersions[0] < resultVersions[0]) { // 说明有大版本更新
					uni.clearStorage()
					uni.setStorage({
						key: 'update',
						data: true
					})
					uni.showModal({ //提醒用户更新  
						title: "更新提示",
						content: '是否整包升级？',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								uni.setStorage({
									key: 'update',
									data: false
								})
								plus.runtime.openURL(downloadUrl);
							} else {
								plus.runtime.quit();
							}
						},
					})
				} else if (currentVersions[0] === resultVersions[0]) { // 小版本更新  
					if (currentVersions[1] > resultVersions[1]) return
					if (currentVersions[1] === resultVersions[1]) {
						if (!(currentVersions[2] < resultVersions[2])) return
					}
					uni.clearStorage()
					uni.setStorage({
						key: 'update',
						data: true
					})
					uni.showModal({ //提醒用户更新
						title: "更新提示",
						content: '是否进行资源更新？',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								var download = plus.downloader.createDownload(data.ResUrl, {}, (d, status) => {
									if (status == 200) {
										plus.runtime.install(d.filename, {
											force: false
										}, function() {
											plus.runtime.restart();
										}, function(e) {
											uni.showToast({
												title: e.message,
												icon: 'none',
												duration: 4000
											})
										});
									} else {
										uni.showToast({
											title: '更新失败',
											icon: 'none'
										})
									}
								});
								download.start()
								var prg = 0;
								var showLoading = plus.nativeUI.showWaiting("正在下载"); //创建一个showWaiting对象 
								showLoading.onclose = () => {
									plus.runtime.restart()
								}
								download.addEventListener('statechanged', function(task, status) {
									// 给下载任务设置一个监听 并根据状态  做操作
									switch (task.state) {
										case 1:
											showLoading.setTitle("正在下载");
											break;
										case 2:
											showLoading.setTitle("已连接到服务器");
											break;
										case 3:
											prg = parseInt(
												(parseFloat(task.downloadedSize) /
													parseFloat(task.totalSize)) *
												100
											);
											showLoading.setTitle("  正在下载" + prg + "%  ");
											break;
										case 4:
											uni.setStorage({
												key: 'update',
												data: false
											})
											showLoading.onclose = () => {}
											plus.nativeUI.closeWaiting();
											//下载完成
											break;
									}
								});
							} else {
								plus.runtime.quit();
							}
						}
					})
				}
			}
		},
		onShow: function() {
			console.log('App Show', process.env.NODE_ENV)
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import "common/colorUI/icon.css";
	@import "common/colorUI/main.css";
	@import 'common/scss/common.scss';
	@import 'common/uni.css';
</style>
