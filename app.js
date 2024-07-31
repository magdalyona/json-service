
/* пример json 
const car = {
    model: 'Tesla',
    year: 2024,
}

const json = JSON.stringify(car) // json это тот же объект джаскрипт но срочка
// чтобы перейти обратно в джава делаем обратную операцию:
const parsed = JSON.parse(json)

console.log(json)
console.log(parsed)
*/


// const list = document.getElementById('list')
const list = document.querySelector('#list') // более универсальный способ
const filter = document.querySelector('#filter') 
let USERS = []


filter.addEventListener('input', (event) => {
    const value  = event.target.value.toLowerCase()
    const filterUsers = USERS.filter((user) => user.name.toLowerCase().includes(value))
    render(filterUsers)
})
 
async function start () {
    list.innerHTML = 'Loading...'
    try {
       const resp = await fetch('https://jsonplaceholder.typicode.com/users')
    //    const resp = await fetch('htt1ps://jsonplaceholder.typicode.com/users') - пример с ошибкой , когда работает функция ниже ERR
       const data = await resp.json()
       setTimeout(() => {
        USERS = data
        render(data)
       }, 2000)
    } catch(err) {
        list.style.color = 'red' // err ошибка
        list.innerHTML = err.message // сообщить пользователю если появилась ошибка
    }
}

function render(users = []) {
    if (users.length === 0) {
        list.innerHTML = 'No matched users!', 
        list.style.color = 'red'
    } else {
        const html = users.map(toHTML).join('')
        list.innerHTML = html
    }
    
}

function toHTML(user) {
    return `
    <li class="list-group-item">${user.name}</li>
    `
}

start()

 