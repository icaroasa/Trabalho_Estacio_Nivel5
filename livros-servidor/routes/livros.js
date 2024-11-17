const express = require('express');

const router = express.Router();

const { obterLivros, incluir, excluir } = require('../modelo/livro-dao');

// Rota GET: Obter todos os livros
router.get('/', async (req, res) => {
  try {
    const livros = await obterLivros();  
    res.status(200).json(livros);  
  } catch (err) {
    res.status(500).json({ ok: false, mensagem: 'Erro ao obter livros', erro: err });
  }
});

// Rota POST: Incluir um novo livro
router.post('/', async (req, res) => {
  const livro = req.body; 
  try {
    const novoLivro = await incluir(livro);  
    res.status(201).json({ ok: true, mensagem: 'Livro adicionado com sucesso', livro: novoLivro });
  } catch (err) {
    res.status(500).json({ ok: false, mensagem: 'Erro ao incluir livro', erro: err });
  }
});

// Rota DELETE: Excluir um livro pelo ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;  
  try {
    const resultado = await excluir(id); 
    if (resultado.deletedCount > 0) {
      res.status(200).json({ ok: true, mensagem: 'Livro excluído com sucesso' });
    } else {
      res.status(404).json({ ok: false, mensagem: 'Livro não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ ok: false, mensagem: 'Erro ao excluir livro', erro: err });
  }
});

module.exports = router;