import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  cartelera:any[]
  populares:any[]
  nino:any[]

  constructor(public _ps:PeliculasService) {
    this._ps.getCartelera().subscribe(resp=>{
      this.cartelera=resp;

    })


   this._ps.getPopulares().subscribe(resp=>{
     this.populares=resp;

   })

   this._ps.getPopularesNinos().subscribe(resp=>{
     this.nino=resp;

   })
 }

  ngOnInit(): void {
  }

}
