
async function getProducts(query=''){
    try {
        const response = await fetch(query);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Erro:', error);
    }
}

async function delProduct(id) {
    try {
        const response = await fetch(`produtos/${id}`, {
            method: 'DELETE'
        })
        window.location.reload();
        return response;
    } catch (error) {
        console.log('Erro:', error);
    }
}

function createCard(product) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <div class="card-body">
        <h5 class="card-title text-white">${product.descricao}</h5>
        <p class="card-text">${product.categoria}</p>
        <p class="card-text">R$${product.preco}</p>
        <p class="card-text">${product.estoque}</p>
    </div>
    <div class="card-body">
        <button class="btn-del" id="btnDel${product.id}">Excluir</button>
        <button class="btn-put" id="btnPut${product.id}">Alterar</button>
    </div>
    `;
    return card;
}

async function init() {
    const products = await getProducts('/produtos');
    const showProducts = document.getElementById('showProducts')
    await products.forEach(p => {
        showProducts.appendChild(createCard(p))
        const btnDel = document.getElementById(`btnDel${p.id}`)
        btnDel.addEventListener('click', ()=>delProduct(p.id))
    });
}

init()