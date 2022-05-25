<!-- A standard textfield input -->

<template lang='pug'>
.vf-field.vf-input(@focusin='focusIn' @focusout='focusOut' @click='onClick' :class='classes')

	label.vf-label-above(:for='name' v-if='label')

		| {{ label }}

		//- Label slot.  Render custom elements inside label.
		slot(name='label')

	.input-wrap
		input(
			:name='name'
			:id='name'
			:placeholder='placeholderComputed'
			:aria-label='label'
			v-bind='attrs'
			v-model='dataValue'
		)
		
		.prefix(
			v-if='prefix'
			aria-hidden='true'
		) {{ prefix }}

		.suffix(
			v-if='suffix'
			aria-hidden='true'
		)
			div.suffix-value {{ dataValue }}
			div.suffix-suffix(v-html='suffixComputed')

		//- Default slot.  Render custom elements inside .input-wrap
		slot(:value='dataValue' :setValue='setValue')

	//- Error message (role=alert so SRs read immediately)
	transition(name='vf-slide'): .vf-error-message(v-if='showError && error' role='alert') {{ error }}
</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import isField from '../concerns/is-field'
import hasValidation from '../concerns/has-validation'

export default
	name: 'InputField'

	mixins: [ isField, hasValidation ]

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

		# For adding a suffix, such as '%'
		suffix:
			type: String
			default: null

		# Number field props
		max: Number
		min: 
			type: Number
			default: 0
		step: 
			type: [Number, String]
			# Step must be 'any' for non-integer values to pass browser-native validation
			default: 'any'

	computed:

		classes: -> [
			...@commonClasses
			if @prefix then 'has-prefix' else 'no-prefix'
		]

		suffixComputed: ->
			# Hide suffix if the value is blank and there's no placeholder
			return if @dataValue == ''
			# Convert spaces to nbsp, otherwise it would collapse leading spaces
			@suffix.replaceAll(' ', '&nbsp;')

		# Add suffix to placeholder
		placeholderComputed: -> "#{ @placeholder || '' }#{ @suffix || '' }"

		attrs: ->
			attrs = {
				type: @type
				required: @required
				readonly: @readonly
				disabled: @disabled
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
