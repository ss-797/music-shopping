    var minBox = document.querySelector(".minBox");
    var maxBox = document.querySelector(".maxBox")
    var mask = document.querySelector(".mask")
    var img = document.querySelector(".maxBox img")

    minBox.onmousemove = function(eve) {
        var e = eve || event;
        var maskLeft = e.clientX - offset(minBox).left - mask.clientWidth / 2
        var maskTop = e.clientY - offset(minBox).top - mask.clientHeight / 2
        if (maskLeft < 0) {
            maskLeft = 0
        }
        if (maskLeft >= (minBox.clientWidth - mask.clientWidth)) {
            maskLeft = minBox.clientWidth - mask.clientWidth
        }
        if (maskTop < 0) {
            maskTop = 0
        }
        if (maskTop >= (minBox.clientHeight - mask.clientHeight)) {
            maskTop = minBox.clientHeight - mask.clientHeight
        }
        mask.style.left = maskLeft + 'px'
        mask.style.top = maskTop + 'px'
        var scaleX = maskLeft / (minBox.clientWidth - mask.clientWidth)
        var scaleY = maskTop / (minBox.clientHeight - mask.clientHeight)

        // 大图也跟随移动
        img.style.left = -scaleX * (img.clientWidth - maxBox.clientWidth) + 'px'
        img.style.top = -scaleY * (img.clientHeight - maxBox.clientHeight) + 'px'
    }





    minBox.onmouseenter = function() {
        mask.style.display = "block";
        maxBox.style.display = "block";
    }
    minBox.onmouseleave = function() {
        mask.style.display = "none";
        maxBox.style.display = "none";
    }





    // 获取元素到最外层定位父级的距离
    function offset(dom, bool) {
        var t = 0,
            l = 0
        var bdl = dom.clientLeft // 保存当前元素的左边框
        var bdt = dom.clientTop // 保存当前元素的上边框
        while (dom) {
            l += dom.offsetLeft + dom.clientLeft
            t += dom.offsetTop + dom.clientTop
                // 每次循环完让当前dom元素等于他的定位父级
            dom = dom.offsetParent
        }
        if (bool) { // 包含自身边框
            return {
                left: l,
                top: t
            }
        } else { // 不包含自身边框
            return {
                left: l - bdl,
                top: t - bdt
            }
        }
    }
