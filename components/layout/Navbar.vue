<template>
  <div class="z-50">
    <nav class="navbar">
      <ul>
        <li>
          <n-link to="/" exact><span class="ml-1">Home</span></n-link>
        </li>
        <li>
          <n-link to="/contact"><span class="ml-1">Kontakt</span> </n-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>
<style lang="scss">
.navbar {
  @apply bg-white antialiased border-t border-grey-light p-2;

  ul {
    @apply list-none overflow-hidden flex justify-between w-full max-w-sm mx-auto;
  }

  li {
    a {
      @apply flex items-center text-black font-semibold;
      @apply p-3 mx-0;
      @apply transition duration-300 ease-in-out;

      &:hover {
        @apply text-primary no-underline;
      }
    }
    .nuxt-link-active {
      @apply text-primary no-underline;
    }
  }
}
</style>
