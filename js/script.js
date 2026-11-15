
const tituloAnimado = document.querySelector("#inicio h1 span");

const textos = [
    "Desenvolvedor em formação.",
    "Estudante de Ciência da Computação.",
    "Entusiasta de tecnologia."
];

let indiceTexto = 0;
let indiceLetra = 0;
let apagando = false;

const movimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (tituloAnimado && !movimentoReduzido) {

    function digitarTexto() {

        const textoAtual = textos[indiceTexto];

        if (!apagando) {

            tituloAnimado.textContent =
                textoAtual.substring(0, indiceLetra + 1);

            indiceLetra++;

            if (indiceLetra === textoAtual.length) {
                apagando = true;

                setTimeout(digitarTexto, 1800);
                return;
            }

        } else {

            tituloAnimado.textContent =
                textoAtual.substring(0, indiceLetra - 1);

            indiceLetra--;

            if (indiceLetra === 0) {
                apagando = false;

                indiceTexto = (indiceTexto + 1) % textos.length;
            }
        }

        setTimeout(digitarTexto, apagando ? 40 : 90);
    }

    tituloAnimado.classList.add("typing-cursor");

    digitarTexto();
}


const elementosAnimados = document.querySelectorAll(
    "#sobre, #habilidades, #projetos, #contato, .skills article, .project-card"
);

if (movimentoReduzido || !("IntersectionObserver" in window)) {

    elementosAnimados.forEach(elemento => {
        elemento.classList.add("visible");
    });

} else {

    const observador = new IntersectionObserver((entradas) => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visible");

                observador.unobserve(entrada.target);
            }

        });

    }, {
        threshold: 0.15
    });

    elementosAnimados.forEach(elemento => {

        elemento.classList.add("reveal");

        observador.observe(elemento);

    });

}



const botaoTopo = document.createElement("button");

botaoTopo.textContent = "↑";
botaoTopo.classList.add("back-to-top");

botaoTopo.setAttribute("aria-label", "Voltar ao topo");

document.body.appendChild(botaoTopo);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        botaoTopo.classList.add("show");

    } else {

        botaoTopo.classList.remove("show");

    }

});

botaoTopo.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: movimentoReduzido ? "instant" : "smooth"
    });

});



const anoAtual = new Date().getFullYear();

const rodape = document.querySelector("footer p");

if (rodape) {

    rodape.textContent =
        `© ${anoAtual} Yago Fernandes de Almeida. Todos os direitos reservados.`;

}



const navegacao = document.querySelector("nav");
const listaMenu = document.querySelector("nav ul");
const logo = document.querySelector(".logo");

if (navegacao && listaMenu && logo) {

    const botaoMenu = document.createElement("button");

    botaoMenu.classList.add("menu-toggle");

    botaoMenu.textContent = "☰";

    botaoMenu.setAttribute("aria-label", "Abrir menu");

    botaoMenu.setAttribute("aria-expanded", "false");

    botaoMenu.setAttribute("aria-controls", "menu-principal");

    listaMenu.id = "menu-principal";

    logo.insertAdjacentElement("afterend", botaoMenu);

    botaoMenu.addEventListener("click", () => {

        const menuAberto = listaMenu.classList.toggle("active");

        botaoMenu.setAttribute("aria-expanded", menuAberto);

        botaoMenu.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu" : "Abrir menu"
        );

        botaoMenu.textContent = menuAberto ? "✕" : "☰";

    });

    const linksMenu = listaMenu.querySelectorAll("a");

    linksMenu.forEach(link => {

        link.addEventListener("click", () => {

            listaMenu.classList.remove("active");

            botaoMenu.setAttribute("aria-expanded", "false");

            botaoMenu.setAttribute("aria-label", "Abrir menu");

            botaoMenu.textContent = "☰";

        });

    });

}

// botos de filtro

const botoesFiltro = document.querySelectorAll(".filtro-btn");
const projetos = document.querySelectorAll(".projeto-card");

botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {

        const categoria = botao.dataset.filtro;

        // Atualiza o botão selecionado
        botoesFiltro.forEach((btn) => {
            btn.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        // Filtra os projetos
        projetos.forEach((projeto) => {
            const categoriaProjeto = projeto.dataset.categoria;

            if (
                categoria === "todos" ||
                categoria === categoriaProjeto
            ) {
                projeto.classList.remove("oculto");
            } else {
                projeto.classList.add("oculto");
            }
        });

    });
});

//modo escuro

const botaoTema = document.querySelector("#theme-toggle");

// Recupera a preferência salva
const temaSalvo = localStorage.getItem("tema");

// Aplica o tema inicial
if (temaSalvo === "escuro") {
    document.body.classList.add("dark-mode");
}

// Atualiza o texto do botão
function atualizarBotaoTema() {
    const modoEscuro = document.body.classList.contains("dark-mode");

    botaoTema.textContent = modoEscuro
        ? "☀️ Modo claro"
        : "🌙 Modo escuro";
}

atualizarBotaoTema();

// Alterna os temas
botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const modoEscuro = document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "tema",
        modoEscuro ? "escuro" : "claro"
    );

    atualizarBotaoTema();
});
