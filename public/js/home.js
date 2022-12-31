const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged"); 
const session = localStorage.getItem("session")

let data = {
    transactions : []
}
//LOGOUTTT
                                                         //quando clicar, executa o logout!
document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function(){
    window.location.href ="transections.html"
});

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

    getCashIn(); // para dar o reload sozinho qunado add um novo lançamento
    getCashOut();
    getTotal();
    

    alert("Lançamento adicionado com sucesso!")
});



//primeira coisa que temos que ver é se a pessoa que acessou essa tela de home já esta logada,
//caso não esteja, precisamos mandar ela pra tela de login

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

    getCashIn();
    getCashOut();
    getTotal();
};

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session")

    window.location.href = "login.html"
};

function getCashIn(){
    const transactions = data.transactions;

    const cashIn = transactions.filter((item)=> item.type === "1")

    if (cashIn.length){ // se for 1 é True, 0 é false // SÓ EXECUTA ESSE CÓDIGO SE TIVER LANÇAMENTOS, LENGTH > 0;
        cashInHtml = ``; // para utilizar codigo dentro
        let limit = 0;

        if (cashIn.length > 5){
            limit = 5;
        }else{
            limit = cashIn.length;
        }
        //ROFIXED === QUANTAS CASAS DECIMAIS 
        for (let index = 0; index < limit; index++) { // executa 5 vezes ou o limite
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">                         
                    <h3 class="fs-2">R$ ${parseFloat(cashIn[index].value).toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].descricao}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date} 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }                                    // dentro da tag que tem o id = cash-in-list, add cashinhtml
        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}

function getCashOut(){
    const transactions = data.transactions;
    // gera um array com todos os itens que tiverem o type 2 
    const cashOut = transactions.filter((item)=> item.type === "2");

    if (cashOut.length){ // se for 1 é True, 0 é false // SÓ EXECUTA ESSE CÓDIGO SE TIVER LANÇAMENTOS, LENGTH > 0;
        cashOutHtml = ``; // para utilizar codigo dentro
        let limit = 0;

        if (cashOut.length > 5){
            limit = 5;
        }else{
            limit = cashOut.length;
        }
        //ROFIXED === QUANTAS CASAS DECIMAIS 
        for (let index = 0; index < limit; index++) { // executa 5 vezes ou o limite
            cashOutHtml += `
            <div class="row mb-4">
                <div class="col-12">                         
                    <h3 class="fs-2">R$ ${parseFloat(cashOut[index].value).toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashOut[index].descricao}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashOut[index].date} 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }                                    // dentro da tag que tem o id = cash-in-list, add cashinhtml
        document.getElementById("cash-out-list").innerHTML = cashOutHtml;
    }
}

function getTotal(){
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if(item.type === "1"){
            total += parseFloat(item.value);
        }else{
            total -= parseFloat(item.value);
        }
    });
    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`
}

function saveData(data){
    localStorage.setItem(data.login , JSON.stringify(data));
};



