<!--  -->

<template lang='pug'>
.vf-tooltip(:class='classes')
	button.vf-tooltip-btn(
		aria-label='More information'
		:aria-expanded='active'
		@click.prevent='onClick'
	)
		.vf-tooltip-btn-icon ?

	transition(name='vf-slide')
		.vf-tooltip-popup(v-if='active')
			.vf-tooltip-popup-title(v-if='tooltipTitle') {{ tooltipTitle }}
			.vf-tooltip-popup-message(v-if='tooltip') {{ tooltip }}

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default

	props:

		tooltip: String

		tooltipTitle: String
	
	data: -> active: false

	computed:

		classes: -> [
			if @active then 'active'
		]

	methods:
		
		onClick: -> @active = !@active

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>

</style>
