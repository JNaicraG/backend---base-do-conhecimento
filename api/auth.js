const {authSecret} = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs') //comparar senhas com o db


module.exports = app => {
    const signIn = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!');
        }
        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        if (!user) return res.status(400).send('Usuário não encontrado');

        const isMatch = bcrypt.compareSync(req.body.password, user.password);
        if (!isMatch) return res.status(401).send('E-mail/senha inválidos!') //401 quer dizer acesso inválido

        //gerar token - válido para 3 dias por enquanto. Date.now() gera a data atual em milisegundos - /1000 e teremos em segundos
        //Date.now/1000 - math.floor para arredondar; + (60 * 60 * 24 * dias) (s * m * hdia * dias) -> add segundos de x dias em cima
        const now = Math.floor(Date.now()/1000)

        const payload = {
            //conteudo do token jwt
            //pode-se colocar id, email etc
            id:user.id,
            name:user.name,
            email:user.email,
            admin:user.admin,
            iat:now, //issued at - data de criação/emissão do token
            epx: now  + (60 * 60 * 24 * 3) //não precisa se relogar até o fim desse tempo
        }
        res.json({
            ...payload, //toda requisição do usuário agora necessita do cabeçalho adicional authorization com o token aqui fornecido
            token: jwt.encode(payload, authSecret)
        })
    }


    const validateToken = async (res,req) =>{
        const userData = req.body || null;
        try{
            if(userData){
                const token = jwt.decode(userData.token, authSecret)
                                    //transformar expiração do token de mili para nano para comparação
                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true);
                    //poderia renovar o token aqui se a data estivesse perto ou outra coisa
                }
            }
        } catch (e) {
            //problema com token - tipo expiração ou se gerado com authSecret diferente
            //Sim, a expiração ele já cairia aqui
            console.log("OLHA O ERRO")
            res.send(false);
        }
    }

    return {signIn, validateToken};
}