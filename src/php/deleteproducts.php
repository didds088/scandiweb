<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require "index.php";

$raw_data = file_get_contents('php://input');
$Posts = json_decode($raw_data);
$id = $Posts -> id;

$product = new ProductManager();
$product->setID($id);
$product->delete($id);    

?>