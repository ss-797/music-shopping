$(function () {
  var minBox = $('.minBox')
  var maxBox = $('.maxBox')
  var mask = $('.mask')
  var img = $('.maxBox img')

  minBox.on('mousemove', function (e) {
    var maskLeft = e.clientX - minBox.offset().left - mask.width() / 2;
    var maskTop = e.clientY - minBox.offset().top - mask.height() / 2;
  if (maskLeft < 0) {
    maskLeft = 0
  }
  if (maskLeft >= (minBox.width() - mask.width())) {
      maskLeft = minBox.width() - mask.width()
  }
  if (maskTop < 0) {
      maskTop = 0
  }
  if (maskTop >= (minBox.height() - mask.height())) {
      maskTop = minBox.height() - mask.height()
  }
    mask.css({
      left: maskLeft,
      top: maskTop
    })
    var scaleX = maskLeft / (minBox.width() - mask.width())
    var scaleY = maskTop / (minBox.height() - mask.height())

    img.css({
      left: -scaleX * (img.width() - maxBox.width()),
      top: -scaleY * (img.height() - maxBox.height())
    })

  })






















  minBox.on('mouseenter', function () {
    maxBox.css("display", 'block')
    mask.css("display", 'block')
  })
  minBox.on('mouseleave', function () {
    maxBox.css("display", 'none')
    mask.css("display", 'none')
  })



  
})