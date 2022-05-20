<!-- Draggable slider UI with input[type="number"] under the hood -->

<template lang='pug'>
.vf-field.vf-slider(@focusin='focusIn' @focusout='focusOut' @click='onClick' :class='classes')

	label.vf-label-above(:for='name' v-if='label')

		| {{ label }}

		//- Label slot.  Render custom elements inside label.
		slot(name='label')

	.input-and-values

		.values(v-if='showMinMax || showValue')

			.value-min(v-if='showMinMax') {{ min }}

			.value-current-wrap(v-if='showValue')
				.value-pad-left(:style='padLeftStyles')
				.value-current {{ valueLabel }}
				.value-pad-right(:style='padRightStyles')

			.value-max(v-if='showMinMax') {{ max }}
		
		.input-wrap

			.slider-bar-bkg
			.slider-bar-progress(:style='sliderBarProgressStyles')

			input(
				type='range'
				:name='name'
				:id='name'
				:aria-label='label'
				v-bind='attrs'
				v-model='value'
			)

		//- Default slot.  Render custom elements inside .input-wrap
		slot(:value='value' :setValue='setValue')

	//- Error message (role=alert so SRs read immediately)
	transition(name='vf-slide'): .vf-error-message(v-if='showError && error' role='alert') {{ error }}
</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import isField from '../concerns/is-field'
import hasValidation from '../concerns/has-validation'

export default
	name: 'SliderField'

	mixins: [ isField, hasValidation ]

	props:

		# For adding a prefix, such as '$'
		prefix:
			type: String
			default: null

		# For adding a suffix, such as '%'
		suffix:
			type: String
			default: null

		max: 
			type: Number
			default: 100

		min: 
			type: Number
			default: 0

		step: 
			type: Number
			# Must be 'any' for non-integer values to pass browser-native validation
			default: 1

		showMinMax:
			type: Boolean
			default: true

		showValue:
			type: Boolean
			default: true

	data: ->
		# Set initial value to @default prop if provided.
		value: @default || @min

	computed:

		classes: -> [ ...@commonClasses ]

		valueLabel: -> "#{ @prefix || '' }#{ @value }#{ @suffix || '' }"

		valueNumber: -> parseFloat @value
		
		valueProgress: -> 
			# Don't divide by zero
			return 1 if @max - @min == 0
			( @valueNumber - @min ) / ( @max - @min )

		padLeftStyles: -> return { flexBasis: "#{ @valueProgress * 100 }%" }
		padRightStyles: -> return { flexBasis: "#{ ( 1 - @valueProgress) * 100 }%" }

		sliderBarProgressStyles: -> return { width: "#{ @valueProgress * 100 }%" }

		attrs: -> return {
			type: @type
			required: @required
			disabled: @readonly
			max: @max
			min: @min
			step: @step
		}

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>
</style>
