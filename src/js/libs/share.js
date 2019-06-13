// JavaScript Document
var shareData = {
    title: '飞利浦惠生活品牌节',  //分享标题
    desc: '任意购赢大礼，享受好礼折上折，还不赶快~',  //分享内容
    link: 'http://www.brandweek.philips.com.cn/ac/philips/mobile/index.html',//分享的页面地址
    imgUrl: 'http://www.brandweek.philips.com.cn/ac/philips/mobile/share.jpg',  //分享的小图片
    success: function (res) {
        //_hmt.push(['_trackPageview', '/share_end']);
    },
    cancel: function (res) {

    },
    fail: function (res) {

    }
}
var shareData2 = {
    title:shareData.title,
    desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl,
    success: shareData.success,
    cancel: shareData.cancel,
    fail: shareData.fail
}

$.ajax({
    url:"http://uniqueevents.sinaapp.com/wx/getJsAPIA.php?callback=?",
    dataType:"jsonp",
    data:{
        url:location.href
    }
}).done(function(data) {
    console.log(data)
    //_hmt.push(['_trackPageview', '/share_end']);
    if(data) {
        var res = data.result;
        if(res == 1) {
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ]
            });

            wx.ready(function () {
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareTimeline(shareData2);
            });
        } else {
            //self.showError(data.msg);
        }
    }
}).always(function() {

});