$(function () {
    const form = layui.form
    // 自定义验证规则
    form.verify({
        // 密码验证
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 新密码和旧密码不一样
        samePwd: (value) => {
            if (value === $('[name=oldPwd]').val()) return "新密码和旧密码不能一样"
        },
        // 校验新密码和确认密码是否相同
        rePwd: (value) => {
            if (value !== $('[name=newPwd]').val()) return "确认密码和新密码不一致"
        }
    })

    // 更新密码
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                // 1清空本地token
                localStorage.removeItem('token')
                // 2跳转到登录页面
                window.parent.location.href = '/login.html'

            }
        })
    })
})