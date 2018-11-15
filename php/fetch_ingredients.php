<?php
header('Access-Control-Allow-Origin: *');

$cakename = file_get_contents('php://input');
// $cakename = "Cheese Cake";

$servername = "127.0.0.1";
$username = "yubaitao";
$password = "yubaitao";
$database = "bakery";

$conn = mysqli_connect($servername, $username, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT iname, qty FROM contain NATURAL JOIN ingredient WHERE cakeid = 
(SELECT cakeid FROM cake WHERE cakename = '$cakename')";
$result = mysqli_query($conn, $sql);
if (!$result) {
    exit();
}

$rows = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    echo json_encode($row);
}

?>
