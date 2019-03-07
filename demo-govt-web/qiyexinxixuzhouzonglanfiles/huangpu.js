$(function() {
    var h = document.documentElement.clientHeight;
    setClientHeight(h - 50);
    $('.head').addClass('bg')
        // 全屏
    $('.head').on('click', '.enter_fullscreen', function() {
        setClientHeight(h);
    });
    // 退出全屏
    $('.right').on('click', '.quit_fullscreen', function() {
        setClientHeight(h - 50);
    });
});

function setClientHeight(h) {
    if (h > 900) {
        var h = h - 50;
        var ih = $(".data_bank").outerHeight() + 20;

        $("#echart_1,#echart_3").height((h - 20) / 2 - 32 - 20 - 46);
        $("#echart_5").height((h - 20) / 2 - 35 - 45 - 20);
        $("#pie_chart").height((h - 20) / 2 - 45 - 20);
        $("#map").height(h - ih);
    }
}