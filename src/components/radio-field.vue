<!--
Radio Group
Based off https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#styling_radio_inputs
-->

<template lang='pug'>

fieldset.vf-field.vf-radio(
	:class='classes'
	role='radiogroup'
	:aria-labelledby='`${name}-label`'
	:required='required'
	:disabled='readonly'
	@focusin='focusIn'
	@focusout='focusOut'
	@click='onClick'
)

	//- Group Label
	legend.label.group-label.vf-label-above(:for='name' :id='`${name}-label`')
		| {{ label }}

		//- Label slot.  Render custom elements inside label.
		slot(name='label')

	.options

		//- 
		.option-wrap(
			v-for='(option, index) in optionsComputed'
		)
		
			//- This input element is visually hidden.
			//- 'checked' is not dynamic. It sets the default value that's checked on mount.
			input(
				type='radio'
				:id='`${name}Choice${index}`'
				:name='name'
				:value='option.value'
				:checked='option.value == value'
				:key='`input${index}`'
				v-model='value'
			)

			label.option(
				:for='`${name}Choice${index}`'				
				:key='`label${index}`'
			)

				.icon-wrap

					//- Icon bkg (when not selected)
					.icon-bkg
						//- Icon slot.  Replace the default icon with your own.
						slot(name='icon-bkg'): div

					//- Icon (when selected)
					.icon
						//- Icon slot.  Replace the default icon with your own.
						slot(name='icon'): div

				//- Option label
				.option-label {{ option.label }}

				//- Default slot.  Render custom elements inside .option
				slot(:value='value' :setValue='setValue')

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
		
		# Allow each option to be a string with label and value
		# formatted like "First Name | firstName"
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
