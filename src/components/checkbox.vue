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
			v-model='value'
		)
		//- Visual checkbox
		.checkbox-bkg
			span.checkbox-icon
				svg(viewBox="0 0 44.27 33.51" xmlns="http://www.w3.org/2000/svg"): path(d="m12.24 33.51a2.25 2.25 0 0 1 -1.58-.64l-10-9.82a2.25 2.25 0 0 1 3.16-3.21l8.41 8.27 28.22-27.47a2.25 2.25 0 1 1 3.14 3.22l-29.78 29a2.24 2.24 0 0 1 -1.57.65z")

		//- Label
		.label {{ label }}

			tooltip-btn(v-if='tooltip' :tooltipActive='tooltipActive' @click.native='tooltipClick')

	//- Error message
	transition(name='vf-slide'): .vf-error-message(v-if='error && !tooltipActive') {{ error }}
	//- Tooltip message
	transition(name='vf-slide'): .vf-tooltip-message(v-if='tooltipActive') {{ tooltip }}

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import isField from '../concerns/is-field'
import hasValidation from '../concerns/has-validation'
import TooltipBtn from './tooltip-btn.vue'

export default
	mixins: [ isField, hasValidation ]

	props:
		name: String
		label: String

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

	watch:
		value: -> @state = @value
		state: -> @$emit 'input', @state

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>
@import '../assets/field-styles.styl'

.vf-checkbox
	color form-color-base

	.checkbox-wrap
		display flex
		align-items flex-start
		cursor pointer

	.checkbox-bkg
		display block
		flex-shrink 0
		width form-checkbox-size
		height form-checkbox-size
		position relative
		fluid margin-right, form-input-padding-h, form-input-padding-h-min
		outline 1px solid form-outline-base

	.checkbox-icon
		display block
		position absolute
		width 100%
		height 100%
		left 6px
		top 3px
		opacity 0
		transition transform form-base-speed form-easing-function, opacity (form-base-speed/1.25)
		transform-origin 20% 80%
		transform scale(0.3, 0.3)

	svg path
		fill form-color-base

	input[type=checkbox]
		// Must not be display:none in order to be tabbable
		opacity 0
		width 0

	.label
		padding-top 5px // Vertically center the first line of text with the checkbox
		position relative

		.vf-checkbox&
			padding-right (form-tooltip-btn-w + form-input-padding-h)

	// Checked state
	input:checked ~ .checkbox-bkg .checkbox-icon
		opacity 1
		transform scale(1, 1)

	// Focus state
	input.focus-visible ~ .checkbox-bkg
		outline-color form-outline-focus
		background form-bkg-hover

	// Hover state
	.checkbox:hover
		.checkbox-bkg
			background form-bkg-hover
			outline-color form-outline-hover

	// Error state
	&.error
		.checkbox-bkg
			background form-bkg-error
			outline-color form-outline-error

	// Error message
	.error-message
		padding-top 10px

	// Tooltip
	.vf-tooltip-btn
		right 0px

</style>
