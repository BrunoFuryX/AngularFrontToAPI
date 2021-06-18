import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.sass']
})
export class ClienteFormComponent implements OnInit {

  form: FormGroup;
  submitted = false
  cidade: any;
  constructor(
    private fb: FormBuilder,
    private service:ClienteService,
    private location: Location,
    private route: ActivatedRoute
    ) { 
      
    }


  updateForm(cliente: any){
    this.form.patchValue({
      id: cliente.id,
      name: cliente.name,
      born: cliente.born,
      gender: cliente.gender,
      city: cliente.city,
      age: cliente.age
    })
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      born: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      gender: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      city: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      age: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
    });
    this.route.params.subscribe(
      (params: any) => {
        const id = params['id']
        const cidade = this.service.getClientByID(id)
        cidade.subscribe(cidades => this.updateForm(cidades))
        console.log(cidade)
      }
    )
    
  }


  onSubmit(){
    this.submitted = true
    console.log(this.form.value)
    if( this.form.valid){
        this.service.saveClient(this.form.value).subscribe(
          success => {
            this.location.back();
          },
          error => console.error(error),
          () => console.log('completo')
        );
    }
  }
  onCancel(){
    this.submitted = false
    this.form.reset();
  }
  hasError(field: any){
    return this.form.get(field)?.errors;
  }

}
