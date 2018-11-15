<?php
header('Access-Control-Allow-Origin: *');

$custid = file_get_contents('php://input');
$user_exist = true;
$response = json_encode(array('custid_exist' => $user_exist, 
                              'custid' => $custid));

echo $response;
?>
