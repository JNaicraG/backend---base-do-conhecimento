module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation;

    const save = (req, res) => {
        const article = { ...req.body };

        if (req.params.id) {
            article.id = req.params.id;
        }

        try {
            existsOrError(article.name, 'Nome não informado');
            existsOrError(article.userId, 'Autor não informado');
            existsOrError(article.description, 'Descrição não informada');
            existsOrError(article.categoryId, 'Categoria não informada');
            existsOrError(article.content, 'Conteúdo não informado');


        } catch (msg) {
            res.status(400).send(msg);
        }

        if (article.id) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.send())
                .catch(err => res.status(500).send(err));
        } else {
            app.db('articles')
                .insert(article)
                .then(_ => res.send())
                .catch(err => res.status(500).send(err));
        }
    }

    const remove = async (req, res) => {
        try {
            //Poderia ter validação para ver se é int
            existsOrError(req.params.id, 'ID não informado'); //Se não tiver id já vai falhar na deleção, mas deixado independente
            //Poderia haver uma validação de se é admin ou não

            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id })
                .del();
            existsOrError(rowsDeleted, 'Artigo não encontrado');
            res.status(204).send();
        } catch (msg) {
            res.status(400).send(msg);
        }
    }


    //Paginação
    const limit = 10; //Limite de itens por página

    const get = async (req, res) => {
        //A página é esperado vir da query
        const page = req.query.page || 1; //Se nada usar default

        const result = await app.db('articles').count('id').first();
        const count = parseInt(result.count);

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(articles => res.json({ data: articles, count, limit })) //O front precisa do contador atual e do limit
            .catch(err => res.status(500).send(err));
    }

    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString(); //Está em binário
                return res.json(article);
            })
            .catch(err => res.status(500).send(err));
    }


    return { get, getById, remove, save }
}