$(function () {
  if (localStorage.getItem("buygoods")) {
    var goodsArr = JSON.parse(localStorage.getItem("buygoods"))
    $.ajax({
      url: './data/data.json',
      type: 'get',
      dataType: 'json',
      success: function (json) {
        var str = '';
        $.each(goodsArr, function (index, item) {
          // console.log(item);// {buys: "4", num: "2"}
          $.each(json, function (ind, obj) {
            if (item.buys == obj.code) {
              str+=`<li code = ${obj.code}>
              <!-- 全选全不选 -->
              <div class="f-left c-box"> 
                <input type="checkbox" class="t-one">
              </div>
              <!-- 商品图片 -->
              <div class="f-left c-img"> 
                <a href="./Mu-details.html"><img src="./${obj.url}" alt=""></a>
              </div>
              <!-- 商品信息 -->
              <div class="f-left c-txt">
                <a href="./Mu-details.html"><p>${obj.title}</p></a>
              <!-- <p>白色 M</p> -->
              </div>
              <!-- 商品单价 -->
              <div class="f-left c-pre">
                ￥<i class="unit">${obj.price}</i>
              </div>
              <!-- 增加减少 -->
              <div class="f-left ad">
                <a href="javascript:;" class="cut">-</a>
                <span><input type="text" value="${item.num}"></span>
                <a href="javascript:;" class="add">+</a>
              </div>
              <!-- 增加减少后的价格 -->
              <div class="f-left c-pre">
                <em>￥</em><em class="Total">${obj.price}</em>
              </div>
              <!-- 删除商品 -->
              <div class="f-left delete">
                删除
              </div>
            </li>`
            }
          })
          $('.c-nm').children('ul').html(str)
        })
// 加载后就执行 商品单价*商品数量
        $('.Total').each(function (index, ele) {
          var shuliang = $(this).parent().prev().find('input').val()
          var danjia = $(this).parent().prev().prev().find('.unit').text()
          $(this).text(shuliang*danjia)
        })

        carNum()

      }
    })
    
  } else {
    nohasgoods()
  }


  //点击删除按钮删除商品
  $('.c-nm').children('ul').on('click', '.delete', function () {
    var decode = $(this).parent().attr('code');
    $(this).parent().remove();
    $.each(goodsArr,function (index, ele) {
      if(decode == ele.buys){
        goodsArr.splice(index, 1)
        return false
      }
  })
    localStorage.setItem('buygoods', JSON.stringify(goodsArr))
    // console.log(JSON.parse(localStorage.getItem("buygoods")).length);
    if (JSON.parse(localStorage.getItem("buygoods")).length == 0) {
      nohasgoods()
    }
  })
// 减少数量
  $('.c-nm').children('ul').on('click', 'li .ad .cut', function () {
    var num = Number($(this).next().children('input').val());
    if (num == 1) {
      return
    }
    num -= 1;
    $(this).next().children('input').val(num);
    var a = Number($(this).parent().prev().find('.unit').text())
    var zongjia = a * num;
    $(this).parent().next().find('.Total').text(zongjia);
    var _this = $(this)
    $.each(goodsArr, function (index, ele) {
      if (_this.parent().parent().attr("code") == ele.buys) {
        // console.log(_this.parent().parent().attr("code"));
        // console.log(ele.num);
        ele.num = num
        return false
      }
  })
    localStorage.setItem('buygoods', JSON.stringify(goodsArr))
    carNum()
  })
  // 加数量
  $('.c-nm').children('ul').on('click', 'li .ad .add', function () {
    var num = Number($(this).prev().children('input').val());
    if (num == 5) {
      alert('有钱吗你？限购!')
      return
    }
    num += 1;
    $(this).prev().children('input').val(num);
      // 计算总价
    var a = Number($(this).parent().prev().find('.unit').text())
    var zongjia = a * num;
    $(this).parent().next().find('.Total').text(zongjia);
    var _this = $(this)
    $.each(goodsArr, function (index, ele) {
      if (_this.parent().parent().attr("code") == ele.buys) {
        // console.log(_this.parent().parent().attr("code"));
        // console.log(ele.num);
        ele.num = num
        return false
      }
  })
    localStorage.setItem('buygoods', JSON.stringify(goodsArr))
    carNum()
  })
  
  // 点击全选全部选中
  $('.t-all').click(function () {
    if ($(this).prop('checked')) {
      allPrice();
      $('.t-one').prop('checked',true)
    } else {
      $('.t-one').prop('checked', false)
      $('.total').children('i').text("0.00")
    }
    // 计算全部价格
  })

// 点击单选
  $('.c-nm').on("click", '.t-one', function () {
    var flag = true;
    $('.t-one').each(function (index, ele) {
      if (!$(ele).prop("checked")) {
        flag = false
        return false
      }
    })
    if (flag) {
      $('.t-all').prop('checked', true);
    } else {
      $('.t-all').prop('checked', false);
    }
  })
  
// 选中一个商品显示价格
  $('.c-nm').children('ul').on('click', 'li .t-one', function () {
    $('.t-one').each(function (index,ele) {
      if ($(this).prop('checked')) {
        console.log($(this).parent().parent().find(".Total").text());
      }
    })
  })


  
  
  
  
  
  
  
  


// 顶部小火箭
$(".m-back").click(function () {
  $("html,body").stop().animate({ scrollTop: 0 }, 100);
});

  
  function allPrice() {
    // 计算总价
    var allPrice = 0;
    $('.Total').each(function (index, item) {
      allPrice += Number($(item).text())
    })
    console.log(allPrice);
    $('.total').children('i').text(allPrice)
  }
  
  function nohasgoods() {
  // 如果没有商品cookie 下面结算隐藏
  $('.g-foot').css('display','none')
  var nodata = '<li style="line-height: 70px; text-align: center;">购物车暂无数据！</li>'
  $('.c-nm').find('ul').html(nodata)
  alert('没有东西哟，快去败家吧~')
  }

  function carNum() {
    var cNum = 0;
  $('.c-nm').children('ul').children('li').find('.ad').children('span').children('input').each(function (index, ele) {
    cNum += Number($(ele).val())
  })
   $('.Cart').children('span').text(cNum)
  }



     
    





})
