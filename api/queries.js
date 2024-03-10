module.exports = { //Lembrando que é um objeto
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS(
            SELECT id from categories WHERE id = ?
            UNION ALL
            SELECT c.id FROM subcategories, categories c
                WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subcategories
    `

    //A partir do pai ele pega filho, filho do filho e etc e retorna todos os seus ids
    //Recursivamente, utilizando a minha tabela auxiliar dentro da consulta (subcategories) - com um único atributo, que será o id - 
    //      pegar o id da própria categoria pai onde o id for igual o id passado (?) 
    //      fazer união com outra seleção: usando o id de subcategorias e as próprias categorias onde o parentId for igual ao id da tabela auxiliar / subcategorie

    //os nomes de colunas estão entre " aspas duplas " pois foi usado o padrão cammel case e não undercase = parentId e não parent_id
}