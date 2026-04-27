// Cria Paleta de Cores
const getTheColorPalete = document.querySelector("#color-palette");
const arrayColorsPalette = ["black", "blue", "green", "red"];
let colorPaleteLength = 4;

for (let index = 0; index < colorPaleteLength; index += 1) {
  let createColor = document.createElement("div");
  if (arrayColorsPalette[index] === "black") {
    createColor.className = "color selected";
  } else {
    createColor.className = "color";
  }
  createColor.style.backgroundColor = arrayColorsPalette[index];
  getTheColorPalete.appendChild(createColor);
};
//

//Função que cria o quadro de pixels para pintar
function createPixelBoard(boardWidth, boardHeight) {
  if ((boardHeight < 5 || boardWidth < 5) || (boardHeight > 20 || boardWidth > 20)) {
    return alert("Largura ou comprimento inválido! Largura e Comprimento máximo de 20 unidades e mínimo de 5 unidades");
  }
  const getThePixelBoard = document.querySelector("#pixel-board");
  getThePixelBoard.innerHTML = "";
  for (let indexH = 0; indexH < boardHeight; indexH += 1) {
    let createTableLine = document.createElement("div");// cria o comprimento
    for (let indexW = 0; indexW < boardWidth; indexW += 1) {
      let createTableCell = document.createElement("div");// cria a largura
      createTableCell.className = "pixel";
      createTableLine.appendChild(createTableCell);
    }
    getThePixelBoard.appendChild(createTableLine);
  }
}

// Lógica para adicionar a classe selected unicamente na cor escolhida da paleta de cores para depois buscarmos essa cor selecionado(com a class selected)
let paletteColors = document.getElementsByClassName("color");

const selectColorToUse = (event) => {
  for (let index = 0; index < paletteColors.length; index += 1) {
    paletteColors[index].className = "color";
  }
  event.target.className = "color selected";
};
// Adiciona eventos em todas as paletas de cores
for (let index = 0; index < paletteColors.length; index += 1) {
  paletteColors[index].addEventListener("click", selectColorToUse);
}
//

let getAllPixels = document.getElementsByClassName("pixel");

//Cria a lógica para pintar cada pixel com a cor escolhida na paleta de cores(com a class selected)
function addEventsToEachPixel() {
  // Pinta com a cor do elemento que tem a classe .selected o pixel que foi alvo do evento(target)
  function addColorToPixel(event) {
    let getSelectedColor = document.querySelector(".selected");
    event.target.style.backgroundColor = getSelectedColor.style.backgroundColor;
  }
  // Adiciona evento de click em todas as divs que tem class Pixel
  for (let index = 0; index < getAllPixels.length; index += 1) {
    getAllPixels[index].addEventListener("click", addColorToPixel);
  }
}

//Lógica de limpeza do quadro de pixel
let getClearBoardButton = document.querySelector("#clear-board");
getClearBoardButton.addEventListener("click", () => {
  for (let index = 0; index < getAllPixels.length; index += 1) {
    getAllPixels[index].style.backgroundColor = "white";
  }
});
//

// Cria lógica para o usuário escolher o tamanho do quadro de pixel.
let getInputButton = document.querySelector("#input-button");

getInputButton.addEventListener("click", () => {
  let getWidthInput = document.querySelector("#input-width");
  let getHeightInput = document.querySelector("#input-height");
  createPixelBoard(getWidthInput.value, getHeightInput.value);
  addEventsToEachPixel();
});

window.onload = () => {
  createPixelBoard(5, 5);
  addEventsToEachPixel();
};
