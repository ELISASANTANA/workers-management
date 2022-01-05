import { AutorizacaoService } from './../../servicos/autorizacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-funcionario',
  templateUrl: './adm-funcionario.component.html',
  styleUrls: ['./adm-funcionario.component.css']
})
export class AdmFuncionarioComponent implements OnInit {

  constructor(private autorizacaoService:AutorizacaoService,
              private router:Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.autorizacaoService.deslogar()
    this.router.navigate(['/login'])
  }
  
}
