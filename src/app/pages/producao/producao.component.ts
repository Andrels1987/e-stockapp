import { Component, OnInit } from '@angular/core';
import { Producao } from 'src/app/models/producao';
import { ControleService } from 'src/app/services/controle.service';

@Component({
  selector: 'app-producao',
  templateUrl: './producao.component.html',
  styleUrls: ['./producao.component.scss']
})
export class ProducaoComponent implements OnInit {

  date: Date = new Date()
  producao: Producao = new Producao()
  updateProd: Producao = new Producao()
  data: string = ""
  disponivel: Producao = new Producao()
  id: string = null

  constructor(private service: ControleService) {
    var dia = this.date.getDate().toString();
    var diaF = (dia.length == 1) ? '0' + dia : dia;
    var mes = (this.date.getMonth() + 1).toString();
    var mesF = (mes.length == 1) ? '0' + mes : mes
    var ano = this.date.getFullYear()
    this.data = diaF + "/" + mesF + "/" + ano;
  }

  ngOnInit(): void {


  }

  enviarProducao(form) {
    this.service.getProductions(this.data)
      .subscribe(
        res => {
          if (res.length !== 0) {
            this.id = res[0].id            
            console.log("ID: ", this.id);
            this.updateProd.md25 = this.producao.md25 + res[0].md25
            this.updateProd.md35 = this.producao.md35 + res[0].md35
            this.updateProd.md45 = this.producao.md45 + res[0].md45
            this.updateProd.ms35 = this.producao.ms35 + res[0].ms35
            this.updateProd.ms45 = this.producao.ms45 + res[0].ms45
            this.service.updateProd(this.id, this.data, { ...this.updateProd })
            form.reset();
          } else {
            this.producao.dataProducao = this.data
            this.service.recordProduction(this.data, { ...this.producao })
            form.reset();
          }
        }
      )
  }

}
