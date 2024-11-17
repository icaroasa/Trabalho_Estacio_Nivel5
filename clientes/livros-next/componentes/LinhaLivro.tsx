import React from 'react';
import ControleEditora, { editoras } from '../classes/controle/ControleEditora';
import Livro from '../classes/modelo/Livro';
import styles from '../styles/Home.module.css';

const controleEditora = new ControleEditora(editoras);

interface LinhaLivroProps {
    livro: Livro; 
    excluir: (codigo: string) => void; 
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
    const { livro, excluir } = props;
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            <td>
                <div>{livro.titulo}</div>
                <button className="btn btn-danger" onClick={() => excluir(livro._id!)}>Excluir</button> 
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>
                <ul className={styles.ul}>
                    {livro.autores.map((autor, index) => (
                        <li key={livro._id + "-" + index}>{autor}</li> 
                    ))}
                    
                </ul>
            </td>
        </tr>
    );
};

export default LinhaLivro;