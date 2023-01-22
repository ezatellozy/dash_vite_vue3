<template>
  <section class="headSection main-filter">
    <form
      v-if="false"
      @submit.prevent
      class="w-100 d-flex justify-content-between align-items-center flex-wrap"
    >
      <div class="frm-controls w-100 p-0">
        <div class="col-md-5" v-if="withSearch">
          <div class="input_wrapper top_label">
            <label for="searchInput" class="form-label">بحث عن</label>
            <v-text-field
              id="searchInput"
              prepend-icon="mdi-magnify"
              v-model="frmData.searchInput"
              @input="setKeyWord"
            ></v-text-field>
          </div>
        </div>

        <div class="categories col-sm-6 col-md-4 col-xxl-3" v-if="type">
          <div class="select-wrapper">
            <div class="input_wrapper top_label">
              <label for="" class="form-label">النوع</label>
              <multiselect
                v-model="frmData.type"
                :options="leaguesTypes"
                label="name"
                track-by="value"
                :show-labels="false"
                placeholder=""
                :searchable="true"
                @input="getResult"
              ></multiselect>
            </div>
          </div>
        </div>

        <div class="date col-sm-6 col-md-4 col-xxl-3" v-if="dateStart">
          <div class="select-wrapper">
            <div class="input_wrapper top_label">
              <label for="" class="form-label">
                {{ startAt ? 'تاريخ البدء' : ' التاريخ' }}
              </label>
              <v-menu
                ref="dateStartModal"
                v-model="dateStartModal"
                :close-on-content-click="false"
                :return-value.sync="frmData.dateStart"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <!-- multiple
                  chips
                  small-chips -->
                  <v-combobox
                    v-model="frmData.dateStart"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-combobox>
                </template>
                <!-- multiple -->
                <v-date-picker
                  @input="
                    () => {
                      getResult()
                      dateStartModal = false
                      $refs.dateStartModal.save(frmData.dateStart)
                    }
                  "
                  v-model="frmData.dateStart"
                  no-title
                  scrollable
                >
                  <!-- <v-btn
                    text
                    color="primary"
                    @click="
                      frmData.dateStart = ''
                      $refs.dateStartModal.save(frmData.dateStart)
                      dateStartModal = false
                      getResult()
                    "
                  >
                    الغاء
                  </v-btn> -->
                </v-date-picker>
              </v-menu>
            </div>
          </div>
        </div>
        <div class="date col-sm-6 col-md-4 col-xxl-3" v-if="dateEnd">
          <div class="select-wrapper">
            <div class="input_wrapper top_label">
              <label for="" class="form-label">
                تاريخ الانتهاء
              </label>
              <v-menu
                ref="dateEndModal"
                v-model="dateEndModal"
                :close-on-content-click="false"
                :return-value.sync="frmData.dateEnd"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <!-- multiple
                  small-chips -->
                  <v-combobox
                    v-model="frmData.dateEnd"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-combobox>
                </template>
                <!-- multiple -->
                <v-date-picker
                  @input="
                    () => {
                      getResult()
                      dateEndModal = false
                      $refs.dateEndModal.save(frmData.dateEnd)
                    }
                  "
                  v-model="frmData.dateEnd"
                  no-title
                  scrollable
                >
                  <v-btn
                    text
                    color="primary"
                    @click="
                      () => {
                        frmData.dateEnd = ''
                        $refs.dateEndModal.save(frmData.dateEnd)
                        dateEndModal = false
                        getResult()
                      }
                    "
                  >
                    الغاء
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </div>
          </div>
        </div>
        <!-- <div class="categories col-sm-6 col-md-4 col-xxl-3" v-if="status">
          <div class="select-wrapper">
            <div class="input_wrapper top_label">
              <label for="" class="form-label">
                الحالة
              </label>
              <multiselect
                v-model="frmData.status"
                :options="orderStatusItems"
                label="label"
                track-by="name"
                :show-labels="false"
                placeholder=""
                :searchable="true"
                @input="getResult"
              ></multiselect>
            </div>
          </div>
        </div> -->
        <div
          class="categories col-sm-6 col-md-4 col-xxl-3"
          v-if="(users && clients)"
        >
          <div class="select-wrapper">
            <div class="input_wrapper top_label auto_complete">
              <label for="" class="form-label">
                المستخدمين
              </label>

              <v-autocomplete
                v-model="frmData.user"
                :search-input.sync="userKey.input"
                :items="clients"
                item-text="fullname"
                item-value="id"
                placeholder="المستخدمين"
                @input="getResult()"
                :hide-no-data="!clients"
                dense
              ></v-autocomplete>
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    type: {
      type: Boolean,
      default: false,
    },

    dateStart: {
      type: Boolean,
      default: false,
    },
    dateEnd: {
      type: Boolean,
      default: false,
    },

    withSearch: {
      type: Boolean,
      default: true,
    },

    users: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dateStartModal: false,
      dateEndModal: false,
      frmData: {
        searchInput: null,
        type: null,
        dateStart: null,
        dateEnd: null,
        user: null,
      },
      userKey: {
        input: '',
        keyword: '',
      },
    }
  },
  watch: {
    ['userKey.input'](newVal) {
      if (newVal) {
        this.userKey.keyword = newVal

        this.get_filterd_users()
      }
    },
    ['frmData.dateStart'](newVal) {
      if (newVal) {
        this.getResult()
      }
    },
    ['frmData.dateEnd'](newVal) {
      if (newVal) {
        this.getResult()
      }
    },
  },
  mounted() {
    if (this.$route.query.keyword) {
      this.frmData.searchInput = this.$route.query.keyword
      // this.getResult()
    }
  },
  methods: {
    getResult() {
      this.$emit('getResult', this.frmData)
    },

    setKeyWord(e) {
      this.$router.replace(`?keyword=${e}`).catch(() => {})
    },
  },
  watch: {
    ['$route.query.keyword'](newVal) {
      this.frmData.searchInput = newVal
      this.getResult()
    },
  },

  computed: {
    leaguesTypes() {
      return [
        {
          name: 'دوري محلي',
          value: 'league',
        },
        {
          name: 'دوري ابطال',
          value: 'championship',
        },
      ]
    },
  },
}
</script>

<style lang="scss">
.main-filter {
  .frm-controls {
    display: flex;
    flex-wrap: wrap;

    .form-control {
      // background: var(--mainBgColor) !important;
      // color: var(--blackColor) !important;
      border: none;
      height: 45px;
    }

    .v-text-field {
      padding-top: 0;
      margin-top: 0;
      // background: var(--mainBgColor) !important;
      border-radius: 0.375rem;
      align-items: center;
    }
    .v-autocomplete.v-input > .v-input__control > .v-input__slot::before {
      display: none;
    }
    .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
      display: none;
    }
  }
  form {
    .form-control {
      width: 100% !important;
    }
    .form-action {
      width: 100% !important;
    }
    min-height: 55px;
  }

  .search-icon {
    color: var(--blackColor) !important;
  }
  .v-text-field__details {
    display: none;
  }

  .v-input__slot {
    margin: 0;
    height: 45px !important;
    box-shadow: none !important;
  }
  .v-text-field.v-text-field--solo .v-input__control {
    min-height: auto !important;
  }
  .row {
    margin: 0;
    > div {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
  }

  a.btn {
    background: var(--mainColor-2) !important;
    color: #fff !important;
    height: 45px;
    font-size: 16px;
    line-height: 30px;
  }
  .multiselect__tags {
    height: 45px;
    text-align: start;

    border: none;
    .multiselect__tags-wrap {
      display: flex;
      overflow-x: auto;
    }

    .multiselect__element {
      text-align: start !important;
    }
    .multiselect__single {
      background: var(--mainBgColor);
    }
  }
  .multiselect__content-wrapper {
    background: var(--mainBgColor) !important;
    border: none;
  }

  .v-input input {
    padding: 6px 12px;
    & ~ label {
      right: 6px !important;
    }
  }

  .v-text-field
    > .v-input__control
    > .v-input__slot
    > .v-text-field__slot
    label {
    right: 6px !important;
  }

  .input_wrapper {
    margin-block: 10px !important;
  }
}
</style>
