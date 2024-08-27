const canvas = document.querySelector("canvas");
const height = (canvas.height = window.innerHeight)
const width = (canvas.width = window.innerWidth)
const ctx = canvas.getContext("2d");

ctx.fillStyle = "rgb(0 0 0)";
ctx.fillRect(0, 0, width ,height);

function raios(raios){
   return (raios * Math.PI) / 180;
}

/**Retorna um numero aleatório no intervalo de dois numeros - (min e max) */
function gerarRandom(min, max){
   const num = Math.floor(Math.random() * (max - min + 1)) + min;
   return num
}

/**Função que representa Bola
 * Possui como entrada as coordenadas referência no canvas (x, y)
 * E também a velocidade horizontal e vertical (velX, velY)
 * Cor e tamanho (cor e tam)
 */
class Bola {
   constructor(x, y, velX, velY, cor, tam) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.cor = cor;
      this.tam = tam;
   }
}

Bola.prototype.draw = function() {
   ctx.beginPath();
   ctx.fillStyle = this.cor;
   ctx.arc(this.x, this.y, this.tam, 0, 2 * Math.PI);
   ctx.fill();
}

Bola.prototype.update = function()  {
   /**Evita que a bola saia da Canvas */
   if(this.x + this.tam >= width){
      this.velX = -this.velX;
   }
   if(this.x - this.tam <= 0){
      this.velX = -this.velX;
   }

   if(this.y + this.tam >= height){
      this.velY = -this.velY;
   }

   if (this.y - this.tam <= 0){
      this.velY = -this.velY;
   }
   /**Muda a posição de acordo com a velocidade */
   this.x += this.velX;
   this.y += this.velY;

}

let testBall = new Bola(50, 100, 4, 4, "blue", 10);
testBall.x;
testBall.tam;
testBall.cor;
testBall.draw();
testBall.update();