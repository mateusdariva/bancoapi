<?php
require "banco.php";

if (!isset($_GET['id']) || !isset($GET['displayname']) || !isset($GET['name']) || !isset($GET['abbreviation']) || !isset($GET['location'])){
    echo 'Erro, id, displayname e name são obrigatórios';
}

$id = $_GET['id'];
$displayname = $_GET['displayname'];
$name = $_GET['name'];
$abbreviation = $_GET['abbreviation'];
$location = $_GET['location'];

$sql = "UPDATE equipe set displayname = :displayname, name = :name, abbreviation = :abbreviation, location = :location
where id = :id";

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