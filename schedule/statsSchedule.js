//Tal qual o cron utilizado em unix
const schedule = require('node-schedule');

module.exports = app => { // */1**** é o padrão do Cron, significa de 1 em 1 minuto
                        //Ver na documentação o padrão de tempo, mas segue: segundo(0-59 //opcional em todos), minuto(0-59), hora(0-23), dia do mês(1-31), mês(1-12), dia da semana(0-7 //0 e 7 são domingo)
    schedule.scheduleJob('3 * * * * *', async function(){
        const usersCount = await app.db('users').count('id').first();
        const categoriesCount = await app.db('categories').count('id').first();
        const articlesCount = await app.db('articles').count('id').first();

        const { Stat } = app.api.stat;
        //ùltima estatística no banco
        const lastStat = await Stat.findOne({},{}, {sort: {'createdAt' : -1 }});

        const stat = new Stat({
            users : usersCount.count,
            articles : articlesCount.count,
            categories : categoriesCount.count,
            createdAt : new Date()
        });
        //Comparar se a estatística mudou
        const changeUsers = !lastStat || stat.users!==lastStat.users; //testar se existe obj antes de tentar acessa-lo na validação
        const changeCategories = !lastStat || stat.categories!==lastStat.categories;
        const changeArticles = !lastStat || stat.articles!==lastStat.articles;

        //Inserir no MongoDB
        if(changeArticles || changeCategories || changeUsers){
            stat.save().then(() => console.log('[Stats] Estatísticas atualizadas'))
        }
    });
}