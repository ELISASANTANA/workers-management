export class Funcionario {
  id?: string
  nome!: string
  email!: string 
  cargo!: string
  salario!: string 
  foto!: string 
  dataCriacao: Date
  dataAtualizacao: Date

  constructor() {
    this.dataCriacao = new Date()
    this.dataAtualizacao = new Date()
  }
}