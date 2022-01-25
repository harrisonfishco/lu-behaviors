class NodeNetwork {
    constructor(vis) {
        this.vis = vis
        this.id
        this.selectedBehaviorId
        this.selectedBehavior
        this.nodes
        this.edges
        this.behaviors
        this.network
        this.container
        this.maxLevel
        this.pending
        this.processed = new Set()
        this.skill
        this.errors
    }

    findNode(id) {
        for(var i = 0; i < nodes.length; ++i)
            if(nodes[i].id == id)
                return nodes[i]
    }

    findEdge(id, child_id) {
        for(var i = 0; i < edges.length; ++i) {
            if(edges[i].from == id && edges[i].to == child_id)
                return edges[i]
        }
    }

    process(id, level) {
        this.pending += 1

        level = findNode(id).level
        if(!this.processed.has(id)) {
            this.processed.add(id)
            let behavior = this.behaviors[id]
            this.children(id, behavior, level + 1) 
        }

        this.pending -= 1
        if(this.pending = 0)
            this.redraw()
    }

    fix_level(id, node, level) {
        if(node.level < level) {
            node.level = level
            for(var i = 0; i < edges.length; ++i) {
                if(edges[i].from == id) {
                    this.fix_level(edges[i].to, findNode(edges[i].to, level + 1))
                }
            }
        }
    }

    add_edge(id, child_id, level, label) {
        this.maxLevel = Math.max(this.maxLevel, level)
        let edge = this.findEdge(id, child_id)

    }
}