const createAddNode = (data, callback, network, id = null) => {
    var background = createCard()
    const card = background[1]
    background = background[0]

    const infoBody = createSection("Information", card)

    const idHolderValue = createSectionField("BehaviorID", (id == null) ? 0 : id, infoBody)

    const typeHolder = document.createElement('div')
    typeHolder.classList.add('edit-node-type')
    const typeHolderName = document.createElement('span')
    typeHolderName.classList.add('edit-node-type-name')
    typeHolderName.innerText = "TemplateID"
    const typeHolderValue = document.createElement('select')
    typeHolderValue.classList.add('edit-node-type-value')
    typeHolderValue.id = 'type'

    const defaultType = document.createElement('option')
    defaultType.value = ""
    defaultType.innerText = "Select TemplateID"
    typeHolderValue.appendChild(defaultType)
    
    for(var i = 0; i < BEHAVIORS.length; ++i) {
        if(BEHAVIORS[i] != null) {
            const op = document.createElement('option')
            op.setAttribute('value', i)
            op.innerText = `${i}: ${BEHAVIORS[i]}`
            typeHolderValue.appendChild(op)
        }
    }

    

    typeHolder.appendChild(typeHolderName)
    typeHolder.appendChild(typeHolderValue)
    infoBody.appendChild(typeHolder)

    const paramBody = createSection("Parameters", card)

    var params = []

    const effectBody = createSection("Effect", card)

    const effectIDInput = createSectionField("EffectID", 0, effectBody)
    
    const buttonBar = document.createElement('div')
    buttonBar.classList.add('edit-node-bar')
    card.appendChild(buttonBar)
    
    const submit = document.createElement('button')
    submit.innerText = "Create"
    submit.addEventListener('click', e => {
        const bID = parseInt(idHolderValue.value)
        const tID = parseInt(typeHolderValue.value)

        var p = {}

        for(var i = 0; i < paramBody.childNodes.length; ++i) {
            if(!(isOptional(paramBody.childNodes[i].childNodes[0].innerText) && parseInt(paramBody.childNodes[i].childNodes[1].value) == 0)) { 
                p[paramBody.childNodes[i].childNodes[0].innerText] = paramBody.childNodes[i].childNodes[1].value
            }
        }

        const behaviorData = {
            behaviorID: bID,
            effectHandle: null,
            effectID: parseInt(effectIDInput.value),
            parameters: p,
            templateID: tID
        }

        this.network.behaviors[bID] = behaviorData

        if(this.network.nodes.length == 0)
            this.network.nodes.push({id: bID, label: String(bID), level: 0})
        else
            this.network.nodes = [this.network.nodes[0]]
        this.network.edges = []
        this.network.processed = new Set()
        this.network.process(this.network.nodes[0].id)
        this.network.redraw()
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

    var cvalue = typeHolderValue.value

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
}