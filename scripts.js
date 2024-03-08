const display = document.querySelector("#displayInput");
const botaoIgual = document.querySelector(".igual");
const botaoPonto = document.querySelector(".ponto");
const botoesNumeros = document.querySelectorAll(".num");
const botoesOperadores = document.querySelectorAll(".operador");

let operacaoAtual = "";
let operador = null;
let valorAnterior = "";
let calculando = false;

const atualizaDisplay = () => {
  display.value = operacaoAtual;
};

const insereNumero = (evento) => {
  if (calculando) {
    operacaoAtual = evento.target.textContent;
    calculando = false;
  } else {
    operacaoAtual += evento.target.textContent;
  }
  atualizaDisplay();
};

const inserePonto = () => {
  if (operacaoAtual.indexOf(".") === -1) {
    operacaoAtual += ".";
    atualizaDisplay();
  }
};

const insereOperador = (evento) => {
  if (operacaoAtual !== "") {
    if (!calculando) {
      if (operador !== null) calcula();
      valorAnterior = operacaoAtual;
      operacaoAtual = "";
    }
    operador = evento.target.textContent;
  }
};

const calcula = () => {
  let resultado = null;
  const operandoAnterior = parseFloat(valorAnterior);
  const operandoAtual = parseFloat(operacaoAtual);

  switch (operador) {
    case "+":
      resultado = operandoAnterior + operacaoAtual;
      break;
    case "-":
      resultado = operandoAnterior - operacaoAtual;
      break;
    case "*":
      resultado = operandoAnterior * operacaoAtual;
      break;
    case "/":
      if (operandoAtual !== 0) {
        resultado = operandoAnterior / operandoAtual;
      } else {
        alert("Erro: Divisão por zero não é permitida!");
        return;
      }
      break;
  }
  operacaoAtual = String(resultado);
  valorAnterior = operacaoAtual;
  calculando = true;
  atualizaDisplay();
};

botoesOperadores.forEach((botao) =>
  botao.addEventListener("click", insereOperador)
);
botaoPonto.addEventListener("click", inserePonto);
botoesNumeros.forEach((botao) => botao.addEventListener("click", insereNumero));
botaoIgual.addEventListener("click", () => {
  if (operador !== null && operacaoAtual !== "" && !calculando) {
    calcula();
    operador = null;
  }
});
