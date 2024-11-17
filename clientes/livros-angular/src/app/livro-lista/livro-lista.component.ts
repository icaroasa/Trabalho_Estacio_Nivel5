import { Component, OnInit } from '@angular/core';
import { Editora } from '../editora';
import {Livro}  from '../livro';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {

  public editoras: Array<Editora> = [];
  public livros: Array<Livro> = [];
  private servEditora: ControleEditoraService;
  private servLivros: ControleLivrosService;

  constructor(servEditora: ControleEditoraService, servLivros: ControleLivrosService) {
    this.servEditora = servEditora;
    this.servLivros = servLivros;
  }

  // Método ngOnInit modificado para usar Promise e then
  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
    this.servLivros.obterLivros()
      .then(livros => {
        this.livros = livros;  
      })
      .catch(erro => {
        console.error("Erro ao obter livros", erro);
      });
  }

  // Método excluir modificado para aceitar código como String
  excluir = (codigo: string): void => {
    console.log("Excluir livro com código:", codigo)
    this.servLivros.excluir(codigo)
      .then(() => {
        return this.servLivros.obterLivros();
      })
      .then(livros => {
        this.livros = livros;  
      })
      .catch(erro => {
        console.error("Erro ao excluir livro", erro);
      });
  };

  obterNome = (codEditora: number): string | undefined => {
    return this.servEditora.getNomeEditora(codEditora);
  };
}