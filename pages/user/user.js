// pages/user/user.js
var app = getApp() ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      nickName:"未登录",

    },
    nick_name_style:""
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this ;
   


    //读取微信用户信息
      if(app.globalData.userInfo){  // 获取成功
      // 昵称很短的 为了优化显示而做出增加样式
        if (this.countLength(app.globalData.userInfo.nickName) < 10){
          //增加昵称宽度样式
          this.setData({nick_name_style:"width:120px;"});
          
        }
        this.setData({ userInfo: app.globalData.userInfo});
      }else{
        this.setData({userInfo:{
          avatarUrl:"/image/user/portrait.png",
          nickName:"未登录",
        }});
        this.setData({ nick_name_style: "width:120px;" });
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

// 算字节长度
  countLength:function (str) {   
    var r = 0;
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      // Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff   
      // Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3   
      if ((c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
        r += 1;
      } else {
        r += 2;
      }
    }
    return r;
  }   
})