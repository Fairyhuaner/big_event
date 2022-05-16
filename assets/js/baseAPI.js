// 注意 每次调用$.get() $.post() $.ajax() 的时候。会先调用ajaxPrefilter 函数
// 在这个函数中，可以拿到我们给ajax配置的内置对象

const baseUrl = `http://www.liulongbin.top:3007`;
$.ajaxPrefilter(options => {
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = baseUrl + options.url;
}) 