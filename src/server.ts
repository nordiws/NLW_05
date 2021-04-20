import express from 'express';

const app = express();


/**
 * GET = Buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Exclusão
 * PATCH = ALterar uma informação especifica
 */

app.get('/', (req, res) => {
    return res.json({
        user: "Tommy",
        message: "Olá NLW 05"
    })
})

app.post('/', (req, res) => {
    return res.json({
        message: "Usuário salvo com sucesso!"
    })
})

app.listen(3000, () => console.log("Server is running on port 3000"));