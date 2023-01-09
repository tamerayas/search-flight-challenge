<template>
  <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
    <a-card-grid class="list-grid">
      <div class="class-information">
        <div class="class-wrap">
          <div class="circle">
            <a-radio
              :checked="selectedRadioValue === classType + flightIndex"
              :value="selectedRadioValue === classType + flightIndex"
              @click="$emit('expandPackages', category, classType, flightIndex)"
            >
              <span class="class-type">{{ classType }}</span>
            </a-radio>
          </div>
        </div>
        <div class="price-wrap">
          <span class="passanger-info">Yolcu Başına</span>
          <span class="price"
            >{{ category.subcategories[0].price.currency }}
            {{ category.subcategories[0].price.amount }}</span
          >
        </div>
        <div class="arrow">
          <down-outlined />
        </div>
      </div>
    </a-card-grid>
  </a-col>
</template>

<script>
import { DownOutlined } from "@ant-design/icons-vue";

export default {
  name: "FlightListFareCategory",
  components: {
    DownOutlined,
  },
  props: {
    category: {
      type: Object,
      default: () => {},
    },
    selectedRadioValue: {
      type: String,
      default: false,
    },
    classType: {
      type: String,
      default: "",
    },
    flightIndex: {
      type: Number,
    },
  },
};
</script>

<style>
</style>