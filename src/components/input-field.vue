<!-- A standard textfield input -->

<template lang='pug'>
.vf-field.vf-inputfield(@focusout='focusOut' @click='onClick')
	label.vf-label-above(:for='name' v-if='label') {{ label }}
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
			:aria-describedby='name + "-error-message"'
			v-model='value'
		)

		tooltip-btn(v-if='tooltip' :tooltipActive='tooltipActive' @click.native='tooltipClick' :accessible-label="tooltipAccessibleLabel")

		//- Default slot.  Lets you render extra buttons etc inside .input-wrap
		slot

	//- Error message (role=alert so SRs read immediately)
	transition(name='vf-slide'): .vf-error-message(:id='name + "-error-message"' v-if='error && !tooltipActive' role='alert') {{ error }}
	//- Tooltip message
	transition(name='vf-slide'): .vf-tooltip-message(v-if='tooltipActive' aria-label="Additional information") {{ tooltip }}
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

		tooltipAccessibleLabel: type: String

	computed:
		classes: -> [
			...@commonClasses
		]

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>
</style>
