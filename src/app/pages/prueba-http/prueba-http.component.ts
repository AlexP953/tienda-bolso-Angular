import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { HttpClientService } from '../../services/http-client.service';

@Component({
  selector: 'app-prueba-http',
  templateUrl: './prueba-http.component.html',
  styleUrls: ['./prueba-http.component.scss']
})
export class PruebaHttpComponent implements OnInit {
  
  posts;

  constructor(
    private loQueQuiera: HttpClientService
  ) { }

  ngOnInit(): void {

    this.loQueQuiera.post({data:1}).subscribe((res)=>{
      console.log('RESPUESTA POST',res);
      this.loQueQuiera.get().subscribe((res)=>{
        console.log('nueva respuesta',res)
      })
    })
     this.loQueQuiera.get().subscribe((res)=>{
       console.log('PRUEBA HTTP',res);
        this.posts = res
     })
  }

}
