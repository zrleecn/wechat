// pages/comment/comment.js
const app = getApp() ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    query:{
      
      id : 1 
    },
    inputText:"" ,
    hideEmji  :true,
    screenWidth:0,
    emjis:{}
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this ;
     this.data.title = options.title ;
     this.data.query.id = options.id ;
     
     //设置评论标题
     this.setData({ title: options.title});

     this.loadEmji();

 wx.getSystemInfo({
  success: function(res) {
    that.setData({screenWidth:res.screenWidth});
  },
  fail: function(res) {},
  complete: function(res) {},
})

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
  formSubmit :function(e){
    console.log( e.detail.value)
  },

  clickEmji:function (e){
   
    this.data.inputText = this.data.inputText + e.currentTarget.dataset.phrase;
    //更新输入框内容
    this.setData({ inputText: this.data.inputText});
    
  },
  emjiTogal:function () {
   
    this.data.hideEmji = ! this.data.hideEmji ;
    this.setData({ hideEmji: this.data.hideEmji});
  },
  loadEmji:function (){
    var that = this ;
   
    
wx.request({
  
  
  url: app.globalData.config.host + "admin/utils/loadEmji",


  method: "GET",
  dataType: "json",
  success: function(res) {

    that.data.emjis = res.data ;
    that.setData({ emjis: that.data.emjis});

  },
  fail: function(res) {},
  complete: function(res) {},
})

  }
})