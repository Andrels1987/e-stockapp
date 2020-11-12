import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Produtos } from 'src/app/models/produtos';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
products: Observable<Produtos[]>
searchField: FormControl
prod: Observable<Produtos[]>
  constructor(private service: ProductService) { 
    let user = window.localStorage.getItem("UserName")
    console.log(user);
    
    this.searchField = new FormControl()
    this.prod = this.searchField.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(term => this.service.getProductByName(term))
      )
  }

  ngOnInit(): void {
    this.products = this.service.getAllProduct()
  }
  get() {
    //this.products = this.service.getProducts()
  }
}
