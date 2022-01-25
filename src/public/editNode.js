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
    defaultType.innerText = "Select Behavior"
    type.appendChild(defaultType)

    for(var i = 0; i < BEHAVIORS.length; ++i) {
        if(BEHAVIORS[i] != null) {
            const op = document.createElement('option')
            op.setAttribute('value', i)
            op.innerText = `${i}: ${BEHAVIORS[i]}`
            type.appendChild(op)
        }
    }

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
        data.label = BEHAVIORS[type.value]
        data.templateID = type.value
        callback(data)
        background.remove()
    })
    buttonBar.appendChild(submit)
}