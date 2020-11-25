$(function () {

// 放大镜图片
  var $snav = $('.snav ul')
  $snav.on('click', "li", function () {
    $(this).addClass("z-sel").siblings().removeClass("z-sel")
    // console.log($(this).attr("index"));
    $('.smallImg img').attr("src","./img/secondary"+$(this).attr("index") +".jpg")
    $('.bigImg img').attr("src","./img/secondary"+$(this).attr("index") +".jpg")
  })

  // 放大镜区域
  var minBox = $('.smallImg')
  var maxBox = $('.bigImg')
  var mask = $('.mask')
  var img = $('.bigImg img')
minBox.on('mousemove', function (e) {
  var maskLeft = e.pageX - minBox.offset().left - mask.width() / 2;
  var maskTop = e.pageY - minBox.offset().top - mask.height() / 2;
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
    position:"absolute",
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
  
// 选项点击效果
  var $sUl = $('.s-pe')
  $sUl.on('click','li',function () {
    // $(this).addClass("z-sel").siblings().removeClass("z-sel")
    $(this).css('border','2px solid #d33a31').siblings().css('border','2px solid #e5e5e5')

  })

// 增加删除按钮
  $('.add').on('click', function () {
    var con = Number($(this).prev().children('.text').val())
    con += 1;
    if (con>5) {
      con = 5
      alert('限购！')
    }
    console.log(con);

    $(this).prev().children('.text').val(con) 
})
  $('.cut').on('click', function () {
    var con = Number($(this).next().children('.text').val())
    con -= 1;
    if (con<1) {
      con = 1
      alert('不能为零')
    }
    console.log(con);
    $(this).next().children('.text').val(con) 
  })
  
// 顶部小火箭
$(".m-back").click(function () {
  $("html,body").stop().animate({ scrollTop: 0 }, 100);
});
  
  
// 获取cookie中的用户名
if (localStorage.getItem("user")) {
  var userArr = JSON.parse(localStorage.getItem("user"))
  // console.log(userArr);
  $('#login').html('<img src="./img/ayao.jpg">')
}
  
// 点击去购物车页面
  $('.shopcar').on('click', function () {
    location.href = './Mu-Cart.html'
    // window.open("./Mu-Cart.html")
  })


// 根据主页的商品跳转详情页
  if (localStorage.getItem("wares")) {
  var arr = JSON.parse(localStorage.getItem('wares'))
  // console.log(arr[0].code);
  // [{"code":"12"},{"code":"11"},{"code":"10"}]
  var code = arr[0].code
}
  

  
  if (!!code) {
    $.ajax({
      url: "../163-music/data/data.json",
      type: "get",
      dataType: "json",
      success: function (json) {
        $.each(json, function (index, item) {
          if (item.code == code) {
            // console.log(item);
            $('.pointer').html("<i></i>"+item.title)
            $('.f-ff2').text(item.title)
            $('.j-flag').text(item.price)
          }
        })
      }
    })
  }
// 加入购物车渲染购物车页面
  $('.buy').click(function () {
    if (localStorage.getItem("wares")) {
      var waresArr = JSON.parse(localStorage.getItem("wares"))
    } else {
      var waresArr = []
    }
    if (localStorage.getItem("buygoods")) {
      var buyArr = JSON.parse(localStorage.getItem("buygoods"))
    } else {
      var buyArr = []
    }
    console.log(waresArr,buyArr);
    buyArr.push({ buys: waresArr[0].code, num: $('.text').val() })
    localStorage.setItem('buygoods', JSON.stringify(buyArr))
})

})
