const createCard = (callback = null) => {
    const background = document.createElement('div')
    background.classList.add('card-background')
    document.body.appendChild(background)

    background.addEventListener('click', e => {
        if(e.target === background) {
            background.remove()
            if(callback != null)
                callback()
        }
    })
        
    const card = document.createElement('div')
    card.classList.add('card')
    background.appendChild(card)
    return [background, card]
}

const createSection = (name, parent) => {
    const div = document.createElement('div')
    div.classList.add('card-section')

    const titleHolder = document.createElement('div')
    titleHolder.classList.add('card-section-title-holder')

    const title = document.createElement('h2')
    title.classList.add('card-section-title')
    title.innerText = name

    const body = document.createElement('div')
    body.classList.add('card-section-body')

    div.appendChild(titleHolder)
    titleHolder.appendChild(title)
    div.appendChild(body)
    parent.appendChild(div)
    return body
}

const createSectionField = (name, defaultValue, parent) => {
    const holder = document.createElement('div')
    holder.classList.add('card-section-field-holder')

    const label = document.createElement('span')
    label.classList.add('card-section-field-label')
    label.innerText = name

    const input = document.createElement('input')
    input.classList.add('card-section-field-input')
    input.value = defaultValue

    holder.appendChild(label)
    holder.appendChild(input)
    parent.appendChild(holder)
    return input
}