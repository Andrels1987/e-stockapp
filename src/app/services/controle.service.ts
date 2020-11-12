import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Producao } from '../models/producao';

@Injectable({
  providedIn: 'root'
})
export class ControleService {
  constructor(private afire: AngularFirestore) { 
    
  }

  recordProduction(date: string, producao: Producao){
    producao.dataProducao = date
    return this.afire.collection<Producao>('producao').add(producao)
  }
  getProductions(date: string){
    return this.afire.collection<Producao>('producao', ref => ref.where('dataProducao', "==", date)).snapshotChanges()
    .pipe(
      map(changes => changes.map(a => {
        var id = a.payload.doc.id
        var data = a.payload.doc.data()
        return {id, ...data}
      }))
    )
  }

  registerOutput(date: string,producao: Producao){
    producao.dataProducao = date
    return this.afire.collection<Producao>('saida').add(producao)
  }

  getOutput(date: string){
    return this.afire.collection<Producao>('saida', ref => ref.where('dataProducao', '==', date)).valueChanges()
  }
  

  disponibilidade(date: string, disponivel: Producao){
    disponivel.dataProducao = date
    this.afire.collection<Producao>('disponivel').add(disponivel)
  }
  getDisp(date: string){
    return this.afire.collection<Producao>('disponivel', ref => ref.where('dataProducao', '==', date)).valueChanges()
  }

  updateProd(id: string, data: string, prod: Producao){
    prod.dataProducao = data
    return this.afire.doc('producao/'+ id).update(prod)
  }
}
