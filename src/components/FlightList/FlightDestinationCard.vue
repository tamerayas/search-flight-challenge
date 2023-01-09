<template>
  <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
    <a-card-grid class="list-grid">
      <div class="card-content">
        <div class="destination-info">
          <span class="arrival">{{ flight.arrivalDateTimeDisplay }}</span>
          <span class="cit-code">{{ flight.originAirport.city.code }}</span>
          <span class="city-name">{{ flight.originAirport.city.name }}</span>
        </div>
        <div class="card-content-border"></div>
        <div class="destination-info">
          <span class="arrival">{{ flight.departureDateTimeDisplay }}</span>
          <span class="cit-code">{{
            flight.destinationAirport.city.code
          }}</span>
          <span class="city-name">{{
            flight.destinationAirport.city.name
          }}</span>
        </div>
        <div class="destination">
          <span>Uçuş Süresi</span>
          <span>{{ flight.flightDuration }}</span>
        </div>
      </div>
    </a-card-grid>
  </a-col>
</template>

<script>
export default {
  name: "FlightDestinationCard",
  props: {
    flight: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
</style>