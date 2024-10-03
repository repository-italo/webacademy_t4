import { loremIpsum } from "lorem-ipsum";
import { Request, Response } from "express";

const lorem = (request: Request, response: Response) => {
    const {paragraphs} = request.params;
    let loremText = "";
    if(paragraphs){
      loremText = loremIpsum({
         count: parseInt(paragraphs as string),                // Number of "words", "sentences", or "paragraphs"
         format: "html",         // "plain" or "html"
         paragraphLowerBound: 8,  // Min. number of sentences per paragraph.
         paragraphUpperBound: 16,  // Max. number of sentences per paragarph.
         random: Math.random,     // A PRNG function
         sentenceLowerBound: 5,   // Min. number of words per sentence.
         sentenceUpperBound: 15,  // Max. number of words per sentence.
         suffix: "\n",            // Line ending, defaults to "\n" or "\r\n" (win32)
         units: "paragraphs",      // paragraph(s), "sentence(s)", or "word(s)"
      })
    }
    return response.render("lorem", {
      layout: false,
      loremText
    })
}

const hb1 = (request: Request, response: Response) =>{
   return response.render("hb1", {
      mensagem: "Olá, você está aprendendo Express + HandleBars",
   })
}

const hb2 = (request: Request, response: Response) => {
   return response.render("hb2", {
      poweredByNodeJs: true,
      name: "Express",
      type: "Framework",
   })
}

const hb3 = (request: Request, response: Response) => {
   const profs = [
      {nome: "David Fernandes", sala: 1238},
      {nome: "Horacio Fernandes", sala: 1233},
      {nome: "Edleno Moura", sala: 1236},
      {nome: "Elaine Harada", sala: 1231},
   ]
   return response.render("hb3", {
      profs
   })
}

const hb4 = (request: Request, response: Response) => {
   const technologies = [
      { name: 'Express', type: 'Framework', poweredByNodejs: true },
      { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
      { name: 'React', type: 'Library', poweredByNodejs: true },
      { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
      { name: 'Django', type: 'Framework', poweredByNodejs: false },
      { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
      { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
   ];

   return response.render("hb4", {
      technologies
   })
}

export default {lorem, hb1, hb2, hb3, hb4}