<script lang="ts">
  let {bgColor, class: classes = '', children, ...restProps} = $props();
</script>

<div {...restProps} class={`${classes} hero-content`} style:--background-color={bgColor}>
  {@render children()}
</div>

<style lang="scss">
  .hero-content {
    background-color: var(--background-color);
    height: 29.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    :global(.tagline) {
      height: 2.813rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
