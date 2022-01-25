class NodeNetwork {
    constructor(vis, id) {
        this.vis = vis
        this.id = id
        this.selectedBehaviorId
        this.selectedBehavior
        this.nodes = []
        this.edges = []
        this.behaviors
        this.network
        this.container = document.getElementById('mynetwork')
        this.maxLevel
        this.pending
        this.processed = new Set()
        this.skill
        this.errors

        fetch(`https://explorer.lu/api/v0/rev/behaviors/${this.id}`, {
            headers: {
                "Authorization": MakeAuth('lu', 'explorer')
            }
        }).then(data => data.json()).then(res => {
            this.behaviors = res._embedded
            this.skill = res.skill
            this.nodes.push({id: this.id, label: String(this.id), level: 0})
            this.process(this.id, 0)
            this.redraw()
        })
    }

    findNode(id) {
        for(var i = 0; i < this.nodes.length; ++i) {
            if(this.nodes[i].id == id)
                return this.nodes[i]
        }
    }

    findEdge(id, child_id) {
        for(var i = 0; i < this.edges.length; ++i) {
            if(this.edges[i].from == id && this.edges[i].to == child_id)
                return this.edges[i]
        }
    }

    findLevelLength(l) {
        var ar = []
        for(var i = 0; i < this.nodes.length; ++i) {
            if(ar.level == l)
                ar.push(this.nodes[i])
        }
        return ar
    }

    process(id, level) {
        this.pending += 1

        level = this.findNode(id).level
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
            for(var i = 0; i < this.edges.length; ++i) {
                if(this.edges[i].from == id) {
                    this.fix_level(this.edges[i].to, this.findNode(this.edges[i].to, level + 1))
                }
            }
        }
    }

    add_edge(id, child_id, level, label) {
        this.maxLevel = Math.max(this.maxLevel, level)
        let edge = this.findEdge(id, child_id)
        if(edge) {
            edge.label += "\n" + label
        } else {
            this.edges.push({from: id, to: child_id, label: label})
        }

        let result = this.findNode(child_id)
        let parent = this.findNode(id)
        if(result) {
            this.fix_level(child_id, result, parent.level + 1)
        } else {
            this.nodes.push({id: child_id, label: String(child_id), level: parent.level + 1})
            this.process(child_id, parent.level + 1)
        }
    }

    add_child(id, behavior, level, key, name) {
        if(key && behavior.parameters[key]) this.add_edge(id, behavior.parameters[key], level, name)
    }

    children(id, behavior, level) {
        let node = this.findNode(id)
        if(!behavior) {
            node.label = "NULL"
            this.errors.push(id)
            return
        }
        node.templateID = behavior.templateID
        if (behavior.templateID == 1) {
            node.label = "BasicAttack";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/knight_blade.png";
            this.add_child(id, behavior, level, 'on_success', 'success');
            this.add_child(id, behavior, level, 'on_fail_armor', 'fail armor');
            this.add_child(id, behavior, level, 'on_fail_blocked', 'fail blocked');
          }
          else if (behavior.templateID == 2) {
            node.label = "TacArc";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/skills_blow_dart.png";
            this.add_child(id, behavior, level, 'action', '');
            this.add_child(id, behavior, level, 'blocked action', 'blocked');
          }
          else if (behavior.templateID == 3) {
            node.label = "And";
            node.shape = 'circle';
            for (let key in behavior.parameters) {
              this.add_child(id, behavior, level, key, '');
            }
          }
          else if (behavior.templateID == 4) {
            node.label = "Projectile Attack";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/skills_flaming_arrow.png";
          }
          else if (behavior.templateID == 5) {
            node.label = "Heal";
          }
          else if (behavior.templateID == 6) {
            node.label = "Movement\nSwitch";
            this.add_child(id, behavior, level, 'jump_action', 'jump');
            this.add_child(id, behavior, level, 'double_jump_action', 'double jump');
            this.add_child(id, behavior, level, 'falling_action', 'falling');
            this.add_child(id, behavior, level, 'ground_action', 'ground');
            this.add_child(id, behavior, level, 'jetpack_action', 'jetpack');
          }
          else if (behavior.templateID == 7) {
            node.label = "AreaOfEffect";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/bubble_generator.png";
            this.add_child(id, behavior, level, 'action', '');
          }
          else if (behavior.templateID == 8) {
            node.label = "Play Effect";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/disco_ball.png";
          }
          else if (behavior.templateID == 12) {
            node.label = "OverTime";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/spark_thrower.png";
            this.add_child(id, behavior, level, 'action', '');
          }
          else if (behavior.templateID == 13) {
            node.label = "Imagination";
          }
          else if (behavior.templateID == 14) {
            node.label = "TargetCaster";
            this.add_child(id, behavior, level, 'action');
          }
          else if (behavior.templateID == 15) {
            node.label = "Stun";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/bonedaddy.png";
          }
          else if (behavior.templateID == 16) {
            node.label = "Duration";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/spark_thrower.png";
            this.add_child(id, behavior, level, 'action', '');
          }
          else if (behavior.templateID == 17) {
            node.label = "Knockback";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/skills_repulsion.png";
          }
          else if (behavior.templateID == 18) {
            node.label = "AttackDelay";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/turtle_rush.png";
            this.add_child(id, behavior, level, 'action', '');
          }
          else if (behavior.templateID == 22) {
            node.label = "Repair Armor";
          }
          else if (behavior.templateID == 23) {
            node.label = "Speed";
          }
          else if (behavior.templateID == 25) {
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/skills_lucky.png";
            node.label = "LootBuff";
          }
          else if (behavior.templateID == 27) // e.g. 4417
          {
            node.label = "Spawn";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/crabby.png";
          }
          else if (behavior.templateID == 29) {
            node.label = "Switch";
            this.add_child(id, behavior, level, 'action_true', 'true');
            this.add_child(id, behavior, level, 'action_false', 'false');
          }
          else if (behavior.templateID == 30) {
            node.label = "Buff";
          }
          else if (behavior.templateID == 32) {
            node.label = "Skill\nEvent";
          }
          else if (behavior.templateID == 34) {
            node.label = "Skill Cast\nFailed";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/skills_marks_the_spot.png";
          }
          else if (behavior.templateID == 37) {
            node.label = "ApplyBuff";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/skills_health_buff.png";
          }
          else if (behavior.templateID == 38) {
            node.label = "Chain";
            let i = 1;
            while ('behavior ' + i in behavior.parameters) {
              this.add_child(id, behavior, level, 'behavior ' + i, String(i));
              i++;
            }
          }
          else if (behavior.templateID == 39) {
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/skills_whirlwind.png";
            node.label = "ChangeOrientation";
          }
          else if (behavior.templateID == 40) {
            node.label = "ForceMovement";
          }
          else if (behavior.templateID == 41) {
            node.label = "Interrupt";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/skills_marks_the_spot.png";
          }
          else if (behavior.templateID == 42) {
            node.label = "AlterCooldown";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/spark_thrower.png";
          }
          else if (behavior.templateID == 43) {
            node.label = "ChargeUp";
            this.add_child(id, behavior, level, 'action');
          }
          else if (behavior.templateID == 44) {
            node.label = "SwitchMultiple";
            let i = 1;
            while (('behavior ' + i) in behavior.parameters) {
              this.add_child(id, behavior, level, 'behavior ' + i);
              i++;
            }
          }
          else if (behavior.templateID == 45) {
            node.label = "Start";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/skills_freebuild.png";
            this.add_child(id, behavior, level, 'action');
          }
          else if (behavior.templateID == 46) {
            node.label = "End";
          }
          else if (behavior.templateID == 47) {
            node.label = "AlterChainDelay";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/spark_thrower.png";
          }
          else if (behavior.templateID == 51) {
            node.label = "ModularBuild";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/hats/thinking_hat.png";
          }
          else if (behavior.templateID == 52) {
            node.label = "NPC\nCombat\nSkill";
            let i = 1;
            while ('behavior ' + i in behavior.parameters) {
              this.add_child(id, behavior, level, 'behavior ' + i, String(i));
              i++;
            }
          }
          else if (behavior.templateID == 53) {
            node.label = "Block";
            this.add_child(id, behavior, level, 'break_action');
          }
          else if (behavior.templateID == 54) {
            node.label = "Verify";
            this.add_child(id, behavior, level, 'action');
        }
        else if (behavior.templateID == 55) {
            node.label = "Taunt";
        }
        else if (behavior.templateID == 56) {
            node.label = "AirMovement";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/body_slam.png";
            this.add_child(id, behavior, level, 'ground_action', 'ground');
            this.add_child(id, behavior, level, 'hit_action', 'hit');
            this.add_child(id, behavior, level, 'hit_action_enemy', 'hit enemy');
            this.add_child(id, behavior, level, 'timeout_action', 'timeout');
        }
          else if (behavior.templateID == 58) {
            node.label = "PullToPoint";
            node.shape = 'image';
            node.image = "/lu-res/textures/ui/inventory/skills/skills_snap_trap.png";
        }
    }

    redraw() {
        if(this.network !== undefined) {
            this.network.destroy()
            this.network = undefined
        }

        let i = 0,
        m = 1,
        d = 1
        while(d > 0) {
            d = this.findLevelLength(i).length
            m = Math.max(d, m)
            ++i
        }

        var data = {
            nodes: this.nodes,
            edges: this.edges
        }

        var options = {
            width: '100%',
            height: m * (900 / i) + 'px',
            nodes: {
                font: {
                size: 30,
                face: 'nunito',
                color: '#fff',
                },
                shape: 'box',
                shapeProperties: {
                borderRadius: 10
                },
                color: {
                background: '#6161FF',
                border: '#6161FF',
                highlight: {
                    background: '#D14600',
                    border: '#D14600',
                },
                },
            },
            edges: {
                smooth: {
                type: 'discrete',
                forceDirection: 'vertical',
                roundness: 0.4
                },
                font: {
                size: 30,
                strokeWidth: 0,
                color: '#ddd',
                face: 'nunito',
                background: '#111'
                },
                arrows: {
                to: true
                },
                color: {
                color: '#6161FF',
                highlight: '#D14600',
                },
                arrowStrikethrough: false
            },
            layout: {
                hierarchical: {
                direction: 'LR',
                nodeSpacing: 100,
                levelSeparation: 320
                },
            },
            physics: {
                hierarchicalRepulsion: {
                nodeDistance: 150
                },
                barnesHut: {
                springLength: 200,
                centralGravity: 0.1
                }
            },
            manipulation: {
                enabled: true,
                initiallyActive: true,
                editNode: this.editNode
            }
        }
        this.network = new this.vis.Network(this.container, data, options)
        //this.network.on('select', )
    }

    editNode(data, callback) {
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
    
        convertSQLite(edgeStart, nodeStart) {
            console.log(this.edges[0])
            console.log(this.nodes[0])
        }
}

const MakeAuth = (u, p) => {
    const tok = u + ":" + p
    var hash = Base64.encode(tok)
    return "Basic " + hash
}