const Livro = require('./livro-schema');

// Função assíncrona para obter todos os livros
const obterLivros = async () => {
  try {
    const livros = await Livro.find();  
    return livros;
  } catch (err) {
    console.error('Erro ao obter livros:', err);
    throw err;
  }
};

// Função assíncrona para incluir um novo livro
const incluir = async (livro) => {
  try {
    const novoLivro = await Livro.create(livro);  
    return novoLivro;
  } catch (err) {
    console.error('Erro ao incluir livro:', err);
    throw err;
  }
};

// Função assíncrona para excluir um livro pelo código (_id)
const excluir = async (codigo) => {
  try {
    const resultado = await Livro.deleteOne({ _id: codigo }); 
    return resultado;
  } catch (err) {
    console.error('Erro ao excluir livro:', err);
    throw err;
  }
};

module.exports = {obterLivros, incluir, excluir};