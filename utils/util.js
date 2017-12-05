const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//暴露接口 让引入js能够访问
module.exports = {
  formatTime: formatTime ,
  moveLayer:moveLayer
}


/**
 * 滑动图层显示答案
 * eve触摸对象
 * obj
 */
function moveLayer(eve,obj){

  if (obj.data.style.opacity > 0.01) {
    // 累计划过的长度
    obj.data.move.length = obj.data.move.length + Math.abs(obj.data.move.pageX - eve.touches[0].pageX);
    // 算出透明度
    obj.data.style.opacity = obj.data.move.length / 45000;
    obj.data.style.opacity = 1 - obj.data.style.opacity;
    obj.setData(obj.data.style);

  }

}
