<template>
  <div class="search-wrapper">
    <HeaderDivider />
    <div class="title">
      <span>Merhaba</span>
      <span>Nereyi keşfetmek istersiniz?</span>
      <div class="search-wrapper-content">
        <a-row :gutter="[24, 12]">
          <a-col span="7" :xs="24" :sm="12" :md="12" :lg="8" :xl="7">
            <a-select
              @change="handleDestinationSelect('Origin')"
              v-model:value="selectedOrigin"
              size="large"
              class="select"
              :options="originAirports"
            >
              <template #suffixIcon> <dingtalk-outlined /></template>
            </a-select>
          </a-col>
          <a-col span="7" :xs="24" :sm="12" :md="12" :lg="8" :xl="7">
            <a-select
              size="large"
              @change="handleDestinationSelect('Destination')"
              v-model:value="selectedDestination"
              class="select"
              :options="destinationAirports"
            >
              <template #suffixIcon> <dingtalk-outlined /></template>
            </a-select>
          </a-col>
          <a-col span="4" :xs="24" :sm="12" :md="12" :lg="8" :xl="4">
            <div class="border">
              <a-row>
                <a-col span="12">
                  <span style="line-height: 37px">Tarih</span>
                </a-col>
                <a-col span="12">
                  <span><calendar-outlined class="outlined" /></span>
                </a-col>
              </a-row>
            </div>
          </a-col>
          <a-col span="4" :xs="24" :sm="12" :md="12" :lg="12" :xl="3">
            <Popover
              :passenger-count="passengerCount"
              :selected-class="selectedClass"
              @set-passenger-count="setPassengerCount"
              @set-selected-class="setSelectedClass"
            />
          </a-col>
          <a-col span="2" :xs="24" :sm="24" :md="24" :lg="12" :xl="3">
            <div class="border red confirm" @click="confirm">
              <right-outlined class="outlined cursor" />
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderDivider from "@/components/HeaderDivider.vue";
import Popover from "@/components/Popover.vue";
import originAirports from "@/data/originAirports";
import flights from "@/data/flights";
import { message } from "ant-design-vue";

import {
  CalendarOutlined,
  RightOutlined,
  DingtalkOutlined,
} from "@ant-design/icons-vue";
export default {
  name: "SearchFlight",
  components: {
    HeaderDivider,
    Popover,
    CalendarOutlined,
    RightOutlined,
    DingtalkOutlined,
  },
  data() {
    return {
      originAirports: [],
      destinationAirports: [],
      passengerCount: 1,
      selectedOrigin: "Nereden",
      selectedDestination: "Nereye",
      selectedClass: 1,
    };
  },
  methods: {
    confirm() {
      if (
        this.selectedOrigin === "Nereden" ||
        this.selectedDestination === "Nereye"
      ) {
        message.warning("Lütfen gidiş ve dönüş alanlarını eksiksiz doldurun!");
        return;
      }
      const availableFlights = this.flights.filter(
        (flight) =>
          flight.destinationAirport.city.name === this.selectedDestination &&
          flight.originAirport.city.name === this.selectedOrigin
      );

      if (availableFlights.length === 0) {
        message.error("Aradığınız koşullarda sefer bulunamadı!");
        return;
      }

      this.saveToLocal(availableFlights);
      this.$router.push({ name: "FlightList" });
    },
    saveToLocal(availableFlights) {
      localStorage.setItem(
        "availableFlights",
        JSON.stringify(availableFlights)
      );
      localStorage.setItem("selectedOrigin", this.selectedOrigin);
      localStorage.setItem("selectedDestination", this.selectedDestination);
      localStorage.setItem("passengerCount", this.passengerCount);
      localStorage.setItem("selectedClass", this.selectedClass);
    },
    handleDestinationSelect(type) {
      if (this.selectedOrigin === this.selectedDestination) {
        message.error("Gidiş-dönüş yerleri aynı olamaz!");

        const index = this.originAirports.findIndex(
          (airport) => airport.value === this[`selected${type}`]
        );

        this[`selected${type}`] =
          this[`${type.toLowerCase()}Airports`][
            this[`${type.toLowerCase()}Airports`].length > index + 1
              ? index + 1
              : index - 1
          ].value;
      }
    },
    setPassengerCount(payload) {
      this.passengerCount = payload;
    },
    setSelectedClass(payload) {
      this.selectedClass = payload;
    },
  },
  created() {
    document.body.style.backgroundColor = "#063048";
    this.originAirports = originAirports;
    this.destinationAirports = originAirports;
    this.flights = flights.flights;

    this.selectedOrigin = localStorage.getItem("selectedOrigin") || "Nereden";
    this.selectedDestination =
      localStorage.getItem("selectedDestination") || "Nereye";
    this.passengerCount = Number(localStorage.getItem("passengerCount")) || 1;
    this.selectedClass = Number(localStorage.getItem("selectedClass")) || 1;
  },
};
</script>

<style lang="scss">
.search-wrapper {
  text-align: center;
  .title {
    color: #ffffff;
    font-size: 20px;
    font-weight: 400;
    margin-top: 100px;

    span {
      display: block;
    }
  }

  &-content {
    margin: auto;
    border: 1px solid transparent;
    width: 60%;
    padding: 10px;
    background-color: rgb(96 105 119 / 60%);

    .select {
      width: -webkit-fill-available;
      text-align: left;
    }
  }

  &-tooltip {
    &-header {
      color: grey;
      margin-top: 20px;

      .radio {
        font-size: 10px;
      }
    }

    &-footer {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      span {
        font-weight: bold;
      }
      button {
        background-color: lightgrey;
        width: 33px;
        border: none;
      }

      .footer-input {
        -webkit-appearance: none;
        border: none;
        text-align: center;
        width: 50px;
      }

      .flex {
        display: flex;
        flex-direction: row;
        column-gap: 4px;
      }
    }
  }
}

.border {
  border: 1px solid transparent;
  background-color: #242a38;
  height: 41px;
}

.count {
  position: absolute;
  top: -8px;
  right: 15px;
}

.outlined {
  line-height: 45px;
  font-size: 30px;
}

.cursor {
  cursor: pointer;
}

.cursor:hover {
  color: #bfbfbf;
}

.ant-select-arrow > span {
  font-size: 25px;
  line-height: 10px;
}

.ant-select-arrow .anticon > svg {
  position: relative;
  left: -20px;
  top: -4px;
}

.ant-tooltip-inner {
  background-color: #ffffff;
  color: grey;
  font-weight: 600;
}

.ant-input-number-handler-wrap {
  display: none;
}

.ant-input-number-input {
  text-align: center;
}

.red {
  background-color: #e81b32;
}

@media only screen and (max-width: 768px) {
  .search-wrapper-content {
    width: 100%;
  }
}
</style>