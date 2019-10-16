import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    apellido: '',
    email: '',
    pais: '',
    sexo: 'Hombre',
    terminos: true
  };

  paises = [{
    codigo: 'CRI',
    nombre: 'Costa Rica'
  },
  {
    codigo: 'MX',
    nombre: 'Mexico'
  },
  {
    codigo: 'EU',
    nombre: 'Estados Unidos'
  }
];

sexo = ['Hombre', 'Mujer', 'Sin Definir'];

  constructor() { }

  ngOnInit() {
  }

  guardarFom(forma: NgForm) {
    console.log('form posteados');
    console.log(forma); // para ver todos los metodos y propiedaades del ngForm 
    console.log( forma.value );
    console.log('usuaario', this.usuario);
    // la clabe de la inmortalidad ess vivir una vida que valga la pena recordar 
  }

}
