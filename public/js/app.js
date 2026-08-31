
async function getProducts(query=''){
    try {
        const response = await fetch(query);
        const data = await response.json();
        console.log (data);
        return data;
    } catch (error) {
        console.log('Erro:', error);
    }
}

getProducts ('/produtos')

/*
(async () => {
    const res = await fetch('http://localhost:3000/produtos')
    console.log(res);
 })()
*/


