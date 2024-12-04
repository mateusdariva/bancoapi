<?php
require "banco.php";  

$id = $_GET['id'];
$displayname = $_GET['displayname'];
$name = $_GET['name'];  
$abbreviation = $_GET['abbreviation'];
$location = $_GET['location'];

$name = $_GET['name']; 

$sql = "INSERT INTO equipe (id, displayname, name, abbreviation, location) 
        VALUES (:id, :displayname, :name, :abbreviation, :location)";

$qry = $con->prepare($sql);
$qry->bindParam(':id', $id, PDO::PARAM_STR);
$qry->bindParam(':displayname', $displayname, PDO::PARAM_STR);
$qry->bindParam(':name', $name, PDO::PARAM_STR);
$qry->bindParam(':abbreviation', $abbreviation, PDO::PARAM_STR);
$qry->bindParam(':location', $location, PDO::PARAM_STR);
$qry->execute();

$nr = $qry->rowCount();  
echo $nr;
?>