$(function () {
    const baseUrl = `http://www.liulongbin.top:3007`;
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

    //! 监听注册表单提交事件
    $('#form-reg').on('submit', (e) => {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 发送Ajax的POST请求
        $.ajax({
            type: 'POST',
            url: baseUrl + '/api/reguser',
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val(),
            },
            success: (res) => {
                if (res.status !== 0) return alert(res.message);
                console.log(res.message);
            },
        })
    })
})