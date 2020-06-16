import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable()
export class PeliculasService {

  private apikey:string = "e2c2a613a68c522b1533923a28fc48a9";
  private urlMoviedb:string = "https://api.themoviedb.org/3";

  peliculas:any[] =[];

  constructor( private jsonp:HttpClient ) { }



  getCartelera(){
    let desde:Date = new Date();
    let hasta:Date = new Date();


    desde.setDate(desde.getDate()-7);
    ///recordar cambiar los ceros
    let desdestr=`${desde.getFullYear()}-0${desde.getMonth()+1}-0${desde.getDate()}`;
    let hastastr=`${hasta.getFullYear()}-0${hasta.getMonth()+1}-${hasta.getDate()}`;

    ///discover/movie?primary_release_date.gte=2014-06-06&primary_release_date.lte=2020-06-13

    let url = `${ this.urlMoviedb }/discover/movie?primary_release_date.gte=${desdestr}&primary_release_date.lte=${hastastr}&api_key=${ this.apikey }&language=es`;
    console.log(url);

    return this.jsonp.get( url )
                .pipe(map ((x:any)=>x.results));

  }

  getPopulares(){

    let url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }&language=es`;

    return this.jsonp.get( url )
                .pipe(map ((x:any)=>x.results));
  }

  getPopularesNinos(){

    let url = `${ this.urlMoviedb }/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${ this.apikey }&language=es`;

    return this.jsonp.get( url )
                .pipe(map ((x:any)=>x.results));
  }

  buscarPelicula( texto:string ){

    let url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es`;

    return this.jsonp.get( url )
                .pipe(map ((x:any)=>{
                  this.peliculas=x.results;
                  return x.results
                }));
  }

  getPelicula(id:string){

    let url = `${ this.urlMoviedb }/movie/${id}?api_key=${ this.apikey }&language=es`;

    return this.jsonp.get( url )
                .pipe(map ((x:any)=>x));
  }



}
