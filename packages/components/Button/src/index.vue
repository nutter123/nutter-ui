<template>
  <div class="n-button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "n-button",
  props: {
    type: String
  }
};
</script>
