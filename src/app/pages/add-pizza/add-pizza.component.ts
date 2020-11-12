import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {Pizza} from 'src/app/models/pizza';
import {PizzaService} from 'src/app/services/pizza.service'

@Component({
  selector: 'app-add-pizza',
  templateUrl: './add-pizza.component.html',
  styleUrls: ['./add-pizza.component.scss']
})
export class AddPizzaComponent implements OnInit {

  pizza: Pizza = new Pizza()
  teste: string[]
  constructor(private pizzaservice: PizzaService) { 
    this.teste = []
  }

  ngOnInit(): void {
  }



  enviar() {
    console.log(this.pizza);
    this.pizzaservice.setPizza({...this.pizza})
  }

  addIngredientes(){
    this.teste.push(this.pizza.ingredientes) 
    console.log(this.teste);
     
  }

}
