import { Injectable, EventEmitter } from '@angular/core';

import { Produto } from './../entity/produto';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  emitirCarrinho: EventEmitter<Produto[]> = new EventEmitter<Produto[]>();
  itensCarrinho: Produto[] = [];
  carrinhoVazio: boolean = true;  
  precoTotal = 0;
  frete: number = 0;

  constructor() { }

  public setItemCarrinho(item) {
    this.itensCarrinho.push(item);
  }

  public getItensCarrinho() {
    return this.itensCarrinho;
  }

  public removerItemCarrinho(item) {
    console.log(this.itensCarrinho.indexOf(item));
    
    this.itensCarrinho.slice(this.itensCarrinho.indexOf(item), 1);
    console.log(this.itensCarrinho);
    this.isCarrinhoVazio();
    this.calcularTotalPosRemoverItem();
  }

  private calcularTotalPosRemoverItem() {
    this.precoTotal = 0;
    this.itensCarrinho.forEach((item) => {
      this.precoTotal += (parseFloat(item.precoUnitario.toString()) * item.qtdeItem);
    });
    this.frete = this.frete;
  }

  private isCarrinhoVazio() {
    if (this.itensCarrinho.length < 1) {
      this.carrinhoVazio = true;
    }
  }
}
