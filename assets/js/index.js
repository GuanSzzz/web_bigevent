// 这里不要用入口函数，写在入口函数里的this不能挂载在window上
// const 和let 声明的变量也this不能挂载在window上

// 声明获取个人信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 挂载拦截器
        // headers: {
        //     Authorization: localStorage.getItem("token")
        // },
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg('获取信息成功')
            // 调用渲染函数
            renderAvatar(res.data)
        },
        // 挂载在拦截器上
        // 获取信息后判断，无论信息是否获得成功，都要执行complete回调函数
        // 是否有token(是否登录),token是否过期，调用内置函数
        // complete: (res) => {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
        //         // 1.强制清除本地token
        //         localStorage.removeItem('token')
        //         // 2.跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户信息的函数
const renderAvatar = (user) => {
    const name = user.nickname || user.username
    // 渲染欢迎语
    $('#welcome').html(`欢迎 ${name}`)
    // 按需求渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        const first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}

// 退出登录
$('#btnLogOut').click(() => {
    layui.layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "提示" },
        function (index) {
            // 1.清空本地token
            localStorage.removeItem('token')
            // 2.返回登录页面
            location.href = '/login.html'
        })
})
// 调用获取个人信息的函数
getUserInfo()