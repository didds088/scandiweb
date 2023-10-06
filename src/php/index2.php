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
        $insert = $conn->prepare("INSERT INTO products (`name`, `sku`, `price`, `type`, `measurement`) VALUES (?, ?, ?, ?, ?)");
        $insert->bind_param("sssss", $name, $sku, $price, $type, $measurement);
        
        if ($insert->execute()) {
            $data = array("true");
          }
          else {
            $data = array("false");
          }
        echo json_encode($data);
    }

    // CHECK IF SKU EXIST
    public function check($sku){
        $conn = $this->connect;
        $sql = "SELECT * FROM products WHERE sku='$sku'";
        $ret_data = mysqli_query($conn,$sql);
        $rowcount=mysqli_num_rows($ret_data);
        if ($rowcount > 0){
            $data = array("exist");
        }
        else{
            $data = array("!exist");
        }
        echo json_encode($data);
    }

    // CHECK IF DELETE PRODUCTS
    public function delete($id){
        $conn = $this->connect;
        $sql = "DELETE FROM products WHERE id=$id";
        $del_data = mysqli_query($conn,$sql);
        if ($del_data){
            $data = array("deleted");
        }
        else{
            $data = array("!deleted");
        }
        echo json_encode($data);
    }

}
?>
