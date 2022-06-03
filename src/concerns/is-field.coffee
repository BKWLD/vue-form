import emitter from 'tiny-emitter/instance'
import throttle from 'lodash.throttle'

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
		
		# For setting the initial value when the field is mounted.
		# Not required if you're using @value.
		default: String
		
		# External value
		# This is required to support standalone use with v-model.
		# Standalone usage: `input-field.email( v-model='email' )`
		# Readonly usage:   `input-field.email( v-model='email' :readonly )`
		value: String

	data: ->
		# Internal value
		# This is required to support usage without v-model.
		# Usage: `vue-form: input-field( name='email' )`
		dataValue: @getInitialValue()
		
		hasFocus: false

	# Inject @id from form-field
	inject: id: default: 0

	computed:
		commonClasses: -> [
			if @errorShown then 'error'
			if @disabled then 'disabled'
			if (@dataValue=='' || @dataValue==undefined) then 'no-value' else 'has-value'
		]

	mounted: -> @$defer =>
		# Defer so that the parent vue-form component is mounted and ready to receive our events.
		# Send the form our name, value, and validation status.
		@validate()
		@sendEvent()
		# Listen for events emitted by the form component
		emitter.on 'vue-form-validatefields', @onValidateFields

	beforeDestroy: ->
		# Unsubscribe from child events
		emitter.off 'vue-form-validatefields', @onValidateFields

	methods:
		getInitialValue: ->
			# Use hardcoded value prop if provided
			return @value if @value?
			# Else, use default if provided
			return @default

		# Passed as a slot prop.  Allows you to render a slotted element
		# (like a "default" button) that sets the field's value.
		setValue: (newValue) -> @dataValue = newValue

		# Focusin handler
		focusIn: -> 
			@hasFocus = true

		# Focusout handler
		# We must defer, or else 'document.activeElement' is sometimes 'body'
		# TODO: figure this out, maybe code smell
		focusOut: (event) -> @$wait 100, () => 
			@hasFocus = false
			@validate()
			@sendEvent()

		# Send our field information to the form component using tiny-emitter
		sendEvent: ->
		# Throttled version
		sendEventThrottled: throttle ->
			@sendEvent()
		, 500

		# Fired when vue-form emits 'validatefields', which asks all fields to validate their data and return the results.
		onValidateFields: (args) ->
			{ id } = args

			# Do nothing if this event was emitted from a different form.
			return if id != @id

			# Show validation errors, in case they were hidden.
			@canShowErrors = true
			# Clear existing errors
			@error = ''
			# Validate our input
			@validate()
			# Send our updated validation status to the form.
			@sendEvent()

		# Pass through @click listener
		onClick: (event) ->
			@$listeners?.click?()

	watch:
		
		# When our field data changes
		dataValue: ->
			# If our internal @dataValue is out of sync with external @value,
			# then emit 'input' event.  Required for standalone use with v-model.
			if @dataValue != @value then @$emit 'input', @dataValue

			# Validate the latest input.
			@validateThrottled()

			# Sync our data to the form.  
			# Use throttled function so we don't get bogged down when typing fast into a text field.
			@sendEventThrottled()

		# When external value prop changes, update our internal dataValue.
		# Required for standalone use with v-model.
		value: -> @dataValue = @value