module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation;

    const save = async (req, res) => {
        const category = { ...req.body };
        //const category = {
        //    id: req.body.id,
        //    name: req.body.name,
        //    parentId: req.body.parentId
        //}
        if (req.params.id) {
            category.id = req.params.id;
        }
        try {
            existsOrError(category.name, 'Nome não informado');

            //if (!category.id) {
            //    const categorieFromDb = await app.db('categories')
            //        .where({ 
            //            name: category.name,
            //            parentId: category.parentId
            //        });

            //    notExistsOrError(categorieFromDb, 'Categoria já cadastrada');
            //}
        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        } else {
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
    }

    const get = (req, res) => {
        app.db('categories')
            //.select('id','name','parentId') //já vai pegar tudo
            .then(categories => res.json(withPath(categories))) //categorias com o caminho (pai yadda yadda)
            .catch(err => res.status(500).send(err));
    }

    const getById = (req, res) => {
        try {
            existsOrError(req.params.id, 'Id não identificado')
        } catch (msg) {
            return res.status(400).send(msg);
        }

        app.db('categories')
            //.select('id','name','parentId')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err));
    }



    //Tem que saber se pode ou não remover a categoria, pois a mesma está atrelada a artigos
    //Ela também pode estar relacionada a subcategorias, não podendo removê-la
    //Para exculir uma assim é necessário excluir todas subcategorias e artigos relacionados a ela
    //Também seria possível se utilizar do softDelete - uma columa com data de quando o dado foi deletado e é atualizado
    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Id não informado.'); //Vinculado ao :id - mais interessante validação se inteiro e não negativo

            //se tem subcategoria?
            const subcategory = await app.db('categories')
                .where({ parentId: req.params.id }); //onde o id pai é este id
            notExistsOrError(subcategory, 'Categoria possui subcategorias.');

            //tem artigos?
            const articles = await app.db('articles')
                .where({ categoryId: req.params.id });
            notExistsOrError(articles, 'Categoria tem artigos.');

            //O delete retorna a quantidade de linhas excluídas
            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id })
                .del();
            existsOrError(rowsDeleted, 'Categoria não foi encontrada.');
            res.status(204).send();
        } catch (msg) {
            return res.status(400).send(msg);
        }
    }

    const withPath = categories => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId);
            return parent.length ? parent[0] : null;
        }
        const categoriesWithPath = categories.map(category =>{
            let path = category.name;
            let parent = getParent(categories,category.parentId);
            console.log('Antes do while')
            while(parent){ //enquanto não for nulo
                console.log('dentro do while')
                path=`${parent.name} > ${path}`;
                parent = getParent(categories,parent.parentId);
            }

            return {...category, path};
        });

        categoriesWithPath.sort((a,b) =>{ //categoria a e categoria b
            if(a.path < b.path) return -1;
            if(a.path > b.path) return 1;
            return 0; //são iguais
        });

        return categoriesWithPath;
    }
    

    return { save, get, getById, remove }
}