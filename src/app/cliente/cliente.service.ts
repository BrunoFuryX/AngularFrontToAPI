import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = environment.API

  constructor(private http: HttpClient) { }


  getClient() {
    return this.http.get<Cliente[]>(`${this.API}client`).pipe(take(1));
  }

  getClientByName(name: any) {
    return this.http.get<Cliente[]>(`${this.API}client/name/${name}`).pipe(take(1));
  }

  getClientByID(id: any) {
    return this.http.get<Cliente>(`${this.API}client/id/${id}`).pipe(take(1));
  }

  private createClient(Cliente: any) {
    return this.http.post(`${this.API}client`, Cliente).pipe(take(1));
  }

  private updateClient(Cliente: { id: any; }) {
    return this.http.put(`${this.API}client/${Cliente.id}`, Cliente).pipe(take(1));
  }

  saveClient(Cliente: { id: any; }) {
    if (Cliente.id) {
      return this.updateClient(Cliente);
    }
    return this.createClient(Cliente);
  }

  removeClient(id: any) {
    return this.http.delete(`${this.API}client/${id}`).pipe(take(1));
  }
}
