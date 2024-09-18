//funcao usand generics
const echo = <C> (arg: C): C => arg  
console.log(echo("string"))