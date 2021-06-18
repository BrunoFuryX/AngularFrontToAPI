import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { empty, Observable } from 'rxjs';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.sass']
})
export class ClienteListaComponent implements OnInit {
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;


  constructor(private service: ClienteService,private route: ActivatedRoute) {
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
    this.clientes = this.service.getClient()
    .pipe(
      catchError(error => {
        console.error(error);
        return empty();
      })
    )

  }

  onCity(name: any){
    this.clientes = this.service.getClientByName(name)
    .pipe(
      catchError(error => {
        console.error(error);
        return empty();
      })
    )

  }

  onEstado(id: any){
    this.cliente = this.service.getClientByID(id)
    .pipe(
      catchError(error => {
        console.error(error);
        return empty();
      })
    )
  }

  onDelete(id: any){
    this.service.removeClient(id).subscribe(
      success => console.log('sucesso'),
      error => console.error(error),
      () => this.ngOnInit()
    );
  }

}
