function iniciar() {
    listarEquipe();  
    exibirLog();
}

async function apiEquipe() {
    const urlApi = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams';  

    try {
        const resApi = await fetch(urlApi);
        if (!resApi.ok) {
            throw new Error('Erro ao buscar equipes da API');
        }
        const data = await resApi.json();
        const equipesApi = data.sports[0].leagues[0].teams;

        console.log(equipesApi);

        const tabela = document.getElementById('tabelaEquipe');
        let conteudoTabela = '';

        equipesApi.forEach(equipe => {
            conteudoTabela += `
                <tr>
                    <td>${equipe.team.id}</td>
                    <td>${equipe.team.displayName}</td>
                    <td>${equipe.team.name}</td>
                    <td>${equipe.team.abbreviation}</td>
                    <td>${equipe.team.location}</td>
                    <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEquipe" onclick="abrirEquipe(${equipe.team.id})">Alterar</button></td>
                    <td><button class="btn btn-danger" onclick="excluirEquipe(${equipe.team.id})">Excluir</button></td>
                </tr>
            `;
        });

        tabela.innerHTML = conteudoTabela;

        const log = {
            idlog: new Date().getTime(), 
            datahora: new Date().toISOString(),
            numeroregistros: equipesApi.length,
            status: 'Sucesso'
        };
        await inserirLog(log);

    } catch (error) {
        const log = {
            idlog: new Date().getTime(), 
            datahora: new Date().toISOString(),
            numeroregistros: 0,
            status: 'Erro'
        };
        await inserirLog(log);

        console.error('Erro ao listar equipes:', error);
        alert('Erro ao listar as equipes. Por favor, tente novamente mais tarde.');
    }
}

async function inserirLog(log) {
    const url = './log_inserir.php';
    const resposta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(log)
    });

    if (resposta.ok) {
        console.log('Log inserido com sucesso');
    } else {
        console.error('Erro ao inserir log');
    }
}

async function exibirLog() {
    const url = './log_exibir.php';
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Erro ao buscar logs.');
        }
        const logs = await res.json();

        const tabela = document.getElementById('tabelaLog');
        let conteudoTabela = `
            <tr>
                <th>ID Log</th>
                <th>Data/Hora</th>
                <th>Número de Registros</th>
                <th>Status</th>
            </tr>
        `; // Cabeçalhos da tabela

        logs.forEach(log => {
            conteudoTabela += `
                <tr>
                    <td>${log.idlog}</td>
                    <td>${log.datahora}</td>
                    <td>${log.numeroregistros}</td>
                    <td>${log.status}</td>
                </tr>
            `;
        });

        tabela.innerHTML = conteudoTabela;
    } catch (error) {
        console.error('Erro ao exibir logs:', error);
        alert('Erro ao exibir os logs. Por favor, tente novamente mais tarde.');
    }
}



async function importarEquipes() {
    const confirmarImportacao = confirm("Deseja adicionar as equipes importadas ao banco de dados?");
    if (confirmarImportacao) {
        const urlApi = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams';  

        try {
            const resApi = await fetch(urlApi);

            if (!resApi.ok) {
                throw new Error('Erro ao buscar equipes da API');
            }

            const data = await resApi.json();
            const equipesApi = data.sports[0].leagues[0].teams;

            for (const equipe of equipesApi) {
                const urlInserir = `./equipe_inserir.php?displayname=${equipe.team.displayName}&name=${equipe.team.name}&abbreviation=${equipe.team.abbreviation}&location=${equipe.team.location}`;
                await fetch(urlInserir);  
            }

            const log = {
                idlog: new Date().getTime(), 
                datahora: new Date().toISOString(),
                numeroregistros: equipesApi.length,
                status: 'Sucesso'
            };
            await inserirLog(log);

            alert('Equipes importadas e salvas com sucesso no banco de dados!');
            listarEquipe();  
            exibirLog();  

        } catch (error) {
            const log = {
                idlog: new Date().getTime(), 
                datahora: new Date().toISOString(),
                numeroregistros: 0,
                status: 'Erro'
            };
            await inserirLog(log);

            console.error('Erro ao importar equipes:', error);
            alert('Erro ao importar as equipes. Tente novamente mais tarde.');
        }
    }
}

async function listarEquipe() {
    const url = './equipe_listar.php';
    const res = await fetch(url).then(resposta => resposta.json());

    console.log(res);

    const tabela = document.getElementById('tabelaEquipe');
    let a = '';
    for (const equipe of res) {
        a += `
            <tr>
                <td>${equipe.id}</td>
                <td>${equipe.displayname}</td>
                <td>${equipe.name}</td>
                <td>${equipe.abbreviation}</td>
                <td>${equipe.location}</td>
                <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEquipe" onclick="abrirEquipe(${equipe.id})">Alterar</button></td>
                <td><button class="btn btn-danger" onclick="excluirEquipe(${equipe.id})">Excluir</button></td>
            </tr>
        `;
    }
    tabela.innerHTML = a;
}

async function abrirEquipe(id) {
    console.log(id);  
    const inputId = document.getElementById('id');
    const inputDisplayname = document.getElementById('displayname');
    const inputName = document.getElementById('name');
    const inputAbbreviation = document.getElementById('abbreviation');
    const inputLocation = document.getElementById('location');

    if (id === 0) {
        document.getElementById('tituloEquipe').innerText = "Inserir Nova Equipe";
        inputId.value = '';
        inputDisplayname.value = '';
        inputName.value = '';
        inputAbbreviation.value = '';
        inputLocation.value = '';
    } else {
        document.getElementById('tituloEquipe').innerText = "Alterar Equipe";

        const url = `./equipe_selecionar.php?id=${id}`;
        console.log(url);  
        const res = await fetch(url).then(resposta => resposta.json());

        console.log(res);

        inputId.value = res.id;
        inputDisplayname.value = res.displayname;
        inputName.value = res.name;
        inputAbbreviation.value = res.abbreviation;
        inputLocation.value = res.location;
    }
}

async function salvarEquipe() {
    const id = document.getElementById('id').value;
    const displayname = document.getElementById('displayname').value;
    const name = document.getElementById('name').value;
    const abbreviation = document.getElementById('abbreviation').value;
    const location = document.getElementById('location').value;

    let url;
    if (id) {
        url = `./equipe_alterar.php?id=${id}&displayname=${displayname}&name=${name}&abbreviation=${abbreviation}&location=${location}`;
        await fetch(url);
    } else {
        url = `./equipe_inserir.php?displayname=${displayname}&name=${name}&abbreviation=${abbreviation}&location=${location}`;
        await fetch(url);
    }

    listarEquipe();  
}

async function excluirEquipe(id) {
    const confirmar = confirm('Tem certeza que deseja excluir esta equipe?');
    if (confirmar) {
        const url = `./equipe_excluir.php?id=${id}`;
        await fetch(url);
        listarEquipe();  
    }
}

async function excluirTodosRegistros() {
    const confirmar = confirm('Tem certeza que deseja excluir todos os registros da tabela "equipe"?');
    if (confirmar) {
        const url = './delete_all.php';

        try {
            const response = await fetch(url, {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir todos os registros.');
            }
            const data = await response.text();
            document.getElementById('mensagem').textContent = data;
            listarEquipe(); // Atualiza a lista de equipes
            alert('Todos os registros foram excluídos com sucesso.');
        } catch (error) {
            console.error('Erro ao excluir todos os registros:', error);
            document.getElementById('mensagem').textContent = 'Ocorreu um erro ao tentar excluir os registros.';
            alert('Erro ao excluir todos os registros. Tente novamente mais tarde.');
        }
    }
}

