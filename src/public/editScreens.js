const createEditNode = (data, callback, network) => {
    const background = document.createElement('div')
    background.classList.add('edit-node-background')
    document.body.appendChild(background)

    background.addEventListener('click', e => {
        if(e.target === background) {
            background.remove()
            callback()
        }
    })
        
    const card = document.createElement('div')
    card.classList.add('edit-node-card')
    background.appendChild(card)

    const infoDiv = document.createElement('div')
    infoDiv.classList.add('edit-node-info-div')

    const infoTitleDiv = document.createElement('div')
    infoTitleDiv.classList.add('edit-node-info-title-div')

    const infoTitle = document.createElement('h2')
    infoTitle.classList.add('edit-node-info-title')
    infoTitle.innerText = 'Information'

    const infoBody = document.createElement('div')
    infoBody.classList.add('edit-node-info-body')

    const idHolder = document.createElement('div')
    idHolder.classList.add('edit-node-id')
    const idHolderName = document.createElement('span')
    idHolderName.classList.add('edit-node-id-name')
    idHolderName.innerText = "BehaviorID"
    const idHolderValue = document.createElement('input')
    idHolderValue.classList.add('edit-node-id-value')
    idHolderValue.id = 'id'
    idHolderValue.value = data.id
    idHolder.appendChild(idHolderName)
    idHolder.appendChild(idHolderValue)
    infoBody.appendChild(idHolder)

    infoDiv.appendChild(infoTitleDiv)
    infoTitleDiv.appendChild(infoTitle)
    infoDiv.appendChild(infoBody)
    card.appendChild(infoDiv)

    const typeHolder = document.createElement('div')
    typeHolder.classList.add('edit-node-type')
    const typeHolderName = document.createElement('span')
    typeHolderName.classList.add('edit-node-type-name')
    typeHolderName.innerText = "TemplateID"
    const typeHolderValue = document.createElement('select')
    typeHolderValue.classList.add('edit-node-type-value')
    typeHolderValue.id = 'type'
    
    for(var i = 0; i < BEHAVIORS.length; ++i) {
        if(BEHAVIORS[i] != null) {
            const op = document.createElement('option')
            op.setAttribute('value', i)
            op.innerText = `${i}: ${BEHAVIORS[i]}`
            typeHolderValue.appendChild(op)
        }
    }
    console.log(network.behaviors[data.id])
    if(network.behaviors[data.id] != undefined) {
        typeHolderValue.value = network.behaviors[data.id].templateID
    }

    typeHolder.appendChild(typeHolderName)
    typeHolder.appendChild(typeHolderValue)
    infoBody.appendChild(typeHolder)

    const paramDiv = document.createElement('div')
    paramDiv.classList.add('edit-node-param-div')
    
    const paramTitleDiv = document.createElement('div')
    paramTitleDiv.classList.add('edit-node-param-title-div')

    const paramTitle = document.createElement('h2')
    paramTitle.classList.add('edit-node-param-title')
    paramTitle.innerText = "Parameters"

    const paramBody = document.createElement('div')
    paramBody.classList.add('edit-node-param-body')

    var params = []

    if(network.behaviors[data.id] != undefined) {
        for(var i in network.behaviors[data.id].parameters) {
            params.push([i, network.behaviors[data.id].parameters[i]])
            var paramHolder = document.createElement('div')
            paramHolder.classList.add('edit-node-param')
            var paramName = document.createElement('span')
            paramName.classList.add('edit-node-param-name')
            paramName.innerText = i
            var paramValue = document.createElement('input')
            paramValue.classList.add('edit-node-param-value')
            paramValue.id = i
            paramValue.value = network.behaviors[data.id].parameters[i]

            paramHolder.appendChild(paramName)
            paramHolder.appendChild(paramValue)
            paramBody.appendChild(paramHolder)
        }
    }

    paramDiv.appendChild(paramTitleDiv)
    paramTitleDiv.appendChild(paramTitle)
    paramDiv.appendChild(paramBody)
    card.appendChild(paramDiv)
    
    const buttonBar = document.createElement('div')
    buttonBar.classList.add('edit-node-bar')
    card.appendChild(buttonBar)
    
    const submit = document.createElement('button')
    submit.innerText = "Edit"
    submit.addEventListener('click', e => {
        callback(data)
        background.remove()
    })
    buttonBar.appendChild(submit)

    const cancel = document.createElement('button')
    cancel.innerText = "Cancel"
    cancel.addEventListener('click', e => {
        callback()
        background.remove()
    })
    buttonBar.appendChild(cancel)
}