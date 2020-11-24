$(function () {
  $('.l-btn').click(function () {
    var unm = $('#username').val()
    var psd = $('#password').val()

    if (!unm || !psd) {
      alert("请输入账号密码")
      return
    }
    console.log(unm);
    console.log(psd);
    

    $.post('./data/login.php', { name: unm, pwd: psd }, function (res) {
      var arr = JSON.parse(res);
      console.log(arr);
      alert(arr.msg)
      if (arr.err == 0) {
        if (localStorage.getItem("user")) {
          var userArr = JSON.parse(localStorage.getItem("user"))
        } else {
          var userArr = []
        }
        userArr.push({name:unm})
        localStorage.setItem('user', JSON.stringify(userArr))
        location.href = './Mu-Index.html'
      }
    })

  })



})