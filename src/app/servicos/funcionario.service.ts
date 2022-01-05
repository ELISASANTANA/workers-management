import { Injectable } from '@angular/core';
import { Funcionario } from './../models/Funcionario';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  storageRef = firebase.app().storage().ref()

  // o subject permite fazer um subscribe dentro da variavel, ou seja permite receber e enviar dados
  private funcionarioEdit = new Subject<any>()

  constructor(private angularFirestore: AngularFirestore) { }


  // metodo para adicionar no banco de dados
  addFuncionario(funcionario:Funcionario):Promise<any> {
    return this.angularFirestore.collection('funcionarios').add(funcionario)
  }

  getFuncionario():Observable<any> {
    return this.angularFirestore.collection('funcionarios', ordem => ordem.orderBy('nome')).snapshotChanges()
    // return this.angularFirestore.collection('funcionarios', ordem => ordem.orderBy('nome')).valueChanges({idField:'id'})
  }

  deleteFuncionario(id:string):Promise<any> {
    return this.angularFirestore.collection('funcionarios').doc(id).delete()
  }

  // função vai ser executada atraves do icone da lista de funcionarios
  // pegar da lista qual quer editar
  mostrarFuncionarioEdit(funcionario:Funcionario) {
    this.funcionarioEdit.next(funcionario)
  }

  // aparecer os dados no input do form
  getFuncioanarioEdit():Observable<Funcionario> {
    return this.funcionarioEdit.asObservable()
  }

  editarFuncionario(id:string, funcionario:any):Promise<any> {
    return this.angularFirestore.collection('funcionarios').doc(id).update(funcionario)
  }

  async uploadImg(nome:string, imgBase64:any) {
    try {
    let resultado = await this.storageRef.child('imagensFuncionarios/' + nome).putString(imgBase64, 'data_url')
    return await resultado.ref.getDownloadURL()
    } catch(err) {
      console.log(err)
      return null
    }
  }
}
