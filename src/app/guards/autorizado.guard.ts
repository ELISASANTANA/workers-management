import { AutorizacaoService } from './../servicos/autorizacao.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoGuard implements CanActivate {

  constructor(private autorizacaoService:AutorizacaoService,
              private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const usuarioLogado = this.autorizacaoService.loginStatus()

    if(usuarioLogado) return usuarioLogado
    this.router.navigate(['/login'])
    return false
  }
  
}
