// Função que gera cores aleatória ao carregar a página
const generateRandomColor = (length) => {
  let newColors = ["rgb(0 0 0)", "#FFFFFF"];
  let initialNumber;
  let middleNumber;
  let lastNumber;
  for (let index = 0; index < length - 2; index += 1) {
    initialNumber = Math.floor(Math.random() * 256);
    middleNumber = Math.floor(Math.random() * 256);
    lastNumber = Math.floor(Math.random() * 256);
    let newRGB = `rgb(${initialNumber} ${middleNumber} ${lastNumber})`;
    newColors.push(newRGB);
  }

  return newColors;
};

// Cria Paleta de Cores
function createColorsPalette() {
  const getTheColorPalette = document.querySelector("#color-palette");
  const colorPaletteLength = 10;
  let arrayColorsPalette = generateRandomColor(colorPaletteLength);

  for (let index = 0; index < arrayColorsPalette.length; index += 1) {
    let createColor = document.createElement("div");
    createColor.classList.add("color");
    if (arrayColorsPalette[index] === "rgb(0 0 0)") {
      createColor.classList.add("selected");
    } 
    createColor.style.backgroundColor = arrayColorsPalette[index];
    getTheColorPalette.appendChild(createColor);
  };
}
//

// Lógica para adicionar a classe selected unicamente na cor escolhida da paleta de cores para depois buscarmos essa cor selecionado(com a class selected)
let paletteColors = document.getElementsByClassName("color");

const selectColorToUse = (event) => {
  for (let index = 0; index < paletteColors.length; index += 1) {
    paletteColors[index].className = "color";
  }
  event.target.className = "color selected";
};
// Adiciona eventos em todas as paletas de cores
function addEventsToEachColorInPalette() {
  for (let index = 0; index < paletteColors.length; index += 1) {
    paletteColors[index].addEventListener("click", selectColorToUse);
  }
}
//

//Função que cria o quadro de pixels para pintar
function createPixelBoard(boardWidth, boardHeight) {
  //Validação da largura e comprimento
  if ((boardHeight < 5 || boardWidth < 5) || (boardHeight > 20 || boardWidth > 20)) {
    return alert("Largura ou comprimento inválido! Largura e Comprimento máximo de 20 unidades e mínimo de 5 unidades");
  }
  const getThePixelBoard = document.querySelector("#pixel-board");
  getThePixelBoard.innerHTML = "";
  for (let indexH = 0; indexH < boardHeight; indexH += 1) {
    let createDivFather = document.createElement("div");// cria o comprimento
    for (let indexW = 0; indexW < boardWidth; indexW += 1) {
      let createChildDiv = document.createElement("div");// cria a largura
      createChildDiv.className = "pixel";
      createDivFather.appendChild(createChildDiv);
    }
    getThePixelBoard.appendChild(createDivFather);
  }
}

let getAllPixels = document.getElementsByClassName("pixel");

//Cria a lógica para pintar cada pixel com a cor escolhida na paleta de cores(com a class selected)

// Pinta com a cor do elemento que tem a classe .selected o pixel que foi alvo do evento(target)
function addColorToPixel(event) {
  let getSelectedColor = document.querySelector(".selected");
  event.target.style.backgroundColor = getSelectedColor.style.backgroundColor;
}

function addEventsToEachPixel() {
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
  createColorsPalette();
  addEventsToEachColorInPalette();
  createPixelBoard(5, 5);
  addEventsToEachPixel();
};
