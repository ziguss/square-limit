

function rightSplit(painter, n) {
    if (n == 0) {
        return painter;
    }
    return beside(painter, below(rightSplit(painter, n - 1), rightSplit(painter, n - 1)));
}

function upSplit(painter, n) {
    if (n == 0) {
        return painter;
    }
    return below(beside(upSplit(painter, n - 1), upSplit(painter, n - 1)), painter);
}

function cornerSplit(painter, n) {
    if (n == 0) {
        return painter;
    }
    return below(
        beside(beside(upSplit(painter, n - 1), upSplit(painter, n - 1)), cornerSplit(painter, n - 1)),
        beside(painter, below(rightSplit(painter, n - 1), rightSplit(painter, n - 1)))
    );
}

function squareLimit(painter, n) {
    var item = cornerSplit(painter, n);
    var half = below(item, flipVert(item));
    return beside(flipHoriz(half), half);
}