<template>
  <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
    <div v-if="flightIndex === selectedFlightIndex">
      <a-list size="small" bordered :data-source="expandData.rights">
        <template #renderItem="{ item }">
          <a-list-item>{{ item }}</a-list-item>
        </template>
        <template #header>
          <div class="package-header">
            <span class="package-header-brand">{{
              capitalizeWord(expandData.brandCode)
            }}</span>
            <div class="package-header-price">
              <span class="currency">{{ expandData.price.currency }}</span>
              <span class="amount">{{ expandData.price.amount }}</span>
            </div>
          </div>
        </template>
        <template #footer>
          <a-button
            size="large"
            class="package-footer-button"
            :disabled="expandData.isDisabled"
            @click="$emit('confirmFlight', expandData)"
            >Uçuşu Seç</a-button
          >
        </template>
      </a-list>
    </div>
  </a-col>
</template>

<script>
export default {
  name: "FlightListSubCategory",
  props: {
    flightIndex: {
      type: Number,
    },
    selectedFlightIndex: {
      type: Number,
    },
    expandData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    capitalizeWord(text) {
      return text.replace(/([a-z])([A-Z])/g, "$1 $2");
    },
  },
};
</script>

<style>
</style>