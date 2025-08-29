document.addEventListener('DOMContentLoaded', () => {

    // seleciona o formulário
    const form = document.querySelector('.form');

    
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // coleta os dados dos campos
        const nameInputs = document.querySelectorAll('input[name="nome"]');
        const messageTextarea = document.getElementById('historia');
        

        const names = [];
        for (let i = 0; i < nameInputs.length; i++) {
            const nome = nameInputs[i].value.trim();
            if (nome !== "") {
                names.push(nome);
            }
        }
        
        const message = messageTextarea.value.trim();
        
        // valida os dados usando alert
        if (names.length === 0 || !message) {
            alert('Erro: Por favor, preencha pelo menos um nome e a história do grupo');
            return;
        }

        // monta um payload
        const payload = { names, message };
        const apiUrl = 'https://fsdt-contact.onrender.com/contact';

        // envia os dados para a API
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => {
            // verifica se a resposta da API funcionou
            if (response.ok) {
                alert('Formulário enviado com sucesso!');
                form.reset();
            } else {
                // se não funcionou, lança um erro para ser pego pelo .catch.
                throw new Error('Ocorreu um erro ao enviar o formulário.');
            }
        })
        .catch(error => {
            // pega qualquer erro e mostra um alert.
            alert(error.message);
        });
    });
});