<?php
require "banco.php"; 

try {
    $sql = "SELECT * FROM log ORDER BY idlog";
    $qry = $con->prepare($sql);
    $qry->execute();

    if ($qry->rowCount() > 0) {
        $registros = $qry->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($registros, JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode([]);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Erro ao acessar o banco de dados: ' . $e->getMessage()]);
}
?>
