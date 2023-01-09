<template>
  <a-button size="small" class="list-content-button">Uçuş</a-button>
  <div class="list-content-info">
    <span>{{ flightInformation }} </span>
  </div>
  <div class="list-content-promotion">
    <span> Promosyon Kodu </span>
    <a-switch v-model:checked="isPromotionActive" @change="setIsPromotionActive" />
  </div>
  <div class="promotion-code-text" v-if="isPromotionActive">
    <p>
      Promosyon Kodu seçeneği ile tüm Economy kabini Eco Fly paketlerini %50
      indirimle satın alabilirsiniz!
    </p>
    <p>
      Promosyon Kodu seçeneği aktifken Eco Fly paketi haricinde seçim
      yapılamamaktadır.
    </p>
  </div>
</template>

<script>
export default {
  name: "FligthListHeader",
  inheritAttrs: false,
  data() {
    return {
      isPromotionActive: false
    }
  },
  methods: {
    setIsPromotionActive(value) {
      this.isPromotionActive = value;
      this.$emit('setPromotionValue', value)
    }
  },
  computed: {
    flightInformation() {
      const selectedOrigin = localStorage.getItem("selectedOrigin");
      const selectedDestination = localStorage.getItem("selectedDestination");
      const passengerCount = localStorage.getItem("passengerCount");

      return `${selectedOrigin} - ${selectedDestination}, ${passengerCount} Yolcu`;
    },
  },
};
</script>