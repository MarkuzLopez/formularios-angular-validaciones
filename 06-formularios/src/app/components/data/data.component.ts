import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray  } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  forma: FormGroup;

  usuario = {
    nombreCompleto: {
      nombre: 'Marco',
      apellido: 'Lopez'
    },
    correo: 'marco.lopez@hotmail.com'
  };

  constructor() { }

  ngOnInit() {
    console.log(this.usuario);
    this.forma = new FormGroup({
      'nombreCompleto': new FormGroup({
        // tslint:disable-next-line: object-literal-key-quotes
        'nombre': new FormControl('Markuz', [Validators.required, Validators.minLength(5)]),
        // tslint:disable-next-line: object-literal-key-quotes
        'apellido': new FormControl('', [Validators.required, this.validacionPersonalizada]),
      }),
      // tslint:disable-next-line: object-literal-key-quotes
      'username': new FormControl('', Validators.required, this.existeUsuario),
      'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'pasatiempos': new FormArray([ new FormControl('Correr', Validators.required)]), 
      'password1': new FormControl('', Validators.required),
      'password2':  new FormControl('')
    });
    // this.forma.setValue(this.usuario);

    // validacion de passsqord si son iguales
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma) // paasamos los valoress de forma, de modo bindeaada y se pueda ocupar en la funcion
    ]);

    /// detectaar cambios en los valores o estaados de un formulario
    this.forma.controls['username'].valueChanges.subscribe(resp => {
      console.log(resp);
    });

    this.forma.controls['username'].statusChanges.subscribe( resp2 =>  { 
      console.log(resp2);
    });
  }

  agregarPaasatiempos() {
    console.log('entra');
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  noIgual( control: FormControl ): { [s: string]: boolean } {
    console.log(this); /// se pasa los valores de forma en el this por medio del bind
    let forma: any =  this;
    if (control.value !==  forma.controls['password1'].value) {
      return {
          noIgulaes: true
      };
    }
    return null;
  }

  existeUsuario(control: FormControl): any {
    let promesa = new Promise((resolve, reject) =>  {
      setTimeout(() => {
        if (control.value === 'strider') {
           resolve( {existe: true} );
        } else {
          resolve(null);
        }
      }, 3000);
    });
    return promesa;
  }

  validacionPersonalizada(control: FormControl): { [s: string]: boolean } {
    /// si se cumple laa condicción entionces es por que hubo iun error
      if ( control.value === 'Lopez') {
          return {
            validacionPersonalizada: true
          };
      }
      /// si no se cumple la validacion entonces no hubo error
      return null;
  }

  saveCambios() {
    console.log(this.forma.value);
    console.log(this.forma);
    // this.forma.reset({
    //   nombreCompleto: {
    //     nombre: '',
    //   apellido: ''
    //   },
    //   correo: ''
    // });
  }

}
