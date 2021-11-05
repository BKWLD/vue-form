
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

Skin your forms.  In your project's `definitions.styl`, override the default Stylus variables in `vue-forms/src/assets/definitions.styl`.




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





