window.onload = function () {
    //page measurements
    var height = window.innerHeight;
    var initWidth = window.innerWidth;

    //page paths
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

    var headerPosition = $('.header')[0].getBoundingClientRect().bottom;
    var dynamicBGPos = headerPosition - 142;

    var titleHeaderPosition = $('#header-title')[0].getBoundingClientRect();

    var scrollTopBottom = $('.scroll-top')[0].getBoundingClientRect().bottom;

    $('#content').css("margin-top", scrollTopBottom - 5);

    $('.header').css("background-position-y", dynamicBGPos);
    $('.header').css("background-size", 192);

    switch (sPage) {
        case "blog":
            $('.btnBlog').addClass("active");
            $('.btnMap').removeClass("active");
            $('.btnAboutMe').removeClass("active");
            break;
        case "map":
            $('.btnMap').addClass("active");
            $('.btnBlog').removeClass("active");
            $('.btnAboutMe').removeClass("active");
            break;
        case "aboutme":
            $('.btnAboutMe').addClass("active");
            $('.btnBlog').removeClass("active");
            $('.btnMap').removeClass("active");
            break;
    }
}

window.onresize = function () {
    headerPosition = $('.header')[0].getBoundingClientRect().bottom;
    dynamicBGPos = headerPosition - 142;
    $('.header').css("background-position-y", dynamicBGPos);

    width = window.innerWidth;
    $('.header').css("background-size", 192);
}

function GoBack() {
    Response.redirect('pages/index');
}