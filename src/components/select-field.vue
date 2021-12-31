<!--  -->

<template lang='pug'>
.vf-field.vf-select(@focusout='focusOut' @click='onClick')
	label.vf-label-above(:for='name') {{ label }}
	.select
		select(
			:id='name'
			:class='classes'
			:name='name'
			:aria-label='label'
			:required='required'
			:disabled='readonly'
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

		tooltip-btn(v-if='tooltip' :tooltipActive='tooltipActive' @click.native='tooltipClick')

		//- Down arrow icon
		svg.icon(height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"): path(d="m16 5.5-2-2-6 6-6-6-2 2 8 8z")

	//- Error message
	transition(name='vf-slide'): .vf-error-message(v-if='error && !tooltipActive') {{ error }}
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

	components: {
		TooltipBtn
	}

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
		optionsComputed: -> @options?.map (option) =>
			arr = option?.split?(/(?:\s)+(?:\|)+(?:\s)+/)
			return
				label: arr?[0]
				value: arr?[1] || arr?[0]

		classes: -> [
			...@commonClasses
		]

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>

</style>
