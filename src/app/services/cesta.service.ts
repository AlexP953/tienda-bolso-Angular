import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { cestaItem } from '../interfaces/cestaItem';


@Injectable({
  providedIn: 'root'
})
export class CestaService {

  productos: cestaItem[] = localStorage.getItem('arrayCesta') ? JSON.parse(localStorage.getItem('arrayCesta')) : [];
  importeFinal: any

  private precioObservable = new BehaviorSubject<number>(localStorage.getItem('importePagar') ? parseInt(localStorage.getItem('importePagar')) : 0); /// creo el observable;
  importeFinal$ = this.precioObservable.asObservable(); // aqui es donde me voy a tener que subscribir;
  
  

  cambiarTotalAPagar(importeFinal){
    this.precioObservable.next(importeFinal)
    }

  precioFinal(cestaItem: any){
    return cestaItem.precioOferta || cestaItem.precio
  }
  
  getProductos(){
  // obtener productos
  return this.productos
  }
  
  setProductos(productos: cestaItem[]){
  // establecer productos
  this.productos = [...productos];
  }
  
  calcularImporteFinal(){
    let sumatorio = 0;
    this.productos.forEach ((producto:cestaItem)=>{
      sumatorio += (this.precioFinal(producto)* producto.cantidad)
    })
    return sumatorio
  }


  addProductoToArray(producto: cestaItem ){
    const indiceConFind = this.productos.findIndex((productoParam:cestaItem)=> `${productoParam.color}-${productoParam.id}` === `${producto.color}-${producto.id}`)

    if( indiceConFind >= 0 ){
  
    this.productos[indiceConFind].cantidad += producto.cantidad
      }else{
    this.productos.push(producto);
    }
    
    // añadir el importe final
    this.cambiarTotalAPagar( this.calcularImporteFinal() )
    }

  
  
  deleteProductOfArray(item: cestaItem){
  this.productos.splice(this.productos.indexOf(item), 1);
  this.cambiarTotalAPagar(this.calcularImporteFinal())
  }
  
  //aqui habra que hacer alguna logica para restar el precio
  
  }