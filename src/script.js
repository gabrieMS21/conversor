// Referências principais do DOM
const form = document.getElementById("converterForm");
const resultado = document.getElementById("result");
const erro = document.getElementById("erro");

// Referência dos inputs de seleção de moedas
const opcaoEntrada = document.getElementById("valorDe");
const opcaoSaida = document.getElementById("valorPara");

// Referência do campo de input do valor a ser convertido
const valorInput = document.getElementById("valorMoeda");

// Inicialização dos valores selecionados (opcional, pois são atualizados no evento)
let valorAtualEntrada = opcaoEntrada.value;
let valorAtualSaida = opcaoSaida.value;

// Eventos para atualizar os valores das opções ao mudar a seleção
opcaoEntrada.addEventListener("change", function() {
    valorAtualEntrada = this.value;
});

opcaoSaida.addEventListener("change", function() {
    valorAtualSaida = this.value;
});

// Variáveis para armazenar os valores convertidos e as cotações
let valorConvertido = 0;
let dollarRealValor = 0;
let realDollarValor = 0;

// Evento de envio do formulário (submit)
form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const valorAtualEntrada = opcaoEntrada.value;
    const valorAtualSaida = opcaoSaida.value;
    const valorMoeda = valorInput.value;

    if (valorMoeda === "") {
        resultado.classList.add("hidden");
        valorInput.classList.add("border-red-900", "border-2");
        erro.classList.remove("hidden");
        return;
    }

    try {
        const url = 'https://economia.awesomeapi.com.br/last/USD-BRL,BRL-USD';
        const response = await fetch(url);
        const data = await response.json();

        const dataCotacao = data.USDBRL.create_date;
        const dollarReal = parseFloat(data.USDBRL.bid);
        const realDollar = parseFloat(data.BRLUSD.bid);

        let valorConvertido = 0;

        if (valorAtualEntrada === "USD" && valorAtualSaida === "BRL") {
            valorConvertido = dollarReal * valorMoeda;
        } else if (valorAtualEntrada === "BRL" && valorAtualSaida === "USD") {
            valorConvertido = realDollar * valorMoeda;
        }

        resultado.innerHTML = `Valor convertido de <strong>${valorMoeda} ${valorAtualEntrada}</strong> <br> Para <strong>${valorConvertido.toFixed(2)} ${valorAtualSaida}</strong>`;
        resultado.innerHTML += `<br><small>Cotação atualizada em: ${dataCotacao}</small>`;
        resultado.classList.remove("hidden");
        valorInput.classList.remove("border-red-900", "border-2");
        erro.classList.add("hidden");
    } catch (error) {
        console.error("Erro ao buscar cotação:", error);
        resultado.innerHTML = "Erro ao buscar a cotação. Tente novamente.";
        resultado.classList.remove("hidden");
    }
});












// Valor de conversão simulado e referência ao botão (não está sendo usado diretamente aqui)