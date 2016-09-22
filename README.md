【PGComon】

        运营活动公共组件
         
注：PGCommon配置在window.PG.ready中的回调中执行，未标注为必传的字段，都为可选字段

【defaultConfig】初始化配置

var defaultParam = {

		 staticts:"/robTickets/NewZipai/Zipai",//统计接口必传
		 interfaces:interfaces,//ready回调参数必传
		 imgUrl:"https://s3.cn-north-1.amazonaws.com.cn/pg-dev/dev-liangyunzhu/loveLetter/small.png",//分享的缩略图
		 title:"嘟嘟配置的的标题",//分享标题
		 desc:"嘟嘟配置的描述"//分享的描述

	}
	window.PGCommon.defaultConfig(defaultParam);

【shareConfig】分享配置（不传参数即为初始化配置的值）

var changeConfig = {

			title:"改变的标题",//改变的标题
			desc:"改变的描述",//改变的描述
			imgUrl:"http://s3.cn-north-1.amazonaws.com.cn/pg-dev/dev-liangyunzhu/beauti/logo.png",
			status:true//status为true时，表示分享的链接拼接修改的描述和修改的图片

		}
		window.PGCommon.shareConfig(changeConfig);

【staticts】统计接口

调用方法window.PGCommon.staticts("pv");//即可拼接相应的平台字段

【versions】版本等信息判断

			trident:  //IE内核
            presto:  //opera内核
            webKit: //苹果、谷歌内核
            gecko: //火狐内核
            mobile: //是否为移动终端
            ios:  //ios终端
            android: //android终端或者uc浏览器
            iPhone: //是否为iPhone或者QQHD浏览器
            iPad: //是否iPad
            webApp:  //是否web应该程序，没有头部与底部
            weixin:  //是否微信 （2015-01-22新增）
            qq: //是否QQ
 调用方法window.PGCommon.versions


 【getQuery】获取url参数

  调用方法window.PGCommon.getQuery(name)


 【loadding】loadding调用

 注：样式写在Demo/index.css文件中，需引用该文件中的相应的样式及html标签

 window.PGCommon.loadingShow(true);//传false即消失


 【tips】tips提示调用

  注：样式写在Demo/index.css文件中，需引用该文件中的相应的样式及html标签

 window.PGCommon.showTip(message);//传入相应的message






