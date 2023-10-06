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
    
}

abstract class Product extends Database {
    protected $id;
    protected $name;
    protected $sku;
    protected $price;
    protected $type;
    protected $measurement;
    
    public function setID($id){
        $this->id = $id;
    }
    public function setName($name) {
        $this->name = $name;
    }

    public function setSku($sku) {
        $this->sku = $sku;
    }

    public function setPrice($price) {
        $this->price = $price;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function setMeasurement($measurement) {
        $this->measurement = $measurement;
    }

    public function getID(){
        return $this->id;
    }
    public function getName()
    {
        return $this->name;
    }

    public function getSku()
    {
        return $this->sku;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function getType()
    {
        return $this->type;
    }

    public function getMeasurement()
    {
        return $this->measurement;
    }
    protected function getConnection() {
        return $this->connect;
    }
    public abstract function add();
    public abstract function check();
    public abstract function delete();
}

class ProductManager extends Product {

    public function add() {
        $conn = $this->getConnection();
        $name = $this->getName();
        $sku = $this->getSku();
        $price = $this->getPrice();
        $type = $this->getType();
        $measurement = $this->getMeasurement();

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

    public function check(){
        $conn = $this->getConnection();
        $sku = $this->getSku();

        $sql = "SELECT * FROM products WHERE sku=?";
        $ret_data = $conn->prepare($sql);
        $ret_data->bind_param("s", $sku);
        $ret_data->execute();
        $result = $ret_data->get_result();

        $rowcount = $result->num_rows;
        if ($rowcount > 0){
            $data = array("exist");
        }
        else{
            $data = array("!exist");
        }
        echo json_encode($data);
    }

    public function delete() {
        $conn = $this->getConnection();
        $id = $this->getID();

        $sql = "DELETE FROM products WHERE id=?";
        $del_data = $conn->prepare($sql);
        $del_data->bind_param("s", $id);

        if ($del_data->execute()) {
            $data = array("deleted");
        } else {
            $data = array("!deleted");
        }
        echo json_encode($data);
    }
}

class DisplayManager extends Database{

    public function load(){
        $conn = $this->connect;
        $data = array();

        $sql = "SELECT * FROM products";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        $rowcount = $result->num_rows;
        if ($rowcount > 0){
            while ($row = $result->fetch_object()) {
                $data[] = $row;
            }
        }
        else {
            $data = "0";
        }
        echo json_encode($data);

    }
}

?>
