const aUBtn = document.getElementById('add-user-btn')
const dMBtn = document.getElementById('double-money-btn')
const sOMBtn = document.getElementById('show-only-millioniares-btn')
const sBRBtn = document.getElementById('sort-by-richest-btn')
const cEWBtn = document.getElementById('calculate-entire-wealth-btn')

const allUsersDiv = document.getElementById('all-users')
const totalWealthDiv = document.querySelector('.total-wealth')
const totalWealth = document.getElementById('wealth')

// Create users Array
let users = []

function displayUsers(){
    allUsersDiv.innerHTML = ''
    users.forEach(user => {
        const userDiv = document.createElement('div')
        userDiv.className = 'user'

        const nameSpan = document.createElement('span')
        nameSpan.innerText = user.name

        const incomeSpan = document.createElement('span')
        incomeSpan.innerText = `$${user.income}`

        userDiv.appendChild(nameSpan)
        userDiv.appendChild(incomeSpan)

        allUsersDiv.appendChild(userDiv)
    })
}

aUBtn.addEventListener('click', function(){
    fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(resData => {
        // console.log(resData.results)
        let title = resData.results[0].name.title
        let fname = resData.results[0].name.first
        let lname = resData.results[0].name.last

        let name = `${title} ${fname} ${lname}`

        let income = Math.floor(Math.random() * 1000000)
        // let fIncome = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(income)

        const user = {
            name,
            income
        }

        users.push(user)

        displayUsers()
    })
    .catch(err => console.log(err))
})

dMBtn.addEventListener('click', function(){
    users = users.map(user =>  {
        return {
            name: user.name,
            income: user.income * 2
        }
    })
    displayUsers()
    console.log("double money")
})

sOMBtn.addEventListener('click', function(){
    users = users.filter(user => user.income > 500000)
    displayUsers()
})

sBRBtn.addEventListener('click', function(){
    users.sort((a,b) => b.income - a.income)
    displayUsers()
})

cEWBtn.addEventListener('click', function(){
    if(users.length > 0){
        let total = 0
        totalWealthDiv.style.display = 'block'

        total = users.reduce((acc, user) => (acc + user.income), 0)
        totalWealth.innerHTML = `$${total}`
    } else {
        alert('Kindly add some users ...')
    }
})