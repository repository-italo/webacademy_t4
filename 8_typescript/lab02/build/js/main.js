class Aluno {
    constructor(id, nomeCompleto, idade, altura, peso) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
    }
}
class Turma {
    constructor(id, nome, alunos) {
        this.id = id;
        this.nome = nome;
        this.alunos = alunos;
        this.id = id;
        this.nome = nome;
        this.alunos = alunos;
    }
    adicionarAluno(aluno) {
        this.alunos.push(aluno);
    }
    getNumAlunos() {
        return this.alunos.length;
    }
    getMediaIdades() {
        let sumIdades = 0;
        if (this.alunos.length === 0) {
            return 0;
        }
        ;
        for (let aluno of this.alunos) {
            sumIdades += aluno.idade;
        }
        return (sumIdades / this.alunos.length);
    }
    getMediaAlturas() {
        let sumalturas = 0;
        if (this.alunos.length === 0) {
            return 0;
        }
        ;
        for (let aluno of this.alunos) {
            sumalturas += aluno.altura;
        }
        return (sumalturas / this.alunos.length);
    }
    getMediaPesos() {
        let sumPesos = 0;
        if (this.alunos.length === 0) {
            return 0;
        }
        ;
        for (let aluno of this.alunos) {
            sumPesos += aluno.peso;
        }
        return (sumPesos / this.alunos.length);
    }
}
export { Turma, Aluno };
