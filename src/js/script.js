let metodoPagamentoSelecionado = null;

const produtos = {
    "colares": [
        { id: 1, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 20,00.jpg" },
        { id: 2, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 32,00.jpg" },
        { id: 3, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 33,00.jpg" },
        { id: 4, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 38,00.jpg" },
        { id: 5, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 42,00.jpg" },
        { id: 6, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 45,00.jpg" },
        { id: 7, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 46,00.jpg" },

    ],
    "infantil": [
        { id: 1, nome: "Conjunto Dourado Infatil", preco: 60.00, img: "assets/images/conjunto_infantil/unicornio.jpg" },
        { id: 2, nome: "Conjunto Dourado Infatil", preco: 60.00, img: "assets/images/conjunto_infantil/corrente.jpg" },
        { id: 3, nome: "Conjunto Dourado Infatil", preco: 60.00, img: "assets/images/conjunto_infantil/brilho.jpg" },
        { id: 4, nome: "Conjunto Dourado Infatil", preco: 60.00, img: "assets/images/conjunto_infantil/arco.jpg" },
        { id: 5, nome: "Conjunto Dourado Infatil", preco: 60.00, img: "assets/images/conjunto_infantil/laco.jpg" },
        { id: 6, nome: "Conjunto Dourado Infatil", preco: 60.00, img: "assets/images/conjunto_infantil/coracao.jpg" },
        { id: 7, nome: "Conjunto Dourado Infatil", preco: 60.00, img: "assets/images/conjunto_infantil/estrela.jpg" },
    ],
    "pulseira": [
        { id: 4, nome: "Pulseira de Pérolas", preco: 39.9, img: "assets/images/colares/R$ 20,00.jpg" }
    ],
    "tornozeleira": [
        { id: 5, nome: "Tornozeleira Delicada", preco: 25.0, img: "assets/images/colares/R$ 20,00.jpg" }
    ],
    "adulto": [
        { id: 6, nome: "Conjunto Adulto Clássico", preco: 80.0, img: "assets/images/colares/R$ 20,00.jpg" }
    ],
    "brincos": [
        { id: 7, nome: "Brinco Elegante", preco: 29.9, img: "assets/images/colares/R$ 20,00.jpg" }
    ],
    "promocoes": [
        { id: 8, nome: "Colar Elegante", preco: 29.9, img: "assets/images/brincos/R$ 17,00.jpg" }
    ]
};

let carrinho = [];

const itensCarrinho = document.getElementById("itens-carrinho");
const totalCarrinho = document.getElementById("total");
const carrinhoElemento = document.getElementById("carrinho");
const overlayCarrinho = document.getElementById("overlay-carrinho");
const abrirCarrinhoBtn = document.getElementById("abrir-carrinho");
const fecharCarrinhoBtn = document.getElementById("fechar-carrinho");
const finalizarCompraBtn = document.getElementById("finalizar-compra");
const contadorCarrinho = document.getElementById("contador-carrinho");

function formatarPreco(preco) {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarContadorCarrinho() {
    contadorCarrinho.textContent = carrinho.length;
}

function adicionarAoCarrinho(nome, preco) {
    const itemExistente = carrinho.find(p => p.nome === nome && p.preco === preco);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        const novoId = Date.now(); // Gera um ID único
        carrinho.push({ id: novoId, nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();

    Swal.fire({
        title: 'Produto adicionado!',
        text: `O produto "${nome}" foi adicionado ao seu carrinho 💼`,
        icon: 'success',
        background: '#fff8f6',
        color: '#b09896',
        confirmButtonColor: '#f4c3bd',
        iconColor: '#d7a29b',
        confirmButtonText: 'Continuar comprando',
        customClass: {
            title: 'titulo-sweetalert',
            confirmButton: 'botao-confirmar'
        }
    });
}


function atualizarCarrinho() {
    itensCarrinho.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        carrinho.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-2");

            itemDiv.innerHTML = `
                <span>${item.nome} (x${item.quantidade})</span>
                <div>
                    <button class="btn btn-sm btn-outline-secondary me-1 aumentar" data-id="${item.id}">+</button>
                    <button class="btn btn-sm btn-outline-secondary me-1 diminuir" data-id="${item.id}">-</button>
                    <button class="btn btn-sm btn-danger remover" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;

            itensCarrinho.appendChild(itemDiv);
            total += item.preco * item.quantidade;
        });
    }

    totalCarrinho.textContent = formatarPreco(total);
    document.getElementById("contador-carrinho").textContent = carrinho.length;

    // Listeners
    document.querySelectorAll(".aumentar").forEach(btn => {
        btn.onclick = () => {
            const id = parseInt(btn.dataset.id);
            const item = carrinho.find(p => p.id === id);
            item.quantidade++;
            atualizarCarrinho();
        };
    });

    document.querySelectorAll(".diminuir").forEach(btn => {
        btn.onclick = () => {
            const id = parseInt(btn.dataset.id);
            const item = carrinho.find(p => p.id === id);
            if (item.quantidade > 1) {
                item.quantidade--;
            } else {
                carrinho = carrinho.filter(p => p.id !== id);
            }
            atualizarCarrinho();
        };
    });

    document.querySelectorAll(".remover").forEach(btn => {
        btn.onclick = () => {
            const id = parseInt(btn.dataset.id);
            const produto = carrinho.find(p => p.id === id);

            Swal.fire({
                title: 'Deseja realmente apagar este produto?',
                text: `"${produto.nome}" será removido do seu carrinho.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#f4c3bd',   // rosa claro
                cancelButtonColor: '#e0d3cf',    // bege rosado
                confirmButtonText: 'Sim, apagar',
                cancelButtonText: 'Cancelar',
                background: '#fff8f6',           // fundo rosado claro
                color: '#b09896',                // texto suave
                iconColor: '#d7a29b',            // ícone rosado
                customClass: {
                    title: 'titulo-sweetalert',
                    confirmButton: 'botao-confirmar',
                    cancelButton: 'botao-cancelar'
                }
            }).then((result) => { // <-- aqui está o ponto correto
                if (result.isConfirmed) {
                    carrinho = carrinho.filter(p => p.id !== id);
                    atualizarCarrinho();

                    Swal.fire({
                        title: 'Produto removido!',
                        text: `"${produto.nome}" foi excluído do carrinho.`,
                        icon: 'success',
                        background: '#fff8f6',
                        color: '#b09896',
                        confirmButtonColor: '#f4c3bd',
                        iconColor: '#d7a29b',
                        confirmButtonText: 'OK',
                        customClass: {
                            title: 'titulo-sweetalert',
                            confirmButton: 'botao-confirmar'
                        }
                    });
                }
            });
        };
    });


}


function mostrarProdutos(categoria) {
    const secoes = ["colares", "infantil", "pulseira", "tornozeleira", "adulto", "brincos", "promocoes"];

    // Esconder todas as seções
    secoes.forEach(sec => {
        const s = document.getElementById(sec);
        if (s) s.style.display = "none";
    });

    const secao = document.getElementById(categoria);
    if (!secao) return;

    // Exibir a seção selecionada
    secao.style.display = "flex";
    secao.style.flexWrap = "wrap";
    secao.style.justifyContent = "center";
    secao.innerHTML = "";

    produtos[categoria]?.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("card", "text-center", "m-2", "p-2");
        card.style.maxWidth = "200px";

        card.innerHTML = `
            <img src="${produto.img}" alt="${produto.nome}" class="img-fluid rounded mb-2" style="max-height: 200px;">
            <h3>${produto.nome}</h3>
            <p><strong>R$ ${formatarPreco(produto.preco)}</strong></p>
            <button class="btn btn-sm btn-warning" data-nome="${produto.nome}" data-preco="${produto.preco}">Adicionar ao Carrinho</button>
        `;

        secao.appendChild(card);
    });

    ativarBotoesAdicionar();
}

function ativarBotoesAdicionar() {
    const botoes = document.querySelectorAll("section[style*='display: flex'] button");
    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const nome = botao.getAttribute("data-nome");
            const preco = parseFloat(botao.getAttribute("data-preco"));
            adicionarAoCarrinho(nome, preco);
        });
    });
}

// Controle do menu de navegação
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const categoria = link.dataset.category;
        mostrarProdutos(categoria);

        document.querySelectorAll("nav a").forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        const destino = document.querySelector(link.getAttribute("href"));
        if (destino) {
            destino.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Inicializar com a categoria "promoções" aberta
mostrarProdutos("promocoes");

// Controle do carrinho
abrirCarrinhoBtn.addEventListener("click", () => {
    carrinhoElemento.style.display = "block";
    overlayCarrinho.style.display = "block";
});

fecharCarrinhoBtn.addEventListener("click", () => {
    carrinhoElemento.style.display = "none";
    overlayCarrinho.style.display = "none";
});

overlayCarrinho.addEventListener("click", () => {
    carrinhoElemento.style.display = "none";
    overlayCarrinho.style.display = "none";
});

finalizarCompraBtn.addEventListener("click", () => {
    if (carrinho.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Carrinho vazio!",
            text: "Você ainda não adicionou nenhum produto ao carrinho 💼",
            background: "#fff8f6",
            color: "#b09896",
            iconColor: "#d79991",
            confirmButtonColor: "#f4c3bd",
            confirmButtonText: "Ver produtos",
            footer: '<a style="color: #d79991;" href="#">Precisa de ajuda?</a>',
            customClass: {
                title: 'titulo-sweetalert',
                confirmButton: 'botao-confirmar'
            }
        });
        return;
    }

    if (!metodoPagamentoSelecionado) {
        Swal.fire({
            icon: "warning",
            title: "Forma de pagamento não selecionada!",
            text: "Por favor, escolha uma forma de pagamento antes de finalizar a compra.",
            confirmButtonColor: "#f4c3bd"
        });
        return;
    }

    // Montar mensagem do pedido
    let mensagem = "Olá, realizei um pedido pelo site WeHope Acessórios.%0A%0A*Produtos:*%0A";
    let total = 0;

    carrinho.forEach(item => {
        mensagem += `- ${item.nome} (x${item.quantidade})%0A`;
        total += item.preco * item.quantidade;
    });

    mensagem += `%0A*Total:* ${formatarPreco(total)}%0A`;
    mensagem += `*Forma de pagamento:* ${metodoPagamentoSelecionado}%0A`;
    mensagem += `%0AGostaria de confirmar o pedido.`;

    // Número de telefone formatado sem espaços ou símbolos
    const numeroWhatsApp = "5571985130412";

    // Redireciona para o WhatsApp
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    window.open(url, "_blank");

    // Limpa carrinho
    carrinho = [];
    metodoPagamentoSelecionado = null;
    atualizarCarrinho();
    carrinhoElemento.style.display = "none";
    overlayCarrinho.style.display = "none";
});


document.getElementById("prosseguir-pagamento").addEventListener("click", () => {
    if (carrinho.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Seu carrinho está vazio!",
            text: "Adicione produtos antes de finalizar a compra.",
            confirmButtonColor: "#f4c3bd"
        });
        return;
    }

    Swal.fire({
        title: 'Escolha o método de pagamento:',
        html: `
            <div style="display: flex; justify-content: center; gap: 20px;">
                <button class="btn btn-light pagamento" data-metodo="PIX">
                    <img src="assets/images/pix.png" alt="PIX" style="width: 40px;"><br>PIX
                </button>
                <button class="btn btn-light pagamento" data-metodo="Cartão de Crédito">
                    <img src="assets/images/cartaoDebito.png" alt="Cartão de Credito" style="width: 40px;"><br>Credito
                </button>
                <button class="btn btn-light pagamento" data-metodo="Cartão de Débito">
                    <img src="assets/images/cartaoDebito.png" alt="Cartão de Credito" style="width: 40px;"><br>Débito
                </button>
            </div>
        `,
        showConfirmButton: false,
        didOpen: () => {
            document.querySelectorAll(".pagamento").forEach(btn => {
                btn.onclick = () => {
                    const metodo = btn.dataset.metodo;
                    metodoPagamentoSelecionado = metodo;

                    Swal.fire({
                        title: "Dados para entrega",
                        html: `
            <input type="text" id="nomeCliente" class="swal2-input" placeholder="Digite seu nome">
            <input type="text" id="cep" class="swal2-input" placeholder="CEP">

             <input type="text" id="logradouro" class="swal2-input" placeholder="Logradouro" style="display: none;">
            <input type="text" id="bairro" class="swal2-input" placeholder="Bairro" style="display: none;">
            <input type="text" id="cidade" class="swal2-input" placeholder="Cidade" style="display: none;">
            <input type="text" id="estado" class="swal2-input" placeholder="Estado" style="display: none;">
  
        `,
                        confirmButtonText: "Finalizar Pedido",
                        confirmButtonColor: "#f4c3bd",
                        focusConfirm: false,
                        didOpen: () => {
                            $('#cep').on('blur', function () {
                                const cep = $(this).val().replace(/\D/g, '');

                                if (cep.length === 8) {
                                    fetch(`https://viacep.com.br/ws/${cep}/json/`)
                                        .then(response => response.json())
                                        .then(dados => {
                                            if (dados.erro) {
                                                Swal.showValidationMessage('CEP não encontrado.');
                                                return;
                                            }

                                            $('#logradouro').val(dados.logradouro).show();
                                            $('#bairro').val(dados.bairro).show();
                                            $('#cidade').val(dados.localidade).show();
                                            $('#estado').val(dados.uf).show();
                                        })
                                        .catch(error => {
                                            console.error(error);
                                            Swal.showValidationMessage('Erro ao buscar o CEP.');
                                        });
                                } else {
                                    alert('CEP inválido. Digite os 8 números corretamente.');
                                }
                            });
                        },

                        preConfirm: () => {
                            const nome = document.getElementById("nomeCliente").value.trim();
                            const logradouro = document.getElementById("logradouro").value.trim();
                            const bairro = document.getElementById("bairro").value.trim();
                            const cidade = document.getElementById("cidade").value.trim();
                            const estado = document.getElementById("estado").value.trim();

                            if (!nome || !logradouro || !bairro || !cidade || !estado) {
                                Swal.showValidationMessage("Por favor, preencha todos os campos");
                                return false;
                            }

                            return { nome, logradouro, bairro, cidade, estado };
                        }
                    }).then(result => {
                        if (result.isConfirmed) {
                            const nome = result.value.nome;
                            const logradouro = result.value.logradouro;
                            const bairro = result.value.bairro;
                            const cidade = result.value.cidade;
                            const estado = result.value.estado;


                            // Montar mensagem do pedido
                            let mensagem = `Olá, realizei um pedido pelo site WeHope Acessórios.%0A%0A`;
                            mensagem += `*Nome:* ${nome}%0A`;
                            mensagem += `*Endereço:* ${logradouro}, ${bairro}, ${cidade} - ${estado}%0A%0A`;
                            mensagem += `*Produtos:*%0A`;
                            let total = 0;

                            carrinho.forEach(item => {
                                mensagem += `- ${item.nome} (x${item.quantidade})%0A`;
                                total += item.preco * item.quantidade;
                            });

                            mensagem += `%0A*Total:* ${formatarPreco(total)}%0A`;
                            mensagem += `*Forma de pagamento:* ${metodoPagamentoSelecionado}%0A`;
                            mensagem += `%0AGostaria de confirmar o pedido.`;

                            const numeroWhatsApp = "5571985130412";
                            const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
                            window.open(url, "_blank");

                            // Limpar carrinho
                            carrinho = [];
                            metodoPagamentoSelecionado = null;
                            atualizarCarrinho();
                            carrinhoElemento.style.display = "none";
                            overlayCarrinho.style.display = "none";
                        }
                    });
                };
            });
        }
    });
});
async function buscarEnderecoPorCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            throw new Error('Erro ao consultar o CEP');
        }
        const dados = await response.json();
        if (dados.erro) {
            alert('CEP não encontrado.');
            return;
        }
        console.log(dados)
        // Preencha os campos do formulário com os dados obtidos
        document.getElementById('logradouro').value = dados.logradouro;
        document.getElementById('bairro').value = dados.bairro;
        document.getElementById('cidade').value = dados.localidade;
        document.getElementById('estado').value = dados.uf;
    } catch (error) {
        console.error(error);
        alert('Não foi possível buscar o endereço. Verifique o CEP e tente novamente.');
    }
}


document.getElementById("menu-links").addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
});




