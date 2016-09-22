
/**************************************************************************/
/*                                                                        */
/* Copyright (c)2010-2012  Pinguo Company             　　　　　　　      */
/*                 品果科技                            版权所有 2010-2012 */
/*                                                                        */
/* PROPRIETARY RIGHTS of Pinguo Company are involved in the  　　　　　　 */
/* subject matter of this material.  All manufacturing, reproduction, use,*/
/* and sales rights pertaining to this subject matter are governed by the */
/* license agreement.  The recipient of this software implicitly accepts  */
/* the terms of the license.                                              */
/* 本软件文档资料是品果公司的资产,任何人士阅读和使用本资料必须获得        */
/* 相应的书面授权,承担保密责任和接受相应的法律约束.                       */
/*                                                                        */
/**************************************************************************/

/*
@author liangyunzhu
@email liangyunzhu@camera360.com 2015/08/29
*/
;(function(window){

	var baseUrl="",
		host=location.host,
		defaultImgUrl = "http://s3.cn-north-1.amazonaws.com.cn/pg-dev/dev-liangyunzhu/beauti/logo.png",
		defaultTitle = "默认的title",
		defaultDesc = "默认的描述",
		defaultStatus = false,
		defaultLink = window.location.href;
		statictsUrl = null,
		pg = null;
		indexPosition = defaultLink.indexOf(".html")+5;
		defaultLink = defaultLink.substring(0,indexPosition);

        if(indexPosition == 4){
			defaultLink = window.location.href;
        }


	if(host=="activity.camera360.com"){
	    baseUrl="http://activity.camera360.com";
	}else{
	    baseUrl="http://activity-test.camera360.com";
	}

	 var Common={};

	     a = Common,

	     configData={
		        mode:'dev',
		        channel:'wx',
		        appName:'cc',
		        WXRegisterUrl:'http://activity.camera360.com/wechat/oauth/GetSha1Str', //微信获取ticket的服务器接口地址
		        debug:false
		    };

	 a.versions = function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq", //是否QQ
            weibo:u.indexOf('weibo') > -1,
            fb:u.indexOf('FB') > -1,
            tw:u.indexOf('TW') > -1
        };
    }();

    a.showTip = function(message){
		var $tips = $('#tips');
		$tips.fadeIn(200).text(message);
		window.setTimeout(function() {
			$tips.fadeOut(200);
		}, 3000);
	},

	a.loadingShow = function(show) {
		var loading = $('#loading');
		if (show && !loading.hasClass('loading-show')) {
			loading.addClass('loading-show');
		} else {
			loading.removeClass('loading-show');
		}
	},

	a.getQuery = function(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURIComponent(r[2]);
		return null;
	},

    a.ready = function(callback){

    	if(this.versions.weixin){

		   window.PG.setConfig(configData);

		}else{

			configData.channel = "native";

	         window.PG.setConfig(configData);
		}

    	window.PG.ready().then(function(interfaces){

    		if(callback) callback(interfaces);
		 
	    });
    }

    a.staticts = function(type){
		  var status = type,
		    language = navigator.language.substring(0,2);
		  var origin = this.getQuery("fromOrigin");
	      if (this.versions.ios) {
	           status+="_ios";
	      }else{
	          status+="_adr";
	      }
	      if (language !="zh") {
	      	status+="_en";
	      }else{
	      	status+="_zh";
	      };
	      if (this.versions.weixin) {
	           status+="_weixin";
	      }else if(origin){
	      	status+="_" + origin;
	      }else if (this.versions.fb) {
	           status+="_fb";
	      }else{
	          status+="_other";
	      }
	      var postData = {
	      	"id" : "cat",
	      	"type" : status
	      }
	      $.ajax({
	        url: baseUrl + "/common/statistic/index",
	        type: 'GET',
	        dataType: 'jsonp',
	        jsonp: 'jsonpCallback',
	        data: postData
	      })
	      .done(function (res) {

	      })
	      .fail(function () {
	        console.log("error");
	      })
	      .always(function () {
	        console.log("complete");
	      });
	  }

    a.defaultConfig = function(param){

    	    defaultTitle = param["title"]?param["title"]:defaultTitle;

	    	defaultDesc = param["desc"]?param["desc"]:defaultDesc;

	    	defaultImgUrl = param["imgUrl"]?param["imgUrl"]:defaultImgUrl;

	    	statictsUrl = param["staticts"]?param["staticts"]:null;

	    	pg = param["interfaces"]?param["interfaces"]:null;

	    	if(!pg){
	    		throw Error('Missing interfaces param');
	    		return;
	    	}

	    	if(!statictsUrl){
	    		throw Error('Missing "sta" interfaces param');
	    		return;
	    	}
    }

    a.shareConfig = function(param){

    	var param = param;

    	var title = (!!param)?(param["title"]?param["title"]:defaultTitle):defaultTitle,

    	    desc = (!!param)?(param["desc"]?param["desc"]:defaultDesc):defaultDesc,

    	    imgUrl = (!!param)?(param["imgUrl"]?param["imgUrl"]:defaultImgUrl):defaultImgUrl,

    	    status = (!!param)?(param["status"]?param["status"]:defaultStatus):defaultStatus,

    	    link = defaultLink;

    	    if(status==true){
    	    	if(desc){
    	    	  link += "?desc="+desc;
    	    	}
    	    	if(param["imgUrl"]&&desc){
    	    	  link += "&imgUrl="+imgUrl;
    	    	}else if(param["imgUrl"]){
    	    	  link += "?imgUrl"+imgUrl;
    	    	}
    	    }

    	pg.showMenuItems({
	            list: [{
	                name: 'share',
	                list: [
	                    {name:'wechat'},
	                    {name:'wechatMoments'}
	                ]
	            }
	            ]
	        }).then(function (res) {
	        });
	        //分享给朋友
	        pg.onWebShareDefault({
					title: title,
					desc: desc,
					link: link,
					imgUrl:imgUrl,
					success: function(res) {
					   //分享朋友统计
						Common.staticts("shareFriend");						
					}
				});
		 //分享到朋友圈
		 pg.onWebShareTimeline({
				title: desc,
				link: link,
				imgUrl:imgUrl,
				success: function(res) {
				    //分享朋友圈统计
					Common.staticts("shareCircle");				
				}
			});

    }

    window.PGCommon=Common;

})(window);