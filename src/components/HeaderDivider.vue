<template>
  <div class="header-wrapper">
    <div>
      <span>turkishairlines.com</span>
    </div>
    <div>
      <span class="header-search">search</span>
      <span>Flight Challenge</span>
    </div>
  </div>
  <a-divider class="divider" />
</template>

<script>
export default {
  name: "HeaderDivider",
};
</script>

<style lang="scss">
body {
  background-color: #063048;
  max-width: calc(100vw - 100px);
  margin: auto;
  background-color: #063048;
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  padding-top: 40px;

  .header-search {
    font-weight: normal;
  }

  span {
    color: #ffffff;
    font-weight: 700;
  }
}

.divider {
  margin: 0;
  background-color: #ffffff;
}
</style>