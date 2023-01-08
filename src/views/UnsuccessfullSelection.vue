<template>
  <HeaderDivider :isList="true" />
  <div class="unsuccess-wrapper">
    <div class="unsuccess-header">
      <close-circle-outlined class="unsuccess-icon" />
      <span class="unsuccess-text">Kabin seçiminiz tamamlanamadı.</span>
    </div>
    <a-divider></a-divider>
    <div class="unsuccess-footer">
      <a-button class="footer-button" @click="backToTop">Başa Dön</a-button>
    </div>
  </div>
</template>

<script>
import HeaderDivider from "@/components/HeaderDivider.vue";
import { CloseCircleOutlined } from "@ant-design/icons-vue";

export default {
  name: "UnsuccessfullSelection",
  components: {
    HeaderDivider,
    CloseCircleOutlined,
  },
  data() {
    return {
      price: JSON.parse(localStorage.getItem("price")),
    };
  },
  methods: {
    backToTop() {
      this.$router.push({ name: "Home" })
    }
  }
};
</script>

<style lang="scss">
.unsuccess-wrapper {
  margin: auto;
  width: 50%;

  .unsuccess-header {
    display: flex;
    align-items: center;
    margin: 30px 0 30px 0;

    .unsuccess-icon {
      font-size: 25px;
      background-color: #db0412;
      color: #ffffff;
      border-radius: 50%;
      border: 1px solid transparent;
    }
  }

  .unsuccess-text {
    margin-left: 30px;
    font-weight: bold;
  }

  .unsuccess-footer {
    text-align: right;

    button {
      background-color: #e81b32;
      color: #ffffff;
      font-weight: 400;
      font-size: 12px;
      width: 110px;
    }
  }
}

.ant-divider-horizontal {
  margin: 15px 0;
  background-color: black;
  opacity: 0.3;
}
</style>