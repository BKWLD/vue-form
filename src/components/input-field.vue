<!-- A standard textfield input -->

<template lang='pug'>
.vf-field.vf-inputfield(@focusin='focusIn' @focusout='focusOut' @click='onClick' :class='classes')

	label.vf-label-above(:for='name' v-if='label')
		| {{ label }}
		tooltip-btn(v-if='tooltip || tooltipTitle' :tooltip='tooltip' :tooltipTitle='tooltipTitle')

	.input-wrap
		input(
			:name='name'
			:id='name'
			:placeholder='placeholder'
			:aria-label='label'
			v-bind='attrs'
			v-model='value'
		)
		.prefix(
			v-if='prefix'
			aria-hidden='true'

		) {{ prefix }}

		//- Default slot.  Lets you render extra buttons etc inside .input-wrap
		slot

	//- Error message (role=alert so SRs read immediately)
	transition(name='vf-slide'): .vf-error-message(v-if='showError && error' role='alert') {{ error }}
</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import isField from '../concerns/is-field'
import hasValidation from '../concerns/has-validation'
import TooltipBtn from '../components-private/tooltip-btn.vue'

export default
	name: 'InputField'

	mixins: [ isField, hasValidation ]

	components: {
		TooltipBtn
	}

	props:

		# Type of textfield
		type:
			type: String
			default: 'input'
			validator: (val) -> val in ['input', 'number']

		placeholder:
			type: String
			default: null

		autocomplete:
			type: String
			default: 'off'

		autocorrect:
			type: String
			default: 'on'

		autocapitalize:
			type: String
			default: 'on'

		minlength:
			type: String
			default: '1'

		maxlength:
			type: String
			default: '100'

		# For adding a prefix, such as '$'
		prefix:
			type: String
			default: null

		# Number field props
		max: Number
		min: 
			type: Number
			default: 0
		step: Number

	computed:
		classes: -> [
			...@commonClasses
			if @prefix then 'has-prefix' else 'no-prefix'
		]

		placeholderComputed: -> "#{ @prefix || "" }#{ @placeholder || "" }"

		attrs: ->
			attrs = {
				type: @type
				required: @required
				disabled: @readonly
				autocomplete: @autocomplete
				autocorrect: @autocorrect
				autocapitalize: @autocapitalize
				minlength: @minlength
				maxlength: @maxlength
			}

			if @type == 'number'
				# Add number attributes
				attrs = {
					...attrs
					max: @max
					min: @min
					step: @step
				}

			return attrs

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>
</style>
