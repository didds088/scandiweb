<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require "index.php";

$raw_data = file_get_contents('php://input');
$Posts = json_decode($raw_data);
$inputName = $Posts->name;
$inputSku = $Posts->sku;
$inputPrice = $Posts->price;
$inputType = $Posts->type;
$inputMeasurement = $Posts->measurement;

$product = new ProductManager();

$product->setName($inputName);
$product->setSku($inputSku);
$product->setPrice($inputPrice);
$product->setType($inputType);
$product->setMeasurement($inputMeasurement);
$product->add();
?>
