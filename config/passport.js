const { authSecret } = require('../.env');
const passport = require('passport');
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt;
//ExtractJwt já extrai do cabeçalho procurando authorization e content-type. Ambos poderiam ser feitos manualmente

module.exports = app =>{
    const params ={ //Parâmetros para serem utilizados na strategy
        secretOrKey: authSecret, //o segredo/chave utilizado para decodificação
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //extrai o token do bearer
    }
                                            //retorna o payload passado em auth
    const strategy = new Strategy(params,(payload, done)=>{
        app.db('users')
            .where({id:payload.id})
            .first()            //null implica que não há erros/como ter erros
            .then(user => done(null, user ? {...payload} : false)) //primeirp parametro é o de erro, o segundo é payload no caso de sucesso, se o user estiver setado.
            .catch(err=> done(err, false)) //se pego no carro, passar erro e que não foi realizado (falso)
    })

    passport.use(strategy) //usa essa estratégia para aplicar

    return {  //Usado nas rotas p/ filtrar as requisições e não permitir  que as mesmas sejam feitas em cima de webservices que necessitam verificar o usuário logado
        authenticate: () => passport.authenticate('jwt', {session:false})
                                                    //tipo jwt, sem controle de sessão associado a essa autenticação
    }
}