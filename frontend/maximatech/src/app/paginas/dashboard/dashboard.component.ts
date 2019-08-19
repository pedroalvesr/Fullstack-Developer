import { Component, OnInit } from '@angular/core';

import { MaximatechService } from './../../core/services/maximatech.service';
import { Cliente } from './../../core/entity/cliente';
import { Produto } from './../../core/entity/produto';

@Component({
  selector: 'mxtech-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  clientes: Cliente;
  produtos: Produto[] = [];
  totalProdutos: number;

  constructor(private maximatechService: MaximatechService) { }

  ngOnInit() {
    this.maximatechService.maximatech().subscribe((mxtech: any) => {
      this.clientes = mxtech.clientes;
      mxtech.produtos.map(produto => {
        Object.assign(produto, { qtdeItem: 1 });
      })
      this.produtos = mxtech.produtos;
      this.totalProdutos = mxtech.produtos.length;
    });
  }

}
