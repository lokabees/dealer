<template>
  <div class="bg-primary-lightest">
    <div
      class="container grid grid-cols-3 gap-6 my-16 pt-12 w-full border-t border-grey-dark"
    >
      <div class="text-center grid">
        <n-link class="text-grey-dark font-medium" to="/imprint">{{
          $t('footer.links.imprint')
        }}</n-link>
        <n-link class="text-grey-dark font-medium" to="/privacy">{{
          $t('footer.links.privacy')
        }}</n-link>
      </div>
      <div class="col-span-1 flex justify-center">
        <div>
          <a
            href="https://github.com/lokabees"
            target="_blank"
            class="bg-primary-lighter rounded-full w-10 h-10 flex m-2"
          >
            <eva-icon class="m-auto" name="twitter" fill="#19AE9D" />
          </a>
        </div>
        <div>
          <a
            href="https://github.com/lokabees"
            target="_blank"
            class="bg-primary-lighter rounded-full w-10 h-10 flex m-2"
          >
            <eva-icon class="m-auto" name="github" fill="#19AE9D" />
          </a>
        </div>
      </div>
      <div class="text-center grid">
        <n-link class="text-grey-dark font-medium" to="/contact">{{
          $t('footer.links.contact')
        }}</n-link>
        <n-link class="text-grey-dark font-medium" to="/terms">{{
          $t('footer.links.terms')
        }}</n-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
