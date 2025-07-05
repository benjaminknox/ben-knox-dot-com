
<div class="wrapper">
  <image class="me" src="/me.jpg" />
  <section>
    <h3>About</h3>
    <p>Hey there, I'm Ben Knox, the guy behind this tech and design blog. I'm all about geeking out over the latest in technology and design—it's what gets me out of bed in the morning. I've spent years diving deep into these fields, fueled by a real love for the craft and a constant itch to learn more. Through this blog, I’m excited to share what I’ve picked up along the way, from hands-on projects to those "aha!" moments that keep me hooked. Let’s explore this ever-changing world of tech and design together!</p>
  </section>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    gap: 3.125rem;
    margin: 2rem 0;
    padding: 0 1.5rem;

    .me {
      width: 23.75rem;
      border-radius: 50%;
    }

    section {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      color: var(--color-raisin-black);

      p {
        line-height: 2.188rem;
        font-weight: 300;
      }

      h3 {
        text-align: center;
        height: 3.25rem;
        font-weight: 500;
      }
    }
  }
</style>
