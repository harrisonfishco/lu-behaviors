const createEditNode = (data, callback, network) => {
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
    defaultType.innerText = data.label
    type.appendChild(defaultType)
    
    console.log(network)
        
    for(var i = 0; i < BEHAVIORS.length; ++i) {
        if(BEHAVIORS[i] != null) {
            const op = document.createElement('option')
            op.setAttribute('value', i)
            op.innerText = `${i}: ${BEHAVIORS[i]}`
            type.appendChild(op)
        }
    }
    
    card.appendChild(type)

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

    paramDiv.appendChild(paramTitleDiv)
    paramTitleDiv.appendChild(paramTitle)
    paramDiv.appendChild(paramBody)
    card.appendChild(paramDiv)
    
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
        callback(data)
        background.remove()
    })
    buttonBar.appendChild(submit)
}