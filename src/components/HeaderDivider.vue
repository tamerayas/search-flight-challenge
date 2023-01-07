<template>
  <div class="header-wrapper" :class="{ list: isList }">
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
  props: {
    isList: {
      required: false,
      default: false,
      type: Boolean
    },
  },
};
</script>

<style lang="scss">
body {
  max-width: calc(100vw - 100px);
  margin: auto;
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

.list {
  span {
    color: #000000;
  }

  .ant-divider .ant-divider-horizontal .divider{
    background-color: #000000;
  }

  & ~ .divider {
    background-color: #000000;
  }
}
</style>