import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produtos } from 'src/app/models/produtos';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product: Produtos = new Produtos()
  id: string
  descontinuado: string
  toarray: Array<number> = []

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private rota: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    /////////

    //////////
    if (this.id) {
      this.service.getProducts(this.id)
        .subscribe(
          res => {
            this.product = res
          }
        )
    }
  }




  salvarProduto(form) {
    //Tem que fazer um 'cast" pois Type Element não tem propriedade value nem checked
    //'cast' para o respectivo ElementType
    this.descontinuado = (<HTMLInputElement>document.querySelector('input[name="choice"]:checked')).value;
    if (this.id) {
      this.service.update({
        nomeProduto: this.product.nomeProduto,
        quantidadeEstoque: this.product.quantidadeEstoque,
        categoria: this.product.categoria,
        minimoEstoque: this.product.minimoEstoque,
        descontinuado: this.descontinuado,
        tipo: this.product.tipo,       
      }, this.id)
      this.rota.navigate(['home'])
    } else {
      //({...nomeDaClasse}) transforma em objeto para ser enviado para o firebase 
      //(JSON.parse(JSON.stringify(nomeDaClasse))) tambem pode ser feito isso  

      this.service.addProduct({
        nomeProduto: this.product.nomeProduto,
        quantidadeEstoque: this.product.quantidadeEstoque,
        categoria: this.product.categoria,
        minimoEstoque: this.product.minimoEstoque,
        descontinuado: this.descontinuado,
        tipo: this.product.tipo,        
        
      });
      form.reset()
    }
  }

}
