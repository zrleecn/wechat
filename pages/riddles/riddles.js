// pages/riddles/riddles.js
const app = getApp();
var tool = require ('../../utils/util.js') ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 模块主要内容参数
    main_content:{
      
      title:"回首毕生，始感无常",
      tips:"(tips:网络手势)",
      //查看次数
      look_num:40,
      //点赞次数
      priase_num:35,
      
    },
    config:{
      //查看数量图
      eyes_src: "/image/riddles/eyes.png",
      //点赞次数图
      priase_src: "/image/riddles/pri.png",
      //是否显示解释按钮
      explanation_hide: false,
      header_title: "谜目",
    },
    move:{
      length:0 ,
      pageX :0 
    },
    //答案
    answer_text: "",
    //图层样式
    style:{
      opacity:1
    },
    request_riddles_data:{

    },
    userInfo : {},
    nickName:"" ,
   
    page_index :　0 ,
    //每一页数据记录条数，
    pageSize:3,
    currentPage : 0 ,
    //数据库中的灯谜数
    total: 9 ,
    riddles_id : 1
    
  
  },

  /**
   * 滑动答案图层
   */
  moveLayer:function (eve) {
    tool.moveLayer(eve,this);
   
  },


/**
 * 显示答案解释
 */
  showExpaination:function (e){
    wx.showModal({
      title: this.data.request_riddles_data[0].riddles_title,
      content: "解释:\n"+this.data.request_riddles_data[0].riddles_exp,
      showCancel:true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

  }
  ,




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获得用户信息
    this.data.userInfo = app.globalData.userInfo;
    
    //评论区昵称
    this.setData({ nickName: this.data.userInfo.nickName });
      var that = this ;
      //获得全局app
     
    //  that.getRiddles (0) ;
      var id = Math.round(Math.random() * this.data.total);
      if (id != 0) {
        this.getRiddleByRandom(id);
      } else {
        id = id + Math.round(Math.random() * this.data.total);
        this.getRiddleByRandom(id);
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

  /**
   * 获取随机的灯谜题目
   */
  getRiddleByRandom :function (id) {
    
    var that = this;
    wx.request({
      url: app.globalData.config.host + "admin/riddles/getOne/riddles_id/" + id,
      method: "GET",
      dataType: "json",
      success: function (res) {

        if (res.data.errMsg) {
          //获取不到数据  
          console.log(res.data.errMsg.content)
        } else {
         
          //获取有数据
          // 保存返回的数据
          that.data.request_riddles_data = res.data;

          //设置答案
          that.data.answer_text = res.data[that.data.page_index].riddles_answer;
          that.data.riddles_id = res.data[that.data.page_index].riddles_id;
          //刷新页面数据
          that.setData({
            //主要内容
            main_content: {
              title: res.data[that.data.page_index].riddles_title,
              tips: res.data[that.data.page_index].riddles_tips,
              look_num: res.data[that.data.page_index].riddles_view,
              priase_num: res.data[that.data.page_index].riddles_love
            },
            //答案
            answer_text: res.data[that.data.page_index].riddles_answer
          });
        }
      }
    })
  },

  /**
   * 随机获取一下条数据
   */
  getnNextRiddles:function(){
    //重置滑动长度
    this.data.move.length = 0;
    this.data.move.pageX = 0;
    this.data.style.opacity = 1 ;
    this.setData(this.data.style);

    var id = Math.round(Math.random() * this.data.total);
    if(id != 0){
      this.getRiddleByRandom(id);
    }else{
      id = id + Math.round(Math.random() * this.data.total) ;
      this.getRiddleByRandom(id);
    }
    
    
  },
  writeComment : function () {
    // console.log(this.data.riddles_id);
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + this.data.riddles_id + "&title=" + this.data.request_riddles_data[0].riddles_title
    })

  }



  


})