import emitter from 'tiny-emitter/instance'

# Common logic for all fields
export default
	props:
		# Name.  Used for id, label[for], and keying the main form data object.
		name:
			type: String
			default: ''

		# Placeholder as well as input name
		label: String

		# Add html5 attributes
		required: Boolean
		readonly: Boolean
		disabled:
			type: Boolean
			default: false

		# Shows a "?" button inside the input which toggles a tooltip message.
		tooltip:
			type: String
		
	data: ->
		# Set initial value to @default prop if provided.
		value: ''
		
		# Tooltip state
		tooltipActive: false

	# Inject @id from form-field
	inject: ['id']

	computed:
		commonClasses: -> [
			'error': !!@error
			'disabled': @disabled
			'has-tooltip' if @tooltip
		]

	mounted: -> @$defer =>
		# On mounted, run sendEvent so that the form has our name, value, and validation status.
		# We must defer so that the form component is ready to receive our event.
		@sendEvent()
		# Listen for events emitted by the form component
		emitter.on 'vue-form-validatefields', @onValidateFields

	beforeDestroy: ->
		# Unsubscribe from child events
		emitter.off 'vue-form-validatefields', @onValidateFields

	methods:
		tooltipClick: (event) ->
			@tooltipActive = !@tooltipActive
			event.preventDefault()

		# Focusout handler
		# We must defer, or else 'document.activeElement' is sometimes 'body'
		# TODO: figure this out... 100ms is definite code smell
		focusOut: (event) -> @$wait 100, () => 
			# If keyboard focus is still inside this component (such as the user clicked 
			# from the tooltip to the input), then ignore the event.
			return if @$el.contains document.activeElement
			# If keyboard focus has left this component, then close the tooltip and validate the input.
			@tooltipActive = false
			@validate()

		# Send our field information to the form component using tiny-emitter
		sendEvent: ->
			# console.log 'sendEvent', @name, @value
			emitter.emit 'vue-form-fieldupdated', { id: @id, name: @name, value: @value, valid: !@error }

		# Listen for events emitted from the form component
		onValidateFields: (args) ->
			{ id } = args

			# Do nothing if this event was emitted from a different form.
			return if id != @id

			# console.log 'formEvent', {type}
			# Form component has asked us to validate our input
			# Clear the error, wait a tick, then validate.
			# This is a hacky way to force the error messages to re-animate and get the user's attention.
			@error = ''
			@$nextTick => @validate()

		# Pass through @click listener
		onClick: (event) ->
			event.stopPropagation()
			event.preventDefault()
			@$listeners?.click?()
