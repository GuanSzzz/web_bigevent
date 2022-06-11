// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((option) => {
  //1. 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  option.url = `http://www.liulongbin.top:3007` + option.url;
  // 2.注入token
  // 每次路径为my的时候，都需要用到token 发起请求，自动绑定
  if (option.url.includes('/my/')) {
    option.headers = {
      Authorization: localStorage.getItem("token")
    }
  }
  // 3.响应拦截 权限校验
  // 获取信息后判断，无论信息是否获得成功，都要执行complete回调函数
  // 是否有token(是否登录),token是否过期，调用内置函数
  option.complete = (res) => {
    if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
      // 1.强制清除本地token
      localStorage.removeItem('token')
      // 2.跳转到登录页面
      location.href = '/login.html'
    }
  }



});