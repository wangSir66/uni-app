import config from '@/settings.js'

const request = {}
const headers = {}
    
request.globalRequest = (url, method, data, power,showLoading) => {
	if(showLoading){
		uni.showLoading({
		   mask: true,
		   title: '请稍候...'
		  })	}
/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
== 不通过access_token校验的接口
== 文件下载接口列表
== 验证码登录 */
        
    switch (power){
		case 1:
			headers['content-type'] = 'application/json'
			headers['token'] = 'f64db882-0e67-5127-9cb5-e8e8d0c60b39'
			break;
        case 2:
            headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
            break;
        case 3:
            headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
            break;
        case 4:
            responseType = 'blob'
            break;
        default:
            headers['Authorization'] = `Bearer ${
                this.$store.getters.userInfo
            }`
            headers['TENANT-ID'] = this.$store.getters.userInfo.tenant_id
            break;
    }
            console.log('-0-0-',config.url_config + url);
				return new Promise((resolve,reject) => {
					uni.request({
							url: config.url_config + url,
							method,
							data: data,
							header: headers,
							success: (res) => {
								if(showLoading){
									setTimeout(() => {
										uni.hideLoading()
									}, 500)
								}
								if (res.data.error) {
									if(res.data.error.message === '登录已失效'){
										uni.showModal({ 
											title: "提示",  
											content: '登录失效，请重新登录', 
											 showCancel:false,
											success: (res) => {
												if (res.confirm) {
													uni.removeStorage({
														key:'code'
													})
													plus.runtime.restart();  
												}  
											},
										}) 
									}else{
										uni.showToast({
											title: res.data.error.message,
											icon: 'none',
											duration: 3000
										})
										reject(res)
									}
								}
								resolve(JSON.parse(JSON.stringify(res)))
							},
							fail: (res) => {
								uni.showToast({
									title:"网络不给力，请稍后再试~",
									icon:'none'
								})
								reject(res)
							}
						})
				}).catch((e)=>{
					console.log('error:',e);
				}) 
 } 

export default request