import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss'],
})
export class FirstPageComponent implements OnInit {
  selectedItem: any;
  montanteInicial: number = 0;
  valores: { valor: number; descricao: string }[] = [];
  novoValor: number = 0;
  descricaoGasto: string = '';
  themeSelection: boolean = false;

  constructor(
    private themeService: ThemeService,
    @Inject(DOCUMENT)
    private document: Document,
    private messageService: MessageService // Injete o MessageService
  ) {}

  ngOnInit() {
    this.loadMontanteInicialFromStorage();
    this.loadValoresFromStorage();
  }

  loadMontanteInicialFromStorage() {
    let montanteInicial = window.localStorage.getItem('montanteInicial');
    if (montanteInicial) {
      this.montanteInicial = parseFloat(montanteInicial);
    }
  }

  loadValoresFromStorage() {
    let valoresString = window.localStorage.getItem('valores');
    if (valoresString) {
      this.valores = JSON.parse(valoresString);
    }
  }

  saveMontanteInicialToStorage() {
    window.localStorage.setItem(
      'montanteInicial',
      this.montanteInicial.toString()
    );
  }

  saveValoresToStorage() {
    let valoresString = JSON.stringify(this.valores);
    window.localStorage.setItem('valores', valoresString);
  }

  resetarTudo() {
    // Redefinir os valores
    this.montanteInicial = 0;
    this.valores = [];
    this.novoValor = 0;
    this.descricaoGasto = '';

    // Atualizar o storage
    this.saveMontanteInicialToStorage();
    this.saveValoresToStorage();
  }

  diminuirValor() {
    if (this.novoValor === 0 || this.descricaoGasto.trim() === '') {
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos antes de adicionar um gasto.' });
      return;
    }
    this.valores.unshift({
      valor: this.novoValor,
      descricao: this.descricaoGasto,
    });
    this.montanteInicial -= this.novoValor;
    this.novoValor = 0;
    this.descricaoGasto = '';
    this.saveMontanteInicialToStorage();
    this.saveValoresToStorage();
  }

  somarValor(item: any) {
    const index = this.valores.findIndex((val) => val === item);
    if (index !== -1) {
      const valorSubtraido = this.valores[index].valor;
      this.montanteInicial += valorSubtraido;
      this.valores.splice(index, 1);
      this.saveMontanteInicialToStorage();
      this.saveValoresToStorage();
    }
  }

  handleChange(e: any) {
    let isChecked = e.checked;
    isChecked
      ? this.themeService.switchTheme('bootstrap4-dark-purple')
      : this.themeService.switchTheme('bootstrap4-light-purple');
  }
}
