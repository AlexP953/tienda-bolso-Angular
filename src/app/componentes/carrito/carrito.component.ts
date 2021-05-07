import { Component, Input, OnInit } from '@angular/core';
import { CestaService } from '../../services/cesta.service';
import { cestaItem } from '../../interfaces/cestaItem';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  constructor(
    private cestaServ: CestaService,
    private snackBar: MatSnackBar,
  ) { }

  productos: cestaItem[] = []

  ngOnInit(): void {
    this.productos = this.cestaServ.getProductos();
  }

  guardarLocalStorage(){
    const arrayCesta = this.cestaServ.getProductos();
    console.log('arrayCesta', JSON.stringify(arrayCesta));
    localStorage.setItem('arrayCesta', JSON.stringify(arrayCesta))
    }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['colorFondo'],
    })}

  deleteItem(cestaitem:cestaItem){
    this.cestaServ.deleteProductOfArray(cestaitem);
    this.openSnackBar('Producto eliminado',"Seguir comprando");
    this.guardarLocalStorage();
  }

}
