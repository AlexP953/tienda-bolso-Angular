import { Component, OnInit } from '@angular/core';
import { CestaService } from '../../services/cesta.service';

@Component({
  selector: 'app-importe-pagar',
  templateUrl: './importe-pagar.component.html',
  styleUrls: ['./importe-pagar.component.scss']
})
export class ImportePagarComponent implements OnInit {

  importePagar:number

  constructor(private cestaServ: CestaService) { }

  ngOnInit(): void {
    this.cestaServ.importeFinal$.subscribe((imp:number)=>{
      this.importePagar = imp as any;
      localStorage.setItem('importePagar',imp.toString() )})}
    

  guardarLocalStorage(){
    const arrayCesta = this.cestaServ.getProductos();
    console.log('arrayCesta', JSON.stringify(arrayCesta));
    localStorage.setItem('arrayCesta', JSON.stringify(arrayCesta))
    }

}
