const BEHAVIORS = [
    null,
    "BasicAttack",
    "TacArc",
    "And",
    "ProjectileAttack",
    "Heal",
    "Movement Switch",
    "AoE",
    "PlayEffect",
    "Immunity",
    "DamageBuff",
    "Damage Absorbtion",
    "Over Time",
    "Imagination",
    "Target Caster",
    "Stun",
    "Duration",
    "Knockback",
    "Attack Delay",
    "Car Boost",
    "FallSpeed",
    "Shield",
    "RepairArmor",
    "Speed",
    "DarkInpiration",
    "LootBuff",
    "VentureVision",
    "Spawn Object",
    "LayBrick",
    "Switch",
    "Buff",
    "Jetpack",
    "Skill Event",
    "Consume Item",
    "SkillCastFailed",
    "ImitationSkunkSkill",
    "CandleIdleFlags",
    "ApplyBuff",
    "Chain",
    "ChangeOrientation",
    "ForceMovement",
    "Interrupt",
    "AlterCooldown",
    "ChargeUp",
    "SwitchMultiple",
    "Start",
    "End",
    "AlterChainDelay",
    "Camera",
    "RemoveBuff",
    "Grab",
    "ModularBuild",
    "NPC Combat Skill",
    "Block",
    "Verify",
    "Taunt",
    "AirMovement",
    "SpawnQuickbuild",
    "PullToPoint",
    "PropertyRotate",
    "DamageReduction",
    "PropertyTeleport",
    "ClearTarget",
    "TakePicture",
    "Mount",
    "SkillSet"
]

const getBehaviorId = name => {
    for(var i = 0; i < BEHAVIORS.length; ++i) {
        if(BEHAVIORS[i] == name)
            return i
    }
}

const isOptional = parameter => {
    const optionals = [
        "action",
        "on_fail_armor",
        "on_success",
        "miss action",
        "behavior 3",
        "behavior 4",
        "double_jump_action",
        "falling_action",
        "ground_action",
        "jetpack_action",
        "jump_action",
        "action_failed",
        "break_action",
        "hit_action",
        "timeout_action"
    ]

    for(var i = 0; i < optionals.length; ++i)
        if(parameter == optionals[i])
            return true
    return false
}

const BEHAVIOR_PARAMETERS = [
    {}, // NULL
    {    // Basic Attack
        "dir_angle_xz": 0,
        "dir_angle_y": 0,
        "dir_force": 0,
        "max damage": 0,
        "min damage": 0,
        "on_fail_armor": 0,
        "on_success": 0,
        "use_caster_velocity": 0,
        "velocity_multiplier": 0
    },  
    {   //TacArc
        "action": 0,
        "angle": 0,
        "check_env": 0,
        "clear_provided_target": 0,
        "height": 0,
        "lower_bound": 0,
        "max range": 0,
        "max targets": 0,
        "method": 0,
        "min range": 0,
        "miss action": 0,
        "target_enemy": 0,
        "target_friend": 0,
        "target_self": 0,
        "upper_bound": 0,
        "use_attack_priority": 0,
        "use_picked_target": 0
    },
    {   //And
        "behavior 1": 0,
        "behavior 2": 0,
        "behavior 3": 0,
        "behavior 4": 0
    },
    {   //Projectile Attack
        "LOT_ID": 0,
        "projectile_speed": 0,
        "projectile_type": 0
    },
    {   //Heal
        "health": 0
    },
    {   //Movement Switch
        "double_jump_action": 0,
        "falling_action": 0,
        "ground_action": 0,
        "jetpack_action": 0,
        "jump_action": 0
    },
    {   //AOE
        "action": 0,
        "max targets": 0,
        "radius": 0,
        "target_enemy": 0,
        "target_friend": 0,
        "target_self": 0,
        "target_team": 0,
        "use_target_as_caster": 0,
        "use_target_position": 0
    },
    {   //Play Effect
        //NONE
    },
    {   //Immunity
        "immune_basic_attack": 0,
        "immune_damage_over_time": 0,
        "immune_interrupt": 0,
        "immune_knockback": 0,
        "immune_quickbuild_interrupts": 0,
        "immune_speed": 0,
        "immune_stun_attack": 0,
        "immune_stun_equip": 0,
        "immune_stun_interact": 0,
        "immune_stun_move": 0,
        "immune_stun_rotate": 0
    },
    {   //Damage Buff NOTHING USES
        //NONE
    },
    {   //Damage Absorbtion
        "absorb_amount": 0
    },
    {   //Over Time
        "action": 0,
        "delay": 0,
        "num_intervals": 0
    },
    {   //Imagination
        "imagination": 0
    },
    {   //Target Caster
        "action": 0
    },
    {   //Stun
        "cant_attack": 0,
        "cant_equip": 0,
        "cant_interact": 0,
        "cant_move": 0,
        "cant_turn": 0,
        "stun_caster": 0
    },
    {   //Duration
        "action": 0,
        "duration": 0
    },
    {   //Knockback
        "angle": 0,
        "caster": 0,
        "relative": 0,
        "strength": 0
    },
    {   //Attack Delay
        "action": 0,
        "delay": 0,
        "ignore_interrupts": 0,
        "num_intervals": 0
    },
    {   //Car Boost
        "action": 0,
        "action_failed": 0,
        "active": 0,
        "time": 0
    },
    {   //Fallspeed
        "percent_slowed": 0
    },
    {   //Shield
        //NONE
    },
    {   //RepairArmor
        "armor": 0
    },
    {   //Speed
        "affects_caster": 0,
        "attack_speed": 0,
        "run_speed": 0
    },
    {   //DarkInpiration
        "action": 0,
        "faction_list": 0
    },
    {   //LootBuff
        "scale": 0
    },
    {   //VentureVision
        "show_collectibles": 0,
        "show_minibosses": 0,
        "show_pet_digs": 0
    },
    {   //Spawn Object
        "distance": 0,
        "LOT_ID": 0
    },
    {   //LayBrick
        "distance": 0,
        "duration": 0,
        "forceflat": 0,
        "forcelay": 0,
        "maxbricks": 0,
        "offset_forward": 0,
        "offset_up": 0,
        "templateID": 0
    },
    {   //Switch
        "action_false": 0,
        "action_true": 0,
        "distance": 0,
        "imagination": 0,
        "isEnemyFaction": 0
    },
    {   //Buff
        "armor": 0,
        "attack_speed": 0,
        "brain": 0,
        "imag": 0,
        "life": 0,
        "run_speed": 0
    },
    {   //Jetpack
        "airspeed": 0,
        "bypass_checks": 0,
        "enable_hover": 0,
        "max_airspeed": 0,
        "vertical_velocity": 0,
        "warning_effect_id": 0
    },
    {   //Skill Event
        "target_caster": 0
    },
    {   //Consume Item
        "action_consumed": 0,
        "consume_Lot": 0,
        "num_to_consume": 0
    },
    {   //SkillCastFailed
        //NONE
    },
    {   //ImitationSkunkSkill
        "effect_id": 0
    },
    {   //CandleIdleFlags
        "flags_off": 0,
        "flags_on": 0
    },
    {   //ApplyBuff
        "add_immunity": 0,
        "buff_id": 0,
        "cancel_on_damaged": 0,
        "cancel_on_death": 0,
        "cancel_on_logout": 0,
        "cancel_on_remove_buff": 0,
        "cancel_on_ui": 0,
        "cancel_on_unequip": 0,
        "cancel_on_zone": 0,
        "duration_secs": 0,
        "target_caster": 0
    },
    {   //Chain
        "behavior 1": 0,
        "behavior 2": 0,
        "behavior 3": 0,
        "chain_delay": 0
    },
    {   //ChangeOrientation
        "duration": 0,
        "to_target": 0
    },
    {   //ForceMovement
        "duration": 0,
        "forward": 0,
        "left": 0,
        "move_target": 0,
        "relative": 0,
        "yaw": 0,
        "yaw_abs": 0
    },
    {   //Interrupt
        "interrupt_attack": 0,
        "interrupt_charge": 0,
        "target": 0
    },
    {   //AlterCooldown
        "add": 0,
        "amount": 0
    },
    {   //ChargeUp
        "action": 0,
        "max_duration": 0
    },
    {   //SwitchMultiple
        "behavior 1": 0,
        "behavior 2": 0,
        "charge_time": 0,
        "distance_to_target": 0,
        "value 1": 0,
        "value 2": 0
    },
    {   //Start
        "action": 0
    },
    {   //End
        "start_action": 0
    },
    {   //AlterChainDelay
        "chain_action": 0,
        "new_delay": 0
    },
    {   //Camera
        "lock_camera": 0,
        "lookat_relative": 0,
        "lookat_x": 0,
        "lookat_y": 0,
        "lookat_z": 0,
        "pos_relative": 0,
        "pos_x": 0,
        "pos_y": 0,
        "pos_z": 0
    },
    {   //RemoveBuff
        "buff_id": 0,
        "remove_immunity": 0
    },
    {   //Grab
        "dir_angle_xz": 0,
        "dir_angle_y": 0,
        "dir_force": 0
    },
    {   //ModularBuild
        //NONE
    },
    {   //NPC Combat Skill
        "behavior 1": 0,
        "max range": 0,
        "min range": 0,
        "npc skill time": 0
    },
    {   //Block
        "block_damage": 0,
        "block_knockback": 0,
        "block_stuns": 0,
        "break_action": 0,
        "num_attacks_can_block": 0
    },
    {   //Verify
        "action": 0,
        "check_blocking": 0,
        "check_range": 0,
        "range": 0
    },
    {   //Taunt
        "threat to add": 0
    },
    {   //AirMovement
        "goto_target": 0,
        "gravity_scale": 0,
        "ground_action": 0,
        "hit_action": 0,
        "hit_action_enemy": 0,
        "timeout_action": 0,
        "timeout_ms": 0,
        "x_velocity": 0,
        "y_velocity": 0,
        "z_velocity": 0
    },
    {   //SpawnQuickbuild
        "distance": 0,
        "LOT_ID": 0,
        "offsetX": 0,
        "offsetY": 0,
        "offsetZ": 0
    },
    {   //PullToPoint
        "arc_height": 0,
        "distance_offset": 0
    },
    {   //PropertyRotate
        //NONE
    },
    {   //DamageReduction
        "reduction_amount": 0
    },
    {   //PropertyTeleport
        "cancel_if_interacting": 0,
        "mapID": 0
    },
    {   //ClearTarget
        "action": 0,
        "clear_if_caster": 0
    },
    {   //TakePicture
        "overlay_type": 0,
        "save_to_disk": 0,
        "upload_to_web": 0
    },
    {   //Mount
        "mount": 0
    },
    {   //SkillSet
        "set_id": 0
    }
]