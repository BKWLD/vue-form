<!--  -->

<template lang='pug'>

form.vf-form(
	v-on:submit.prevent='onSubmit'
	:id='id')

	slot(
		:submitting='submitting'
		:submitted='submitted'
		:success='success'
		:error='error'
		:form='form'
		:form-data-valid='formDataValid'
		:all-fields-valid='allFieldsValid'
		:has-errors-shown='hasErrorsShown'
		:num-errors-shown='numErrorsShown'
		:errors-shown-labels='errorsShownLabels'
		:resetForm='resetForm')

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import Vue from 'vue'
import emitter from 'tiny-emitter/instance'

export default
	name: 'VueForm'

	# Provide @id to form fields so that they can include @id with their tiny-emitter events.
	provide: -> id: @id

	props:

		# @id must be unique from all other forms on this page.
		# We include @id on all tiny-emitter events and use it to ignore events 
		# emitted by other forms that might be on this page.
		id:
			type: String
		
		# Submit callback function
		# The is a prop instead of an emitted event so that we can await on an async submit function,
		# catch errors, and show UI feedback if an error happened if desired.
		submit:
			type: Function

		# Form data object.  For syncing to parent component data, if desired.
		form:
			type: Object

	data: ->
		# Boolean states
		submitting: false
		success: false
		
		# If our submit callback threw an error.  Either false, or the string error message.
		error: false

		# Data entered into each field.  Object with field name keys.
		formData: {}

		# Whether the fields have valid input. Object with field name keys and boolean values.
		# This object is accurate immediately upon mounted.
		formDataValid: {}

		# Validation errors visibly shown on the front end.  Object with field name keys
		# and values of string or false.
		formDataErrorsShown: {}

		# Configuration info for each field
		formDataConfig: {}

	computed:
		
		# Array of field IDs
		fieldIds: -> Object.keys @formData
		
		submitted: -> @error || @success

		# Number of fields in this form
		numFields: -> @fieldIds?.length || 0

		# Number of fields in this form with valid input
		numValidFields: -> 
			Object.values @formDataValid
				.filter (value) => return !!value
				.length

		# Number of validation errors visibly shown to the user
		numErrorsShown: ->
			Object.values @formDataErrorsShown
				.filter (value) => return !!value
				.length

		hasErrorsShown: -> !!@numErrorsShown

		errorsShownLabels: ->
			result = []
			for key in Object.keys @formDataErrorsShown
				continue unless @formDataErrorsShown[key]
				result.push @formDataConfig[key]?.label
			result

		# Number, zero to one, representing the ratio of fields with valid input.
		# Useful for showing a visual progress bar or similar.
		validRatio: -> @numValidFields / @numFields

		allFieldsValid: -> @validRatio == 1

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
			@validateForm()

			# Wait for the field components to send us results
			@$defer =>
				return unless @allFieldsValid
				try 
					@submitting = true
					await @submit(@formData)
					@success = true
				catch error
					# Set @error to error, or true if error is falsy
					@error = error or true
					console.warn('vue-form: Submit callback threw error:')
					console.warn(error)
					# Emit 'error' and pass the error message so parent can v-bind a handler
					@$emit 'error', error

		onFieldUpdated: ({ id, name, value, valid, errorShown, config }) ->
			# Do nothing if this event was emitted from a different form.
			return if id != @id
			
			# Save our field's latest value
			Vue.set @formData, name, value
			Vue.set @formDataValid, name, valid
			Vue.set @formDataErrorsShown, name, errorShown
			Vue.set @formDataConfig, name, config
			
			# Emit our form data to the parent Vue component
			# We emit for these events:
			# * When a field mounts (once for each field)
			# * When field data changes (once for each character typed)
			# * When the user moves focus away from a field
			@$emit 'update:form', @formData

		# Validate all fields
		validateForm: -> emitter.emit 'vue-form-validatefields', { id: @id }

		resetForm: (event) ->
			event.preventDefault()
			@submitting = false
			@error = false
			@success = false

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>



</style>
