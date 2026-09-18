
async function init() {
    document
        .getElementById("loginForm")
        .addEventListener("submit", async (event) => {
            event.preventDefault();
            const login = document.getElementById("login").value;
            const senha = document.getElementById("senha").value;
            const resposta = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    login,
                    senha
                })
            });
            const dados = await resposta.json();
            document.getElementById("mensagem").textContent =
                dados.mensagem;
        });
}

init()