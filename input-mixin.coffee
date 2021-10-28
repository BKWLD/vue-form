###
Shared input behaviors
###
export default

	props:

		# Placeholder as well as input name
		label: String

		# V-model value
		value:
			type: String
			default: ''

		# Add html5 attributes
		required: Boolean
		readonly: Boolean

	data: ->
		# Sync external v-model
		state: @value

	watch:
		value: -> @state = @value
		state: -> @$emit 'input', @state
