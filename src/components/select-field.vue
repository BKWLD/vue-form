<!--  -->

<template lang='pug'>
.vf-field.vf-select(@focusin='focusIn' @focusout='focusOut' @click='onClick' :class='classes')
	label.vf-label-above(:for='name')
		| {{ label }}
		slot(name='label')

	.select
		select(
			:id='name'
			:name='name'
			:aria-label='label'
			:required='required'
			:disabled='readonly'
			v-model='value'
			v-if='options.length'
		)
			option(
				value=''
				v-if='placeholder'
			) {{ placeholder }}
			option(
				v-for='option in optionsComputed'
				:value='option.value'
			) {{ option.label }}

		//- Arrow icon
		.icon
			slot(name='arrow'): svg(height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"): path(d="m16 5.5-2-2-6 6-6-6-2 2 8 8z")

		slot

	//- Error message (role=alert so SRs read immediately)
	transition(name='vf-slide'): .vf-error-message(v-if='showError && error' role='alert') {{ error }}

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import isField from '../concerns/is-field'
import hasValidation from '../concerns/has-validation'

export default

	mixins: [ isField, hasValidation ]

	props:
		options:
			type: Array
			default: -> []

		name:
			type: String
			default: ''

		labelAbove:
			type: Boolean
			default: true

		placeholder:
			type: [String, Boolean]
			default: '--Choose an option--'

		disabled:
			type: Boolean
			default: false

	computed:
		
		# Allow each option to be a label and value string formatted like "First Name | firstName"
		optionsComputed: -> @options?.map (option) =>
			arr = option?.split?(/(?:\s)+(?:\|)+(?:\s)+/)
			return
				label: arr?[0]
				value: arr?[1] || arr?[0]

		classes: -> [
			...@commonClasses
			if !!@value then 'has-value' else 'no-value'
		]

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>

</style>
