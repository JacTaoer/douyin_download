const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    videoUrl: '',
    defaultUrl: ''
  },

  onLoad: function (options) {
     
  },

  onReady: function () {

  },

  onShow: function () {
    var t = this

    //获取剪切板的内容
    wx.getClipboardData({ success: res => {
      var str = res.data.trim()
      if (str) {
        t.setData({
          defaultUrl: str
        })
      }
    } })

  },
  //获取用户的id信息
  getUserInfo: function (t) {
    var a = this
    if (null != app.globalData.userInfo) return 'mousousuo',
      a.oSubmit(), a.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: !0
      })
    wx.getUserInfo({
      success: function (o) {
        app.globalData.userInfo = t.detail.userInfo, a.setData({
          userInfo: t.detail.userInfo,
          hasUserInfo: !0
        })
      },
      fail: function () {
        a.showToast('未获取授权登录失败')
      }
    })
  },

  //清空input内容
  mousuosuo_clear: function () {
    this.setData({
      defaultUrl: ''
    })
  },

  //获取input内容并绑定数据
  mousuosuo_input: function (t) {
    this.setData({
      defaultUrl: t.detail.value,
      videoUrl: t.detail.value
    })
  },

  mousuosuo_showSvPro(e) {
    var index = e.target.dataset.index
    var t = this
    switch (index) {
      case '0':
        t.showToast('抖音右下角分享点复制连接')
        break
      case '1':
        t.showToast('视频自带无法去除')
        break
      case '2':
        t.showToast('先授权保存到相册')
        break
      default:
        break
    }
  },

  //主程序
  oSubmit: function (t) { 
    var a = this
    var shortUrl =a.data.defaultUrl  
    var dyUrl=app.globalData.default+a.data.defaultUrl
    console.log(dyUrl)
    //提取http链接
    var reg=/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
    shortUrl.replace(reg,function(shortUrl){
        return shortUrl.replace(reg,function(t){
          a.setData({
            defaultUrl:t
          })
        })
    })
    console.log("this=",a.data.defaultUrl)

    //调用api接口进行解析
    wx.request({
      url: app.globalData.default+a.data.defaultUrl,
      success(res){
        console.log(res)
        wx.hideLoading(), res.data.title ? (a.showToast('解析成功', 'success'), wx.setStorageSync('dataUrl', res.data.url), app.globalData.videoSrc = res.data.title,
          wx.navigateTo({
            url: '../../pages/video/video'
          })): a.showToast('解析失败')
      }
    })
  },

  //提示窗
  showToast: function(o) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "none", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1500
    wx.showToast({
        title: o,
        icon: t,
        duration: n
    })
  }
})