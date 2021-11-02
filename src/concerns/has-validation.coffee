import { required, email, url, notUrl, ipAddress, notIpAddress } from '../services/validators'

export default
	props:
		# Pass in array of validators to this field.
		# Each validator can be a string (if using a validator provided in this package)
		# or a function (custom validator)
		rules:
			type: Array
			default: -> []

	data: ->
		# Validation error message
		error: ''

	watch:
		# Validate this field immediately each time the field value changes.
		value: -> 
			console.log "watch value. validate...", @value
			@validate()

	methods:
		
		# Our main validation function
		validate: ->
			console.log 'validate', @name, @value

			# If no rules, return true
			if !@rules?.length
				@error = ''
				@sendEvent()
				return true

			# Loop through rules, running each function on the field value.
			# Each function returns true if valid, or a string with the validation error message.
			# On first validation failure, save errorMessage and stop the loop.
			errorMessage = ''
			passedAllRules = @rules.every (ruleArg, index) =>
				rule = @getRuleFunction ruleArg
				errorMessage = rule(@value)

				# Default message if ruleFunction returns false
				if errorMessage == false then errorMessage = "Error: This field is invalid"
				return errorMessage==true

			# If we passed validation, clear the error message and return true
			if passedAllRules
				@error = ''
				@sendEvent()
				return true

			# If we failed validation and keyboard focus has moved outside this component, then show the error message.
			# This way we don't show the error message while the user is still typing, which would be annoying.
			if !@$el.contains document.activeElement
				@error = errorMessage
			@sendEvent()
			return false

		# Look up validator function from a string
		getRuleFunction: (rule) ->
			return rule if typeof rule == 'function'
			return switch rule
				when 'required' then required
				when 'email' then email
				when 'notUrl' then notUrl
				when 'notIpAddress' then notIpAddress
				else
					console.warn "Couldn't find validator rule for #{rule}"
					# Fallback function that always returns true
					return ()=>true

