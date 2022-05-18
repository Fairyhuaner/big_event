$(function () {
    getUserInfo();

    const layer = layui.layer;
    $('#btnLogout').on('click', () => {
        // 提示用户是否退出
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 清空本地存储的token
            localStorage.removeItem('token');
            // 重新跳转到登录页面
            location.href = '/09 git大事件/day3/code/login.html';
            // 关闭询问框
            layer.close(index);
        });
    })
})

function getUserInfo () {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: res => {
            if (res.status !== 0) return layer.msg(res.message);
            console.log(res);
            renderAvatar(res.data);
        },
        // 有一个全局统一挂载complete回调函数
    })
}

function renderAvatar (user) {
    // 用户头像
    let name = user.nickname || user.username;
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}