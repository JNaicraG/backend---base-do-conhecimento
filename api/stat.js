module.exports = app => {
    //const { Schema } = app.mongoose;

    const statSchema = new app.mongoose.Schema({ //Como será a "tabela"/documento
        users: Number,
        article: Number,
        categories: Number,
        createdAt: Date
    })
    //"tabela" -> novo Modelo a ser inserido
    const Stat = app.mongoose.model('Stat', statSchema); //Modelo

    //const Stat = app.mongoose.model('Stat', {
    //    //modelo
    //    users: Number,
    //    article: Number,
    //    categories: Number,
    //    createdAt: Date
    //});

    const get = (req, res) => {
        //"Pegar um"
        //Filtrar por //Selecionar atributo tipoX //Ordenação por "-1" (desc)
        //Pegar a última estatística adicionada no mongodb (pegar uma única instância do banco ordenado de maneira desc)
        Stat.findOne({}, {}, { sort: { 'createdAt': -1 } })
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    article: 0,
                    categories: 0
                };

                res.json(stat || defaultStat)
            });
    }

    //const Stat = app.mongoose.model('Stat', {
    //    users: Number,
    //    categories: Number,
    //    articles: Number,
    //    createdAt: Date
    //})

    //const get = (req, res) => {
    //    Stat.findOne({}, {}, { sort: { 'createdAt' : -1 } })
    //        .then(stat => {
    //            const defaultStat = {
    //                users: 0,
    //                categories: 0,
    //                articles: 0
    //            }
    //            res.json(stat || defaultStat)
    //        })
    //}

    return { get, Stat }
}