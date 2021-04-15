const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    videoUrl: '',
    defaultUrl: 'http://v.douyin.com/aWcudQ/'
  },

  onLoad: function (options) {
      // wx.request({
      //   url: 'https://wuzuhua.wuzuhua.cn/dy/index.php?url=https://v.douyin.com/e6weBDs/',
      //   success(res){
      //     console.log(res)
      //   }
        
      // })
  },

  onReady: function () {

  },

  onShow: function () {
    var t = this
    wx.getClipboardData({ success: res => {
      var str = res.data.trim()
      if (str) {
        t.setData({
          defaultUrl: str
        })
      }
    } })

  },

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
  mousuosuo_clear: function () {
    this.setData({
      defaultUrl: ''
    })
  },

  mousuosuo_input: function (t) {
    this.setData({
      defaultUrl: t.detail.value,
      videoUrl: t.detail.value
    })
  },
  replaceReg: function (t) {
    var e = this, a = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
    return t.replace(a, function (t) {
      e.setData({
        videoUrl: t
      })
      
    })
    
  },
  oSubmit: function (t) { 
    var a = this
    var dyUrl=app.globalData.default+a.data.defaultUrl
    console.log(dyUrl)
    console.log(a.data.defaultUrl)
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
  showToast: function(o) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "none", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1500
    wx.showToast({
        title: o,
        icon: t,
        duration: n
    })
  }
})