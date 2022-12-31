const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged"); 
const session = localStorage.getItem("session")

let data = {
    transactions : []
}

document.getElementById("button-logout").addEventListener("click", logout);

//adicionar lançamento   // ouvir o submit
document.getElementById("transaction-form").addEventListener("submit", function(e){
    e.preventDefault()

    const valor = parseFloat(document.getElementById("valor-input").value);
    const descricao = document.getElementById("desc-input").value;
    const date = document.getElementById("data-input").value;   
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value : valor,
        descricao : descricao,
        date : date,
        type : type
    });

    saveData(data);
    e.target.reset(); //limpar a modal
    myModal.hide(); //fechar a modal    
    getTransactions();
    alert("Lançamento adicionado com sucesso!")
});

checkLogged();

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session; // manter a logged com o valor encontrado no session
    }

    if (!logged){ // se o usuário NÃO estiver logado 
        window.location.href = "login.html";
        return;

    }
    const dataUser = localStorage.getItem(logged); //se tem alguem logado
    if(dataUser){
        data =JSON.parse(dataUser); // VAI PEGAR OS DADOS DO USUÁRIO QUE ESTIVER LOGADO
    }

    getTransactions();

};

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session")

    window.location.href = "login.html"
};

function getTransactions(){
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length){
        transactions.forEach((item) => {
            let type = "Entrada";
            
            if (item.type === "2"){
                type = "Saída";
            }
            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value}</td>
                    <td>${type}</td>
                    <td>${item.descricao}</td>
                </tr>
            `
        })
        
    }
    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

function saveData(data){ // quando eu adicionar ele salva e aparece na tela
    localStorage.setItem(data.login , JSON.stringify(data));
};