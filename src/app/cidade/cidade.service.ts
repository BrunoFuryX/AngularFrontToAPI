import { Cidade } from './cidade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private readonly API = environment.API

  constructor(private http: HttpClient) { }


  getCity() {
    return this.http.get<Cidade[]>(`${this.API}city`).pipe(take(1));
  }

  getCityByID(id: any) {
    return this.http.get<Cidade>(`${this.API}city/${id}`).pipe(take(1));
  }

  getCityByName(name: any) {
    return this.http.get<Cidade[]>(`${this.API}city/city/${name}`).pipe(take(1));
  }

  getCityByCountry(country: any) {
    return this.http.get<Cidade[]>(`${this.API}city/country/${country}`).pipe(take(1));
  }

  private createCity(cidade: any) {
    return this.http.post(`${this.API}city`, cidade).pipe(take(1));
  }

  private updateCity(cidade: { id: any; }) {
    return this.http.put(`${this.API}city/${cidade.id}`, cidade).pipe(take(1));
  }

  saveCity(cidade: { id: any; }) {
    if (cidade.id) {
      return this.updateCity(cidade);
    }
    return this.createCity(cidade);
  }

  removeCity(id: any) {
    return this.http.delete(`${this.API}city/${id}`).pipe(take(1));
  }
}

