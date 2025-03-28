// Изменение шрифта

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

// Добавление ингредиента

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

// Добавление названия рецепта

document.querySelector('.recipe_name').addEventListener('click', function () {
    let name = prompt('Введите название рецепта')

    if (name) {
        document.querySelector('.recipe_name').textContent = name
    }
})

// Удаление ингредиента

document.querySelector('.recipe').addEventListener('click', function (evt) {
    const target = evt.target

    if (!target.dataset.name) {
        return false
    }

    target.closest('.d-flex').remove()
    for (let i = 0; i < recipe.length; i++) {
        if (recipe[i]['name'] === target.dataset.name) {
            recipe.splice(i, 1)
        }
    }
})

// Копирование рецепта в буфер обмена

const copyBtn = document.getElementById('copy_btn')
const resultnewRecipeEl = document.querySelector('.copy')

copyBtn.addEventListener('click', function () {
    const copyText = resultnewRecipeEl.innerText

    navigator.clipboard
        .writeText(copyText)
        .then(() => {
            alert('Рецепт успешно скопирован!')
        })
        .catch((error) => {
            alert('Что-то пошло не так, попробуйте позже!', error)
        })
})

// Кнопка вычислить

document.querySelector('.result_btn').addEventListener('click', function () {
    document.querySelector('.result_new_recipe').textContent = ''
    let ratio_type = +document.querySelector('.item_ratio_type').value
    let ratio = +document.querySelector('.item_ratio').value

    if (!ratio) {
        alert('Введите число кроме нуля')
        return false
    }

    const new_recipe = []

    if (ratio_type === 1) {
        for (let i = 0; i < recipe.length; i++) {
            new_recipe.push({
                name: recipe[i]['name'],
                count: (+recipe[i]['count'] / ratio).toFixed(2),
                type: recipe[i]['type'],
            })
        }
    } else if (ratio_type === 2) {
        for (let i = 0; i < recipe.length; i++) {
            new_recipe.push({
                name: recipe[i]['name'],
                count: (+recipe[i]['count'] * ratio).toFixed(2),
                type: recipe[i]['type'],
            })
        }
    }

    for (let i = 0; i < new_recipe.length; i++) {
        let result

        if (+new_recipe[i]['count'] === 0) {
            result = 'по вкусу'
        } else {
            result = `${new_recipe[i]['count']} ${new_recipe[i]['type']}`
        }

        const div = document.createElement('div')
        div.innerHTML = `
            <div class="d-flex">
                <div>${new_recipe[i]['name']} - ${result}</div>
            </div>
        `
        document.querySelector('.result_new_recipe').append(div)
    }
})
