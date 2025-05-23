// ====================================================================
// CONTEÚDO DE historiasData.js
// ====================================================================
const historiasData = [
    {
        id: 1,
        titulo: "O Pão que Une: Do Trigo ao Pão na Mesa da Cidade",
        resumo: "Descubra a jornada do trigo do campo até o pão que chega na sua mesa.",
        conteudo: "A cada manhã, o aroma do pão fresco invade as padarias da cidade. Mas você já parou para pensar de onde vem o ingrediente principal dessa delícia? Tudo começa no campo, onde o trigo, cultivado com carinho e dedicação pelos agricultores, cresce sob o sol e a chuva.\n\nDepois da colheita, o trigo é levado para moinhos, onde é transformado em farinha. Essa farinha, então, viaja para as cidades, para as mãos de padeiros talentosos que, com sua arte, a transformam no pão que alimenta milhões. É uma jornada que exemplifica a forte conexão entre o trabalho no campo e a vida na cidade.\n\nSem o esforço dos agricultores e a riqueza da terra, a mesa da cidade estaria incompleta. E sem a demanda da cidade, o campo perderia parte de seu propósito. É uma parceria essencial para a vida de todos.",
        imagem: "imagens/campo.jpg",
        jogo: {
            pergunta: "Qual o principal cereal cultivado no campo para a produção de pão na cidade?",
            opcoes: ["Milho", "Arroz", "Trigo", "Aveia"],
            respostaCorreta: "Trigo",
            pontos: 10
        }
    },
    {
        id: 2,
        titulo: "A Água da Montanha: Hidratando o Campo e a Cidade",
        resumo: "Entenda como as florestas no campo garantem a água que chega até a cidade.",
        conteudo: "Olhe para a sua torneira e imagine de onde vem essa água limpa e fresca. Muitas vezes, a resposta está bem distante, nas montanhas e florestas do campo. As nascentes e rios que brotam nessas áreas são os grandes reservatórios naturais que abastecem tanto as propriedades rurais quanto as grandes cidades.\n\nA preservação das florestas e matas ciliares no campo é crucial para garantir a qualidade e a quantidade da água que chega até nós. Elas funcionam como esponjas, absorvendo a água da chuva e liberando-a gradualmente, alimentando os lençóis freáticos e os rios. Quando o campo cuida de suas florestas, a cidade se beneficia diretamente da água pura.\n\nEssa dependência mútua pela água é um dos exemplos mais claros da conexão entre o campo e a cidade. A saúde de um impacta diretamente a do outro.",
        imagem: "imagens/cidade.jpg",
        jogo: {
            pergunta: "Qual a principal função das florestas nas montanhas para o abastecimento de água?",
            opcoes: ["Produzir madeira", "Regulamentar o ciclo da água", "Atrair turistas", "Servir de abrigo para animais"],
            respostaCorreta: "Regulamentar o ciclo da água",
            pontos: 15
        }
    },
    {
        id: 3,
        titulo: "Tecnologia no Campo: Conectando Produtores e Consumidores",
        resumo: "Veja como a tecnologia está aproximando o campo e a cidade.",
        conteudo: "Antigamente, a distância entre o produtor rural e o consumidor urbano era enorme. Hoje, a tecnologia está encurtando essa lacuna, promovendo uma conexão mais direta e eficiente.\n\nAplicativos de venda direta, plataformas de e-commerce e sistemas de rastreabilidade permitem que os consumidores da cidade saibam exatamente de onde vêm seus alimentos, quem os produziu e como foram cultivados. Ao mesmo tempo, os agricultores têm acesso a informações de mercado em tempo real e podem planejar suas colheitas de forma mais inteligente, atendendo às demandas da cidade.\n\nDrones para monitoramento de lavouras, sensores que otimizam o uso da água e softwares de gestão rural são apenas algumas das inovações que estão transformando o campo e estreitando seus laços com a vida urbana, celebrando a eficiência e a colaboração.",
        imagem: "imagens/tecnologia_campo.jpg",
        jogo: {
            pergunta: "Qual ferramenta tecnológica pode ajudar a conectar produtores rurais e consumidores urbanos de forma mais direta?",
            opcoes: ["Redes sociais de entretenimento", "Plataformas de e-commerce e venda direta", "Aplicativos de jogos", "Sistemas de transporte público"],
            respostaCorreta: "Plataformas de e-commerce e venda direta",
            pontos: 20
        }
    }
];

// Função para obter uma história por ID
function getHistoriaById(id) {
    return historiasData.find(historia => historia.id === parseInt(id));
}

// ====================================================================
// CONTEÚDO DE rankingManager.js
// ====================================================================
const RANKING_STORAGE_KEY = 'festaConexaoRanking';
const HAS_SAVED_SCORE_SESSION_KEY = 'hasSavedScoreThisSession';
const CURRENT_SCORE_KEY = 'userCurrentGameScore'; // Mantenha aqui para o getScore/setScore

// Carrega o ranking do localStorage
function getRanking() {
    try {
        const rankingString = localStorage.getItem(RANKING_STORAGE_KEY);
        // Garante que o ranking inicial tenha os dados default se não houver nada salvo
        const defaultRanking = [
            { nome: "Produtor Campeão", pontuacao: 100 },
            { nome: "Cidadão Conectado", pontuacao: 80 },
            { nome: "Amigo do Campo", pontuacao: 60 }
        ];
        let ranking = rankingString ? JSON.parse(rankingString) : defaultRanking;

        // Garante que não há duplicatas exatas na inicialização (apenas para o default)
        // Em um ambiente de produção, você pode querer uma lógica mais robusta
        const uniqueRanking = Array.from(new Map(ranking.map(item => [item.nome.toLowerCase(), item])).values());

        // Ordena por pontuação (decrescente) e depois por nome (alfabética)
        return uniqueRanking.sort((a, b) => b.pontuacao - a.pontuacao || a.nome.localeCompare(b.nome));

    } catch (error) {
        console.error("Erro ao carregar ranking do localStorage:", error);
        return [];
    }
}

// Salva o ranking no localStorage
function saveRanking(ranking) {
    try {
        localStorage.setItem(RANKING_STORAGE_KEY, JSON.stringify(ranking));
    } catch (error) {
        console.error("Erro ao salvar ranking no localStorage:", error);
    }
}

// Adiciona ou atualiza a pontuação de um jogador no ranking
function adicionarPontuacaoAoRanking(nome, pontuacao) {
    if (!nome || pontuacao <= 0) return;

    let ranking = getRanking();
    const nomeLimpo = nome.trim();

    // Encontra o jogador existente, ignorando case
    const jogadorExistenteIndex = ranking.findIndex(jogador => jogador.nome.toLowerCase() === nomeLimpo.toLowerCase());

    if (jogadorExistenteIndex !== -1) {
        // Se o jogador já existe, atualiza a pontuação se a nova for maior
        if (pontuacao > ranking[jogadorExistenteIndex].pontuacao) {
            ranking[jogadorExistenteIndex].pontuacao = pontuacao;
        }
    } else {
        // Se o jogador não existe, adiciona ao ranking
        ranking.push({ nome: nomeLimpo, pontuacao: pontuacao });
    }

    // Ordena o ranking por pontuação (decrescente) e depois por nome
    ranking.sort((a, b) => b.pontuacao - a.pontuacao || a.nome.localeCompare(b.nome));

    saveRanking(ranking);
    setHasSavedScoreThisSession(true); // Marca que o usuário salvou a pontuação nesta sessão
}

// Renderiza o ranking na página
function renderizarRanking() {
    const listaRankingElement = document.getElementById('lista-ranking');
    if (!listaRankingElement) return;

    const ranking = getRanking();
    listaRankingElement.innerHTML = ''; // Limpa a lista existente

    if (ranking.length === 0) {
        listaRankingElement.innerHTML = '<li class="ranking-item">Nenhum jogador no ranking ainda. Seja o primeiro!</li>';
        return;
    }

    ranking.forEach((jogador, index) => {
        const li = document.createElement('li');
        li.classList.add('ranking-item');

        // Adiciona classes para o Top 4
        if (index === 0) li.classList.add('top-1');
        else if (index === 1) li.classList.add('top-2');
        else if (index === 2) li.classList.add('top-3');
        else if (index === 3) li.classList.add('top-4');


        li.innerHTML = `
            <span class="position">${index + 1}º</span>
            <span class="name">${jogador.nome}</span>
            <span class="score">${jogador.pontuacao} pontos</span>
        `;
        listaRankingElement.appendChild(li);
    });
}

// Reseta todo o ranking (para testes/desenvolvimento)
function resetarRanking() {
    localStorage.removeItem(RANKING_STORAGE_KEY);
    localStorage.removeItem(HAS_SAVED_SCORE_SESSION_KEY); // Também reseta o flag de sessão
    setScore(0); // Zera a pontuação atual do jogador
    alert('Ranking resetado com sucesso!');
}

// Flag para saber se o usuário já salvou a pontuação nesta sessão (evita múltiplas saves para o mesmo nome)
function hasSavedScoreThisSession() {
    return localStorage.getItem(HAS_SAVED_SCORE_SESSION_KEY) === 'true';
}

function setHasSavedScoreThisSession(value) {
    localStorage.setItem(HAS_SAVED_SCORE_SESSION_KEY, value ? 'true' : 'false');
}

// ====================================================================
// CONTEÚDO DE uiElements.js
// ====================================================================
// Obtém a pontuação atual do localStorage
function getScore() {
    try {
        const scoreString = localStorage.getItem(CURRENT_SCORE_KEY);
        return scoreString ? JSON.parse(scoreString) : 0;
    } catch (error) {
        console.error("Erro ao ler pontuação do localStorage:", error);
        return 0;
    }
}

// Define a pontuação atual no localStorage
function setScore(newScore) {
    try {
        localStorage.setItem(CURRENT_SCORE_KEY, JSON.stringify(newScore));
    } catch (error) {
        console.error("Erro ao salvar pontuação no localStorage:", error);
    }
}

// Adiciona pontos à pontuação atual
function addPoints(points) {
    let currentScore = getScore();
    currentScore += points;
    setScore(currentScore);
    updateScoreDisplay(currentScore); // Atualiza o placar na tela
}

// Zera a pontuação atual
function resetScore() {
    setScore(0);
    updateScoreDisplay(0); // Atualiza o placar na tela
}

// Atualiza o display da pontuação em todas as ocorrências
function updateScoreDisplay(score) {
    const scoreElements = document.querySelectorAll('#pontuacao-atual');
    scoreElements.forEach(element => {
        element.textContent = score;
    });
}

// Função para exibir feedback (acerto/erro)
function showFeedback(elementId, message, type) {
    const feedbackElement = document.getElementById(elementId);
    if (feedbackElement) {
        feedbackElement.textContent = message;
        feedbackElement.className = `feedback ${type}`; // Adiciona classe 'acerto' ou 'erro'
        setTimeout(() => {
            feedbackElement.textContent = '';
            feedbackElement.className = 'feedback'; // Remove as classes de estilo
        }, 3000); // Remove o feedback após 3 segundos
    }
}

// ====================================================================
// CONTEÚDO PRINCIPAL DE app.js (Antigo main.js)
// ====================================================================

// Funções auxiliares para controle de seção (anteriormente em main.js)
function hideAllSections() {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.add('hidden');
    });
}

function showSection(id) {
    document.getElementById(id).classList.remove('hidden');
}

function updatePageTitle(title) {
    document.getElementById('page-title').textContent = title;
}

// --- Roteamento da SPA ---
const routes = {
    '/': 'home-page',
    '/historias': 'stories-list-page',
    '/historias/:id': 'story-detail-page', // :id é um placeholder para o ID da história
    '/ranking': 'ranking-page',
    '/404': 'not-found-page' // Página para rotas não encontradas
};

// Função principal de renderização de página
function renderPage(path) {
    hideAllSections(); // Esconde todas as seções primeiro
    updateScoreDisplay(getScore()); // Atualiza o placar em todas as transições

    let pageToShow = 'not-found-page'; // Padrão: página não encontrada
    let historiaId = null;

    // Lógica de roteamento: verifica qual rota corresponde ao path
    if (path === '/') {
        pageToShow = 'home-page';
        updatePageTitle('Festejando a Conexão');
        document.getElementById('header-subtitle').textContent = 'Histórias que unem, jogos que divertem!';
    } else if (path === '/historias') {
        pageToShow = 'stories-list-page';
        updatePageTitle('Histórias da Conexão');
        document.getElementById('header-subtitle').textContent = 'Escolha sua próxima aventura!';
        renderizarListaHistorias(); // Chama a função para popular a lista
    } else if (path.startsWith('/historias/')) {
        historiaId = path.split('/')[2]; // Pega o ID da URL (ex: /historias/1 -> id=1)
        if (historiaId) {
            pageToShow = 'story-detail-page';
            // O título da página e subtítulo do header serão atualizados dentro de carregarDetalheHistoriaEJogo
            carregarDetalheHistoriaEJogo(historiaId); // Chama a função para carregar detalhes
        } else {
             pageToShow = 'not-found-page';
             updatePageTitle('Página Não Encontrada');
             document.getElementById('header-subtitle').textContent = 'Algo deu errado...';
        }
    } else if (path === '/ranking') {
        pageToShow = 'ranking-page';
        updatePageTitle('Ranking dos Conectados');
        document.getElementById('header-subtitle').textContent = 'Veja quem está no topo!';
        renderizarRankingPage(); // Chama a função para renderizar o ranking
    } else {
        // Para qualquer outra rota não mapeada
        pageToShow = 'not-found-page';
        updatePageTitle('Página Não Encontrada');
        document.getElementById('header-subtitle').textContent = 'Algo deu errado...';
    }

    showSection(pageToShow);
}

// --- Funções para popular as seções (adaptadas dos seus antigos HTMLs) ---

// HOME PAGE - Event Listener para o botão "Iniciar Jornada"
document.addEventListener('DOMContentLoaded', () => {
    const iniciarJornadaBtn = document.getElementById('iniciar-jornada');
    if (iniciarJornadaBtn) {
        iniciarJornadaBtn.addEventListener('click', () => {
            navigateTo('/historias');
        });
    }
});


// HISTORIAS LIST PAGE
function renderizarListaHistorias() {
    const listaHistoriasContainer = document.getElementById('lista-de-historias');
    if (!listaHistoriasContainer) return;

    listaHistoriasContainer.innerHTML = ''; // Limpa antes de renderizar

    historiasData.forEach(historia => {
        const storyCard = document.createElement('a');
        storyCard.href = `#/historias/${historia.id}`; // Links agora são para o roteador JS
        storyCard.classList.add('story-card');
        storyCard.innerHTML = `
            <h3>${historia.titulo}</h3>
            <img src="${historia.imagem}" alt="${historia.titulo}" class="story-card-image">
            <p>${historia.resumo}</p>
            <span class="button button-secondary">Ler História</span>
        `;
        // Adiciona evento de clique para o roteador JS
        storyCard.addEventListener('click', (e) => {
            e.preventDefault(); // Previne o comportamento padrão do link
            navigateTo(`/historias/${historia.id}`);
        });
        listaHistoriasContainer.appendChild(storyCard);
    });
}

// STORY DETAIL PAGE AND GAME
function carregarDetalheHistoriaEJogo(historiaId) {
    const historia = getHistoriaById(historiaId);
    const storyDetailPage = document.getElementById('story-detail-page');

    if (!historia) {
        storyDetailPage.innerHTML = '<p class="error-message">História não encontrada.</p>';
        updatePageTitle("História Não Encontrada");
        document.getElementById('header-subtitle').textContent = 'História não encontrada.';
        return;
    }

    // Recria o conteúdo da seção para garantir que esteja limpo e com a estrutura correta para a história
    storyDetailPage.innerHTML = `
        <h2 id="historia-titulo">${historia.titulo}</h2>
        <img id="historia-imagem" src="${historia.imagem}" alt="Imagem da história" class="story-image">
        <div id="historia-conteudo" class="story-content"></div>

        <button id="btn-iniciar-jogo" class="button">Iniciar Desafio da Conexão</button>

        <div id="area-jogo" class="jogo-container hidden">
            <h3>Desafio da Conexão!</h3>
            <p id="pergunta-jogo"></p>
            <div id="opcoes-jogo" class="options-grid">
                </div>
            <p id="feedback-jogo" class="feedback"></p>
        </div>
        <button id="btn-voltar-historias" class="button button-secondary">Voltar ao Menu de Histórias</button>
    `;

    updatePageTitle(historia.titulo);
    document.getElementById('header-subtitle').textContent = historia.resumo;


    const conteudoFormatado = historia.conteudo.split('\n\n').map(paragrafo => `<p>${paragrafo}</p>`).join('');
    document.getElementById('historia-conteudo').innerHTML = conteudoFormatado;

    const areaJogo = document.getElementById('area-jogo');
    const btnIniciarJogo = document.getElementById('btn-iniciar-jogo');
    const btnVoltarHistorias = document.getElementById('btn-voltar-historias');

    btnIniciarJogo.addEventListener('click', () => {
        areaJogo.classList.remove('hidden');
        btnIniciarJogo.classList.add('hidden');
        renderizarJogo(historia.jogo);
    });

    btnVoltarHistorias.addEventListener('click', () => {
        navigateTo('/historias');
    });
}

function renderizarJogo(jogo) {
    const perguntaJogo = document.getElementById('pergunta-jogo');
    const opcoesJogo = document.getElementById('opcoes-jogo');
    const feedbackJogo = document.getElementById('feedback-jogo');

    perguntaJogo.textContent = jogo.pergunta;
    opcoesJogo.innerHTML = ''; // Limpa opções anteriores
    feedbackJogo.textContent = ''; // Limpa feedback anterior

    let answered = false;

    jogo.opcoes.forEach(opcao => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = opcao;
        button.addEventListener('click', () => {
            if (answered) return;
            answered = true;

            Array.from(opcoesJogo.children).forEach(btn => btn.disabled = true);

            if (opcao === jogo.respostaCorreta) {
                addPoints(jogo.pontos);
                showFeedback('feedback-jogo', `🎉 Acertou! Você ganhou ${jogo.pontos} pontos!`, 'acerto');
                button.classList.add('correct-answer');
            } else {
                showFeedback('feedback-jogo', `❌ Errou! A resposta correta era: ${jogo.respostaCorreta}`, 'erro');
                button.classList.add('wrong-answer');
                Array.from(opcoesJogo.children).forEach(btn => {
                    if (btn.textContent === jogo.respostaCorreta) {
                        btn.classList.add('correct-answer');
                    }
                });
            }
        });
        opcoesJogo.appendChild(button);
    });
}

// RANKING PAGE
function renderizarRankingPage() {
    renderizarRanking(); // Chamada para a função do rankingManager.js

    const currentScore = getScore();
    const formSalvarPontuacao = document.getElementById('form-salvar-pontuacao');
    const nomeJogadorInput = document.getElementById('nome-jogador');
    const salvarFeedbackElement = document.getElementById('salvar-feedback');
    const btnResetRanking = document.getElementById('btn-reset-ranking');

    // Resetar estado do formulário de salvar pontuação
    formSalvarPontuacao.classList.add('hidden');
    salvarFeedbackElement.textContent = '';
    nomeJogadorInput.value = '';

    if (currentScore > 0 && !hasSavedScoreThisSession()) {
        formSalvarPontuacao.classList.remove('hidden');
        // Remover listener anterior antes de adicionar um novo para evitar duplicação
        const oldSubmitHandler = formSalvarPontuacao.onsubmit;
        if (oldSubmitHandler) {
            formSalvarPontuacao.onsubmit = null; // Remove o handler anterior
        }
        formSalvarPontuacao.onsubmit = (event) => {
            event.preventDefault();
            const playerName = nomeJogadorInput.value.trim();

            if (playerName.length >= 2) {
                adicionarPontuacaoAoRanking(playerName, currentScore);
                resetScore();
                updateScoreDisplay(getScore());
                formSalvarPontuacao.classList.add('hidden');
                salvarFeedbackElement.className = 'feedback acerto';
                salvarFeedbackElement.textContent = 'Pontuação salva com sucesso! Veja seu lugar no ranking.';
                renderizarRanking(); // Recarrega o ranking após salvar
            } else {
                salvarFeedbackElement.className = 'feedback erro';
                salvarFeedbackElement.textContent = 'Por favor, insira um nome válido (mínimo 2 caracteres).';
            }
        };
    }

    // Remover listener anterior antes de adicionar um novo para evitar duplicação
    const oldResetHandler = btnResetRanking.onclick;
    if (oldResetHandler) {
        btnResetRanking.onclick = null; // Remove o handler anterior
    }
    btnResetRanking.onclick = () => {
        if (confirm('Tem certeza que deseja resetar todo o ranking? Esta ação é irreversível!')) {
            resetarRanking();
            renderizarRanking();
            alert('Ranking resetado!');
        }
    };
}


// --- Lógica de Inicialização e Roteamento ---

// Funções para manipular o histórico do navegador e navegação
function navigateTo(path) {
    history.pushState(null, '', '#' + path); // Usa hash para URLs amigáveis para SPA
    renderPage(path);
}

// Captura cliques nos links de navegação do header e call-to-action
document.addEventListener('click', (e) => {
    const target = e.target.closest('a[data-route]');
    if (target) {
        e.preventDefault(); // Previne o comportamento padrão do link
        const route = target.getAttribute('data-route');
        navigateTo(route);
    }
});

// Lida com o botão "Voltar" do navegador
window.addEventListener('popstate', () => {
    // Pega a rota do hash da URL (ex: #/historias -> /historias)
    const pathFromHash = window.location.hash.substring(1) || '/';
    renderPage(pathFromHash);
});

// Renderiza a página inicial quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Usa o hash da URL para determinar a página inicial, se houver, ou a rota padrão
    const initialPath = window.location.hash.substring(1) || '/';
    renderPage(initialPath);

    // Reseta o flag de sessão para salvar pontuação ao iniciar a SPA
    setHasSavedScoreThisSession(false);
});
