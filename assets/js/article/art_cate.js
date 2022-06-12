$(function () {
    const form = layui.form
    const initArtCateList = () => {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取文章列表失败')
                // 调用模板引擎渲染页面 template
                const htmlStr = template('tpl-table', res)
                $('tbody').empty().html(htmlStr)
            },
        });
    };


    // 绑定点击事件
    // 声明一个全局变量，预先保存弹出层的索引，方便进行关闭  插件自己带的方法
    let indexAdd = null;
    $('#btnAddCate').click(() => {
        // 插件自动的模态框方式
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $('#dialog-add').html(),
        });
    })


    // 添加文章分类  用到事件委托
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("新增分类失败！");
                initArtCateList();
                layer.msg("新增分类成功！");
                // 关闭窗口
                layer.close(indexAdd);
            }
        })
    })


    let indexEdit = null
    // 会自己有一个代码，方便关闭的时候有针对性的关闭。和定时器类似
    // 通过代理方式，为 btn-edit 按钮绑定点击事件
    $('tbody').on('click', '.btn-edit', function (e) {
        const id = $(this).attr("data-id");
        // 弹出修改文章分类的弹窗
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        });
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: (res) => {
                if (res.status !== 0) return layoer.msg('失败')
                form.val('form-edit', res.data)
            }
        })
    })


    // 修改文章分类，通过事件委托
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('更新数据失败')
                // 关闭窗口
                layer.close(indexEdit)
                // 重新渲染页面
                initArtCateList()
            }
        })
    })


    // 删除文章分类
    $('tbody').on('click', '.btn-delete', function () {
        const id = $(this).attr('data-id');
        // 提示用户是否删除  确认删除执行回调函数
        // 根据Index关闭窗口
        layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("删除分类失败！");
                    }
                    layer.msg("删除分类成功！");
                    // 关闭窗口
                    layer.close(index);
                    // 渲染页面
                    initArtCateList();
                },
            });
        })
    })

    initArtCateList();
})