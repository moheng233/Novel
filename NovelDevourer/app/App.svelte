<script lang="typescript">
  import show from './show.svelte';

  let message: string = "Blank Svelte Native App";

  console.info('APP Lance')
</script>

<style>
  .info .fas {
    color: #3a53ff;
  }
  .info {
    font-size: 20;
  }
</style>

<page>
  <actionBar title="Svelte Native App" />
  <gridLayout>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label
      class="info"
      horizontalAlignment="center"
      verticalAlignment="middle"
      textWrap="true">
      <formattedString>
        <span class="fas" text="&#xf135;" />
        <span text=" {message}" />
      </formattedString>
    </label>
  </gridLayout>
</page>
