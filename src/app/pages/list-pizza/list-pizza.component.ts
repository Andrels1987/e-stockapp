import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Pizza } from 'src/app/models/pizza';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-pizza',
  templateUrl: './list-pizza.component.html',
  styleUrls: ['./list-pizza.component.scss']
})
export class ListPizzaComponent implements OnInit {

  pizzas: Observable<Pizza[]>
  prod: any
  data: any
  constructor(private afire: AngularFirestore,
    private serv: ProductService,
    private route: Router) { }

  ngOnInit(): void {
    this.pizzas = this.afire.collection<Pizza>("pizza").snapshotChanges()
      .pipe(
        map(changes => changes.map(a => {
          var id = a.payload.doc.id
          this.data = a.payload.doc.data()
          return { id, ...this.data }
        }))
      )
  }

  async atualizar(id: string) {  
    var quantArry = []
    var ing = []
    var quant = []

    const inputOptions =  {        
          'metade': '1/2',
          'inteira': '1',
          '1/4': '1/4',
    }
    
    const { value: divisao } = await Swal.fire({
      title: 'Selecione ',
      input: 'radio',
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {      
          return 'You need to choose something!'
        }
      }
    })
    
    if (divisao == 'inteira') {
    
      this.afire.doc<any>('pizza/' + id).valueChanges()
      .pipe(
        map(value => {
          ing = value.ingredientes.split(",")
          quant = value.quantidade.split(",")
          for (let q of quant) {
            quantArry.push(q);
          }
          return  ing
        })
        
        //take(1)        
      ).subscribe(
         value => {
          for (let val of ing) {
            this.afire.collection('products', ref => ref.where('nomeProduto', '==', val))
              .snapshotChanges()
              .pipe(
                map(changes => changes.map(a => {
                  var id = a.payload.doc.id
                  this.data = a.payload.doc.data()
                  return { id, ...this.data }
                })),                
                take(1)
              )
              .subscribe(
                v => {                                 
                  this.prod = v[0]
                  this.prod.quantidadeEstoque =this.prod.quantidadeEstoque - quant[ing.indexOf(val)]
                  this.serv.update(this.prod, this.prod.id)                  
                }
              )
              
          }

        }

      )
    }else if(divisao == 'metade'){
      this.afire.doc<any>('pizza/' + id).valueChanges()
      .pipe(
        map(value => {
          ing = value.ingredientes.split(",")
          quant = value.quantidade.split(",")
          for (let q of quant) {
            quantArry.push(q);
          }
          return { ing, quantArry}
        })
        
        //take(1)        
      ).subscribe(
         value => {
          for (let val of value.ing) {
            this.afire.collection('products', ref => ref.where('nomeProduto', '==', val))
              .snapshotChanges()
              .pipe(
                map(changes => changes.map(a => {
                  var id = a.payload.doc.id
                  this.data = a.payload.doc.data()
                  return { id, ...this.data }
                })),                
                take(1)
              )
              .subscribe(
                v => {                                 
                  this.prod = v[0]
                  this.prod.quantidadeEstoque = this.prod.quantidadeEstoque - (quant[ing.indexOf(val)]/2)
                  this.serv.update(this.prod, this.prod.id)                  
                }
              )
              
          }

        }

      )

    }

  }

}
