<?php
header('Content-type:application/json');

/*获取客户端页面传来的参数*/
@$id = $_REQUEST['id'];
if(empty($id)) //判断参数
{
    echo '[]';
    return;
}

//根据 id 参数的数据查询
$conn = mysqli_connect('127.0.0.1','root','','kaifanla');
$sql = 'set names utf8';
mysqli_query($conn,$sql);
$sql = 'select * from kf_dish where did=$id';
$result = mysqli_query($conn,$sql);

//分析结果，返回json数组串
$row = mysqli_fetch_assoc($result);
if(empty($row))
    echo '[]';
else
{
    $output[] = $row;
    echo json_encode($output);
}
?>
