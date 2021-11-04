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
		value: ''
		
		# Tooltip state
		tooltipActive: false

	computed:
		commonClasses: -> [
			'error': !!@error
			'disabled': @disabled
			'has-tooltip' if @tooltip
		]

	# watch:
	# 	value: -> @$emit 'input', @value

	mounted: -> @$defer =>
		# On mounted, run sendEvent so that the form has our name, value, and validation status.
		# We must defer so that the form component is ready to receive our event.
		@sendEvent()
		# Listen for events dispatched from the form component
		@$el.addEventListener 'vf-form-event', @onFormEvent

	beforeDestroy: -> @$el.removeEventListener 'vf-form-event', @onFormEvent

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
			console.log 'focusOut. validate...', @name, document.activeElement
			@validate()

		# Send our field information to the form component by dispatching a bubbling event
		sendEvent: ->
			# console.log 'sendEvent', @name, @value
			customEvent = new CustomEvent 'vf-field-event', {bubbles: true, detail: { name: @name, value: @value, valid: !@error } }
			@$el.dispatchEvent customEvent

		# Listen for events dispatched from the form component
		onFormEvent: (event) ->
			{ type } = event.detail
			# console.log 'formEvent', {type}
			# Form component has asked us to validate our input
			if type=='validate'
				# Clear the error, wait a tick, then validate.
				# This is a hacky way to force the error messages to re-animate and get the user's attention.
				@error = ''
				@$nextTick => @validate()
