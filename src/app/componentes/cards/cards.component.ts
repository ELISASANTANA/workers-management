import { FuncionarioService } from './../../servicos/funcionario.service';
import { Funcionario } from 'src/app/models/Funcionario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  funcionarios!: Funcionario[]

  constructor(private funcionarioService:FuncionarioService) { }

  ngOnInit(): void {
    this.mostrarFuncionarios()
   }

  mostrarFuncionarios() {
    this.funcionarioService.getFuncionario().subscribe((doc) => {
      this.funcionarios = []
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

}
