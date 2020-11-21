$(function () {
  $('.l-btn').click(function () {
    var unm = $('#username').val()
    var psd = $('#password').val()

    if(!unm || !psd){
      alert("请输入账号密码")
      return
    }
    console.log(unm);
    console.log(psd);
    


  })

















})