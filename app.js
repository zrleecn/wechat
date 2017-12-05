//app.js
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //获取用户信息
    this.getUserInfo();
    wx.showLoading({
      title: '加载中',
      mask: true,
     
    })

     

  },
  
  onShow:function (){
    wx.hideLoading()
  },



  getUserInfo :function(){
    var that = this ;
    // 读取微信用户信息
    wx.getUserInfo({
    

      success: res => {

        this.globalData.userInfo = res.userInfo;
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }

        wx.checkSession({
          success: function (res) { },
          fail: function (res) {
            // 登录
            wx.login({

              success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId

                if (res.code) {
                  //解码请求开始
                  wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session',
                    data: {
                      js_code: res.code,
                      appid: "wxb67355036daecdff",
                      secret: "d857179b2275b596f5f32a3015cac0d4",
                      grant_type: "authorization_code"
                    },

                    method: "GET",
                    dataType: "json",
                    success: function (res) {
                      console.log(res);

                      //保存返回的session_key 和openid
                      that.globalData.userCode = {

                        session_key: res.data.session_key,
                        openid: res.data.openid,

                      }


                      //查看数据库是否有该用户
                      that.checkUserExits(that.globalData.userCode.openid);


                    }
                  })//解码请求结束
                }
              }
            })

          },
          complete: function (res) { },
        })


      },
      fail: res => {
        //微信用户拒绝授权获取信息
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法正常使用大部分的功能体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      },
      complete: function (res) { },
    })
  }
,

  // 全局变量
  globalData: {
    userInfo: null,
    //openid session_key
    userCode: null,
    config: {
      host: "http://localhost/wechat/"
    },
    status: {
      is_exits_user: 0
    }
  },

  /**
   * 检查数据库中是否有该用户
   */
  checkUserExits: function (openid) {

    var is_exits = false;
    var that = this;
    wx.request({
      url: this.globalData.config.host + "checkexits" + "/" + openid,

      method: "get",
      dataType: "json",
      success: function (res) {


        //存在用户
        if (res.data) {

          that.globalData.status.is_exits_user = 1

        } else {
          that.globalData.status.is_exits_user = 0
          // that.globalData.status.is_exits_user = 1;
          //console.log(that.globalData.status.is_exits_user);

          // console.log('用户不存在');
          //数据库未曾保存过用户则 创建用户保存数据库
          wx.request({
            url: that.globalData.config.host + "createUser/" + that.globalData.userCode.openid + "/" + that.globalData.userInfo.nickName + "/" + that.globalData.userInfo.avatarUrl.replace(/\//g, '换'),
            
            method: "GET",
            dataType: "json",
            success: function (res) {

            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }

      },
      fail: function (res) {
        console.log('fail');
      },
      complete: function (res) { },
    })

  }

})