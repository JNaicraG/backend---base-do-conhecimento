module.exports = app => {
    //const { Schema } = app.mongoose;

    const statSchema = new app.mongoose.Schema({ //Como será a "tabela"/documento
        users: Number,
        articles: Number,
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

    return { get, Stat }
}