import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {

  autorizacao = false 

  constructor() { }

  autorizar() {
    localStorage.setItem('login', 'sim')
  }

  deslogar() {
    localStorage.clear()
  }

  // !! tranforma a variavel para o tipo boollean no caso aqui a variavel login se encontrar o login retornar true 
  loginStatus = () => !!localStorage.getItem('login')

}
