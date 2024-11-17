import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Menu } from '../componentes/Menu'; 
import styles from '../styles/Home.module.css';
import ControleEditora, { editoras } from '../classes/controle/ControleEditora'; 
import Livro from '../classes/modelo/Livro';
import { useRouter } from 'next/router';
import ControleLivro from '../classes/controle/ControleLivro'; 

const LivroDados: React.FC = () => {

    const controleEditora = new ControleEditora(editoras); 
    const controleLivros = new ControleLivro(); 
    const router = useRouter();

    const [opcoes, setOpcoes] = useState<{ value: number; text: String }[]>([]); 
    const [titulo, setTitulo] = useState<string>(''); 
    const [resumo, setResumo] = useState<string>(''); 
    const [autores, setAutores] = useState<string>(''); 
    const [codEditora, setCodEditora] = useState<number>(0); 

    // Efeito para carregar as editoras ao montar o componente
    useEffect(() => {
        const carregarEditoras = async () => {
            const editoras = await controleEditora.getEditoras();
            setOpcoes(editoras.map(({ codEditora, nome }) => ({ value: codEditora, text: nome }))); 
            if (editoras.length > 0) {
                setCodEditora(editoras[0].codEditora); 
            }
        };

        carregarEditoras();
    }, []);

    // Método para tratar a mudança de seleção da editora
    const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(evento.target.value)); 
    };

    // Método para incluir o livro no formulário
    const incluir = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault(); 

        const livro: Livro = new Livro(
            codEditora,
            titulo,
            resumo,
            autores.split('\n'), 
            
        );

        controleLivros.incluir(livro).then((sucesso) => {
            console.log('Livro incluído com sucesso:', sucesso);
            if (sucesso) {
                router.push('/LivroLista');
            } else {
                console.log('Erro ao incluir livro');
            }
        });
    };

    return (
        <div className="container">
            <Head>
                <title>Incluir Livro</title>
            </Head>
            <Menu />
            <main className='col-9 mx-auto'>
                <h1 className={styles.h1}>Dados do Livro</h1>
                <form onSubmit={incluir}>
                    <div className="mb-3">
                        <label htmlFor="titulo" className="form-label">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            id="titulo"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="resumo" className="form-label">Resumo</label>
                        <textarea
                            className="form-control"
                            id="resumo"
                            value={resumo}
                            onChange={(e) => setResumo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="autores" className="form-label">Autores (separados por linha)</label>
                        <textarea
                            className="form-control"
                            id="autores"
                            value={autores}
                            onChange={(e) => setAutores(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="codEditora" className="form-label">Editora</label>
                        <select
                            id="codEditora"
                            className="form-select"
                            value={codEditora}
                            onChange={tratarCombo}
                            required
                        >
                            {opcoes.map(opcao => (
                                <option key={opcao.value} value={opcao.value}>
                                    {opcao.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Salvar Dados</button>
                </form>
            </main>
        </div>
    );
};

export default LivroDados;