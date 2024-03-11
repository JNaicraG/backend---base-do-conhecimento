 module.exports = middleware =>{ //Recebe um middleware como param de entrada. Também retorna um middleware
    //Não será usada pelo cosign, mas sim importada diretamente
    return (req,res,next) => {
        if(req.user.admin) { //se for admin, passar
            middleware(req,res,next);
        } else {
            res.status(402).send('Usuário não é administrador');
        }
    }

 }