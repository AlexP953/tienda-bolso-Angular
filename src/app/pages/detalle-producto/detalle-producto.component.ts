import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { CestaService } from '../../services/cesta.service';
import { cestaItem } from '../../interfaces/cestaItem';
import { MatSnackBar } from '@angular/material/snack-bar';
import { producto } from '../../interfaces/producto';
import { ColorServiceService } from '../../services/color-service.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {

  idProducto;
  nombre;
  producto: producto;
  color;
  cantidad = 1;
  cestaItem = [];
  showAgregar = false;
  showPagar = false;

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private cestaServ: CestaService,
    private snackBar: MatSnackBar,
    private colorServicio: ColorServiceService,
  ) { }

  ngOnInit(): void {
    if(this.colorServicio.getColor()){
      this.color = this.colorServicio.getColor()
    }
    localStorage.setItem('colorDetalle',this.color);
    
    this.idProducto = this.router.url.split('/')[2];
    this.cestaServ.importeFinal$.subscribe((importeFinal: number) => {
      if (importeFinal > 0) {
        this.showPagar = true
      } else {
        this.showPagar = false
      }
    })
    this.afs.collection('productos').doc(this.idProducto).get().toPromise().then((productoDeLaBaseDeDatos) => {
      this.producto = productoDeLaBaseDeDatos.data() as producto;
      console.log(this.producto);
    });
    console.log('EL COLOR DEL SERVICIO ES', this.colorServicio.getColor())
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['colorFondo'],
    })
  }

  comprobarSiImgCoincideColor(img: string) {
    ///idProducto_color.jpeg    

    const colorJpeg = img.split('_')[1];
    const color = colorJpeg.split('.')[0];
    console.log('los dos colores', { color1: color, color2: this.color })
    const coincide = (color === this.color);
    return coincide

    // el metodo abreviado seria
    // return (img.split('_')[1].split('.')[0] === this.color); 
  }








  volver() {


    this.router.navigateByUrl('productos')
  }

  pagar() {
    this.router.navigateByUrl('pasarela')
  }

  seleccionoColor(color: string) {
    this.color = color;
    this.showAgregarF();
  }

  showAgregarF() {
    if (this.cantidad > 0) {
      this.showAgregar = true;
    } else {
      this.showAgregar = false
    }
  }


  agregar() {
    const item: cestaItem = {
      id: this.idProducto,
      nombre: this.producto.nombre,
      color: this.color,
      cantidad: this.cantidad,
      precio: this.producto.precio,
      precioOferta: this.producto.precioOferta
    }
    this.cestaServ.addProductoToArray(item);
    this.guardarLocalStorage();
    this.openSnackBar('Se ha añadido a la cesta!', "Seguir comprando");
  }

  guardarLocalStorage() {
    const arrayCesta = this.cestaServ.getProductos();
    console.log('Esto guarda ESTO -> ', JSON.stringify(arrayCesta));
    localStorage.setItem('arrayCesta', JSON.stringify(arrayCesta))
  }

  add() {
    this.cantidad += 1;
    this.showAgregarF();
  }

  remove() {
    this.cantidad === 0 ? null : this.cantidad -= 1
    this.showAgregarF();

  }
}