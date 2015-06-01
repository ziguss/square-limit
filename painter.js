// ���ļ��еļ������̣�ʵ��һ���㣬һ������ͼ�����Բ�

// һ��������һ�����̣�
// ������ͼ�����Ϣ�����������ʱ��
// ��������һ��չʾͼ���DOM����


// ��constructor����һ�������Ļ��ң�
function createPainter(src) {
    return function(w, h) {
        return $("<img>").attr({
            src: src,
            width: w,
            height: h
        });
    };
}

// ����һ���»��ң���ֱ��ת��һ�����ҵ�ͼ��
function flipVert(painter) {
    return function(w, h) {
        return $('<div>').css({
            width: w,
            height: h,
            transform: 'scale(1, -1)'
        }).append(painter(w, h));
    };
}

// ����һ���»��ң�ˮƽ��ת��һ�����ҵ�ͼ��
function flipHoriz(painter) {
    return function(w, h) {
        return $('<div>').css({
            width: w,
            height: h,
            transform: 'scale(-1, 1)'
        }).append(painter(w, h));
    };
}

// ����һ���»��ң�������һ�����ҵ�ͼ���ڵڶ�������ͼ������
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

// ����һ���»��ң�������һ�����ҵ�ͼ���ڵڶ�������ͼ����ϱ�
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