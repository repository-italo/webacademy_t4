const customName = document.getElementById('nome');
const randomize = document.querySelector('.gerarHistoria');
const story = document.querySelector('#texto');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

var storyText = "Era :dia: de janeiro, quando acordei em uma manhã, então fui ao Aeroporto e dei de cara com :insertx:, que em seguida me falou que veio me visitar. Então conversamos sobre como :inserty: é movimentada e cheia de turistas, no que em seguida, :insertx: :insertz:. Robert, meu social media, ficou espantado com tamanha coincidência.";

var insertx = ["O príncipe Charles", "Madonna", "Shaquille O'Neal"];

var inserty = ["Av Paulista", "Hopi Hari", "A Casa Rosada - Residência do Presidente da Argentina"];

var insertz = ["apertou minha mão", "e eu bebemos pinga em um bairro adjacente", "e eu frequentamos um Sarau de Poesia"];

randomize.addEventListener('click', result);

function result() {
var newStory = storyText;
const xItem = randomValueFromArray(insertx);
const yItem = randomValueFromArray(inserty);
const zItem = randomValueFromArray(insertz);
const dia = Math.floor(Math.random() * 30 + 1);

  if(customName.value !== '') {
    const name = customName.value;
   newStory = newStory.replaceAll("Robert", name);
  }

  newStory = newStory.replaceAll(":insertx:", xItem);
  newStory = newStory.replaceAll(":inserty:", yItem);
  newStory = newStory.replaceAll(":insertz:", zItem)
  newStory = newStory.replaceAll(":dia:", dia);
  console.log(newStory);
  story.textContent = newStory;
  story.style.visibility = 'visible';
}