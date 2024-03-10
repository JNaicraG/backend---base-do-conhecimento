//criptografar a senha do usuário sempre que for salvar
const bcrypt = require('bcrypt-nodejs');


module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10); //Gera hash com essa origem. Seed. Número de passos/repetições pra gerar o sal
        return bcrypt.hashSync(password, salt); //gera de maneira sincrona, sem callback

    }

    const save = async (req, res) => {
        const user = { ...req.body }; //Devolve um .json como interceptado pelo bodparser. Clona
        //O método save vai servir tanto para inserir um novo usuário quanto para alterar um usuário,  portanto ele pode vir com id
        if (req.params.id) {
            user.id = req.params.id; //Conforme os params da requisição (url)
        }

        try {
            //Poderia ser feita uma chamada só passando um array com os valores e mensagens
            existsOrError(user.name, 'Nome não informado');
            existsOrError(user.email, 'E-mail não informado');
            existsOrError(user.password, 'Senha não informado');
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida');
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem');
            const userFromDb = await app.db('users')
                .where({ email: user.email }).first();
            if (!user.id) //Se é inserção de usuário, não atualização
            {
                notExistsOrError(userFromDb, 'Usuário já cadastrado'); //Não pode existir
            }
        } catch (msg) {
            return res.status(400).send(msg); //erro 400 - significa que foi erro do lado do client
            //erro 500 seria erro do servidor
        }

        user.password = encryptPassword(user.password); // ou req.body.password
        delete user.confirmPassword; //não vamos inserir a confirmação da senha no db

        if (user.id) { //se tiver id, logo, for update
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err)); //204 = tudo certo
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }

    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users)) //Aqui seria onde poderíamos converter esse array em um array com os atributos modificados. Mudando o nome, por exemplo, de user_id para userId para uso no sistema, diferentemente do sql
            .catch(err => res.status(500).send(err));
    }

    const getById = (req, res) => {
        try {
            existsOrError(req.params.id, 'Id não identificado')
        } catch (msg) {
            return res.status(400).send(msg);
        }

        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err));
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'ID não informado');
            const articles = await app.db('articles')
                .where({ userId: req.params.id });
            notExistsOrError(articles, 'Usuário possui artigos publicados')

            const rowsDeleted = await app.db('users')
                .where({ id: req.params.id })
                .del();
            existsOrError(rowsDeleted,'Usuário não foi encontrado');
            
        } catch (msg) {
            res.status(400).send(msg);
        }
    }

    return { save, get, getById };
}