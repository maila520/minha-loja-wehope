const produtos = {
    "colares": [
        { id: 1, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 20,00.jpg" },
        { id: 2, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 28,00.jpg" },
        { id: 3, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 32,00.jpg" },
        { id: 4, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 33,00.jpg" },
        { id: 5, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 38,00.jpg" },
        { id: 6, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 39,00.jpg" },
        { id: 7, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 42,00.jpg" },
        { id: 8, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 45,00.jpg" },
        { id: 9, nome: "Colar Dourado Elegante", preco: 60.00, img: "assets/images/colares/R$ 46,00.jpg" },
        { id: 10, nome: "Colar Prata Fino", preco: 45.5, img: "assets/images/colares/R$ 46,00.jpg" }
    ],
    "infantil": [
        { id: 1, nome: "Conjunto Dourado Infatil", preco: 60.00, img: "assets/images/colares/R$ 40,00.jpg" },
        { id: 2, nome: "Conjunto Dourado Infatil", preco: 60.00, img: "assets/images/colares/R$ 40,00(2).jpg" },
        { id: 3, nome: "Conjunto Dourado Infatil", preco: 60.00, img: "assets/images/colares/R$ 40,00(3).jpg" },
        { id: 4, nome: "Conjunto Dourado Infatil", preco: 60.00, img: "assets/images/colares/R$ 40,00(4).jpg" },
        { id: 5, nome: "Conjunto Dourado Infatil", preco: 60.00, img: "assets/images/colares/R$ 40,00(5).jpg" },
        { id: 6, nome: "Conjunto Dourado Infatil", preco: 60.00, img: "assets/images/colares/R$ 40,00(6).jpg" },
        { id: 7, nome: "Conjunto Dourado Infatil", preco: 60.00, img: "assets/images/colares/R$ 40,00(7).jpg" },
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
            background: "#fff8f6",           // fundo claro rosado
            color: "#b09896",                // texto em tom suave
            iconColor: "#d79991",            // ícone vermelho suave
            confirmButtonColor: "#f4c3bd",   // botão rosa claro
            confirmButtonText: "Ver produtos",
            footer: '<a style="color: #d79991;" href="#">Precisa de ajuda?</a>',
            customClass: {
                title: 'titulo-sweetalert',
                confirmButton: 'botao-confirmar'
            }
        });


        return;
    }
    Swal.fire({
        title: 'Compra finalizada com sucesso!',
        text: 'Obrigado por comprar com a WeHope Acessórios 💖',
        icon: 'success',
        background: '#fff8f6',
        color: '#b09896',
        confirmButtonColor: '#f4c3bd',
        confirmButtonText: 'Fechar',
        iconColor: '#d7a29b',
        customClass: {
            title: 'titulo-sweetalert',
            confirmButton: 'botao-confirmar'
        }
    });

    carrinho = [];
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
                    <img src="assets/icons/pix.png" alt="PIX" style="width: 40px;"><br>PIX
                </button>
                <button class="btn btn-light pagamento" data-metodo="Boleto">
                    <img src="assets/icons/boleto.png" alt="Boleto" style="width: 40px;"><br>Boleto
                </button>
                <button class="btn btn-light pagamento" data-metodo="Cartão de Crédito">
                    <img src="assets/icons/credito.png" alt="Crédito" style="width: 40px;"><br>Crédito
                </button>
                <button class="btn btn-light pagamento" data-metodo="Cartão de Débito">
                    <img src="assets/icons/debito.png" alt="Débito" style="width: 40px;"><br>Débito
                </button>
            </div>
        `,
        showConfirmButton: false,
        didOpen: () => {
            document.querySelectorAll(".pagamento").forEach(btn => {
                btn.onclick = () => {
                    const metodo = btn.dataset.metodo;
                    Swal.fire({
                        title: "Compra finalizada com sucesso!",
                        text: `Método de pagamento: ${metodo}`,
                        icon: "success",
                        confirmButtonColor: "#f4c3bd"
                    });
                    carrinho = [];
                    atualizarCarrinho();
                    fecharCarrinho();
                };
            });
        }
    });
});

