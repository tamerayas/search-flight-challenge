<template>
  <div>
    <HeaderDivider :isList="true" />
    <div class="list-wrapper">
      <div class="list-content">
        <a-button size="small" class="list-content-button">Uçuş</a-button>
        <div class="list-content-info">
          <span>{{ flightInformation }} </span>
        </div>
        <div class="list-content-promotion">
          <span> Promosyon Kodu </span>
          <a-switch
            v-model:checked="isPromotionActive"
            @change="setPromotion"
          />
        </div>
        <div class="promotion-code-text" v-if="isPromotionActive">
          <p>
            Promosyon Kodu seçeneği ile tüm Economy kabini Eco Fly paketlerini
            %50 indirimle satın alabilirsiniz!
          </p>
          <p>
            Promosyon Kodu seçeneği aktifken Eco Fly paketi haricinde seçim
            yapılamamaktadır.
          </p>
        </div>
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
                      <span>{{ flight.arrivalDateTimeDisplay }}</span>
                      <span>{{ flight.originAirport.city.code }}</span>
                      <span>{{ flight.originAirport.city.name }}</span>
                    </div>
                    <div class="card-content-border"></div>
                    <div class="destination-info">
                      <span>{{ flight.departureDateTimeDisplay }}</span>
                      <span>{{ flight.destinationAirport.city.code }}</span>
                      <span>{{ flight.destinationAirport.city.name }}</span>
                    </div>
                    <div class="destination">
                      <span>Uçuş Süresi</span>
                      <span>{{ flight.flightDuration }}</span>
                    </div>
                  </div>
                </a-card-grid>
              </a-col>
              <a-col
                :xs="24"
                :sm="12"
                :md="12"
                :lg="12"
                :xl="6"
                v-for="(category, index) in flight.fareCategories"
                :key="index"
              >
                <a-card-grid class="list-grid">
                  <div class="class-information">
                    <div class="class-wrap">
                      <div class="circle">
                        <a-radio
                          :checked="selectedRadioValue === index + flightIndex"
                          :value="selectedRadioValue === index + flightIndex"
                          @click="expandPackages(category, index, flightIndex)"
                        >
                          <span class="class-type">{{ index }}</span>
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
              <a-col
                :xs="24"
                :sm="12"
                :md="12"
                :lg="8"
                :xl="8"
                v-for="(
                  expandData, expandedIndex
                ) in expandedData.subcategories"
                :key="expandedIndex"
              >
                <div v-if="flightIndex === selectedFlightIndex">
                  <a-list
                    size="small"
                    bordered
                    :data-source="expandData.rights"
                  >
                    <template #renderItem="{ item }">
                      <a-list-item>{{ item }}</a-list-item>
                    </template>
                    <template #header>
                      <div class="package-header">
                        <span class="package-header-brand">{{
                          capitalizeWord(expandData.brandCode)
                        }}</span>
                        <div class="package-header-price">
                          <span class="currency">{{
                            expandData.price.currency
                          }}</span>
                          <span class="amount">{{
                            expandData.price.amount
                          }}</span>
                        </div>
                      </div>
                    </template>
                    <template #footer>
                      <a-button
                        size="large"
                        class="package-footer-button"
                        :disabled="expandData.isDisabled"
                        @click="confirmFlight(expandData)"
                        >Uçuşu Seç</a-button
                      >
                    </template>
                  </a-list>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderDivider from "@/components/HeaderDivider.vue";
import { DownOutlined } from "@ant-design/icons-vue";
import sortFlights from "@/mixins/sortFlights";
export default {
  name: "FlightList",
  components: {
    HeaderDivider,
    DownOutlined,
  },
  mixins: [sortFlights],
  data() {
    return {
      isPromotionActive: false,
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
    capitalizeWord(text) {
      return text.replace(/([a-z])([A-Z])/g, "$1 $2");
    },
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
    confirmFlight(data) {
      if (data.status === "AVAILABLE") {
        localStorage.setItem("price", JSON.stringify(data.price));
        this.$router.push({ name: "SuccessfullSelection" });
      } else {
        this.$router.push({ name: "UnsuccessfullSelection" });
      }
    },
  },
  created() {
    document.body.style.backgroundColor = "#ffffff";
    this.flights = JSON.parse(localStorage.getItem("availableFlights"));
    this.sortFlights("default");
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
            display: flex;
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
          span:nth-child(1) {
            font-weight: 700;
          }
          span:nth-child(2) {
            font-weight: 600;
            color: gray;
          }
          span:nth-child(3) {
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

@media only screen and (max-width: 768px) {
  .list-wrapper {
    width: 100%;
  }
}

.ant-card-body {
  padding: 12px;
  background-color: #f9f9f9;

  .ant-card-grid {
    background-color: #ffffff;
    min-height: 110px;
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
</style>