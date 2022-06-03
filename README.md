
## Caveats

- This package is designed to be used by a Cloak app.
- Included styles are written in Stylus only
- Stylus expects `bukwild-stylus-library` mixins to already be imported

## Getting Started

Add this to `nuxt.config.coffee`, so that vue-form's components are registered globally in Nuxt:
```coffee
buildModules: ['@nuxt/components', 'vue-form/nuxt']
```

Build your form:
```pug
vue-form(
  id='newsletter'
  :submit='onSubmit'
  #default="{success, error, submitting, submitted}"
)
  
  //- Form message
  .message(v-if='success') Thanks!
  .message(v-else-if='error') Error.
  .message(v-else) Sign up

  //- Form Fields
  //- Use any DOM structure as long as the fields
  //- are a descendant of vue-form.
  .fields(v-if='!submitted')

    input-field(
      label="Your Name"
      name="name"
      :rules='["required"]'
    )

    input-field(
      label="Email Address"
      name="email"
      placeholder="Your email address"
      :rules='["email"]'
    )
    
    button(
      type='submit'
    ) Sign up
```

Add your submit handler:

```coffee
methods:
  onSubmit: (form) -> 
    # Executed only if all input has passed client-side validation.
    # `form` is an object with all your field data
    
    # Can be async
    await @uploadToSomewhere(form)
    
    # vue-form catches errors, sets @error and @submitted to true, and logs the error to console as a console.warn
    throw("Couldn't connect to remote service")
```


## Custom Styling

To skin vue-form, you have two options:

* Import vue-form's Stylus stylesheet into your component, and create a theme by overriding a few Stylus variables.

* Start from scratch.  Vue-form's components include no styles by default.  This is by design, to give you the most flexibility.

To import vue-form's Stylus stylesheet and create a theme:

```stylus
>>>  // 👈 Deep selector is required if your component styles are scoped
  // Customize variables (see "vue-form/src/assets/definitions.styl")
  form-color-base = white
  form-bkg-base = grey
  
  // Import vue-form styles
  @import '~vue-form/index.styl'
```

## Validation

Each field validates itself on blur and submit, and shows/hides its own validation message.

Fields have a `rules` prop that accepts an array of strings or functions.  

Strings represent preset validators included in this package:

- "email":  Must be a valid email
- "required": Must not be empty or unchecked.
- "url": Must be a valid URL.
- "notUrl"
- "ipAddress":  Must be a valid IPv4 or IPv6 address.
- "notIpAddress"

Functions are your custom validator functions.  A validator function must:

- Accept one argument (the field value)
- Return true (valid), false (invalid), or a string (invalid, with a custom validation error message)

## FAQ

### Why does this package use an event bus?

Most Vue form libraries manage field values with a direct data binding.  The result is that each field's `name` is repeated up to four times:

```
<template>
vue-form(:form='form' :rules='rules')
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

Forgetting or misspelling any of these four `name` instances will break something important.  In a big form, this can be a lot to manage.

In this form library, the form component and the fields communicate directly using an event bus (`tiny-emitter` library, so it's Vue 3 compatible).  This is a tradeoff: it introduces complexity (it's a manual data binding outside of Vue), but it allows us to eliminate this 4x `name` repetition.  It also lets us make `rules` a prop on each field which is a nice API.
