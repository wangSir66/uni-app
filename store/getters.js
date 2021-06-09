const getters = {
	MerchantID:state => state.user.MerchantID,
	Balance:state => state.user.Balance,
	Phone:state => state.user.Phone,
	Version:state => state.version.version,
	UserInfo:state => state.user.UserInfo
}
export default getters