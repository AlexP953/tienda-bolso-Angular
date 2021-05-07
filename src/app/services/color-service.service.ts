import { Injectable } from '@angular/core';
import { Filtro } from '../interfaces/filtro';
import { producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ColorServiceService {

  private color= localStorage.getItem('colorDetalle') ? localStorage.getItem('colorDetalle') : null

  constructor() {
    this.color = 'todos'
    }

  getColor(){
    return this.color
  }

  setColor(filtro:Filtro){
    this.color = filtro.color;
    localStorage.setItem('colorDetalle',filtro.color);
  }
}
