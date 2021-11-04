<!--  -->

<template lang='pug'>
form.vf-form(
	v-on:submit.prevent='onSubmit'
)
	slot(
		:submitting='submitting'
		:submitted='submitted'
		:success='success'
		:error='error'
		:validation-error='validationError'
		:form='form'
	)



</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default
	name: 'VueForm'

	props:
		# Submit callback
		submit:
			type: Function
		# Form data object.  For syncing to parent component data, if desired.
		form:
			type: Object

	data: ->
		# Boolean states
		submitting: false
		error: false
		success: false
		validationError: false
		allFieldsValid: false # Can't be computed prop of @valid because object keys created at runtime aren't reactive

		# Field states (objects keyed by field name)
		formData: {} # Form field data
		valid: {} # Whether field values are valid (booleans)

	computed:
		# Array of field IDs
		fieldIds: -> Object.keys @formData
		submitted: -> @error || @success

	mounted: ->
		# Listen for child events
		@$el.addEventListener 'vf-field-event', @onFieldEvent

	beforeDestroy: ->
		@$el.removeEventListener 'vf-field-event', @onFieldEvent

	methods:
		onSubmit: ->
			# Sync form data to parent
			@$emit 'update:form', @formData
			# Check if all fields are valid
			@validateForm()
			@$defer =>
				# If all fields are valid, then run @submit()
				@submit() if @allFieldsValid

		onFieldEvent: (event) ->
			{ name, value, valid } = event.detail
			# console.log 'fieldEvent', {name, value, valid}
			# Save our field's value, and validation status
			@formData[name] = value
			@valid[name] = valid
			# Sync our form data to the parent Vue component
			@$emit 'update:form', @formData

		validateForm: ->
			# Loop through fields and trigger each field to validate itself
			fieldElements = @$el.querySelectorAll('.vf-field')
			
			fieldElements.forEach (fieldElement) => @sendEvent fieldElement, 'validate'
			# Wait a tick for subcomponents to send us results, then check if all fields are valid
			@$defer =>
				@allFieldsValid = Object.values(@valid).every (val) -> return val
				return @allFieldsValid

		# Send custom event to a form field
		sendEvent: (fieldElement, type) ->
			# console.log 'sendEvent', @name, type
			customEvent = new CustomEvent 'vf-form-event', {bubbles: false, detail: { type: type } }
			
			fieldElement.dispatchEvent customEvent



</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>



</style>
