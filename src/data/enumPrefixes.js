//Several enum-valued hitbox fields carry a common prefix that's pure noise once you know
//the field (e.g. "collision_attr_normal" -> "normal") - shared by the table and the
//hitbox detail modal so both display the same cleaned-up value
const enumPrefixes = {
	effect: "collision_attr_",
	type: "attack_region_",
	collisionpart: "collision_part_mask_",
	sfxlevel: "attack_sound_level_",
	sfxtype: "collision_sound_attr_",
	hitbits: "collision_category_mask_",
	facingrestrict: "attack_lr_check_",
}

export default enumPrefixes
