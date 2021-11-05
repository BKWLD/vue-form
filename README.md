
## Caveats

- This package is designed to be used by a Cloak app.  
- Requires being imported and transpiled by Nuxt
- Expects `bukwild-stylus-library` mixins to already be imported into Stylus

## Getting Started

In your project's `nuxt.config.js`, add the transpile option:
```
build: {
  transpile: ['vue-form']
}
```

Skin your form.  In your project's `definitions.styl`, override the default Stylus variables in `vue-forms/src/assets/definitions.styl`.

In your Vue component, import the form components and add your submit handler:
```
import { VueForm, InputField, SelectField, CheckboxField } from 'vue-form'

export default
	components: {
		VueForm
		InputField
		SelectField
		CheckboxField
	}
  methods:
    # Called on submit if input passed validation
    onSubmit: -> alert('Submit!')
```

Add the form:
```
vue-form(
  id='newsletter'
  :submit='onSubmit'
  #default="{success, error, hasValidationErrors, submitting, submitted}"
)
  //- Build your form with any DOM structure, as long as
  //- the field components are a descendant of `vue-form`.
  
  //- Form message
  .message(v-if='success') Thanks for signing up!
  .message(v-else-if='error') Error.
  .message(v-else) Sign up for our newsletter!

  //- Form Fields (hide after submitted)
  .fields(v-if='!submitted)

    .validation-error(v-if='hasValidationErrors') Please fix the following error(s):

    input-field(
      label="Name"
      name="name"
      :rules='["required"]'
    )

    input-field(
      label="Email"
      name="email"
      placeholder="Your email address"
      :rules='["email"]'
    )

    checkbox-field.consent(
      name="consent"
      label="Please send me emails"
      :rules='["required"]'
    )

    button(
      type='submit
      :disabled='submitting'
    ) Sign up
```

## Validation

Fields have a `rules` prop that accepts an array of strings or functions.  Strings represent preset validators included in this package.  Functions are your custom validator functions.

Preset validators:
- "email":  Must be a valid email
- "required": Must not be empty or unchecked.
- "url": Must be a valid URL.
- "notUrl"
- "ipAddress":  Must be a valid IPv4 or IPv6 address.
- "notIpAddress"

Custom validator functions should:
- Accept one argument (the field input)
- Return either true (valid), false (invalid), or a string (invalid, with a custom validation error message)

## FAQ

### Why use the event bus pattern?

The form library be implemented a more traditional way without an event bus:

- Manage field values using `v-model`.
- Put validation logic in the form, rather than in the fields.

However using an event bus has some advantages:

- The validation rules have a nicer API: we can add a `rules` prop to each field right in the template, rather than as a big `rules` object in the component data.
- By using an event bus, we can eliminate some props on the field components, reducing template repetition.

### Why doesn't this package ship pre-compiled?

This package ships uncompiled (and needs to be transpiled by Nuxt) so that its Stylus can be compiled by your Nuxt app.  This allows you to override the default Stylus variables in in `vue-form/src/assets/definitions.styl`, which allows you to skin the form elements much more easily.  If this package shipped pre-compiled, you'd have to import the compiled default CSS and then override it, forcing you to write more CSS and ship more redundant CSS.





