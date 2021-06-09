let url_config = ""
let  token = 'f64db882-0e67-5127-9cb5-e8e8d0c60b39'
if(process.env.NODE_ENV === 'development'){
    // 开发环境
	url_config = 'http://192.168.10.110:60001/'
	// url_config = 'http://47.108.135.51:60001/'
}else{
    // 生产环境
	url_config = 'http://47.108.135.51:60001/'
	// url_config = 'http://192.168.10.43:60001/'
}

export default { 
	url_config,
	token
}