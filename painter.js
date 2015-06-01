// 此文件中的几个过程，实现一个层，一个基本图像语言层

// 一个画家是一个过程，
// 他持有图像的信息，当给定宽高时，
// 他将返回一个展示图像的DOM对象，


// 此constructor创建一个基本的画家，
function createPainter(src) {
    return function(w, h) {
        return $("<img>").attr({
            src: src,
            width: w,
            height: h
        });
    };
}

// 创建一个新画家，垂直翻转另一个画家的图像
function flipVert(painter) {
    return function(w, h) {
        return $('<div>').css({
            width: w,
            height: h,
            transform: 'scale(1, -1)'
        }).append(painter(w, h));
    };
}

// 创建一个新画家，水平翻转另一个画家的图像
function flipHoriz(painter) {
    return function(w, h) {
        return $('<div>').css({
            width: w,
            height: h,
            transform: 'scale(-1, 1)'
        }).append(painter(w, h));
    };
}

// 创建一个新画家，他将第一个画家的图像画在第二个画家图像的左边
function beside(painter1, painter2) {
    return function(w, h) {
        var painter = $('<div>').css({'position': 'relative', width: w, height: h});
        var left = $('<div>').css({'position': 'absolute', left: 0, top: 0, width: w / 2, height: h}).append(
            painter1(w / 2, h)
        );
        var right = $('<div>').css({'position': 'absolute', left: w / 2, top: 0, width: w / 2, height: h}).append(
            painter2(w / 2, h)
        );
        return painter.append(left).append(right);
    };
}

// 创建一个新画家，他将第一个画家的图像画在第二个画家图像的上边
function below(painter1, painter2) {
    return function(w, h) {
        var painter = $('<div>').css({'position': 'relative', width: w, height: h});
        var top = $('<div>').css({'position': 'absolute', left: 0, top: 0, width: w, height: h / 2}).append(
            painter1(w, h / 2)
        );
        var bottom = $('<div>').css({'position': 'absolute', left: 0, top: h / 2, width: w, height: h / 2}).append(
            painter2(w, h / 2)
        );
        return painter.append(top).append(bottom);
    };
}