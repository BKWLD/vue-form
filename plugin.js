import { createStore } from 'vuex'
import Vue from 'vue'

export default ({store}, inject) => {

	const formModule = {

		// Namespace our getters, mutations, and actions
		namespaced: true,

		// Form data objects, keyed by form id
		// Form objects have properties:
		//   * data: the user-entered field data, keyed by field name
		//   * config: the field configurations, keyed by field name
		state: {},
	
		mutations: {
	
			// Merge new data into a form's .data property
			// Payload is object with properties: { name, id, config, errorShown, valid, data }
			setField(state, payload) {
				if (!payload) {
					// console.log('setField: no payload')
					return
				}

				const { name, id } = payload

				// Init the form if it doesn't exist
				if ( !state[id] ) {
					Vue.set( state, id, {} )
					Vue.set( state[id], 'data', {} )
					Vue.set( state[id], 'config', {} )
					Vue.set( state[id], 'errorShown', {} )
					Vue.set( state[id], 'valid', {} )
				}

				console.log('setField 1', name, payload)
				// Update the simple (non-object) properties
				const arr = ['data', 'errorShown', 'valid'].forEach( (property) => {
					// console.log('setField 1b', property, payload[property])
					// Skip this property if the payload doesn't have it
					if ( payload[property] == undefined ) { return }
					// Overwrite the current value
					Vue.set( state[id][property], name, payload[property] )
					// console.log('setField 1c set field:', name, property, payload[property])
				})
				// console.log('setField 2')

				// Update the object properties
				// Create this field's config object if it doesn't exist
				if ( !state[id].config[name] ) {
					Vue.set( state[id].config, name, {} )
				}
				// Merge the new object into the current object
				Object.assign( state[id].config[name], payload.config )

			},
		},

		getters: {

			// Get the number of fields in each form
			numFields: (forms) => {
				const result = {}
				for ( const id in forms ) {
					result[id] = Object.keys(forms[id].config).length || 0
				}
				return result	
			},
			
			// Get the labels of the invalid fields
			invalidFieldLabels: (forms) => {
				const result = {}
				
				// Loop through forms
				for ( const id in forms ) {
					const invalidLabels = []
					
					// Loop through fields
					for ( const name in forms[id].valid ) {
						if ( forms[id].valid[name] !== true ) {
							invalidLabels.push( forms[id].config[name].label )
						}
					}
					// Save to result
					result[id] = invalidLabels
				}
				return result	
			},

			numInvalidFields: (forms, getters) => {
				const result = {}

				// Loop through forms
				for ( const id in getters.invalidFieldLabels ) {
					result[id] = getters.invalidFieldLabels[id].length
				}
				return result
			},

			numValidFields: (forms, getters) => {
				const result = {}

				// Loop through forms
				for ( const id in getters.numInvalidFields ) {
					result[id] = getters.numFields[id] - getters.numInvalidFields[id]
				}
				return result
			},

			// numErrorsShown: (forms, getters) => {
			// 	const result = {}

			// 	// Loop through forms
			// 	for ( const id in getters.numInvalidFields ) {
			// 		result[id] = getters.numFields[id] - getters.numInvalidFields[id]
			// 	}
			// 	return result
			// },

		},

	}

	store.registerModule('forms', formModule)

}