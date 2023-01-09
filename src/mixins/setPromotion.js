export default {
  methods: {
    setPromotion(value) {
      if (!value) {
        this.flights = JSON.parse(localStorage.getItem("availableFlights"));

        if (this.expandedData?.subcategories?.length > 0) {
          this.expandedData =
            this.flights[this.selectedFlightIndex].fareCategories[
            this.selectedPackageType
            ];
        }
        return;
      }
      this.flights.forEach((flight) => {
        Object.keys(flight.fareCategories).map((category) => {
          flight.fareCategories[category].subcategories.map((subCategory) => {
            subCategory.isDisabled = false;
            if (subCategory.brandCode === "ecoFly") {
              subCategory.price = {
                ...subCategory.price,
                amount:
                  subCategory.price.amount - subCategory.price.amount * 0.5,
              };
            } else {
              subCategory.isDisabled = true;
            }
          });
        });
      });
    },
  }
}