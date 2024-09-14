let metas_array = ["Mike", "Teste"]   // array
// console.log(metas[0] + ", " + metas[1])

let meta = {
    value: 'Codar em JavaScript',
    checked: false, // um método sempre estará dentro de uma função
}
// função estará sempre fora
// const criarMeta = () => {} arrow function
// function criarMeta () {}
let metas = [
    meta,
    {
        value: 'Codar em Python',
        checked: false
    },
    meta,
    {
        value: 'Codar em Java',
        checked: false
    }
]
console.log(metas)