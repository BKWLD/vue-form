<!-- A standard textfield input -->

<template lang='pug'>
.vf-field.vf-textfield(@focusout='focusOut')
	label.vf-label-above(:for='name') {{ label }}
	.input-wrap
		input(
			:class='classes'
			:name='name'
			:id='name'
			:placeholder='placeholder'
			:aria-label='label'
			:type='type'
			:required='required'
			:disabled='readonly'
			:autocomplete='autocomplete'
			:autocorrect='autocorrect'
			:autocapitalize='autocapitalize'
			:minlength='minlength'
			:maxlength='maxlength'
			v-model='state')

		form-vf-tooltip-button(v-if='tooltip' :tooltipActive='tooltipActive' @click.native='tooltipClick')

	//- Error message
	transition(name='vf-slide'): .vf-error-message(v-if='error && !tooltipActive') {{ error }}
	//- Tooltip message
	transition(name='vf-slide'): .vf-tooltip-message(v-if='tooltipActive') {{ tooltip }}
</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import inputMixin from './input-mixin'
import fieldMixin from './field-mixin'

export default

	mixins: [
		inputMixin
		fieldMixin
	]

	props:

		# Type of textfield
		type:
			type: String
			default: 'text'

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

	computed:
		classes: -> [
			...@commonClasses
		]

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>
// Not scoped so it's easier to override

@import './form-definitions.styl'

.vf-textfield
	width 100%
	color form-color-base

	label
		display block
		position relative
		margin-bottom form-input-label-above-padding

	.input-wrap
		position relative

	input
		// Fill container
		width 100%

		// Give it a fluid height
		fluid height, form-input-height, form-input-height-min

		// Push text away from margins
		fluid padding-h, form-input-padding-h, form-input-padding-h-min

		// Outline
		outline form-outline-width solid form-outline-base
		border none
		border-radius form-input-radius

		// Animation
		transition color form-base-speed

		&:not([disabled])
			// Hover state
			+hover()
				outline-color form-outline-hover
				color form-color-hover
				background form-bkg-hover

			// Focus state
			&:focus
				transition-duration (form-base-speed/2)
				outline-color form-outline-focus
				color form-color-focus
				background form-bkg-focus
				outline-offset form-outline-offset

		// Error state
		&.error
			outline-color form-outline-error
			color form-color-error
			background form-bkg-error

		// Disabled state
		&[disabled]
			&, &::placeholder
				color grey
				opacity 1

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button
			-webkit-appearance none
			margin 0

		[type=number]
			-moz-appearance textfield

	// transparent placeholder on focus
	input:focus::placeholder
		color transparent

</style>
