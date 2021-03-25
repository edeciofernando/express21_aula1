const express = require('express')
const app = express()

// middleware para receber dados do form
// app.use(express.urlencoded({extended: true}));

// middleware para receber dados no formato json
app.use(express.json());

// MIDDLEWARE que exibe a data em que uma rota foi acionada
function imprime(req, res, next) {
  console.log(`${'.'.repeat(30)} acessou em ${new Date()}`);
  next();
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// get: consulta de dados
app.get('/aula1', (req, res) => {
  res.send('<h2>Programação para Internet II - Aula 10/03</h2>')
})

// nosso middleware (para as rotas abaixo do seu "uso")
// app.use(imprime);

// post: inclusão
app.post('/', (req, res) => {
  // recebe os dados enviados pelo form
  // const nome = req.body.nome;
  // const idade = req.body.idade;

  // destructors
  const { nome, idade } = req.body;

  // res.send(`Ok! Dados recebidos - Nome: ${nome} - Idade: ${idade}`);
  res.json({ ok: 1, msg: `Ok! ${nome} - ${idade} anos cadastrado(a)` });
})

// put: alteração (update)
// :id indica um parâmetro a ser informado na rota
app.put('/:id', imprime, (req, res) => {
  const id = req.params.id;
  res.json({ ok: 1, msg: `Ok! Registro ${id} alterado com sucesso` });
})

// delete: exclusão de registro
// :id indica um parâmetro a ser informado na rota
app.delete('/:id', imprime, (req, res) => {
  const id = req.params.id;
  res.json({ ok: 1, msg: `Ok! Registro ${id} excluído com sucesso` });
})

// id é um parâmetro da roda (:) e com (?) indica que ele é opcional
app.get('/lista/:id?', (req, res) => {
  if (req.params.id) {
    const id = req.params.id;
    res.json({ ok: 1, msg: `Enviando dados do aluno: ${id}` });
  } else {
    res.json({ ok: 1, msg: `Listagem de Todos os Alunos Cadastrados` });
  }
})

// rota com 2 parâmetros opcionais
app.get('/pesq/:par1?/:par2?', (req, res) => {
  if (req.params.par1 && req.params.par2) {
    const nome = req.params.par1;
    const idade = req.params.par2;
    res.json({ok: 1, msg: `Pesquisando nome: ${nome} e idade: ${idade}`})
  } else if (req.params.par1) {
    const par1 = Number(req.params.par1);
    if (isNaN(par1)) {                   // isNaN: is Not a Number
       const nome = req.params.par1;
       res.json({ok: 1, msg: `Pesquisando nome: ${nome}`});
    } else {
      res.json({ok: 1, msg: `Pesquisando idade: ${par1}`});
    }
  } else {
    res.json({ok: 1, msg: `Listagem de todos sem filtros...`});
  }
})

app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000`)
})