import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { PasarelaComponent } from './pages/pasarela/pasarela.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ImportePagarComponent } from './componentes/importe-pagar/importe-pagar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FiltrosComponent } from './componentes/filtros/filtros.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { ComprobarSeleccionadoPipe } from './pipes/comprobar-seleccionado.pipe';
import { MostrarColoresSeleccionadoPipe } from './pipes/mostrar-colores-seleccionado.pipe';
import { PruebaHttpComponent } from './pages/prueba-http/prueba-http.component';
import { HttpClientModule } from '@angular/common/http';
import { AnimacionesComponent } from './pages/animaciones/animaciones.component';
import { environment } from '../environments/environment.prod';


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    DetalleProductoComponent,
    PasarelaComponent,
    ContactoComponent,
    CarritoComponent,
    ImportePagarComponent,
    FiltrosComponent,
    ComprobarSeleccionadoPipe,
    MostrarColoresSeleccionadoPipe,
    PruebaHttpComponent,
    AnimacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    MatCardModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxSliderModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
  


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
