import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/app/servicos/funcionario.service';
import { Funcionario } from 'src/app/models/Funcionario';

@Component({
  selector: 'app-lista-funcionario',
  templateUrl: './lista-funcionario.component.html',
  styleUrls: ['./lista-funcionario.component.css']
})
export class ListaFuncionarioComponent implements OnInit {

  funcionarios!: Funcionario[]

  constructor(private serviceFuncionario: FuncionarioService) { }

  ngOnInit() {
    this.mostrarFuncionarios()
  }

  mostrarFuncionarios() {
    this.serviceFuncionario.getFuncionario().subscribe((doc) => {
      this.funcionarios = []
      // this.funcionarios = doc
      console.log(doc)
      doc.forEach((funcionario:any) => {
        this.funcionarios.push({
          id:funcionario.payload.doc.id,
          ...funcionario.payload.doc.data()
        })
      })
      console.log(this.funcionarios)
    })
  }

  excluir(id:any) {
    this.serviceFuncionario.deleteFuncionario(id).then(() => {
      console.log('Funcionario excluido')
    }, error => {
      console.log(error)
    })
  }

  editar(funcionario:Funcionario) {
    this.serviceFuncionario.mostrarFuncionarioEdit(funcionario)
  }
}
