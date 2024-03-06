module.exports = app =>{
    //Onde teremos todas as validações. Também conhecido como Validators

//Exemplo de uso: se preencheu os dados de e-mail, senha e etc de campos não nulos
//Ou se existe no db
function existsOrError(value, msg){ //se valor não existir - erro
    if(!value) throw msg; //embora a msg seja string o js pode "lançar" qualquer formato
    if(Array.isArray(value) && value.length === 0) throw msg;
    if(typeof value === 'string' && !value.trim()) throw msg;
}

function notExistsOrError(value,msg){ //Exatamente o contrário do comportamento da primeira função
    try {
        existsOrError(value, msg); 
    } catch{ //Se não existir (der erro)
        return  //Está ok
    }
    throw msg; //Se existir (nã der erro) - lançar erro
}

function equalsOrError(valueA, valueB, msg){ //Exemplo de uso: senha e comparação de senha
    if(valueA !== valueB) throw msg;

}

//Poderíamos ter mais funções
//not equals , validID, valid email, valid password (tamanho mínimo, ter caracter especial, etc)

    return {existsOrError, notExistsOrError, equalsOrError};
}