<?php
header('Access-Control-Allow-Origin: *');

$custid = file_get_contents('php://input');
// $custid = 100001;
$servername = "127.0.0.1";
$username = "yubaitao";
$password = "yubaitao";
$database = "bakery";

$conn = mysqli_connect($servername, $username, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$sql = "SELECT cakeid, cakename, DATE(ordertime) AS date, TIME(ordertime) AS time, pricepaid FROM orders NATURAL JOIN cake WHERE custid = '$custid'";
// $sql = "SELECT cakename, DATE(ordertime) AS date, TIME(ordertime) AS time, pricepaid FROM orders NATURAL JOIN cake";
$result = mysqli_query($conn, $sql);
if (!$result) {
    exit();
}

$rows = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    echo json_encode($row);
}

?>
