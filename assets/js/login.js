$(function () {
    // 点击去注册隐藏登录页面
    $('#link_reg').click(() => {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录隐藏注册页面
    $('#link_login').click(() => {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 引入form,来自layui form是layui封装的内置对象
    const form = layui.form
    // 自定义校验规则 根据layui封装的 方法
    form.verify({
        // 数组方法
        password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 函数方法  注册页面 确认密码
        repwd: (value) => {
            // 1.获取密码框的值
            const pwd = $('.reg-box [name=password]').val()
            // 2.判读两次是否一样
            if (pwd !== value) return "两次密码不一样"
        }
    })

    // 基本路径
    const baseUrl = 'http://www.liulongbin.top:3007'
    //监听注册表单事件 ，发送请求
    $('#form_reg').submit((e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),    //用属性选择器选择
                password: $('#form_reg [name=password]').val()
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                // layer.msg自己封装的弹出方法
                layer.msg('注册成功')
                // 注册成功，模拟点击事件
                $('#link_login').click()
            }
        })
    })

    // 监听登录表单事件，发送请求
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),   //表单里 可以直接获取所有name名字的值
            success: (res) => {
                if (res.status !== 0) return layer.msg('res.message')
                layer.msg('登录成功')
                // 1.把token存在本地  
                localStorage.setItem('token', res.token)
                // 2.跳转到首页
                location.href = '/index.html'
            }

        })

    })








})  //入口函数