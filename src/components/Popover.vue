<template>
  <div class="border">
    <a-tooltip placement="bottom">
      <div class="count">{{ passengerCount }}</div>
      <template #title>
        <span>Kabin ve yolcu seçimi</span>
        <div class="search-wrapper-tooltip-header">
          <a-radio-group v-model:value="selectedClassValue" name="radioGroup">
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
                @click="passengerCount > 1 ? (passengerCount -= 1) : ''"
                :disabled="passengerCount === 1"
                >-</a-button
              >
              <a-input-number
                type="number"
                class="footer-input"
                v-model:value="passengerCountValue"
              />
              <a-button @click="passengerCount += 1">+</a-button>
            </a-col>
          </a-row>
        </div>
      </template>
      <div>
        <user-outlined class="outlined" v-if="passengerCount === 1" />
        <team-outlined class="outlined" v-else-if="passengerCount === 2" />
        <usergroup-add-outlined class="outlined" v-else />
      </div>
    </a-tooltip>
  </div>
</template>

<script>
import {
  UserOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
} from "@ant-design/icons-vue";
export default {
  name: "Popover",
  components: {
    UserOutlined,
    UsergroupAddOutlined,
    TeamOutlined,
  },
  props: {
    passengerCount: {
      default: 1,
      type: Number,
    },
    selectedClass: {
      default: 1,
      type: Number,
    },
  },
  computed: {
    passengerCountValue: {
      get() {
        return this.passengerCount;
      },
      set(val) {
        if (val > 0) this.$emit("setPassengerCount", val);
      },
    },
    selectedClassValue: {
      get() {
        return this.selectedClass;
      },
      set(val) {
        this.$emit("setSelectedClass", val);
      },
    },
  },
};
</script>