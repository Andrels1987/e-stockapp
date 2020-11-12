import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pizza } from '../models/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private dbfire: AngularFirestore) { }


  setPizza(pizza: Pizza){
    this.dbfire.collection('pizza').add(pizza)
  }
}
