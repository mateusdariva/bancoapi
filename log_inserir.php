<?php
require "banco.php"; 

try {
    $dados = json_decode(file_get_contents('php://input'), true);

    $idlog = $dados['idlog'];
    $datahora = $dados['datahora'];
    $numeroregistros = $dados['numeroregistros'];

    $sql = "INSERT INTO log (idlog, datahora, numeroregistros) VALUES (?, ?, ?)";
    $stmt = $con->prepare($sql);
    $stmt->bindParam(1, $idlog);
    $stmt->bindParam(2, $datahora);
    $stmt->bindParam(3, $numeroregistros);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'sucesso']);
    } else {
        echo json_encode(['status' => 'erro']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Erro ao acessar o banco de dados: ' . $e->getMessage()]);
}
?>

