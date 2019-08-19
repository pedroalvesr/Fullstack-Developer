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
    this.maximatechService.maximatech().subscribe((m: any) => {
      this.clientes = m.clientes;
      m.produtos.map(produto => {
        Object.assign(produto, { qtdeItem: 1 });
      })
      this.produtos = m.produtos;
      this.totalProdutos = m.produtos.length;
      // console.log(this.clientes);
      console.log(this.produtos);
    });
  }

}
