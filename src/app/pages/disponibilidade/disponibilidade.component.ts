import { Component, OnInit } from '@angular/core';
import {Producao} from 'src/app/models/producao';
import {ControleService} from 'src/app/services/controle.service'

@Component({
  selector: 'app-disponibilidade',
  templateUrl: './disponibilidade.component.html',
  styleUrls: ['./disponibilidade.component.scss']
})
export class DisponibilidadeComponent implements OnInit {
  //sempre inicializar
  disponivel: Producao = { dataProducao: "", ms35: 0, ms45: 0, md35: 0, md45: 0, md25: 0 }
  produzida: Producao = { dataProducao: "", ms35: 0, ms45: 0, md35: 0, md45: 0, md25: 0 }
  usada: Producao = { dataProducao: "", ms35: 0, ms45: 0, md35: 0, md45: 0, md25: 0 }
  date: Date = new Date()
  data: string = ""
  virarMes: string = ""

  constructor(private service: ControleService) {
    var dia = this.date.getDate().toString();
    var diaF = (dia.length == 1) ? '0' + dia : dia;
    var mes = (this.date.getMonth() + 1).toString();
    var mesF = (mes.length == 1) ? '0' + mes : mes
    var ano = this.date.getFullYear()
    this.data = diaF + "/" + mesF + "/" + ano
  }

  ngOnInit(): void {
    this.service.getDisp(this.data)
      .subscribe(
        disp => {
          if (disp.length == 0) {
            this.service.getProductions(this.data).subscribe(
              prod => {
                if (prod.length == 0) {
                  this.produzida = { dataProducao: "", ms35: 0, ms45: 0, md35: 0, md45: 0, md25: 0 }
                  this.disponivel = { dataProducao: "", ms35: 0, ms45: 0, md35: 0, md45: 0, md25: 0 }
                } else {
                  for (let p of prod) {
                    this.produzida.md25 += p.md25
                    this.produzida.md35 += p.md35
                    this.produzida.md45 += p.md45
                    this.produzida.ms35 += p.ms35
                    this.produzida.ms45 += p.ms45
                  }
                  this.service.getOutput(this.data)
                    .subscribe(
                      out => {
                        if (out.length == 0) {
                          this.usada = { dataProducao: "", ms35: 0, ms45: 0, md35: 0, md45: 0, md25: 0 }
                          this.disponivel.md25 = this.produzida.md25 - this.usada.md25
                          this.disponivel.md35 = this.produzida.md35 - this.usada.md35
                          this.disponivel.md45 = this.produzida.md45 - this.usada.md45
                          this.disponivel.ms35 = this.produzida.ms35 - this.usada.ms35
                          this.disponivel.ms45 = this.produzida.ms45 - this.usada.ms45
                        } else {
                          this.usada = out[0]
                          this.disponivel.md25 = this.produzida.md25 - this.usada.md25
                          this.disponivel.md35 = this.produzida.md35 - this.usada.md35
                          this.disponivel.md45 = this.produzida.md45 - this.usada.md45
                          this.disponivel.ms35 = this.produzida.ms35 - this.usada.ms35
                          this.disponivel.ms45 = this.produzida.ms45 - this.usada.ms45
                        }
                      }
                    )


                }
              }
            )
          } else {
            this.disponivel = disp[0]
            this.service.getProductions(this.data)
              .subscribe(
                prod => {
                  console.log("PROD: ", prod);

                  if (prod.length == 0) {
                    this.produzida = { dataProducao: "", ms35: 0, ms45: 0, md35: 0, md45: 0, md25: 0 }
                  } else {
                    for (let p of prod) {
                      this.produzida.md25 += p.md25
                      this.produzida.md35 += p.md35
                      this.produzida.md45 += p.md45
                      this.produzida.ms35 += p.ms35
                      this.produzida.ms45 += p.ms45
                    }
                    this.disponivel.md25 = this.disponivel.md25 + this.produzida.md25
                    this.disponivel.md35 = this.disponivel.md35 + this.produzida.md35
                    this.disponivel.md45 = this.disponivel.md45 + this.produzida.md45
                    this.disponivel.ms35 = this.disponivel.ms35 + this.produzida.ms35
                    this.disponivel.ms45 = this.disponivel.ms45 + this.produzida.ms45


                  }
                }
              )
            this.service.getOutput(this.data)
              .subscribe(
                out => {
                  if (out.length == 0) {
                    this.usada = { dataProducao: "", ms35: 0, ms45: 0, md35: 0, md45: 0, md25: 0 }
                    this.disponivel.md25 = this.disponivel.md25 + this.produzida.md25 - this.usada.md25
                    this.disponivel.md35 = this.disponivel.md35 + this.produzida.md35 - this.usada.md35
                    this.disponivel.md45 = this.disponivel.md45 + this.produzida.md45 - this.usada.md45
                    this.disponivel.ms35 = this.disponivel.ms35 + this.produzida.ms35 - this.usada.ms35
                    this.disponivel.ms45 = this.disponivel.ms45 + this.produzida.ms45 - this.usada.ms45
                  } else {

                    for (let o of out) {
                      this.usada.md25 = this.usada.md25 + o.md25
                      this.usada.md35 = this.usada.md35 + o.md35
                      this.usada.md45 = this.usada.md45 + o.md45
                      this.usada.ms35 = this.usada.ms35 + o.ms35
                      this.usada.ms45 = this.usada.ms45 + o.ms45
                    }
                    this.disponivel.md25 = this.disponivel.md25 - this.usada.md25
                    this.disponivel.md35 = this.disponivel.md35 - this.usada.md35
                    this.disponivel.md45 = this.disponivel.md45 - this.usada.md45
                    this.disponivel.ms35 = this.disponivel.ms35 - this.usada.ms35
                    this.disponivel.ms45 = this.disponivel.ms45 - this.usada.ms45

                  }
                }
              )

          }
        }
      )



  }


  diaSeguinte() {
    //Setting day parameter to 0 means one day less than first day of the month which is last day of the previous month.
    var ultimoDia = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    var ultimo = ultimoDia.getDate();
    console.log("Ultimo", ultimo);
    if (this.date.getDate() === ultimo) {
      var d = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1)
      var diaMesSeguinte = d.getDate().toString()
      var diaF = (diaMesSeguinte.length == 1) ? '0' + diaMesSeguinte : diaMesSeguinte
      var m = (d.getMonth() + 1).toString()
      var mF = (m.length == 1) ? '0' + m : m
      var anoF = d.getFullYear()
      this.data = diaF + "/" + mF + "/" + anoF

      this.service.disponibilidade(this.data, this.disponivel)
      this.produzida = { dataProducao: "", ms35: 0, ms45: 0, md35: 0, md45: 0, md25: 0 }
      this.usada = { dataProducao: "", ms35: 0, ms45: 0, md35: 0, md45: 0, md25: 0 }
      this.service.recordProduction(this.data, { ...this.produzida })
      this.service.registerOutput(this.data, { ...this.usada })
    } else {
      var dia = (this.date.getDate() + 1).toString();
      var diaF = (dia.length == 1) ? '0' + dia : dia;
      var mes = (this.date.getMonth() + 1).toString();
      var mesF = (mes.length == 1) ? '0' + mes : mes
      var ano = this.date.getFullYear()
      this.data = diaF + "/" + mesF + "/" + ano
      console.log("Hoje", this.data);
      this.service.disponibilidade(this.data, this.disponivel)
      this.produzida = { dataProducao: "", ms35: 0, ms45: 0, md35: 0, md45: 0, md25: 0 }
      this.usada = { dataProducao: "", ms35: 0, ms45: 0, md35: 0, md45: 0, md25: 0 }
      this.service.recordProduction(this.data, { ...this.produzida })
      this.service.registerOutput(this.data, { ...this.usada })

    }






  }

}
