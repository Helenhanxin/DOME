//自适应屏幕
function _adaptFont(maxWidth, baseWidth, baseSize) {
    maxWidth = 750; //最大值750px
    baseWidth = 320;
    baseSize = 16;
    var winWidth = parseInt(window.innerWidth); /*s4手机读到的winWidth是分辨率的宽*/
    var docWidth = parseInt(document.documentElement.clientWidth); //和winWidth区别是，减去右边滚动条
    var bodyWidth = parseInt(document.body.clientWidth); //混合模式下使用
    var docWidth = Math.min(winWidth, bodyWidth, docWidth);
    docWidth > maxWidth && (docWidth = maxWidth);
    docWidth < baseWidth && (docWidth = baseWidth);
    //设置基准值
    document.documentElement.style.fontSize = (docWidth / baseWidth) * baseSize + 'px';
}
_adaptFont();
(function() {
    window.addEventListener("resize", _adaptFont);
})();

//年份选择

$(function() {
    $("#year").focus(function() {
        var firstVule = $(this).children("option").get(0);
        $(".selectYear").html(firstVule);
    })
})
