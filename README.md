
## Caveats

- This package is designed to be used by a Cloak app.
- Included styles are written in Stylus only
- Stylus expects `bukwild-stylus-library` mixins to already be imported

## Getting Started

Add this to `nuxt.config.coffee`, so that vue-form's components are registered globally in Nuxt:
```
# nuxt.config.coffee
buildModules: ['@nuxt/components', 'vue-form/nuxt']
```

In your Vue component, add your submit handler:

```
export default
  methods:
    
    # Submit handler is executed on submit, but only if all input has passed client-side validation.
    onSubmit: (form) -> 
      # `form` argument is an object with all your form field data
      
      # Submit handler can be async
      await @uploadToSomewhere(form)
      
      # If submit handler throws an error, vue-form catches it and sets @error and @submitted to true, and logs the error to console as a console.warn
      throw("Couldn't connect to remote service")
```

Add your form to your template.  For example:
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

## Custom Styling

To skin vue-form, you have two options:

* Import vue-form's Stylus stylesheet into your component, and quickly customize a theme by overriding the default Stylus variables.

* Don't import the Stylus, and write your own CSS.  Vue-form's components include no styles by default.  This is by design, to give you the most flexibility.

To import vue-form's Stylus stylesheet and customize a theme:

```
<style lang='stylus' scoped>
// Deep selector is required if styles are scoped
>>>
  // Customize your variables (any variable in "vue-form/src/assets/definitions.styl")
  form-color-base = white
  form-bkg-base = yellow
  
  // Then import vue-form styles
  @import '~vue-form/index.styl'
```

## Validation

Fields have a `rules` prop that accepts an array of strings or functions.  Strings represent preset validators included in this package.  Functions are your custom validator functions.

Vue-form includes the following presets:

- "email":  Must be a valid email
- "required": Must not be empty or unchecked.
- "url": Must be a valid URL.
- "notUrl"
- "ipAddress":  Must be a valid IPv4 or IPv6 address.
- "notIpAddress"

If you provide a custom validator function, it must:
- Accept one argument (the field input)
- Return either true (valid), false (invalid), or a string (invalid, with a custom validation error message)

## FAQ

### Why does this package use an event bus?

Most Vue form libraries manage field values with a direct data binding, often using `v-model`.  The result is that each field name is repeated up to four times.

```
<template>
form(:form='form' :rules='rules')
  input-field(
    v-model="form.email" // 👈 Field name (1st time)
    label="Email Address"
    name="email" // 👈 Field name (2nd time, for the input label's `for` attribute)
  )
  ...
</template>

export default
  data: ->
    form: {
      name: "" // 👈 Field name (3rd time, or else this property is not reactive)
    } 

    rules: {
      email: ['required', 'email']  // 👈 Field name (4th time, if we want validation rules)
    }
```

Forgetting or misspelling any of these four `name` instances will break something important.  In a big form this can become a lot to manage.

In this form library, the form component and the fields communicate directly using an event bus (`tiny-emitter` library, so it's Vue 3 compatible).  This introduces complexity (it's a manual data binding outside of Vue), but it allows us to eliminate the 4x `name` repetition, and it lets us make `rules` a prop on each field, which is a nice API.