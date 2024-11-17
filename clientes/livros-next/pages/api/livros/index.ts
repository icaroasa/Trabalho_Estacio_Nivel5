import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivro from '../../../classes/controle/ControleLivro';

export const controleLivro = new ControleLivro();

export default async (req: NextApiRequest, res: NextApiResponse) => { // Adicionei 'async' aqui
    try {
        if (req.method === 'GET') {
            // Espera a Promise ser resolvida
            const livros = await controleLivro.obterLivros();
            res.status(200).json(livros); // Retorna a lista de livros como JSON
        } else if (req.method === 'POST') {
            const novoLivro = req.body; // Captura os dados do livro no corpo da requisição
            await controleLivro.incluir(novoLivro); // Inclui o livro no backend
            res.status(200).json({ message: 'Livro incluído com sucesso' });
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};