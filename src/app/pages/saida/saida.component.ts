import { Component, OnInit } from '@angular/core';
import { Producao } from 'src/app/models/producao';
import { ControleService } from 'src/app/services/controle.service';

@Component({
  selector: 'app-saida',
  templateUrl: './saida.component.html',
  styleUrls: ['./saida.component.scss']
})
export class SaidaComponent implements OnInit {

  saida: Producao = new Producao()
  date: Date = new Date()
  data; string
  constructor(private service: ControleService) {
    var dia = this.date.getDate().toString();
    var diaF = (dia.length == 1)? '0'+dia: dia;
    var mes = (this.date.getMonth() + 1).toString();
    var mesF = (mes.length == 1)? '0'+ mes:mes
    var ano = this.date.getFullYear()
    this.data = diaF+"/"+mesF+"/"+ano;
  }

  ngOnInit(): void {

  }

  enviarSaida(form) {
    this.service.registerOutput(this.data,{...this.saida});
    form.reset();
  }

}
