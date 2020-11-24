$(function () {
  $.ajax({
    url: "../163-music/data/data.json",
    type: "get",
    dataType: "json",
    success: function (json) {
      var addStr = '';
      $.each(json, function (index, item) {
addStr+=`<li>
            <a href="javaScript:;">
              <img src="${item.url}" alt="">
            </a>
            <div class="re-bot">
              <h3>
                <span>
                  特价
                </span>
                <a href="javaScript:;">
                ${item.title}
                </a>
                <p>¥<em code = ${item.code}>${item.price}</em></p>
              </h3>
            </div>
        </li>`
      })
      $('.content').html(addStr)
    }
  })

  $('.content').on('click', 'li', function () {
    var code = $(this).find('em').attr('code')
    console.log(code);
    if (localStorage.getItem("wares")) {
      var waresArr = JSON.parse(localStorage.getItem("wares"))
    } else {
      var waresArr = []
    }
    waresArr.unshift({code:code})
    localStorage.setItem("wares", JSON.stringify(waresArr))

    location.href = './Mu-details.html'
  })

// 获取cookie中的用户名
  if (localStorage.getItem("user")) {
    var userArr = JSON.parse(localStorage.getItem("user"))
    console.log(userArr);
    $('#login').html('<img src="./img/ayao.jpg">')
  }
})

// 点击购物车去对应页面
$('.shopcar').click(function () {
  location.href = "./Mu-Cart.html"
})





// scroll顶部小火箭
$(".m-back").click(function () {
  $("html,body").stop().animate({ scrollTop: 0 }, 1000);
});
//原生跟随窗口移动固定
// var mWrap = document.querySelector(".m-wrap")
// window.onscroll = function () {
//   var stop = document.documentElement.scrollTop;
//   if (stop >= 500) {
//     mWrap.style.position = "fixed";
//     mWrap.style.top = 150+"px";
//     mWrap.style.left = 1228 + "px";
//   } else {
//     mWrap.style.position = "absolute"
//     mWrap.style.top = 645+"px";
//     mWrap.style.left = 1228 + "px";

//   }
// }

// jQuery方法 固定导航栏
$(window).scroll(function () {
  var s = $(window).scrollTop()
  if (s >= 500) {
    $(".m-wrap").removeClass("sc").addClass('se')
  } else {
    $(".m-wrap").removeClass('se').addClass("sc")
  }
})





