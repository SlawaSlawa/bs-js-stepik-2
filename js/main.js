const decreaseButton = document.getElementById('decreaseFont')
const increaseButton = document.getElementById('increaseFont')

function decreaseFontSize() {
    let currentFontSize = parseInt(
        window.getComputedStyle(document.body).fontSize
    )

    if (currentFontSize > 8) {
        document.body.style.fontSize = `${currentFontSize - 1}px`
    }
}

function increaseFontSize() {
    let currentFontSize = parseInt(
        window.getComputedStyle(document.body).fontSize
    )
    if (currentFontSize < 22) {
        document.body.style.fontSize = `${currentFontSize + 1}px`
    }
}

decreaseButton.addEventListener('click', decreaseFontSize)
increaseButton.addEventListener('click', increaseFontSize)

const recipe = []

document.querySelector('.add_btn').addEventListener('click', function () {
    const name = document.querySelector('.item_name')
    const count = document.querySelector('.item_count')
    const type = document.querySelector('.item_type')

    if (!name.value) {
        alert('Введите название ингредиента')
        return false
    }

    recipe.push({
        name: name.value,
        count: +count.value,
        type: type.value,
    })

    let result
    if (+count.value === 0) {
        result = `${name.value} - по вкусу`
    } else {
        result = `${name.value} - ${count.value} ${type.value}`
    }

    const div = document.createElement('div')
    div.innerHTML = `
        <div class="d-flex space-between">
            <div>
                ${result}
            </div>
            <button class="remove_btn" data-name="${name.value}">&times;</button>
        </div>
    `
    document.querySelector('.recipe').append(div)
    name.value = ''
    count.value = ''
})
