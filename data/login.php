<?php
/* 
接口说明文档

url: './data/user.php'
type: post
参数：user   用户账号
      pass  用户密码
      type  登录或注册
          = login 登录
          = add   注册 
返回值示例：
{"err":0,"msg":"登录成功"}

*/
// 允许任何来源
header("Access-Control-Allow-Origin:*"); 

// 设置响应头信息
header('Content-Type:text/html;charset=utf-8');

$user = $_POST['name'];
$pass = $_POST['pwd'];
// $user = $_POST['rzp'];
// $pass = $_POST['1997'];
      // echo "<script>console.log($user,$pass);</script>";

// 连接数据库
$link = mysqli_connect('localhost','root','123456','testmess');
// if (!$link) {
//   die('{"err":-1,"msg":"连接失败"}');
// }else {
//   echo '连接成功';
// }

$login_sql = "select * from login where name='$user' and password='$pass'";
$login_res = mysqli_query($link,$login_sql);
$login_arr = mysqli_fetch_all($login_res,1);
if (count($login_arr) > 0) {
  echo '{"err":0,"msg":"登录成功"}';
} else {
  echo '{"err":-3,"msg":"账号或密码错误"}';
}





mysqli_close($link);
?>