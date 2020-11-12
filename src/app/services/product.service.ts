import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Produtos } from '../models/produtos';
//import * as rxjs from 'rxjs'
import {map} from 'rxjs/operators/'



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productCollection: AngularFirestoreCollection<Produtos>
  constructor(private afire: AngularFirestore) { 
    this.productCollection = this.afire.collection<Produtos>('products');
  }

  getAllProduct() {
    return this.productCollection.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(a => {
            let data = a.payload.doc.data();
            let id = a.payload.doc.id
            return { id, ...data }
          }))
      )
  }

  getProducts(id){
    return this.afire.doc<Produtos>('products/' + id).valueChanges();
  }

  addProduct(prod: Produtos) {
    return this.productCollection.add(prod)
    /*{
    nomeProduto: prod.nomeProduto,
    quantidadeEstoque: prod.quantidadeEstoque,
    categoria: prod.categoria,
    minimoEstoque: prod.minimoEstoque,
    tipo: prod.tipo,
    descontinuado: prod.descontinuado
    }*/

  }
  getProductByName(name){
    return this.afire.collection<Produtos>('products', ref => ref.where('nomeProduto', '==', name)).valueChanges()
  }

  update(produto: Produtos, key: string) {
    this.afire.doc<Produtos>('products/' + key).update(produto)
  }
}
