const mongoose = require('mongoose');//Biblioteca odm (objeto-documento-mappin) 
                                                        //evitar geração de notificações de advertência, somente

mongoose.connect('mongodb://localhost:27017/knowledge_stats', {useNewUrlParser:true})
    .catch(e=>{ 
        //node console log colors
        const msg = 'ERRO! Não foi possível se conectar com o MongoDB';
        console.log('\x1b[41m%s\x1b[37m',msg,'\x1b[0m'); //"%s" é separador - \x1b[41m é cor, 37 tbm - x1m[0m é retornando a cor inicial do console]
        //ou utilizar a biblioteca colors
        //const msg = 'ERRO: Não foi possível conectar com o MongoDB!'.red.bold 
    });
