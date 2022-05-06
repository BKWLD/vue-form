# Simple wrapper for a number field.
# Uses 'input-field.vue', passes down props, and sets type='number'.

import InputField from './input-field'

export default
	name: 'NumberField'
	functional: true

	# Support all InputField props
	props: { ...InputField.props }

	# Render an input field
	render: (create, { props, data, children, scopedSlots }) ->

		# Instantiate a Visual instance
		create InputField, {
			...data
			props: {
				# Passthrough props
				...props
				# Set type=number
				type: 'number'

		# Passthrough slot
		}}, children
