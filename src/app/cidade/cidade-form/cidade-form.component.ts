import { ActivatedRoute } from '@angular/router';
import { CidadeService } from './../cidade.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { empty, Observable } from 'rxjs';
import { Cidade } from '../cidade';

@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.sass']
})
export class CidadeFormComponent implements OnInit {

  form: FormGroup;
  submitted = false
  cidade: any;
  constructor(
    private fb: FormBuilder,
    private service:CidadeService,
    private location: Location,
    private route: ActivatedRoute
    ) { 
      
    }


  updateForm(cidade: any){
    this.form.patchValue({
      id: cidade.id,
      city: cidade.city,
      country: cidade.country
    })
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      city: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      country: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
    this.route.params.subscribe(
      (params: any) => {
        const id = params['id']
        const cidade = this.service.getCityByID(id)
        cidade.subscribe(cidades => this.updateForm(cidades))
        console.log(cidade)
      }
    )
    
  }


  onSubmit(){
    this.submitted = true
    console.log(this.form.value)
    if( this.form.valid){
        console.log("valido")
        this.service.saveCity(this.form.value).subscribe(
          success => {
            console.log('sucesso')
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
