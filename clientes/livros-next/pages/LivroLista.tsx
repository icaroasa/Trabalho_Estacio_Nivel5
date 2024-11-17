import type {NextPage} from 'next';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Menu } from '../componentes/Menu'; 
import styles from '../styles/Home.module.css'; 
import { LinhaLivro } from '../componentes/LinhaLivro'; 
import Livro from '../classes/modelo/Livro'; 

const baseURL = "http://localhost:3000/api/livros"; 

const obter = async () => {
    const response = await fetch(baseURL);
    return await response.json(); 
};

const excluirLivro = async (codigo: string | undefined) => {
    const response = await fetch(`${baseURL}/${codigo}`, {
        method: 'DELETE'
    });
    return response.ok; 
};

const LivroLista: React.FC = () => {
    const [livros, setLivros] = useState<Array<Livro>>([]); 
    const [carregado, setCarregado] = useState<boolean>(false); 

    useEffect(() => {
        obter()
            .then(data => {
                setLivros(data); 
                setCarregado(true); 
            })
            .catch(error => {
                console.error("Erro ao obter livros:", error);
            });
    }, []);

    const excluir = async (codigo: string | undefined) => {
        const sucesso = await excluirLivro(codigo);
        if (sucesso) {
            setLivros(livros.filter(livro => livro._id !== codigo)); 
            setCarregado(false); 
        }
    };

    return (
        <div className="container">
            <Head>
                <title>Lista de Livros</title>
            </Head>
            <Menu />
            <main className='col-9 mx-auto'>
                <h1 className={styles.h1}>Catálogo</h1>
                <table className="table table-striped">
                    <thead className='table-dark'>
                        <tr>
                            <th className="col-2">Título</th>
                            <th className="col-6">Resumo</th>
                            <th className="col-2">Editora</th>
                            <th className="col-2">Autores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map(livro => (
                            <LinhaLivro
                                key={livro._id}
                                livro={livro}
                                excluir={() => excluir(livro._id)} 
                            />
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default LivroLista;