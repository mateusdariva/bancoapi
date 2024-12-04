<?php
require "banco.php";

if (!isset($_GET['id'])){
    echo 'Erro, id é obrigatório';
}

$id = $_GET['id'];

$sql = "DELETE from equipe  
where id = :id";

$qry = $con->prepare($sql);
$qry->bindParam(':id', $id, PDO::PARAM_STR);
$qry->execute();
$nr = $qry->rowCount();
echo $nr;

?>