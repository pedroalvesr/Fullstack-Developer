import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MaximatechService } from './../../core/services/maximatech.service';
import { Produto } from './../../core/entity/produto';
import { CalcularFreteService } from './../../core/services/calcular-frete.service';

@Component({
  selector: 'mxtech-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  produtos = [];
  isVazio: boolean = true;
  frete: number;
  qtdeItens: number = 1
  precoTotal: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private calcularFreteService: CalcularFreteService,
    private maximatechService: MaximatechService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {

      if (params.codigo != null) {
        this.isVazio = false;
        this.produtos.push(params);

        this.produtos.map((m) => {
          this.precoTotal = m.precoUnitario * this.produtos.length;
        });
      }
    });

    // this.maximatechService.maximatech().subscribe((m: any) => {
    //   this.isVazio = false;
    //   m.produtos.forEach(item => {
    //     Object.assign(item, { qtdeItem: 1 })
    //     this.produtos.push(item);
    //   });
    //   this.produtos.forEach(e => {
    //     this.precoTotal = (this.precoTotal + e.precoUnitario);
    //   });
    //   // console.log(this.precoTotal);
    // });
    this.calcularFrete(this.produtos.length, this.precoTotal);

  }

  calcularFrete(qtdeItem?: number, preco?: number) {
    let valor = 0;
    this.calcularFreteService.calcularFrete(qtdeItem).subscribe((frete: number) => {
      this.produtos.forEach(e => {
        valor += e.precoUnitario;
      });
      console.log(valor);
      // this.precoTotal = valor + preco * (qtdeItem - 1);
      this.precoTotal =  this.precoTotal + preco * (qtdeItem - 1);
      this.frete = frete;
    });
  }

  removerItem(item) {
    let valor = 0;
    this.produtos.splice(this.produtos.indexOf(item), 1);
    this.produtos.forEach(e => {
      valor += e.precoUnitario;
    });
    this.precoTotal = valor;
    this.frete;
    // this.calcularFrete()
    console.log(this.produtos);
    if (this.produtos.length < 1) {
      this.isVazio = true;
    }
  }
}
