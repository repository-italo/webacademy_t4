var botao = document.querySelector("button#gerarParagrafos");
var input = document.querySelector("input");
var divParagrafos = document.querySelector("div#paragrafos");
var regex = /^[1-9]([0-9]*)$/
const isNumber = (string) => regex.test(string)

const getRandomNumber = (min, max) => {
   return (Math.random() * (max - min) + min)
}

const generateParagraph = (min, max) => {
   const loremIpsumText =
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Diam in arcu cursus euismod quis viverra
      nibh. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Sagittis
      purus sit amet olutpat Consequat mauris. Duis ultricies lacus sed turpis tincidunt id.
      Consequat interdum varius sit amet mattis vulputate. Enim sed faucibus turpis in eu. 
      Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel.Nulla pharetra diam
      sit amet nisl suscipit. Lobortis elementum nibh tellus molestie nunc non blandit massa
      enim. Dis parturient montes nascetur ridiculus mus. Justo nec ultrices dui sapien eget. 
      Enim tortor at auctor urna nunc. Dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc.`;

      const words = loremIpsumText.split(" ").filter(e => e != "")
      var paragraph = "";

      for(let i = 0; i < getRandomNumber(min, max); i++){
         paragraph = paragraph + " " + words[i];
      }
      if(paragraph[paragraph.length - 1] != "."){
         paragraph+=".";
      }

      return paragraph
}
const gerarElementos = () => {
   divParagrafos.innerHTML = null;
   if (input.value != "" && isNumber(input.value)){
      var numParagrafos = parseInt(input.value);
      for (i = 0; i < numParagrafos; i++){
         var p = document.createElement("p");
         p.innerText = generateParagraph(50, 350);
         divParagrafos.appendChild(p);
      }

   }
}
botao.addEventListener("click", gerarElementos);
