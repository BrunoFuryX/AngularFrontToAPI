import { empty, Observable, Subscription } from 'rxjs';
import { Cidade } from '../cidade';
import { CidadeService } from './../cidade.service';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cidade-lista',
  templateUrl: './cidade-lista.component.html',
  styleUrls: ['./cidade-lista.component.sass']
})
export class CidadeListaComponent implements OnInit {

  cidade: Observable<Cidade[]>;

  constructor(private service: CidadeService,private route: ActivatedRoute) {
    this.route.params.subscribe(
      (params: any) => {
        const city = params['nome']
        const country = params['estado']
        console.log(city, country)
        if(city){
          this.onCity(city)
        }else{
          if(country){
            this.onEstado(country)
          }else{
              this.getCity()
          }
        }
      }
    )
  }

  ngOnInit(): void {
  }

  getCity(){
    this.cidade = this.service.getCity()
    .pipe(
      catchError(error => {
        console.error(error);
        return empty();
      })
    )

  }

  onCity(cidade: any){
    this.cidade = this.service.getCityByName(cidade)
    .pipe(
      catchError(error => {
        console.error(error);
        return empty();
      })
    )

  }

  onEstado(estado: any){
    this.cidade = this.service.getCityByCountry(estado)
    .pipe(
      catchError(error => {
        console.error(error);
        return empty();
      })
    )
  }

  onDelete(id: any){
    this.service.removeCity(id).subscribe(
      success => console.log('sucesso'),
      error => console.error(error),
      () => this.ngOnInit()
    );
  }
}

