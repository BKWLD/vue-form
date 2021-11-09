
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
    # Called on submit if input passed validation
    onSubmit: -> alert('Submit!')
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

### Why use the event bus pattern?

The form library be implemented a more traditional way without an event bus:

- Manage field values using `v-model`.
- Put validation logic in the form, rather than in the fields.

However using an event bus has some advantages:

- The validation rules have a nicer API: we can add a `rules` prop to each field right in the template, rather than as a big `rules` object in the component data.
- By using an event bus, we can eliminate some props on the field components, reducing template repetition.

### Why doesn't this package ship pre-compiled?

This package ships uncompiled (and needs to be transpiled by Nuxt) so that its Stylus can be compiled by your Nuxt app.  This allows you to override the default Stylus variables in in `vue-form/src/assets/definitions.styl`, which allows you to skin the form elements much more easily.  If this package shipped pre-compiled, you'd have to import the compiled default CSS and then override it, forcing you to write more CSS and ship more redundant CSS.





