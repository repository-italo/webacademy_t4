class Aluno{

   constructor(
      public id: number,
      public nomeCompleto: string,
      public idade: number,
      public altura: number,
      public peso: number,

   ){
      this.id = id;
      this.nomeCompleto = nomeCompleto;
      this.idade = idade;
      this.altura = altura;
      this.peso = peso;
   }
}

class Turma {
   constructor (
      public id: number,
      public nome: string,
      public alunos: Array<Aluno>
   ){
      this.id = id;
      this.nome = nome;
      this.alunos = alunos;
   }

   public adicionarAluno (aluno: Aluno){
      this.alunos.push(aluno);
   }

   public getNumAlunos (): number {
      return this.alunos.length
   }

   public getMediaIdades (): number {
      let sumIdades = 0;
      if (this.alunos.length === 0){
         return 0;
      };
      for (let aluno of this.alunos){
         sumIdades+=aluno.idade;
      }
      return (sumIdades / this.alunos.length);
   }

   public getMediaAlturas (): number {
      let sumalturas: number = 0;

      if (this.alunos.length === 0){
         return 0;
      };
      for (let aluno of this.alunos){
         sumalturas+=aluno.altura;
      }

      return (sumalturas / this.alunos.length)
   }

   public getMediaPesos (): number {
      let sumPesos = 0;

      if (this.alunos.length === 0){
         return 0;
      };
      for (let aluno of this.alunos){
         sumPesos+=aluno.peso;
      }
      return (sumPesos / this.alunos.length);
   }
}

export {Turma, Aluno}