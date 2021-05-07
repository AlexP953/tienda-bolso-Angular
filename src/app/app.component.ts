import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  
constructor(
  private db: AngularFirestore,
  private router: Router,
  ){
  this.db.collection('a').get().toPromise().then((res)=>console.log('RES', res))  
    }

  title = 'tienda-bolsos';


  pasarela(){
    this.router.navigateByUrl("pasarela");
  }

  

  
volver(){
  console.log("navegar a ");
  this.router.navigateByUrl('productos')
}
}