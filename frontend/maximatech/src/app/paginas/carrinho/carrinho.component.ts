import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MaximatechService } from './../../core/services/maximatech.service';
import { Produto } from './../../core/entity/produto';
import { Cliente } from './../../core/entity/cliente';
import { Pedido } from './../../core/entity/pedido'; 
import { CalcularFreteService } from './../../core/services/calcular-frete.service';
import { CarrinhoService } from './../../core/services/carrinho.service';

@Component({
  selector: 'mxtech-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  produtos: Produto[] = [];
  clientes: Cliente[] = [];
  pedido: Pedido;
  cliente: Cliente;
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
        this.carrinhoService.setItemCarrinho(produto);
        this.precoTotal += parseFloat(produto.precoUnitario.toString());
      }
    });
    this.itensNoCarrinho();
    this.calcularTotal(this.produtos.length, this.precoTotal);
    this.maximaTechClientes();
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
    this.carrinhoService.emitirItensCarrinho.emit(this.produtos);
    
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

  public maximaTechClientes() {
    this.maximatechService.maximatech().subscribe((mxtech: any) => {
      this.clientes = mxtech.clientes;
      this.cliente = this.clientes[0];
      // console.log(this.clientes);
      
    });
  }

  public salvarPedido() {
    this.pedido = new Pedido();
    this.pedido.cliente = this.cliente;
    this.pedido.valorTotal = this.precoTotal;
    this.pedido.valorFrete = this.frete;
    this.pedido.qtdeItens = this.produtos.length;
  
    console.log(this.pedido);

    
    
  }
}
