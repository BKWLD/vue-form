<!--  -->

<template lang='pug'>
button.vf-tooltip-btn(
	:class='tooltipActive ? "active" : ""'
	:aria-label="accessibleLabel"
)
	.vf-tooltip-bkg
	.vf-tooltip-icon ?

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default
	props:
		tooltipActive: Boolean
		accessibleLabel: String
# 	data: ->
# 	computed:
# 	watch:
# 	methods:
</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>

</style>
