import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MaximatechService } from './../../core/services/maximatech.service';
import { Produto } from './../../core/entity/produto';
import { CalcularFreteService } from './../../core/services/calcular-frete.service';
import { CarrinhoService } from './../../core/services/carrinho.service';

@Component({
  selector: 'mxtech-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  produtos: Produto[] = [];
  carrinhoVazio: boolean = true;
  frete: number = 0;
  precoTotal: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private calcularFreteService: CalcularFreteService,
    private maximatechService: MaximatechService,
    private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Produto) => {

      let produto = new Produto();

      Object.assign(produto, params);


      if (produto.codigo != null) {
        this.carrinhoVazio = false;
        // this.produtos.push(produto);

        this.carrinhoService.setItemCarrinho(produto);
        this.precoTotal += parseFloat(produto.precoUnitario.toString());
        // console.log(this.precoTotal);
      }
    });




    // this.maximatechService.maximatech().subscribe((maxima: any) => {
    //   maxima.produtos.forEach((item) => {
    //     let produto = new Produto();
    //     Object.assign(produto, item);
    //     this.produtos.push(produto);
    //   });
    //   this.calcularTotal(this.produtos.length, this.precoTotal);
    // });
    this.itensNoCarrinho();
    this.calcularTotal(this.produtos.length, this.precoTotal);

  }

  public itensNoCarrinho() {
    let itensCarrinho = this.carrinhoService.getItensCarrinho();
    
    if (itensCarrinho.length > 0) {
      this.produtos = itensCarrinho;
      this.carrinhoVazio = false;
    }
  }

  public calcularTotal(qtdeItem?: number, preco?: number) {
    this.precoTotal = 0;
    this.calcularFreteService.calcularFrete(qtdeItem).subscribe((frete: number) => {
      this.produtos.forEach((item) => {
        this.precoTotal += (parseFloat(item.precoUnitario.toString()) * item.qtdeItem);
      });
      this.frete = frete;
    });
  }

  public removerItem(item) {
    this.produtos.splice(this.produtos.indexOf(item), 1);
    this.calcularTotalPosRemoverItem();
    this.carrinhoEstaVazio();

    // this.carrinhoService.removerItemCarrinho(item);
    // this.itensNoCarrinho();
  }

  private calcularTotalPosRemoverItem() {
    this.precoTotal = 0;
    this.produtos.forEach((item) => {
      this.precoTotal += (parseFloat(item.precoUnitario.toString()) * item.qtdeItem);
    });
    this.frete = this.frete;
  }

  private carrinhoEstaVazio() {
    if (this.produtos.length < 1) {
      this.carrinhoVazio = true;
    }
  }
}
