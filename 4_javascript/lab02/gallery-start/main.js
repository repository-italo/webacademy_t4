const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
var imgPaths = [], i;
for (i = 1; i < 6; i++){
   imgPaths.push(`images/pic${i}.jpg`);
}

var imgs = [];
for (let i of imgPaths){
   var img = document.createElement('img');
   img.setAttribute("src", i);
   imgs.push(img);
}

/* Declaring the alternative text for each image file */
imgs.at(0).setAttribute("alt", "Closeup of a human eye" );
imgs.at(1).setAttribute("alt", "Jupiters Surface");
imgs.at(2).setAttribute("alt", "Purple Flowers");
imgs.at(3).setAttribute("alt", "Egiptian Engravings");
imgs.at(4).setAttribute("alt", "Brown Vivid Butterfly");

/* Looping through images */
for(i of imgs){
   thumbBar.appendChild(i);
}


for (let img of imgs) {
   img.addEventListener("click", (e) => {
       e.stopPropagation();
       // Tira os atributos da img anterior
       displayedImage.removeAttribute("src");
       displayedImage.removeAttribute("alt");
       // coloca os atributos da img q recebeu o clique
       displayedImage.setAttribute("src", img.getAttribute("src"));
       displayedImage.setAttribute("alt", img.getAttribute("alt"));
   });
}


/* Wiring up the Darken/Lighten button */
overlay.style.backgroundColor = "rgba(0, 0, 0, 0)"
btn.addEventListener("click", () =>{
      if (overlay.style.backgroundColor == "rgba(0, 0, 0, 0)"){
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            btn.innerText = "Lighten"
      }else if (overlay.style.backgroundColor == "rgba(0, 0, 0, 0.5)"){
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
            btn.innerText = "Darken";
      }
   
})
