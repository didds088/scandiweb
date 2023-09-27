<?php
header("Access-Control-Allow-Origin: *");

class Database {
    private $host = "localhost";
    private $username = "id21319431_didds088";
    private $password = "Panpan4196#";
    private $database = "id21319431_scandiweb";
    public $connect;

    public function __construct() {
        $this->connect = new mysqli($this->host, $this->username, $this->password, $this->database);
        if ($this->connect->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    //LOAD PRODUCTS
    public function load(){
        $conn=$this->connect;
        $data=array();
        $sql = "SELECT * FROM products";
        $ret_data=mysqli_query($conn,$sql);
        $rowcount=mysqli_num_rows($ret_data);
        if ($rowcount>0) {
        while ($row=mysqli_fetch_object($ret_data)){
            $data[]=$row;
        }
        }
        else {
        $data = "0";
        }
        echo json_encode($data);
    }

    // ADD NEW PRODUCTS
    public function add($name,$sku,$price,$type,$measurement){
        $conn = $this->connect;
        $insert = mysqli_query($conn,"INSERT INTO products (`name`, `sku`, `price`, `type`, `measurement`) VALUES ('$name','$sku','$price','$type','$measurement')");
        if ($insert) {
            $data = array("true");
          }
          else {
            $data = array("false");
          }
        echo json_encode($data);
    }

}
?>