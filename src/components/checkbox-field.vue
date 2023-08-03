<!-- A standard checkbox input -->

<template lang='pug'>

.vf-field.vf-checkbox(
	:class='classes'
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
		.checkbox-bkg(@click='onClick')
			span.checkbox-icon
				svg(viewBox="0 0 44.27 33.51" xmlns="http://www.w3.org/2000/svg"): path(d="m12.24 33.51a2.25 2.25 0 0 1 -1.58-.64l-10-9.82a2.25 2.25 0 0 1 3.16-3.21l8.41 8.27 28.22-27.47a2.25 2.25 0 1 1 3.14 3.22l-29.78 29a2.24 2.24 0 0 1 -1.57.65z")

		//- Label
		.label {{ label }}

			tooltip-btn(v-if='tooltip' :tooltipActive='tooltipActive' @click.native='tooltipClick')

	//- Error message (role=alert so SRs read immediately)
	transition(name='vf-slide'): .vf-error-message(v-if='error && !tooltipActive' role='alert') {{ error }}
	//- Tooltip message
	transition(name='vf-slide'): .vf-tooltip-message(v-if='tooltipActive') {{ tooltip }}

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import isField from '../concerns/is-field'
import hasValidation from '../concerns/has-validation'
import TooltipBtn from '../components-private/tooltip-btn.vue'

export default
	mixins: [ isField, hasValidation ]

	props:
		name: String
		label: String
		default: Boolean
		# If provided, the field will show the prop value, and the value
		# should be managed externally.
		readOnlyValue: Boolean

	components: {
		TooltipBtn
	}

	# Sync external v-model
	data: -> state: @value

	computed:
		classes: -> [
			'inverted' if @inverted
			...@commonClasses
		]

		# If readOnlyValue provided, then always show that value.
		computedValue: -> if @readOnlyValue? then @readOnlyValue else @value

	methods:
		# Manually do v-bind (set @value on the @changed event)
		onChange: (event) -> @value = event.target.checked

		# Pass through @click listener
		onClick: (event) ->
			event.stopPropagation()
			@$listeners?.click?()

	watch:
		value: -> @state = @value
		state: -> @$emit 'input', @state

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>

</style>
