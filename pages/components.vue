<template>
  <div class="container mb-10">
    <!-- Typography -->
    <div class="hero">
      <div class="hero-content">
        <h1>Typography</h1>
        <p>Typography is better defined within the styles of the document.</p>
      </div>
    </div>
    <article class="prose lg:prose-xl mb-8">
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <p>
        Bodytext for years parents have espoused the health benefits of eating
        garlic bread with cheese to their children, with the food earning such
        an iconic status in our culture that kids will often dress up as warm,
        cheesy loaf for Halloween.
      </p>
      <p>
        But a recent study shows that the celebrated appetizer may be linked to
        a series of rabies cases springing up around the country.
      </p>
      <a href="#">Hallo Link</a>
      <!-- ... -->
    </article>
    <!-- Forms -->
    <div class="hero">
      <div class="hero-content">
        <h1>Forms</h1>
        <p>Placeholders</p>
      </div>
    </div>
    <FormulateForm v-model="formValues" class="max-w-xl mx-auto">
      <div class="prose my-3">
        <p>
          You can place any elements you want inside a form. The inputs
          themselves can even be deeply nested.
        </p>
      </div>
      <FormulateInput
        name="name"
        type="text"
        label="Your name"
        placeholder="Your name"
        validation="required"
      />
      <FormulateInput
        name="email"
        type="email"
        label="Email address"
        placeholder="Email address"
        validation="required|email"
      />
      <div class="double-wide">
        <FormulateInput
          name="password"
          type="password"
          label="Password"
          placeholder="Your password"
          validation="required"
        />
        <FormulateInput
          name="password_confirm"
          type="password"
          label="Confirm your password"
          placeholder="Confirm password"
          validation="required|confirm"
          validation-name="Confirmation"
        />
      </div>
      <FormulateInput type="submit" label="Register" />
    </FormulateForm>
    <!-- Buttons -->
    <div class="hero">
      <div class="hero-content">
        <h1>Buttons</h1>
        <p>
          For Desktop, buttons follow the grid and should have enough space to
          each side of the CTA. For mobile views, Buttons are full width
          following the grid.
        </p>
      </div>
    </div>
    <div class="flex flex-col max-w-xl mx-auto mb-8">
      <div class="flex items-center justify-start mb-4">
        <button type="button" name="button" class="primary ml-2">
          Primary
        </button>
        <button type="button" name="button" class="secondary ml-2">
          Secondary
        </button>
        <button type="button" name="button" class="tertiary ml-2">
          Tertiary
        </button>
      </div>
      <div class="flex items-center justify-start">
        <button type="button" name="button" class="secondary icon-r ml-2">
          Label <icon name="upload" />
        </button>
        <button type="button" name="button" class="secondary icon-r ml-2">
          Label <icon name="camera-outline" />
        </button>
        <button type="button" name="button" class="primary icon-l ml-2">
          <icon name="home-outline" /> Label
        </button>
      </div>
    </div>
    <!-- Tooltips -->
    <div class="hero">
      <div class="hero-content">
        <h1>Tooltips</h1>
        <p>
          This was designed for short amounts of information. See map component
          to see the example.
        </p>
      </div>
    </div>
    <div class="max-w-xl mx-auto mb-8">
      <div class="tooltip">
        Tooltip
      </div>
    </div>
    <!-- Swiches -->
    <div class="hero">
      <div class="hero-content">
        <h1>Swiches</h1>
        <p>
          Have you tried turning it off and on again? This element has not yet
          been used and can be updated if needed.
        </p>
      </div>
    </div>
    <div class="max-w-xl mx-auto mb-8">
      <div class="toggle">
        <input
          id="toggle"
          type="checkbox"
          name="toggle"
          class="toggle-checkbox"
        />
        <label for="toggle"></label>
      </div>
      <label for="toggle" class="select-none">Toggle me.</label>
    </div>

    <!-- Dropdown -->
    <div class="hero">
      <div class="hero-content">
        <h1>Form inputs</h1>
      </div>
    </div>
    <div class="max-w-xl mx-auto mb-8">
      <p>Simple Dropdown</p>
      <FormulateInput
        :options="{
          first: 'First',
          second: 'Second',
          third: 'Third',
          fourth: 'Fourth',
        }"
        type="select"
        placeholder="Select an option"
        label="Which of your children is your favorite?"
      />
      <p>Groupings Dropdown</p>
      <FormulateInput
        label="Select an available meeting time"
        type="select"
        placeholder="Choose a time"
        :option-groups="{
          Morning: {
            10: '10am',
            11: '11am',
          },
          Afternoon: {
            15: '3pm',
            17: '5pm',
          },
        }"
      />
      <p>Textarea</p>
      <FormulateInput
        v-model="formValues.textarea"
        type="textarea"
        label="Enter a tweet in the box"
        validation="required|max:50,length"
        validation-name="tweet"
        error-behavior="live"
        :help="`Keep it under 50 characters. ${
          50 - formValues.textarea.length
        } left.`"
      />
      <p>File upload</p>
      <FormulateForm>
        <FormulateInput
          type="image"
          name="avatar"
          upload-url="/your/upload/directory"
          label="Your avatar"
          upload-behavior="delayed"
        />
      </FormulateForm>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ $config: { dev }, error }) {
    if (!dev) {
      error({ statusCode: 404 })
    }
  },
  data: () => ({
    formValues: {
      textarea: '',
    },
  }),
}
</script>
<style lang="scss">
.hero {
  @apply flex bg-primary items-center text-white h-40 mb-8;
  h1 {
    @apply font-serif text-3xl mb-2;
  }

  &-content {
    @apply p-5;
  }

  @screen md {
    @apply h-56;
    h1 {
      @apply text-4xl;
    }

    &-content {
      @apply p-20;
    }
  }
}
</style>
