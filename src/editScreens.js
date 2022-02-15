const createEditNode = (data, callback, network) => {
    if(network.behaviors[data.id] == undefined) {
        callback()
        createAddNode(data, callback, network, data.id)
        return
    }

    var background = createCard(callback)
    const card = background[1]
    background = background[0]

    const infoBody = createSection("Information", card)

    const idHolderValue = createSectionField("BehaviorID", data.id, infoBody)

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
    if(network.behaviors[data.id] != undefined) {
        typeHolderValue.value = network.behaviors[data.id].templateID
    }

    typeHolder.appendChild(typeHolderName)
    typeHolder.appendChild(typeHolderValue)
    infoBody.appendChild(typeHolder)

    const paramBody = createSection("Parameters", card)

    var params = []

    if(network.behaviors[data.id] != undefined) {
        for(var i in network.behaviors[data.id].parameters) {
            params.push([i, network.behaviors[data.id].parameters[i]])
            createSectionField(i, network.behaviors[data.id].parameters[i], paramBody)
        }
    }
    const effectBody = createSection("Effect", card)

    const effectIDInput = createSectionField("EffectID", network.behaviors[data.id].effectID, effectBody)
    
    const buttonBar = document.createElement('div')
    buttonBar.classList.add('edit-node-bar')
    card.appendChild(buttonBar)

    var cvalue = network.behaviors[data.id].templateID

    typeHolderValue.addEventListener('change', e => {
        const newValue = e.target.value
        if(cvalue != newValue) {
            cvalue = newValue

            while(paramBody.firstChild)
                paramBody.removeChild(paramBody.firstChild)

            for(var i in BEHAVIOR_PARAMETERS[newValue]) {
                params.push([i, BEHAVIOR_PARAMETERS[newValue][i]])
                createSectionField(i, BEHAVIOR_PARAMETERS[newValue][i], paramBody)
            }
        }
    })
    
    const submit = document.createElement('button')
    submit.innerText = "Edit"
    submit.addEventListener('click', e => {
        const bID = parseInt(idHolderValue.value)
        const tID = parseInt(typeHolderValue.value)
        const eID = parseInt(effectIDInput.value)

        var p = {}

        for(var i = 0; i < paramBody.childNodes.length; ++i)
            if(!(isOptional(paramBody.childNodes[i].childNodes[0].innerText) && paramBody.childNodes[i].childNodes[1].value == 0))
                p[paramBody.childNodes[i].childNodes[0].innerText] = paramBody.childNodes[i].childNodes[1].value

        if(cvalue != network.behaviors[data.id].templateID) {
            
            
            if(bID != data.id) {
                network.behaviors[bID] = network.behaviors[data.id]
                network.behaviors[bID].behaviorID = bID
                network.behaviors[data.id] = undefined
            }

            network.behaviors[bID].templateID = tID
            network.behaviors[bID].parameters = p
        } else {
            if(bID != data.id) {
                network.behaviors[bID] = network.behaviors[data.id]
                network.behaviors[bID].behaviorID = bID
                network.behaviors[data.id] = undefined
            } else {
                network.behaviors[bID].parameters = p
            }

        }
        network.behaviors[bID].effectID = eID
        network.nodes = [network.nodes[0]]
        network.edges = []
        network.processed = new Set()
        network.process(network.nodes[0].id, 0)
        network.redraw()
        background.remove()
        callback()
        this.network.network.manipulation.options.addNode = false
        this.network.network.manipulation.manipulationDiv.childNodes[0].remove()
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