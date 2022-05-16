$(function () {
    //! 点击"去注册账号"的链接
    $('#link_reg').on('click', () => {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //! 点击"去登录"的链接
    $('#link_login').on('click', () => {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    //! 密码正则校验
    // 从layui中获取form对象
    const form = layui.form;
    // 通过form.verity() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格!'],
        // 校验两次密码是否一致的规则
        rePwd: (value) => {
            // 通过形参拿到是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息
            let pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                return '两次密码不一致!';
            }
        },
    })

    // 获取提示
    const layer = layui.layer;

    //! 监听注册表单提交事件
    $('#form-reg').on('submit', (e) => {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 数据
        const data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val(),
        };
        // 发送Ajax的POST请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data,
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                // 跳转到登录界面
                $('#link_login').click();
            },
        })
    })

    //! 监听登录表单提交事件
    $('#form-login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发送Ajax的POST请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '../../index.html';
            }
        })
    })
})