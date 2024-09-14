const { select, input, checkbox } = require('@inquirer/prompts')
function start() {
    let count = 1
    while(count < 10){
        console.log(count)
        count = count + 1
    }
}
let meta = {
    value: "Codar em python",
    checked: false
};
let mensagem = "Bem-vindo"
let metas= [meta];
const cadastrarMetas = async () => {
    const meta = await input({ message: "Digite a meta:" })

    if (meta.length == 0) {
        mensagem = 'A meta não pode ser vazia.'
        return
    }

    metas.push(
        { value: meta, checked: false }
    )
    mensagem = "Meta cadastrada com sucesso!"
};
const listarMetas = async () => {
    if(metas.length == 0){
        mensagem = "Não existem metas"
        return
    }
    const respostas = await checkbox({
        message: "Siga as instruções...",
        choices: [...metas],
        instructions: false,
    });
    if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada"
        return;
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    });
    mensagem = "Meta(s) Concluída(s)"
};
const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked 
    })
    if(realizadas.length == 0){
        mensagem = ("Não existe metas realizadas...")
        return
    }
    await select({
        message:"Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
};
const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    });
    if(abertas.length == 0){
        mensagem = ("Não existe metas abertas...")
        return
    }
    await select({
        message:"Metas abertas",
        choices: [...abertas]
    })
};
const deletarMetas = async () => {
    if(metas.length == 0){
        mensagem = ("Nao existem metas")
        return
    }
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    const deletar = await checkbox({
        message: "Selecione um item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    });
    if(deletar.length == 0){
        mensagem = ("Nenhum item para deletar")
        return
    }
    deletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
    mensagem= ("Meta(s) deletadas com sucesso...")

};
const mostrarMensagem = () => {
    console.clear();
    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
};
const menu = async () => {
    while(true) {
        mostrarMensagem()
        const opcao = await select({
            message: ">",
            choices: [
                {name: "Cadastrar Meta(s)", value: "cadastrar"},
                {name: "Deletar Metas", value: "deletar"},
                {name: "Listar Metas", value: "listar"},
                {name: "Metas Realizadas", value: "realizadas"},
                {name: "Metas Abertas", value: "abertas"},
                {name: "Sair", value: "sair"}

            ],
        });
        switch(opcao) {
            case "cadastrar":
                await cadastrarMetas();
                break;
            case "deletar":
                await deletarMetas();
                break;
            case "listar":
                await listarMetas();
                break;
            case "realizadas":
                await metasRealizadas();
                break;
            case "abertas":
                await metasAbertas();
                break;
            case "sair":
                mensagem("Saindo...");
                return;
        }    
    }
};
menu();