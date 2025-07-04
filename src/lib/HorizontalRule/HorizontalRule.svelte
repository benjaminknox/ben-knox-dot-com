<script lang="ts">
  let { children } = $props();
</script>

<div class="wrapper">
  {@render children()}
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    height: 6.625rem;
    font-weight: 200;

    &:before,
    &:after {
      content: "";
      flex: 1;
      height: 1px;
      margin: 0 1em;
      background: var(--color-champagne-pink);
    }
  }
</style>
