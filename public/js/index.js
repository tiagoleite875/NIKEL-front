
//os botoes cancelar e abrir conta sao da modal, por isso a referencia é essa 

//sera usado para a function checkLogged
let logged = sessionStorage.getItem("logged"); 
const session = localStorage.getItem("session")
// esse logged e session entre aspas são as keys[index] de cada local.
// para buscar e add na variavel

checkLogged();

// SEGUNDO PASSO
//logar no sistema                   //ouvir um evento, nesse caso o submit 
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault(); // para não ir para uma api externa

    const email = document.getElementById("login-email").value;
    const senha = document.getElementById("login-password").value;
    const session = document.getElementById("session-check").checked; // ver se está checado, com um vzinho

    const account = getAccount(email); // INSTANCIANDO, CASO A FUNÇÃO NÃO TENHA ACHADO NADA NESSE EMAIL,
                                       // NÃO VAI SER ADD NADA NESSA CONST 
    // a exclamação significa não tem ( se não encontrou a conta no storage)
    if(!account){ 
        alert("Opps! Verifique o usuário ou a conta!")
    }
    if(account){
        if(account.senha !== senha){
            alert("Opps! Verifique o usuário ou a conta!");
            return;
        }
        saveSession(email, session);

        window.location.href = "home.html";   // entra na página home !!!!!!
    }  
})
// const account = getAccount(email);
// const account = localStorage.getItem(key); vai verificar se existe esse imail no localStorage
// caso exista ele vai ser armazenado na const account

function getAccount(key){  //PROCURAR SE EXITES O LOGIN NO LOCALSTORAGE
    const account = localStorage.getItem(key);// CASO EXISTA, VAI SER ADD NA CONST ACCOUNT
    //se account exitir esse parse vai retornar a account para o seu formato original                            
    if(account){
        return JSON.parse(account) //parse = retorna ao formato original 
    } 
}
// saveSession(email, session); 
// se session for marcado (checked) vai ser salvo na localStore um item com o nome :
// session : -data- esse data vai ser o email que esta entrando como parametro-saveSession(email, session); 
//exemplo: session = tiagopontes875@gmail.com isso sendo salvo no localStore
// vei permanecer conectado proxima vez que você abrir o "site"

// caso saveSession(session) seja false: ele vai ser salvo na sessionStorage que só fica salvo enquanto
// o site esta aberto, depois de fechado ele se apaga e você tem que logar de novo

                    // param nomees aleatório
function saveSession(data, saveSession){ //como o session é do tipo checked, ele tem retorno true ou false
    if(saveSession){        //nome aleatorio da key
        localStorage.setItem("session", data)
    }
    sessionStorage.setItem("logged", data)
}

//se alguem botar pra salvar a seção, esse session vai existir
// e eu vou setar esse dado na sessionStorage "seção atual", estado em que quem está logado fica
//caso não tenha botado para salvar a seção os dados estarão no logged e não no session
function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session; // manter a logged com o valor encontrado no session
    }

    if (logged){ // se o usuário estiver logado 
        saveSession(logged, session);

        window.location.href = "home.html"

    }
}



//PRIMEIRO PASSO
//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("create-email-input").value;
    const senha = document.getElementById("create-password-input").value;

    if(email.length < 5){
        alert("preencha o campo com um email válido!")
        return;
    }
    if(senha.length < 4 ){
        alert("a senha deve ter no mínimo 4 dígitos!")
        return;
    }

    saveAccount({
        login : email,
        senha : senha,
        transactions : []
    });

    myModal.hide() //fechar a modal quando clicar em abrir conta
    
    alert("Conta criada com sucesso!")
});

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data)); //salva o usuário em formato string
}

