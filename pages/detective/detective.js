// pages/detective/detective.js
var tool = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    main_content: {

      title: "回首毕生，始感无常",
      tips: "(tips:网络手势)",

      look_num: 40,

      priase_num: 35,

    },
    config: {
      //查看数量图
      eyes_src: "/image/riddles/eyes.png",
      //点赞次数图
      priase_src: "/image/riddles/pri.png",
      //是否显示解释按钮
      explanation_hide: true,
      header_title: "题目",
    },
    move: {
      length: 0,
      pageX: 0
    },
    //答案
    answer_text: "明天的明天",

    style: {
      opacity: 1
    }
  },

  /**
  * 滑动答案图层
  */
  moveLayer: function (eve) {
    tool.moveLayer(eve,this);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})