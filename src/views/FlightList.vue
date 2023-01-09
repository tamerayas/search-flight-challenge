<template>
  <div>
    <HeaderDivider :isList="true" />
    <div class="list-wrapper">
      <div class="list-content">
        <FlightListHeader @set-promotion-value="setPromotionValue" />
        <div class="flight-list">
          <a-card>
            <template #extra>
              <div class="flight-list-extra">
                <a-row :gutter="[18, 6]">
                  <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                    <span>Sıralama Kriteri</span>
                  </a-col>
                  <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                    <a-button size="small" @click="sortFlights('economyPrice')"
                      >Ekonomi Ücreti</a-button
                    >
                  </a-col>
                  <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <a-button size="small" @click="sortFlights('departureTime')"
                      >Kalkış Saati</a-button
                    >
                  </a-col>
                </a-row>
              </div>
            </template>
            <a-row
              :gutter="[10, 10]"
              v-for="(flight, flightIndex) in flights"
              :key="flightIndex"
            >
              <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                <a-card-grid class="list-grid">
                  <div class="card-content">
                    <div class="destination-info">
                      <span class="arrival">{{
                        flight.arrivalDateTimeDisplay
                      }}</span>
                      <span class="cit-code">{{
                        flight.originAirport.city.code
                      }}</span>
                      <span class="city-name">{{
                        flight.originAirport.city.name
                      }}</span>
                    </div>
                    <div class="card-content-border"></div>
                    <div class="destination-info">
                      <span class="arrival">{{
                        flight.departureDateTimeDisplay
                      }}</span>
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

              <FlightListFareCategory
                v-for="(category, classType) in flight.fareCategories"
                :key="classType"
                :category="category"
                :selected-radio-value="selectedRadioValue"
                :flight-index="flightIndex"
                :class-type="classType"
                @expand-packages="expandPackages"
              />

              <FlightListSubCategory
                v-for="(
                  expandData, expandedIndex
                ) in expandedData.subcategories"
                :key="expandedIndex"
                :flightIndex="flightIndex"
                :selectedFlightIndex="selectedFlightIndex"
                :expandData="expandData"
                @confirmFlight="confirmFlight"
              />
            </a-row>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderDivider from "@/components/HeaderDivider.vue";
import FlightListHeader from "@/components/FlightList/FlightListHeader.vue";
import FlightListSubCategory from "@/components/FlightList/FlightListSubCategory.vue";
import FlightListFareCategory from "@/components/FlightList/FlightListFareCategory.vue";
import sortFlights from "@/mixins/sortFlights";
import setPromotion from "@/mixins/setPromotion";
export default {
  name: "FlightList",
  components: {
    HeaderDivider,
    FlightListHeader,
    FlightListFareCategory,
    FlightListSubCategory,
  },
  mixins: [sortFlights, setPromotion],
  data() {
    return {
      flights: [],
      expandedData: [],
      selectedFlightIndex: 0,
      selectedRadioValue: null,
      selectedPackageType: null,
    };
  },
  methods: {
    expandPackages(category, type, flightIndex) {
      this.expandedData = category;
      this.selectedFlightIndex = flightIndex;
      this.selectedPackageType = type;
      this.selectedRadioValue = type + flightIndex;
    },
    confirmFlight(data) {
      if (data.status === "AVAILABLE") {
        localStorage.setItem("price", JSON.stringify(data.price));
        this.$router.push({ name: "SuccessfullSelection" });
      } else {
        this.$router.push({ name: "UnsuccessfullSelection" });
      }
    },
    setPromotionValue(val) {
      this.setPromotion(val);
    },
  },
  created() {
    document.body.style.backgroundColor = "#ffffff";
    this.flights = JSON.parse(localStorage.getItem("availableFlights"));
    this.sortFlights("default");
  },
};
</script>

<style lang="scss">
.list-wrapper {
  margin: auto;
  text-align: left;
  width: 70%;
  margin-top: 20px;

  .list-content {
    &-button {
      background-color: #e81b32;
      color: #ffffff;
      width: 100px;
    }

    &-info {
      font-size: 20px;
    }

    &-promotion {
      font-weight: 700;
      margin: 25px 0 25px 0;

      span {
        margin-right: 10px;
      }
    }

    .promotion-code-text p {
      font-weight: 400;
    }

    .flight-list {
      &-extra {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 10px;
        color: #ffffff;

        button {
          background-color: transparent;
          color: #ffffff;
        }
      }

      .list-grid {
        width: 100%;

        .class-information {
          display: flex;
          justify-content: space-between;
          line-height: 32px;
          .class-wrap {
            align-items: center;
            .circle span {
              font-size: 12px;
              color: gray;
            }
          }

          .class-type {
            text-decoration: underline;
          }

          .price-wrap {
            white-space: nowrap;
            span {
              display: block;
              text-align: center;
            }
            .passanger-info {
              font-size: 12px;
              color: gray;
            }
            .price {
              font-weight: 700;
            }
          }

          .arrow {
            display: flex;
            align-items: center;
          }
        }
      }

      .card-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        span {
          display: block;
        }

        .destination {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .destination span:nth-child(1) {
          font-size: 12px;
          color: gray;
          font-weight: 600;
        }

        .destination span:nth-child(2) {
          font-weight: 700;
        }

        .destination-info {
          .arrival {
            font-weight: 700;
          }

          .city-code {
            font-weight: 600;
            color: gray;
          }

          .city-name {
            font-size: 12px;
            font-weight: normal;
            color: gray;
          }
        }

        &-border {
          border: 1px solid #000000;
          transform: rotate(90deg);
        }
      }
    }
  }

  .packages {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    column-gap: 10px;
  }

  .package-header {
    display: flex;
    justify-content: space-between;

    &-brand {
      text-transform: capitalize;
      font-size: 17px;
      font-weight: 600;
    }

    &-price {
      .currency {
        font-size: 12px;
        font-weight: 400;
      }
      .amount {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }

  .package-footer-button {
    width: 100%;
    background-color: #e81b32;
    color: #ffffff;
    font-weight: 400;
    font-size: 14px;

    &:disabled {
      background-color: aliceblue;
      color: gray;
    }
  }

  .package-header-price {
    display: flex;
  }
}

.ant-card-body {
  padding: 12px;
  background-color: #f9f9f9;

  .ant-card-grid {
    background-color: #ffffff;
    min-height: 110px;
    padding: 15px;
  }
}

.ant-card-head {
  background-color: #063048;
  height: auto;
}

.ant-row {
  margin-bottom: 10px;
}

.ant-list {
  min-height: 250px;
}

.ant-list-header {
  background-color: aliceblue;
  height: 50px;
}

.ant-list-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 !important;
}

@media only screen and (max-width: 768px) {
  .list-wrapper {
    width: 100%;
  }
}
</style>