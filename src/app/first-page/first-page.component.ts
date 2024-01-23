import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent {
  selectedItem: any; // Certifique-se de que o tipo corresponda aos itens em 'valores'
  montanteInicial: number = 0;  // Inicializado com zero
  valores: { valor: number; descricao: string }[] = [];
  novoValor: number = 0;
  descricaoGasto: string = '';

  constructor(private themeService: ThemeService) {}
  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
}

  // themeSelection: boolean = false;
  // constructor(@Inject(DOCUMENT) private document: Document) {
  //   let theme = window.localStorage.getItem("theme");
  //   if (theme) {
  //     this.themeSelection = theme == "dark" ? true : false;
  //     this.changeTheme(this.themeSelection);
  //   }
  // }

  // changeTheme(state: boolean){
  //   let theme = state ? "dark" : "light";
  //   window.localStorage.setItem("theme", theme);
  //   let themeLink = this.document.getElementById("app-theme") as HTMLLinkElement;
  //   themeLink.href = "bootstrap4-" + theme + "-purple" + ".css"
  // }

  diminuirValor() {
    this.valores.unshift({ valor: this.novoValor, descricao: this.descricaoGasto });
    this.montanteInicial -= this.novoValor;
    this.novoValor = 0;
    this.descricaoGasto = '';
    console.log(this.valores[0].valor)
    console.log(this.novoValor)
  }

  somarValor(item: any) {
    const index = this.valores.findIndex(val => val === item);
    if (index !== -1) {
      const valorSubtraido = this.valores[index].valor;
      this.montanteInicial += valorSubtraido;
      this.valores.splice(index, 1);
    }
  }
}
