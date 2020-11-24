$(function(){
  //点击删除按钮删除商品
  $('.delete').click(function () {
    $(this).parent().remove()
  })

  // 商品数量增加删除
  $('.cut').click(function () {
    var num = Number($(this).next().children('input').val());
    if (num == 1) {
      return
    }
    num -= 1;
    $(this).next().children('input').val(num);
    // 计算总价
    var a = Number($(this).parent().prev().find('.unit').text())
    var zongjia = a * num;
    $(this).parent().next().find('.Total').text(zongjia);
  })

  $('.add').click(function () {
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
  })
  
  
  // 进入购物车商品全部选中
  $('.t-all').prop('checked',true)
  if ($('.t-all').prop('checked')) {
    allPrice();
    $('.t-one').prop('checked',true)
  }
  
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
  
// 计算选中商品有几个



























































  
  function allPrice() {
    var allPrice = 0;
    $('.Total').each(function (index, item) {
      allPrice += Number($(item).text())
    })
    // console.log(allPrice);
    $('.total').children('i').text(allPrice)
  }





})
