async function getProducts(query=''){
    try {
        const response = await fetch(query);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Erro:', error);
    }
}

async function postProducts(form){
    try {
        const data = new FormData(form);
        const descricao = data.get("descricao");
        const categoria = data.get("categoria");
        const preco = data.get("preco");
        const estoque = data.get("estoque");
        const product = {
            descricao,
            categoria,
            preco,
            estoque
        }
        
        const response = await fetch(`/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        return response;
    } catch (error) {
        console.log('Erro:', error);
    }
}

async function putProducts(id, form){
    try {
        const data = new FormData(form);
        const descricao = data.get("descricao");
        const categoria = data.get("categoria");
        const preco = data.get("preco");
        const estoque = data.get("estoque");
        const product = {
            descricao,
            categoria,
            preco,
            estoque
        }
        
        const response = await fetch(`/produtos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        return response;
    } catch (error) {
        console.log('Erro:', error);
    }
}

function showDataProduct(product) {
    document.getElementById('descricao').value = product.descricao;
    document.getElementById('categoria').value = product.categoria;
    document.getElementById('preco').value = product.preco;
    document.getElementById('estoque').value = product.estoque;
}

async function init() {
    const path = window.location.pathname;
    const getId = path.split('/').pop();
    if (getId == 'editProduct') {
        const titulo = document.getElementById('titulo');
        titulo.innerText = "Cadastrar Produto";
        const form = document.getElementById('formProduct');
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            await postProducts(form);
            alert('Produto Criado!');
            window.location.href = '/';
        });
    } else {
        const product = await getProducts(`/produtos/${getId}`);
        const form = document.getElementById('formProduct');
        showDataProduct(product)
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            await putProducts(getId, form);
            alert('Produto Atualizado!');
            window.location.href = '/';
        });
    }
}

init();