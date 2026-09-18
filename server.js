const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

const produtos = [
  {
    "id": 1,
    "descricao": "Notebook Dell Inspiron 15",
    "categoria": "Informática",
    "preco": 3499.90,
    "estoque": 12
  },
  {
    "id": 2,
    "descricao": "Mouse Logitech MX Master",
    "categoria": "Periféricos",
    "preco": 549.90,
    "estoque": 25
  },
  {
    "id": 3,
    "descricao": "Teclado Mecânico Keychron K2",
    "categoria": "Periféricos",
    "preco": 629.90,
    "estoque": 18
  },
  {
    "id": 4,
    "descricao": "Monitor LG UltraWide 29",
    "categoria": "Monitores",
    "preco": 1499.90,
    "estoque": 8
  },
  {
    "id": 5,
    "descricao": "Webcam Logitech C920",
    "categoria": "Periféricos",
    "preco": 429.90,
    "estoque": 15
  },
  {
    "id": 6,
    "descricao": "SSD Kingston 1TB",
    "categoria": "Armazenamento",
    "preco": 459.90,
    "estoque": 30
  },
  {
    "id": 7,
    "descricao": "Headset HyperX Cloud II",
    "categoria": "Áudio",
    "preco": 599.90,
    "estoque": 14
  },
  {
    "id": 8,
    "descricao": "Hub USB-C 7 em 1",
    "categoria": "Acessórios",
    "preco": 289.90,
    "estoque": 40
  },
  {
    "id": 9,
    "descricao": "Roteador TP-Link Archer AX23",
    "categoria": "Redes",
    "preco": 399.90,
    "estoque": 20
  },
  {
    "id": 10,
    "descricao": "Caixa de Som JBL Flip 6",
    "categoria": "Áudio",
    "preco": 699.90,
    "estoque": 11
  },
  {
    "id": 11,
    "descricao": "Carregador USB-C 65W",
    "categoria": "Acessórios",
    "preco": 199.90,
    "estoque": 35
  },
  {
    "id": 12,
    "descricao": "HD Externo Seagate 2TB",
    "categoria": "Armazenamento",
    "preco": 529.90,
    "estoque": 17
  }
]

const usuarios = [
    {
        id: 1,
        nome: "Ana Silva",
        login: "ana",
        senha: "123"
    },
    {
        id: 2,
        nome: "Carlos Souza",
        login: "carlos",
        senha: "456"
    }
];

function gerarId(lista) {
  let id = 1;
  while (lista.some(item => item.id === id)) {
    id++;
  }

  return id;
}

app.get('/editProduct', (req, res) => {
    res.sendFile(__dirname + '/public/editProduct.html');
});

app.get('/editProduct/:id', (req, res) => {
    res.sendFile(__dirname + '/public/editProduct.html');
});

app.get('/produtos', (req, res) => {
    res.json(produtos)
})

app.get('/login', (req, res) => {
    res.json(usuarios)
})

app.get('/produtos/:id', (req, res) => {
    const id = parseInt (req.params.id)

    const index = produtos.findIndex (prod => prod.id === id)
    if (index >= 0) {
        res.json(produtos[index])
    } else {
        res.status(404).send ('Not Found')
    }
})

app.post('/produtos', (req, res) => {
    const id = gerarId(produtos);
    const { descricao, categoria, preco, estoque} = req.body;

    const newProduct = {
      id,
      descricao,
      categoria,
      preco,
      estoque
    }

    produtos.push(newProduct);
    return res.status(201).json(newProduct);
})

app.post("/login", (req, res) => {
    const { login, senha } = req.body;
    const usuario = usuarios.find(
        u => u.login === login && u.senha === senha
    );
    if (!usuario) {
        return res.status(401).json({
            mensagem: "Login ou senha inválidos"
        });
    }
    res.cookie("usuario", usuario.id.toString(), {
        httpOnly: false
    });
    res.json({
        mensagem: "Login realizado com sucesso"
    });
});

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt (req.params.id)

    const index = produtos.findIndex (prod => prod.id === id)
    if (index >= 0) {
        produtos.splice(index, 1)
        res.status(204).json(produtos)
    } else {
        res.status(404).send ('Not Found')
    }
})

app.put('/produtos/:id', (req, res) => {
    const id = parseInt (req.params.id)

    const index = produtos.findIndex (prod => prod.id === id)
    if (index >= 0) {
        produtos[index] = {
          ...produtos[index],
          ...req.body
        };
        res.json(produtos[index])
    } else {
        res.status(404).send ('Not Found')
    }
})



const port = 3000
app.listen (port, ()=>{
    console.log (`Server rodando no http://localhost:${port}`)
})