<!-- A standard checkbox input -->

<template lang='pug'>

.vf-field.vf-checkbox(
	:class='classes'
	@focusin='focusIn'
	@focusout='focusOut'
)
	//- Label element wraps the label, input, and checkbox so that clicking anything in here activates the checkbox.
	label.checkbox-wrap(:for='name')
		
		//- Input (hidden)
		input(
			type='checkbox'
			:name='name'
			:id='name'
			:checked='computedValue'
			@change='onChange'
			@click='onClick'
		)
		
		//- Visual checkbox
		.checkbox-bkg
			.checkbox-icon
				//- Slot so consumers can customize the checkbox icon
				slot(name='icon')
					svg(height="13" viewBox="0 0 15 13" width="15" xmlns="http://www.w3.org/2000/svg"): path(d="m14.0490929.39756505c.6352385.57197132.686547 1.55066142.1145591 2.18591833l-2.348821 2.61074598c-.055197.09843357-.1220866.1923209-.2007714.27970918l-2.26971236 2.52306152c-.04289025.06539265-.09129155.12835983-.14523693.18827224l-2.62789908 2.9185776c-.04138678.0459647-.08490312.088872-.1302648.128707-.07136821.13653-.16447935.2651094-.27946506.3800951-.60443327.6044333-1.5844849.6044333-2.18891817 0l-2.77704418-2.77704419-.09651902-.10660781-.64566848-.64568498c-.60445078-.60445079-.60443327-1.5844849 0-2.18891817s1.58446738-.60445078 2.18891817 0l2.34275031 2.34260315 1.55716536-1.73018471c.04246315-.0644574.09029183-.12654503.1435177-.18565835l2.34882606-2.61075163c.05519586-.09843229.12208385-.19231778.20076633-.27970353l2.62789905-2.91857761c.5719879-.63525691 1.5506799-.68653044 2.1859184-.11455912z" fill-rule="evenodd" transform="translate(.098785 .173234)")
		
		//- Label
		.label
			| {{ label }}
			slot(name='label')

	//- Error message (role=alert so SRs read immediately)
	transition(name='vf-slide'): .vf-error-message(v-if='error' role='alert') {{ error }}

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import isField from '../concerns/is-field'
import hasValidation from '../concerns/has-validation'

export default
	mixins: [ isField, hasValidation ]

	props:
		name: String
		label: String
		default: Boolean
		# If provided, the field will show the prop value, and the value
		# should be managed externally.
		readOnlyValue: Boolean

	# Sync external v-model
	data: -> state: @value

	computed:
		classes: -> [
			'inverted' if @inverted
			if @value then 'checked' else 'unchecked'
			...@commonClasses
		]

		# If readOnlyValue provided, then always show that value.
		computedValue: -> if @readOnlyValue? then @readOnlyValue else @value

	methods:
		# Manually do v-bind (set @value on the @changed event)
		onChange: (event) -> @value = event.target.checked

	watch:
		value: -> @state = @value
		state: -> @$emit 'input', @state

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>

</style>
