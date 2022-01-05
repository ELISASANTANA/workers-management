import { Funcionario } from './../../models/Funcionario';
import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/app/servicos/funcionario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-funcionario',
  templateUrl: './form-funcionario.component.html',
  styleUrls: ['./form-funcionario.component.css']
})
export class FormFuncionarioComponent implements OnInit {

  form: FormGroup
  id: string | undefined
  titleForm: string = 'Cadastrar Funcionário'
  imagem: any = ''
  urlImg: any = ''

  constructor(private fb: FormBuilder,
              private serviceFuncionario:FuncionarioService) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(?!À-Ö)[A-Za-z\',\-àáâãçèéêẽíôõóúû ]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      cargo: ['', [Validators.required]],
      salario: [''],
      foto: ['']
    })
  }

  imgValue = ''

  ngOnInit(): void {
    this.serviceFuncionario.getFuncioanarioEdit().subscribe(resultado => {
      this.id = resultado.id
      this.titleForm = 'Editar Funcionário'
      this.imgValue = resultado.foto
      this.form.patchValue({
        nome: resultado.nome,
        email: resultado.email,
        cargo: resultado.cargo,
        salario: resultado.salario,
        foto: resultado.foto
      })
    })
  }

  salvarFuncionario() {
    // cadastrar
    if(this.id === undefined) {
      this.cadastrarFuncionario()
      // se o id for definido significa que vamos editar
    } else {
      this.editarFuncionario(this.id)
    }
  }

  controlImage = 0

  carregarImg(event:any) {

    this.controlImage = 1

     let arquivo = event.target.files
     let reader = new FileReader()

     reader.readAsDataURL(arquivo[0])
     reader.onloadend = () => {
      console.log(reader.result)
      this.imagem = reader.result
      this.serviceFuncionario.uploadImg('funcionario' + Date.now(), reader.result).then(urlImg =>{
        console.log(urlImg)
        this.urlImg = urlImg
      })
     }
  }

  cadastrarFuncionario() {
    const FUNCIONARIO: Funcionario = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      cargo: this.form.value.cargo,
      salario: this.form.value.salario,
      foto: this.urlImg,
      dataCriacao: new Date(),
      dataAtualizacao: new Date()
    }
    console.log(this.form)
    this.serviceFuncionario.addFuncionario(FUNCIONARIO).then(() => {
      console.log('Funcionario cadastrado com sucesso!')
      this.form.reset({cargo:''})
    }, error => {
      console.log(error)
    })
  }

  editarFuncionario(id:string) {
    let imgEdit = ''

    if(this.controlImage == 0) {
      imgEdit = this.imgValue
    } else {
      imgEdit = this.urlImg
    }

    console.log(this.form)

    const FUNCIONARIO: any = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      cargo: this.form.value.cargo,
      salario: this.form.value.salario,
      foto: imgEdit,
      dataAtualizacao: new Date()
    }


    if(this.form.value.nome == '') {
      this.form.reset({cargo:''})
      
    } else {
    this.serviceFuncionario.editarFuncionario(id, FUNCIONARIO).then(() => {
      this.form.reset({cargo:''})
      this.titleForm = 'Cadastrar Funcionário'
      this.id = undefined
      console.log('Funcionario editado')
      this.controlImage = 0
    }, error => {
      console.log(error)
    })
  }
}
}
