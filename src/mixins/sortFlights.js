export default {
  methods: {
    sortFlights(type) {
      switch (type) {
        case 'departureTime':
          this.flights = this.flights.sort((a, b) => {

            // aSplitHours[0] refers to hour, aSplitHours[1] refers to minute
            const aSplitHours = a.departureDateTimeDisplay.split(':');
            const aDate = new Date().setHours(aSplitHours[0], aSplitHours[1]);

            const bSplitHours = b.departureDateTimeDisplay.split(':');
            const bDate = new Date().setHours(bSplitHours[0], bSplitHours[1]);

            return new Date(aDate) - new Date(bDate);
          })
          break;

        case 'economyPrice':
          this.flights = this.flights.sort((a, b) => (a.fareCategories["ECONOMY"].subcategories[0].price.amount
            - b.fareCategories["ECONOMY"].subcategories[0].price.amount))
          break;

        default:
          this.flights = this.flights.sort((a, b) => (a.fareCategories["BUSINESS"].subcategories[0].price.amount
            - b.fareCategories["BUSINESS"].subcategories[0].price.amount))
          break;
      }
    }
  }
}