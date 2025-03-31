import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class PaginaInicialComponent implements OnInit {
  modoOscuro: boolean = true; // Por defecto, tema oscuro

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.modoOscuro = localStorage.getItem('modoOscuro') === 'true';
      this.aplicarTema();
    }
  }

  cambiarModo() {
    this.modoOscuro = !this.modoOscuro;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('modoOscuro', String(this.modoOscuro));
      this.aplicarTema();
    }
  }

  aplicarTema() {
    const body = document.body;
    if (this.modoOscuro) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }
}
