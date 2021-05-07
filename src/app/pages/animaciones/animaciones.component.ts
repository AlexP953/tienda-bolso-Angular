import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-animaciones',
  templateUrl: './animaciones.component.html',
  styleUrls: ['./animaciones.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [ // :enter is alias to 'void => *'
        style({
          opacity: 0,
          height: 0,
        }),
        animate(2500, style({
          opacity: 0.5,
          height: 0.5,
        }))
      ]),
      transition(':leave', [ // :leave is alias to '* => void'
        animate(5000, style({
          opacity: 1,
          height: 1,
        })),
      ])
    ])
  ]

})
export class AnimacionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
