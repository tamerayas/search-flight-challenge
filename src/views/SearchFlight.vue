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
            ></a-select>
          </a-col>
          <a-col span="7">
            <a-select
              size="large"
              v-model:value="selectedDestination"
              class="select"
              :options="destinationAirports"
            ></a-select>
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
              <div>
                <user-outlined class="outlined" v-if="personCount === 1" />
                <team-outlined class="outlined" v-else-if="personCount === 2" />
                <usergroup-add-outlined class="outlined" v-else />
              </div>
              <div class="count">{{ personCount }}</div>
            </div>
          </a-col>
          <a-col span="2">
            <div class="border">
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
  },
  data() {
    return {
      originAirports: [],
      destinationAirports: [],
      personCount: 1,
      selectedOrigin: "Nereden",
      selectedDestination: "Nereye",
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
    justify-content: space-evenly;
    flex-direction: column;
    display: flex;
    background-color: rgb(96 105 119 / 60%);

    .select {
      width: 250px;
      text-align: left;
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
</style>