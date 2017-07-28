window.onload = function() {
    //page measurements
    var height = window.innerHeight;
    var initWidth = window.innerWidth;
    
    //page paths
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

    var headerPosition = $('.header')[0].getBoundingClientRect().bottom;
    var dynamicBGPos = headerPosition - 162;
    
    var titleHeaderPosition = $('#header-title')[0].getBoundingClientRect();
    //TESTING\\\\
    console.log("height: " + height + "\nWidth: " + initWidth);
    //TESTING////

    $('.header').css("background-position-y", dynamicBGPos);
    $('.header').css("background-size", 192);

    window.onresize = function() {
        headerPosition = $('.header')[0].getBoundingClientRect().bottom;
        dynamicBGPos = headerPosition - 162;
        $('.header').css("background-position-y", dynamicBGPos);

        width = window.innerWidth;
        $('.header').css("background-size", 192);
    }

    switch(sPage){
        case "blog.html":
            $('.btnBlog').addClass("active");
            $('.btnMap').removeClass("active");
            $('.btnAboutMe').removeClass("active");
            break;
        case "map.html":
            $('.btnMap').addClass("active");
            $('.btnBlog').removeClass("active");
            $('.btnAboutMe').removeClass("active");
            break;
        case "aboutme.html":
            $('.btnAboutMe').addClass("active");
            $('.btnBlog').removeClass("active");
            $('.btnMap').removeClass("active");
            break;
    }
}