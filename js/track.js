;(function(){
	var Track = Track || {};
	Track.hmsr=0;
	Track.share=0;
	Track.media='';

	//解析页面网址函数
	var parseURL = function (url) {
		var a =  document.createElement('a');
		a.href = url;
		return {
			source: url,
			protocol: a.protocol.replace(':',''),
			host: a.hostname,
			port: a.port,
			query: a.search,
			params: (function(){
				var ret = {},
					seg = a.search.replace(/^\?/,'').split('&'),
					len = seg.length, i = 0, s;
				for (;i<len;i++) {
					if (!seg[i]) { continue; }
					s = seg[i].split('=');
					ret[s[0]] = s[1];
				}
				return ret;
			})(),
			file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
			hash: a.hash.replace('#',''),
			path: a.pathname.replace(/^([^\/])/,'/$1'),
			relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
			segments: a.pathname.replace(/^\//,'').split('/')
		};
	}

	var initCookieid = function createNonceStr(strLenth) {
		strLenth = strLenth || 32;
		var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		var maxPos = chars.length;
		var str = "";
		for (var i = 0; i < strLenth; i++) {
			str += chars.substr(Math.floor(Math.random()*maxPos), 1);
		}
		return str;
	}

	var trackGDT = function(page, action){
		var myURL = Track.parseURL(location.href);
		var cookieid = Track.cookieid;
		$.ajax({
			url:myURL.protocol+'://'+myURL.host+'/gdt_cm/track.php',
			data:{
				cookieid:cookieid,
				page:page,
				action:action
			}
		})
	}

	var trackPage = function(str){
		_hmt.push(['_trackPageview', '/'+Track.media+str]);
	}

	var trackEvent = function (action){
		_hmt.push(['_trackEvent', Track.media, action]);
	}

	var initTrack = function (){
		var hmsr,share,userid;
		var myURL = parseURL(location.href);
		hmsr = myURL.params.hmsr;
		userid = myURL.params.userid;
		share = parseInt(myURL.params.share,10);
		if(!isNaN(share)){
			share++;
		}
		if(!hmsr){
			hmsr = Cookies.get('hmsr')?Cookies.get('hmsr'):0;
		}
		if(!share){
			share = Cookies.get('share')?parseInt(Cookies.get('share'),10):1;
		}
		userid && Cookies.set('hmsr', userid, { expires: 1, path: '' });
		userid && Cookies.set('share', share, { expires: 1, path: '' });

		//生成监测的前缀
		var media = 'media_'+hmsr;

		//保存至Track
		Track.hmsr = hmsr;
		Track.share = share;
		Track.media = media;
		
		//用户id
		var cookieid;
		cookieid  = Cookies.get('cookieid')?Cookies.get('cookieid'):initCookieid();
		Cookies.set('cookieid', cookieid, { expires: 60, path: '/' })
		Track.cookieid = cookieid;

		if(typeof(shareData)!='undefined'){
			shareData2.link = shareData.link =shareURL+'?hmsr='+hmsr+'&share='+share;
			shareData2.success = shareData.success  = function (res) {
				trackEvent('分享完成');
			}
		}

	}

	initTrack();

	Track.parseURL = parseURL;
	Track.trackPage = trackPage;
	Track.trackEvent = trackEvent;
	Track.initCookieid = initCookieid;
	Track.trackGDT = trackGDT;

	window.Track = Track;

})();