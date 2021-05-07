import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { producto } from 'src/app/interfaces/producto';
import { Filtro } from '../../interfaces/filtro';
import { CestaService } from '../../services/cesta.service';
import { ColorServiceService } from '../../services/color-service.service';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

    auxTipo = 'todos';
    productos: producto[] = []
    productosMostrar: producto[] = []

    elementosFavoritos = (localStorage.getItem('elementosFavoritos')) ? localStorage.getItem('elementosFavoritos').split(',') : [];//existe este elemento en el local storage ? Si existe me lo asignas en esta propiedad
    mostrarFavoritos: boolean = true;
    //si no existe le asignamos un empty array

    //si existe el string, tendre que hacer algo hay un metodo aplicable a los strings,

    constructor(
        private db: AngularFirestore,
        private router: Router,
        private cestaServ: CestaService,
        private colorServicio: ColorServiceService,
    ) {

    }

    mostrarColor(producto: producto) {

        const nombreProd = producto.url;
        const colorElegido = nombreProd + '_' + this.auxTipo + '.jpeg';
        return colorElegido;
    }

    comprobarSiEstaSeleccionado(producto: producto) {

        return (this.elementosFavoritos.indexOf(producto.url) >= 0);
        //quiero saber si este elemento esta dentro del array de favoritos y que si esta me digas TRUE

        //si no esta me devuelves un FALSE



    }

    selectFavorite(producto: producto) {

        //cuando seleccione aqui, quiero invertir el estado de mostrarFavorito

        this.mostrarFavoritos = !this.mostrarFavoritos;




        // (this.elementosFavoritos.index0f(producto.url) >= 0 )  ? null : this.elementosFavoritos.push(producto.url);
        //                   si se cumple esta condicion = null              no se cumple, se añade el valor con el push (se añade el indice)


        const comprovarSiEseElementoEstaDentro = this.elementosFavoritos.indexOf(producto.url);

        if (comprovarSiEseElementoEstaDentro >= 0) {

        } else {
            this.elementosFavoritos.push(producto.url);
        }

        localStorage.setItem('elementosFavoritos', this.elementosFavoritos.toString())


    }



    deselectFavorite(producto) {

        //cuando seleccione aqui, quiero invertir el estado de mostrarFavorito

        this.mostrarFavoritos = !this.mostrarFavoritos;
        const idProductoADeseleccionar = producto.url;

        //1.    ['brooklyn','neceser-carpincho','billetera-hombre'];

        const index = this.elementosFavoritos.indexOf(producto.url);

        //2. eliminarlo si existe en el array

        if (index >= 0) {

            this.elementosFavoritos.splice(index, 1);
            //elementosFavoritos
            localStorage.setItem('elementosFavoritos', this.elementosFavoritos.toString())

        } else {
        }
    }




    filtrarProductos(filtro: Filtro) {

        this.auxTipo = filtro.color;
        this.colorServicio.setColor(filtro);

        /// filtrar primero el texto
        const arrayFiltrandoTexto = this.filtrarTexto(this.productos, filtro);

        /// filtro el precio
        const arrayFiltrandoPrecio = this.filtrarPrecio(arrayFiltrandoTexto, filtro);

        /// filtro el color
        const arrayFiltrandoColor = this.filtrarColor(arrayFiltrandoPrecio, filtro);


        /// filtro el tipo
        const arrayFiltrandoTipo = this.filtrarTipo(arrayFiltrandoColor, filtro);


        this.productosMostrar = [...arrayFiltrandoTipo];


    }




    filtrarTexto(array: producto[], filtro: Filtro): producto[] {


        const texto = filtro.texto;
        // no es verdad , o que no existe , o que es null, o que es false; -1, '', null, undefined,

        if (!texto) {
            return array
        } else {
            return array.filter((producto: producto) => {
                const nombre = producto.nombre.toLowerCase().trim()
                return nombre.includes(texto.toLowerCase().trim());
            })
        }
    }

    filtrarPrecio(array: producto[], filtro: Filtro): producto[] {

        const precioMaximo = filtro.precio.precioMaximo;
        const precioMinimo = filtro.precio.precioMinimo;

        return array.filter((producto: producto) => {
            const precioDeEsteProducto = this.cestaServ.precioFinal(producto);
            return (precioDeEsteProducto > precioMinimo) && (precioDeEsteProducto < precioMaximo)
        })
    }

    filtrarColor(array: producto[], filtro: Filtro): producto[] {
        const color = filtro.color
        if (!color || (color === 'todos')) { // si el color es igual a 'todos'
            return array // no apliques ningun filtro
        } else {
            return array.filter((producto: producto) => {
                const arrayDeColoresDisponibles = producto.colores;
                return arrayDeColoresDisponibles.includes(color)
            })
        }
    }

    filtrarTipo(array: producto[], filtro: Filtro): producto[] {
        const tipo = filtro.tipo; // si el tipo es 'todos'
        if (!tipo || (tipo === 'todos')) { // no apliques ningun filtro
            return array
        } else {
            return array.filter((producto: producto) => {
                return producto.tipo === tipo
            })
        }
    }

    ngOnInit(): void {
        this.db.collection('productos').valueChanges().subscribe((res) => {
            this.productos = res as producto[];
            this.filtrarProductos({
                precio: {
                    precioMaximo: localStorage.getItem('precioMaximo') ? parseInt(localStorage.getItem('precioMaximo')) : 0,
                    precioMinimo: localStorage.getItem('precioMinimo') ? parseInt(localStorage.getItem('precioMinimo')) : 100
                },
                tipo: localStorage.getItem('tipo') ? localStorage.getItem('tipo') : 'todos',
                color: localStorage.getItem('color') ? localStorage.getItem('color') : 'todos',
                texto: localStorage.getItem('texto') ? localStorage.getItem('texto') : null,
            });

        })
    }

    navegar(i) {

        this.router.navigate(['detalle-producto', i])
    }

}
