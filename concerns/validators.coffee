# Vuetify-style validator functions
# Functions should return true (valid input), false (invalid input) or a string error message (invalid input).

import { veryPermissiveUrlRegex, ipv4Regex, ipv6Regex } from './regex.coffee'

# Must be a valid email address
export email = (val) -> /\S+@\S+\.\S+/.test(val) || 'Error: Not a valid email'

# Checkbox: must be checked.  Other fields: must not be blank.
export required = (val) ->
	# Checkbox
	if typeof val=='boolean' then return val || 'Error: This field is required'
	# Other fields
	return !!val?.trim?() || 'Error: This field is required'

# Must be a URL
export url = (val) -> veryPermissiveUrlRegex.test(val) || 'Error: Not a valid URL'

# Must not be a URL
export notUrl = (val) -> !veryPermissiveUrlRegex.test(val) || 'Error: You may not enter a URL'

# Must be an IP address
export ipAddress = (val) -> (ipv4Regex.test(val) || ipv6Regex.test(val)) || 'Error: Not a valid IP address'

# Must not be an IP address
export notIpAddress = (val) -> !(ipv4Regex.test(val) || ipv6Regex.test(val)) || 'Error: You may not enter an IP address'
