import { Component, OnInit } from '@angular/core';
import { AutorizacaoService } from 'src/app/servicos/autorizacao.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private autorizacaoService:AutorizacaoService) { }

  ngOnInit(): void {
  }

  deslogar() {
    this.autorizacaoService.deslogar()
  }

}
