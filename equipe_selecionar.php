<?php
require "banco.php";

if (!isset($_GET['id'])) {
    echo json_encode(['erro' => 'Erro, id é obrigatório']); 
    exit;  
}

$id = $_GET['id'];

$sql = "SELECT * FROM equipe WHERE id = :id";

try {
    $qry = $con->prepare($sql);
    $qry->bindParam(':id', $id, PDO::PARAM_INT); 
    $qry->execute();
    
    $registro = $qry->fetch(PDO::FETCH_OBJ);
    
    if ($registro) {
        echo json_encode($registro);
    } else {

        echo json_encode(['erro' => 'Equipe não encontrada']);
    }
} catch (PDOException $e) {
    echo json_encode(['erro' => 'Erro ao acessar o banco de dados: ' . $e->getMessage()]);
}
?>
