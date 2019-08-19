import { Component, OnInit } from '@angular/core';

import { CarrinhoService } from './../../services/carrinho.service';

@Component({
  selector: 'mxtech-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  qtdeitensCarrinho: number;

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.carrinhoService.emitirItensCarrinho.subscribe((item) => {
      this.qtdeitensCarrinho = item.length;
    });

  }

}
