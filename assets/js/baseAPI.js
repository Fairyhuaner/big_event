// 注意 每次调用$.get() $.post() $.ajax() 的时候。会先调用ajaxPrefilter 函数
// 在这个函数中，可以拿到我们给ajax配置的内置对象

const baseUrl = `http://www.liulongbin.top:3007`;
$.ajaxPrefilter(options => {
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = baseUrl + options.url;
    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }
    // 全局统一挂载complete回调函数
    // 不论成功还是失败 最终都会调用complete回调函数
    options.complete = res => {
        // 在complete回调函数中 可以使用res.responseJSON拿到服务器响应回来的数据
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token');
            // 强制跳转到登录界面
            location.href = '/09 git大事件/day3/code/login.html';
        }
    }
})