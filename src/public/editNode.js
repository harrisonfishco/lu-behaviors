const editNode = (data, callback) => {
    const background = document.createElement('div')
    background.classList.add('edit-node-background')
    document.body.appendChild(background)

    const card = document.createElement('div')
    card.classList.add('edit-node-card')
    background.appendChild(card)

    const type = document.createElement('select')
    const defaultType = document.createElement('option')
    defaultType.setAttribute('value', '')
    defaultType.setAttribute('default', '')
    defaultType.innerText = "Select"
    type.appendChild(defaultType)

    card.appendChild(type)

    const buttonBar = document.createElement('div')
    buttonBar.classList.add('edit-node-bar')
    card.appendChild(buttonBar)

    const cancel = document.createElement('button')
    cancel.innerText = "Cancel"
    cancel.addEventListener('click', e => {
        callback()
        background.remove()
    })
    buttonBar.appendChild(cancel)

    const submit = document.createElement('button')
    submit.innerText = "Edit"
    submit.addEventListener('click', e => {
        data.label += " EDITED"
        callback(data)
        background.remove()
    })
    buttonBar.appendChild(submit)
}