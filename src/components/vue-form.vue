<!--  -->

<template lang='pug'>
form.vf-form(
	v-on:submit.prevent='onSubmit'
	:id='id'
)
	slot(
		:submitting='submitting'
		:submitted='submitted'
		:success='success'
		:error='error'
		:has-validation-errors='hasValidationErrors'
		:form='form'
		:resetForm='resetForm'
	)

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import emitter from 'tiny-emitter/instance'

export default
	name: 'VueForm'

	# Provide @id to form fields so that they can include @id with their tiny-emitter events.
	provide: ->
		id: @id

	props:
		# @id must be unique from all other forms on this page.
		# We include @id on all tiny-emitter events and use it to ignore events 
		# emitted by other forms that might be on this page.
		id:
			type: String
		# Submit callback function
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
		hasValidationErrors: false
		allFieldsValid: false # Can't be computed prop of @valid because object keys created at runtime aren't reactive

		# Field states (objects keyed by field name)
		formData: {} # Form field data
		valid: {} # Whether field values are valid (booleans)

	computed:
		# Array of field IDs
		fieldIds: -> Object.keys @formData
		submitted: -> @error || @success

	mounted: ->
		# Subscribe to child events
		emitter.on 'vue-form-fieldupdated', @onFieldUpdated

	beforeDestroy: ->
		# Unsubscribe from child events
		emitter.off 'vue-form-fieldupdated', @onFieldUpdated

	methods:
		onSubmit: ->
			# Sync form data to parent
			@$emit 'update:form', @formData
			# Check if all fields are valid
			@hasValidationErrors = @validateForm()
			# Wait for the field components to send us results
			@$defer =>
				return unless @allFieldsValid
				try 
					@submitting = true
					await @submit(@formData)
					@success = true
				catch errorArg
					@error = true
					console.warn('vue-form: Submit callback threw error:')
					console.warn(errorArg)

		onFieldUpdated: (args) ->
			{ id, name, value, valid } = args

			# Do nothing if this event was emitted from a different form.
			return if id != @id

			# console.log 'fieldEvent', {id, name, value, valid}
			
			# Save our field's latest value
			@formData[name] = value
			@valid[name] = valid
			
			# Sync our form data to the parent Vue component
			@$emit 'update:form', @formData

		validateForm: ->
			emitter.emit 'vue-form-validatefields', { id: @id }

			# Wait for the field components to send us results
			@$defer =>
				# If all fields are valid return true
				@allFieldsValid = Object.values(@valid).every (val) -> return val
				return @allFieldsValid

		resetForm: (event) ->
			event.preventDefault()
			@submitting = false
			@error = false
			@success = false

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>



</style>
