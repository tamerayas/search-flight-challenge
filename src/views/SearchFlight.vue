<template>
  <div class="search-wrapper">
    <HeaderDivider />
    <div class="title">
      <span>Merhaba</span>
      <span>Nereyi keşfetmek istersiniz?</span>
      <div class="search-wrapper-content">
        <a-row :gutter="24">
          <a-col span="7">
            <a-select
              v-model:value="selectedOrigin"
              size="large"
              class="select"
              :options="originAirports"
            >
              <template #suffixIcon> <dingtalk-outlined /></template>
            </a-select>
          </a-col>
          <a-col span="7">
            <a-select
              size="large"
              v-model:value="selectedDestination"
              class="select"
              :options="destinationAirports"
            >
              <template #suffixIcon> <dingtalk-outlined /></template>
            </a-select>
          </a-col>
          <a-col span="4">
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
          <a-col span="4">
            <div class="border">
              <a-tooltip placement="bottom">
                <div class="count">{{ passengerCount }}</div>
                <template #title>
                  <span>Kabin ve yolcu seçimi</span>
                  <div class="search-wrapper-tooltip-header">
                    <a-radio-group
                      v-model:value="classSelection"
                      name="radioGroup"
                    >
                      <a-radio :value="1" class="radio">Economy Class</a-radio>
                      <a-radio :value="2" class="radio">Business Class</a-radio>
                    </a-radio-group>
                  </div>
                  <div class="search-wrapper-tooltip-footer">
                    <a-row>
                      <a-col span="10">
                        <span>Yolcu</span>
                      </a-col>
                      <a-col span="14" class="flex">
                        <a-button
                          @click="
                            passengerCount > 1 ? (passengerCount -= 1) : ''
                          "
                          :disabled="passengerCount === 1"
                          >-</a-button
                        >
                        <a-input-number
                          type="number"
                          class="footer-input"
                          v-model:value="passengerCount"
                        />
                        <a-button @click="passengerCount += 1">+</a-button>
                      </a-col>
                    </a-row>
                  </div>
                </template>
                <div>
                  <user-outlined class="outlined" v-if="passengerCount === 1" />
                  <team-outlined
                    class="outlined"
                    v-else-if="passengerCount === 2"
                  />
                  <usergroup-add-outlined class="outlined" v-else />
                </div>
              </a-tooltip>
            </div>
          </a-col>
          <a-col span="2">
            <div class="border red">
              <right-outlined class="outlined confirm" />
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderDivider from "@/components/HeaderDivider.vue";
import originAirports from "@/data/originAirports";
import {
  CalendarOutlined,
  RightOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  DingtalkOutlined,
} from "@ant-design/icons-vue";
export default {
  name: "SearchFlight",
  components: {
    HeaderDivider,
    CalendarOutlined,
    RightOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    TeamOutlined,
    DingtalkOutlined,
  },
  data() {
    return {
      originAirports: [],
      destinationAirports: [],
      passengerCount: 1,
      selectedOrigin: "Nereden",
      selectedDestination: "Nereye",
      classSelection: 1,
    };
  },
  created() {
    this.originAirports = originAirports;
    this.destinationAirports = originAirports;
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
    width: 50%;
    padding: 10px;
    flex-direction: column;
    background-color: rgb(96 105 119 / 60%);

    .select {
      width: 200px;
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

.confirm {
  cursor: pointer;
}

.confirm:hover {
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
  background-color: red;
}
</style>