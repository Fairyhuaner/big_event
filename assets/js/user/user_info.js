$(function () {
    const form = layui.form;
    const layer = layui.layer;

    form.verify({
        nickname: (value) => {
            if (value.length > 6) {
                return '昵称的长度必须在1-6个字符之间!';
            }
        }
    })

    // 初始化用户基本信息
    const initUserInfo = () => {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: res => {
                if (res.status !== 0) return layer.msg(res.message);
                // console.log(res);
                // 调用form.val() 快速为表单赋值
                form.val('formUserInfo', res.data);
            }
        })
    }

    initUserInfo();

    // 重置表单的数据
    $('#btnReset').on('click', (e) => {
        e.preventDefault();
        initUserInfo();
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', e => {
        e.preventDefault();
        // console.log($('.layui-form').serialize());
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg(res.message);
                // console.log(res);
                layer.msg(res.message);
                window.parent.getUserInfo();
            }
        })
    })
})