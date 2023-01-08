<template>
  <HeaderDivider :isList="true" />
  <div class="success-wrapper">
    <div class="success-header">
      <check-circle-outlined class="success-icon" />
      <span class="success-text">Kabin seçiminiz tamamlandı.</span>
    </div>
    <a-divider></a-divider>
    <div class="price">
      <span class="price-text">Toplam Tutar</span>
      <span class="price-value">{{ price.currency }} {{ price.amount }}</span>
    </div>
  </div>
</template>

<script>
import HeaderDivider from "@/components/HeaderDivider.vue";
import { CheckCircleOutlined } from "@ant-design/icons-vue";

export default {
  name: "SuccessfullSelection",
  components: {
    HeaderDivider,
    CheckCircleOutlined,
  },
  data() {
    return {
      price: JSON.parse(localStorage.getItem("price")),
    };
  },
};
</script>

<style lang="scss">
.success-wrapper {
  margin: auto;
  width: 50%;

  .success-header {
    display: flex;
    align-items: center;
    margin: 30px 0 30px 0;

    .success-icon {
      font-size: 25px;
      background-color: #46c772;
      color: #ffffff;
      border-radius: 50%;
      border: 1px solid transparent;
    }
  }

  .success-text {
    margin-left: 30px;
    font-weight: bold;
  }

  .price {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .price-text {
      font-size: 18px;
      font-weight: 400;
    }

    .price-value {
      font-size: 16px;
      color: blue;
    }
  }
}

.ant-divider-horizontal {
  margin: 15px 0;
  background-color: black;
  opacity: 0.3;
}
</style>