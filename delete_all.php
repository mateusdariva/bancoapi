<?php
require "banco.php";

try {
    if ($con) {
        $sql = "DELETE FROM equipe";
        $stmt = $con->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo "Todos os dados da tabela 'equipe' foram excluídos com sucesso.";
        } else {
            echo "Nenhum registro encontrado na tabela 'equipe'.";
        }
    } else {
        throw new Exception("Erro na conexão com o banco de dados.");
    }
} catch (Exception $e) {
    echo $e->getMessage();
}
?>
