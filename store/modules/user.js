const state = {
	MerchantID: undefined,
	Balance: undefined,
	Phone: undefined,
	UserInfo: undefined
}
const mutations = {
	SET_MerchantID: (state, MerchantID) => {
		state.MerchantID = MerchantID
	},
	SET_Balance: (state, Balance) => {
		state.Balance = Balance
	},
	SET_Phone: (state, Phone) => {
		state.Phone = Phone
	},
	SET_UserInfo: (state, info) => {
		state.UserInfo = info
		console.log('info',info)
	}
}

const actions = {
	//保存用户信息
	saveUserinfo({ commit }, userinfo) {
		commit('SET_MerchantID', userinfo.userId)
		commit('SET_Phone', userinfo.phone)
		commit('SET_UserInfo', userinfo)
	}
}
export default {
	state,
	mutations,
	actions
}