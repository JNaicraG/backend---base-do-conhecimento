const bodyparser = require('body-parser');
const cors = require('cors'); //permite a outra app acessar a api que construíremos aqui

//consign nos ajuda com as dependências dentro da aplicação - de modo que não precisemos ficar fazendo require a todo momento
//Um de seus padrões é exportar uma função utilizando o module.exports com o app (criado em index) como parâmetro
//   - A instância app do express() se torna o "centralizador" de tudo que faremos na aplicação
module.exports = app =>{
    app.use(bodyparser.json()); //Interpreta o json nos corpos da req;
    app.use(cors()); //usa a config
}
