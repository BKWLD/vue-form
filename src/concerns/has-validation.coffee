import { required, email, url, notUrl, ipAddress, notIpAddress } from '../services/validators'
import throttle from 'lodash.throttle'

export default
	props:
		# Pass in array of validators to this field.
		# Each validator can be a string (if using a validator provided in this package)
		# or a function (custom validator)
		rules:
			type: Array
			default: -> []

	data: ->

		# True when this field's data passes all the validation rules
		valid: false

		# Validation error message
		error: ''

		# If we should show validation errors
		# We could use @valid to show errors, but let's show restraint and
		# hide errors until the user has had a chance to input valid data.
		canShowErrors: false

		# The field's value when the user focuses in (used by canShowErrors)
		valueOnFocusIn: null

	computed:
		errorShown: -> @canShowErrors and !!@error

	watch:

		# Each time the field value changes, update @valid and emit @dataValue.
		value: -> 
			@validate()
			@sendEvent()

		# canShowErrors logic
		hasFocus: ->			
			return if @canShowErrors

			if @hasFocus
				# User has focused in
				@valueOnFocusIn = @dataValue
			else
				# User has focused out
				# If the user has edited the field value and focused out, 
				# then start allowing the field to show validation errors.
				if @dataValue != @valueOnFocusIn then @canShowErrors = true


	methods:

		# Update @valid and @error based on the current field @dataValue
		# Do this by checking if @dataValue satisfies all @rules.
		validate: ->

			# If no validation rules, always valid.
			if !@rules?.length
				@valid = true
				return

			errorMessage = ''
			passedAllRules = true

			# Loop through @rules
			for ruleArg in @rules
				# Get rule function.  Each function returns true if valid, or a string with the validation error message.
				rule = @getRuleFunction ruleArg

				# Run each rule function
				errorMessage = rule(@dataValue)

				# If no error message provided, use a default message.
				if errorMessage == false then errorMessage = "Error: This field is invalid"

				# On first validation failure, save errorMessage and stop the whole function.
				if errorMessage != true
					@error = errorMessage
					@valid = false
					return

			# We passed validation
			@error = ''
			@valid = true

		# Throttled version
		validateThrottled: throttle ->
			@validate()
		, 500

		# Look up validator function from a string
		getRuleFunction: (rule) ->
			return rule if typeof rule == 'function'
			return switch rule
				when 'required' then required
				when 'email' then email
				when 'notUrl' then notUrl
				when 'notIpAddress' then notIpAddress
				else
					console.warn "Couldn't find validator rule for \"#{rule}\""
					# Fallback function that always returns true
					return ()=>true

