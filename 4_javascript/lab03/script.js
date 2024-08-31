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

/**Funções (classes) que representa Bola, Triangulo e Retangulo
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
class Triangulo {
   constructor (x, y, x2, y2, x3, y3, cor, velX, velY){
      this.x = x;
      this.y = y;
      this.x2=x2;
      this.x3=x3;
      this.y2=y2;
      this.y3=y3;
      this.cor = cor;
      this.velX = velX;
      this.velY = velY;
   }
 }

 class Retangulo {
   constructor (x, y, width, height, velX, velY, cor){
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.velX = velX;
      this.velY = velY;
      this.cor = cor;
   }
 }
/**Funções de desenho e atualização de Retângulo */
 Retangulo.prototype.draw = function (){
   ctx.beginPath();
   ctx.fillStyle = this.cor;
   ctx.rect(this.x, this.y, this.width, this.height);
   ctx.fill();
 }

 Retangulo.prototype.update = function() {
   if (this.x <= 0 || this.x + this.width >= width) {
       this.velX = -this.velX;
   }

   if (this.y <= 0 || this.y + this.height >= height) {
       this.velY = -this.velY; 
   }

   this.x += this.velX;
   this.y += this.velY;
};

/**Funções de desenho e atualização de Bola */

Bola.prototype.draw = function() {
   ctx.beginPath();
   ctx.fillStyle = this.cor;
   ctx.arc(this.x, this.y, this.tam, 0, 2 * Math.PI);
   ctx.fill();
}


Bola.prototype.update = function () {
   if (this.x + this.tam >= width) {
     this.velX = -this.velX;
   }
 
   if (this.x - this.tam <= 0) {
     this.velX = -this.velX;
   }
 
   if (this.y + this.tam >= height) {
     this.velY = -this.velY;
   }
 
   if (this.y - this.tam <= 0) {
     this.velY = -this.velY;
   }
 
   this.x += this.velX;
   this.y += this.velY;
 };

Bola.prototype.collide = function(){

}
/**Funções de desenho e atualização de Triangulo */
 Triangulo.prototype.draw = function() {
   ctx.beginPath();
   ctx.fillStyle = this.cor;
   ctx.moveTo(this.x, this.y);
   ctx.lineTo(this.x2, this.y2);
   ctx.lineTo(this.x3, this.y3);
   ctx.closePath();
   ctx.fill();
   ctx.stroke();
};

 Triangulo.prototype.update = function() {
   const minX = Math.min(this.x, this.x2, this.x3);
   const maxX = Math.max(this.x, this.x2, this.x3);
   const minY = Math.min(this.y, this.y2, this.y3);
   const maxY = Math.max(this.y, this.y2, this.y3);

   if (minX <= 0 || maxX >= width) {
       this.velX = -this.velX;
   }

   if (minY <= 0 || maxY >= height) {
       this.velY = -this.velY;
   }

   this.x += this.velX;
   this.x2 += this.velX;
   this.x3 += this.velX;

   this.y += this.velY;
   this.y2 += this.velY;
   this.y3 += this.velY;
};


let objects = [];



while (objects.length < 20) {
  let tamBolas = gerarRandom(10, 30);
  let ball = new Bola(
    gerarRandom(0 + tamBolas, width - tamBolas),
    gerarRandom(0 + tamBolas, height - tamBolas),
    gerarRandom(-5, 10),
    gerarRandom(-5, 10),
    `rgb(${gerarRandom(0, 255)}, ${gerarRandom(0, 255)}, ${gerarRandom(0, 255)})`,
    tamBolas,
  );
  objects.push(ball);
}

while (objects.length < 40) {
   let tamTriangulos = gerarRandom(20, 40);
   let velX = gerarRandom(-3, 3);
   let velY = gerarRandom(-3, 3);
   var x = gerarRandom(0, width);
   var y = gerarRandom(0, height);

   var x2 = x + tamTriangulos;
   var y2 = y;

   var x3 = x + tamTriangulos / 2;
   var y3 = y + Math.sqrt(tamTriangulos ** 2 - (tamTriangulos / 2) ** 2); 

   let triangulo = new Triangulo(
       x,
       y,
       x2,
       y2,
       x3,
       y3,
       `rgb(${gerarRandom(0, 255)}, ${gerarRandom(0, 255)}, ${gerarRandom(0, 255)})`,
       velX,
       velY,
   );
   objects.push(triangulo);
}

while (objects.length < 60){
   let widthRectangle = gerarRandom(20, 40);
   let heightRectangle = gerarRandom(20, 40);
   let velX = gerarRandom(-5, 10);
   let velY = gerarRandom(-5, 10);
   let x = gerarRandom(0, width);
   let y = gerarRandom(0, height);
   let ret = new Retangulo(x,y, widthRectangle, heightRectangle, velX, velY, 
      `rgb(${gerarRandom(0, 255)}, ${gerarRandom(0, 255)}, ${gerarRandom(0, 255)})`);

   objects.push(ret);
}
Bola.prototype.collide = function () {
      for (let j = 0; j < objects.length; j++) {
         if (!(this === objects[j])) {
           const dx = this.x - objects[j].x;
           const dy = this.y - objects[j].y;
           const distancia = Math.sqrt(dx * dx + dy * dy);
     
           if (distancia < this.tam + objects[j].tam) {
             objects[j].cor = this.cor =
             `rgb(${gerarRandom(0, 255)}, ${gerarRandom(0, 255)}, ${gerarRandom(0, 255)})`;
           }
         }
       }
 
 };
function loop() {
   ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
   ctx.fillRect(0, 0, width, height);

   for (let i = 0; i < objects.length; i++) {
       objects[i].draw();
       objects[i].update();
       if(objects[i] instanceof Bola){
         objects[i].collide();
       }
       
       
   }

   requestAnimationFrame(loop);
}

loop();