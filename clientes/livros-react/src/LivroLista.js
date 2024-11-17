import React, { useState, useEffect } from 'react';
import ControleEditora, {editoras} from './controle/ControleEditora';
import ControleLivro from './controle/ControleLivro';

const controleLivro = new ControleLivro();
const controleEditora = new ControleEditora(editoras);

const LinhaLivro = (props) => {
    const { livro, excluir } = props;

    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            <td>
                <div>{livro.titulo}</div>
                <button className="btn btn-danger" onClick={() => excluir(livro._id)}>Excluir</button>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    // Atualização para carregar os livros de forma assíncrona via API
    useEffect(() => {
        if (!carregado) {
            controleLivro.obterLivros()
                .then((dados) => {
                    setLivros(dados); 
                    setCarregado(true);
                })
                .catch((erro) => {
                    console.error("Erro ao carregar livros:", erro);
                });
        }
    }, [carregado]);

    // Método excluir atualizado para lidar com exclusão via API
    const excluir = (id) => {
        controleLivro.excluir(id)
            .then((sucesso) => {
                if (sucesso) {
                    setLivros((livros) => livros.filter((livro) => livro._id !== id));
                }
            })
            .catch((erro) => {
                console.error("Erro ao excluir livro:", erro);
            });
    };

    return (
        <main className="col-9 mx-auto">
            <h1>Catálogo de Livros</h1>
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th className="col-2">Título</th>
                        <th className="col-6">Resumo</th>
                        <th className="col-2">Editora</th>
                        <th className="col-2">Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <LinhaLivro
                            key={livro._id} 
                            livro={livro}
                            excluir={excluir}
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;