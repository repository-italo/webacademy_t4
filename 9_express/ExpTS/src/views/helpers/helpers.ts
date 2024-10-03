import { Prof, Technology } from "./helpersTypes"

export const listProfs = (profsArray: Prof[]) => {
   const list = profsArray.map((prof) => `<li>${prof.nome} - ${prof.sala}</li>`);
   return `<ul>${list.join('')}</ul>`;
}

export const listTechsPoweredByNode = (techs: Technology[]) => {
   const techsPowered = techs
   .filter((tech) => tech.poweredByNodejs === true)
   .map((tech) => `<li>${tech.name} - ${tech.type}</li>`);
   return `<ul>${techsPowered.join('')}</ul>`;
}