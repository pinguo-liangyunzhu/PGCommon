
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

	var baseUrl="",

		host=location.host,
		
		statictsUrl = null;

	var pgcommon = function () {};

	var unit = pgcommon.prototype;

	var commonName = "default";


	if(host == "activity.camera360.com"){
	    baseUrl = "http://activity.camera360.com";
	}else{
	    baseUrl = "http://activity-test.camera360.com";
	}

	unit.statictsName = function(name) {

		commonName = name;

	};

	unit.versions = function(){
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
            tw:u.indexOf('TW') > -1,
            twitter:u.toLowerCase().indexOf('twitter') > -1,
        };
    }();

    unit.showTip = function(message){
		var $tips = $('#tips');
		$tips.fadeIn(200).text(message);
		window.setTimeout(function() {
			$tips.fadeOut(200);
		}, 3000);
	};

	unit.loadingView = function(status) {
		if(status) {
			$(".loading-view").show();
		}else{
			$(".loading-view").hide();
		}
	};

	unit.showMessage = function(message) {
            $(".alert-text").text(message);
            $(".alert-info").show();
            setTimeout(function(){
              $(".alert-info").fadeOut(300);
            },1000);

	};

	unit.getQuery = function(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURIComponent(r[2]);
		return null;
	};

    unit.staticts = function(type){

		  var status = type;

		  var language = navigator.language.substring(0,2);

		  var origin = this.getQuery("fromOrigin");

		  var push = this.getQuery("push");

	      if (this.versions.ios) {
	           status+="_iOS";
	      }else{
	          status+="_安卓";
	      }
	      if (language !="zh") {
	      	status+="_非中文";
	      }else{
	      	status+="_中文";
	      };
	      if (push) {
	      	status+="_push";
	      }
	      if (this.versions.weixin) {
	           status+="_微信";
	      }else if(origin){
	      	status+="_" + origin;
	      }else if (this.versions.fb) {
	           status+="_脸书";
	      }else if (this.versions.twitter) {
	           status+="_推特";
	      }else{
	          status+="_其他";
		  }
		  if(commonName == "default") {
			  throw new Error('请设置统计名称');
			  return;
		  } 
	      var postData = {
	      	"id" : commonName,
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
	  };

	    unit.SetCookie = function(name,value) {
			var Days = 30; //此 cookie 将被保存 30 天
			var exp = new Date();
			exp.setTime(exp.getTime() + Days*24*60*60*1000);
			document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
		};

		unit.getCookie = function(name){
			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			if(arr != null)
			return unescape(arr[2]);
			return null;
		};

		unit.delCookie = function(name) {
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval= unit.getCookie(name);
			if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		};

	    unit.getUserInfo = function(res) {
	        var userInfo = {
	            result: {
	                mobile: '',
	                uid: '',
	                userToken: ''
	            }
	        };
	        if (typeof res != "object" && typeof res != "undefined") {
	            res = $.parseJSON(res)
	        }
	        if (unit.versions.android) {
	            if (typeof(res.params) != "undefined") {
	                userInfo.result.uid = res.params.userId;
	                userInfo.result.userToken = res.params.token;
	                if (typeof(res.params.mobile)!= "undefined") {
	                    userInfo.result.mobile = res.params.mobile;
	                }
	            } else {
	                if (typeof(res.result.result) != "undefined") {
	                    userInfo.result.uid = res.result.result.userId;
	                    userInfo.result.userToken = res.result.result.token;
	                    if (typeof(res.result.mobile) != "undefined") {
	                        userInfo.result.mobile = res.result.result.mobile;
	                    }
	                } else {
	                    userInfo.result.uid = res.result.userId;
	                    userInfo.result.userToken = res.result.token;
	                    if (typeof(res.result.mobile) != "undefined") {
	                        userInfo.result.mobile = res.result.mobile;
	                    }
	                }
	            }
	        }

	        if (unit.versions.ios) {
	            if (typeof(res.result.uid) != "undefined") {
	                userInfo.result.uid = res.result.uid;
	                userInfo.result.userToken = res.result.userToken;
	                userInfo.result.mobile = res.result.mobile;
	            } else {
	                userInfo.result.uid = res.result.mUserId;
	                userInfo.result.userToken = res.result.mToken;
	                userInfo.result.mobile = res.result.mobile;
	            }
	            if (typeof(res.result.mobile) != "undefined") {
	                userInfo.result.mobile = res.result.mobile;
	            }
	        }
	        return userInfo;
    };

    //处理公共参数
    unit.dealPublicPrams = function (resp,res) {
        var userInfo = utils.getUserInfo(resp);
        var publicPram = {};
        res = res.result;
        publicPram.platform = res.platform;
        publicPram.locale = res.language;
        publicPram.appversion = res.appVersion;
        publicPram.channel = res.channel;
        publicPram.appname = res.appName;
        publicPram.geoinfo = res.geoInfo;
        publicPram.device = res.device;
        publicPram.deviceId = res.deviceId;
        publicPram.systemVersion = res.systemVersion;
        publicPram.mac = res.mac;
        publicPram.mcc = res.mcc || "";
        publicPram.mnc = res.mnc || "";
        publicPram.sig = res.sig || "";
        publicPram.version = res.version || "";
        publicPram["userInfo[userId]"] = userInfo.result.uid;
        publicPram["userInfo[token]"] = userInfo.result.userToken;
        return publicPram;
    };

    unit.getNativeAppInfo = function (resp,callback) {
        window.PG.ready().then(function (interfaces) {
            interfaces.getNativeInfo().then(function (res) {
                var data = utils.dealPublicPrams(resp,res);
                if (typeof(callback) == "function") {
                    callback(data, interfaces);
                }
            });
        });
    };

    unit.getNativeData = function(callback){

      window.PG.ready().then(function (interfaces) {

            interfaces.getNativeInfo().then(function (res) {
                if (typeof(callback) == "function") {
                    callback(res);
                }
            });
        }); 
    };

    unit.getJSON = function(url,data,callback) {
    	$.ajax({
	        url: baseUrl + url,
	        type: 'GET',
	        dataType: 'jsonp',
	        jsonp: 'jsonpCallback',
	        data: data?data:{}
	      })
	      .done(function (res) {
             if (callback) callback(res);
	      })
	      .fail(function () {
	        console.log("error");
	      })
	      .always(function () {
	        console.log("complete");
	      });
    };

    unit.getPost = function(url,data,callback) {
    	$.ajax({
	        url: baseUrl + url,
	        type: 'POST',
	        dataType: 'json',
	        data: data?data:{}
	      })
	      .done(function (res) {
             if (callback) callback(res);
	      })
	      .fail(function () {
	        console.log("error");
	      })
	      .always(function () {
	        console.log("complete");
	      });
    }

module.exports = pgcommon;
