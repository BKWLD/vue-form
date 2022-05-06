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

		hasFocus: false

	# Inject @id from form-field
	inject: ['id']

	computed:
		commonClasses: -> [
			if @showError and !!@error then 'error'
			if @disabled then 'disabled'
			if @tooltip then 'has-tooltip'
		]

	mounted: -> @$defer =>
		# We must defer so that the form component is ready to receive our event.
		# Update @valid so it's accurate when we sendEvent
		# Send the form our name, value, and validation status.
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

		# Focusin handler
		focusIn: -> 
			@hasFocus = true

		# Focusout handler
		# We must defer, or else 'document.activeElement' is sometimes 'body'
		# TODO: figure this out... 100ms is definite code smell
		focusOut: (event) -> @$wait 100, () => 
			@hasFocus = false
			@validate()

		# Send our field information to the form component using tiny-emitter
		sendEvent: ->
			# console.log 'sendEvent', @name, @value
			emitter.emit 'vue-form-fieldupdated', { id: @id, name: @name, value: @value, valid: !@error }

		# Fired when vue-form emits 'validatefields', which asks all fields to validate their data and return the results.
		onValidateFields: (args) ->
			{ id } = args

			# Do nothing if this event was emitted from a different form.
			return if id != @id

			# console.log 'formEvent', {type}
			# Form component has asked us to validate our input
			# Show validation errors
			# Clear the error, wait a tick, then validate.
			# This is a hacky way to force the error messages to re-animate and get the user's attention.
			@error = ''
			@$nextTick => @validate()

		# Pass through @click listener
		onClick: (event) ->
			@$listeners?.click?()
