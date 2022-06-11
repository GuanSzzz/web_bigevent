$(function () {
    // 获取form表单
    const form = layui.form
    // 自动校验昵称 用内置方法
    form.verify({
        nickname: (value) => {
            if (value.length > 6) {
                return '昵称长度不能超过6位'
            }
        }
    })

    // 获取用户基本信息
    const getUserInfo = () => {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                layer.msg('获取用户信息成功')
                // console.log(res);
                // 调用 内置form.val() 方法为表单赋值  填充表单
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置按钮
    $('#btnReset').click((e) => {
        e.preventDefault()
        getUserInfo()
    })

    // 提交按钮  修改用户信息 监听表单提交事件
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) return layer.msg('更新用户信息失败')
                layer.msg('更新用户信息成功')
                // 通知父页面，更新昵称 内置挂载方法
                window.parent.getUserInfo()

            }
        })
    })


    // 调用获取用户信息函数
    getUserInfo()
})