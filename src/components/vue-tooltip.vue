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
		.vf-tooltip-popup(v-if='active'): slot

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default
	
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
