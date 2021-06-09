let customEnum = {}
customEnum.Role = {
	PROMOTER: 0,//推广员
	MERCHANT: 1//商户
}
customEnum.IdNum = {
	Super: 0,
	FirstLv: 1,
	SecondLv: 2,
	ThirdLv: 3
}
customEnum.Identity = {
	[customEnum.IdNum.Super]: '超级推广员',
	[customEnum.IdNum.FirstLv]: '一级推广员',
	[customEnum.IdNum.SecondLv]: '二级推广员',
	[customEnum.IdNum.ThirdLv]: '三级推广员'
}
export default customEnum