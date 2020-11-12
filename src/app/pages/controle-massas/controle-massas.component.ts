import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controle-massas',
  templateUrl: './controle-massas.component.html',
  styleUrls: ['./controle-massas.component.scss']
})
export class ControleMassasComponent implements OnInit {

  date: Date = new Date()
  //massadisponivel: MassaDisponivel
  //massaproduzida: MassaProduzida
  //massausada: MassaUsada
  //arraymassa = new Array()
 
  constructor() { 
    //this.massadisponivel = new MassaDisponivel(12, 15 ,24 ,13 ,11, this.date)
    //this.massaproduzida = new MassaProduzida(12, 15 ,24 ,13 ,11, this.date)
    //this.massausada = new MassaUsada(12, 15 ,24 ,13 ,11, this.date)
    //console.log(this.massadisponivel);
    
  }

  ngOnInit(): void {
    
  }

}
