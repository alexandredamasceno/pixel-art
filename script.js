// Função que gera cores aleatória ao carregar a página
const generateRandomColor = (length) => {
  //Deixo as cores preta e branca por padrão.
  const newColors = ["rgb(0 0 0)", "#FFFFFF"];
  let initialNumber;
  let middleNumber;
  let lastNumber;
  for (let index = 0; index < length - 2; index += 1) {
    initialNumber = Math.floor(Math.random() * 256);
    middleNumber = Math.floor(Math.random() * 256);
    lastNumber = Math.floor(Math.random() * 256);
    const newRGB = `rgb(${initialNumber} ${middleNumber} ${lastNumber})`;
    newColors.push(newRGB);
  }

  return newColors;
};

// Cria Paleta de Cores
function createColorsPalette() {
  const getTheColorPalette = document.querySelector("#color-palette");
  //Lógica para manter sempre as 10 cores
  getTheColorPalette.innerHTML = "";
  const colorPaletteLength = 10;
  const arrayColorsPalette = generateRandomColor(colorPaletteLength);

  for (let index = 0; index < arrayColorsPalette.length; index += 1) {
    const createColor = document.createElement("div");
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

// Adiciona eventos em todas as paletas de cores
function addEventsToEachColorInPalette(paletteColors) {
  paletteColors.addEventListener("click", (event) => {
    if (event.target.classList.contains("color")) {
      const getColorSelected = document.querySelector(".selected");
      getColorSelected.classList.remove("selected");
  
      event.target.classList.add("selected");
    }
  });
}
//

//Cria a lógica para pintar cada pixel com a cor escolhida na paleta de cores(com a class selected)

// Pinta com a cor do elemento que tem a classe .selected o pixel que foi alvo do evento(target)
function addColorToPixel(target) {
  const getSelectedColor = document.querySelector(".selected");
  target.style.backgroundColor = getSelectedColor.style.backgroundColor;
}

function addEventsToEachPixel(pixelBoard) {
  // Adiciona evento de click no elemento com o id pixel-board, que é "avó" de todas as divs que tem a classe pixel, assim elas recebem os eventos por delegação, chamado Event Delegation.
  pixelBoard.addEventListener("click", (event) => {
    if (event.target.classList.contains("pixel")) {
      addColorToPixel(event.target);
    }
  });
}

//Função que cria o quadro de pixels para pintar
function createPixelBoard(boardWidth, boardHeight) {
  //Validação da largura e comprimento
  if ((boardHeight < 5 || boardWidth < 5) || (boardHeight > 20 || boardWidth > 20)) {
    return alert("Largura ou comprimento inválido! Largura e Comprimento máximo de 20 unidades e mínimo de 5 unidades");
  }

  const getThePixelBoard = document.querySelector("#pixel-board");

  getThePixelBoard.innerHTML = "";
  for (let indexH = 0; indexH < boardHeight; indexH += 1) {
    const createDivFather = document.createElement("div");// cria o comprimento
    for (let indexW = 0; indexW < boardWidth; indexW += 1) {
      const createChildDiv = document.createElement("div");// cria a largura
      createChildDiv.className = "pixel";
      createDivFather.appendChild(createChildDiv);
    }
    getThePixelBoard.appendChild(createDivFather);
  }
}

const getAllPixels = document.getElementsByClassName("pixel");

//Lógica de limpeza do quadro de pixel
const getClearBoardButton = document.querySelector("#clear-board");
getClearBoardButton.addEventListener("click", () => {
  for (let index = 0; index < getAllPixels.length; index += 1) {
    getAllPixels[index].style.backgroundColor = "white";
  }
});
//

// Cria lógica para o usuário escolher o tamanho do quadro de pixel.
const getInputButton = document.querySelector("#input-button");

getInputButton.addEventListener("click", () => {
  const getWidthInput = document.querySelector("#input-width");
  const getHeightInput = document.querySelector("#input-height");
  createPixelBoard(getWidthInput.value, getHeightInput.value);
});

// Cria lógica do botão de reset da paleta de cores
const getPaletteResetButton = document.querySelector("#palette-reset");

getPaletteResetButton.addEventListener("click", createColorsPalette);

window.onload = () => {
  //Adiciona lógica de criação da paleta de cores e logo em seguida cria lógica para adiciona eventos a cada cor da paleta por meio de Event Delegation
  createColorsPalette();
  const getThePaletteColors = document.getElementById("color-palette");
  //Lógica para adicionar eventos a cada cor da paleta por meio de Event Delegation.
  addEventsToEachColorInPalette(getThePaletteColors);

  createPixelBoard(5, 5);
  //adiciona lógica de Event Delegation. Uma vez adicionado o Event no elemento "pai", não importa se os elementos "filhos" aumentem ou diminuam, o Event continuará funcionando do mesmo jeito para todos.
  const getThePixelBoard = document.querySelector("#pixel-board");
  addEventsToEachPixel(getThePixelBoard);
};
