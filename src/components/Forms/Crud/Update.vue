<template>
  <div class="create_wrapper">
    <div class="custom_card">
      <!-- START:: CARD TITLE -->
      <div class="card-header">
        <h4 class="card-title">{{ $t("CRUD.Update.main_title") }}</h4>
      </div>
      <!-- END:: CARD TITLE -->

      <!-- START:: UPDATE FORM WRAPPER -->
      <form @submit.prevent="validateCreateForm">
        <div class="container">
          <div class="row justify-content-between">
            <!-- START:: INPUT WRAPPER -->
            <uplode-image-2 @inputChanged="uplodeImg_1"></uplode-image-2>
            <!-- END:: INPUT WRAPPER -->

            <!-- START:: INPUT WRAPPER -->
            <div class="col-lg-6 py-0">
              <!-- START:: NAME INPUT -->
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  id="name_input"
                  @input="checkIfInputIsEmpty"
                  v-model.trim="updateData.name"
                />
                <label for="name_input" class="form-label">Name</label>
              </div>
              <!-- END:: NAME INPUT -->
            </div>
            <!-- END:: INPUT WRAPPER -->

            <!-- START:: INPUT WRAPPER -->
            <div class="col-lg-6 py-0">
              <!-- START:: NUMBER INPUT -->
              <div class="input_wrapper top_label">
                <input
                  type="number"
                  class="form-control"
                  id="user_id"
                  @input="checkIfInputIsEmpty"
                  v-model.trim="updateData.user_id"
                />
                <label for="user_id" class="form-label">ID</label>
              </div>
              <!-- END:: NUMBER INPUT -->
            </div>
            <!-- END:: INPUT WRAPPER -->

            <!-- START:: INPUT WRAPPER -->
            <div class="col-lg-6 py-0">
              <!-- START:: PHONE INPUT -->
              <div class="input_wrapper top_label">
                <input
                  type="tel"
                  class="form-control"
                  id="phone_input"
                  @input="checkIfInputIsEmpty"
                  v-model.trim="updateData.phone"
                />
                <label for="phone_input" class="form-label">Phone Number</label>
              </div>
              <!-- END:: PHONE INPUT -->
            </div>
            <!-- END:: INPUT WRAPPER -->

            <!-- START:: INPUT WRAPPER -->
            <div class="col-lg-6 py-0">
              <!-- START:: EMAIL INPUT -->
              <div class="input_wrapper top_label">
                <input
                  type="email"
                  class="form-control"
                  id="email_input"
                  @input="checkIfInputIsEmpty"
                  v-model.trim="updateData.email"
                />
                <label for="email_input" class="form-label"
                  >Email Address</label
                >
              </div>
              <!-- END:: EMAIL INPUT -->
            </div>
            <!-- END:: INPUT WRAPPER -->

            <!-- START:: INPUT WRAPPER -->
            <div class="col-lg-6 py-0">
              <!-- START:: FILE INPUT -->
              <div class="input_wrapper top_label file_input">
                <span class="file_input_label"> File Input </span>
                <label for="file_input" class="form-label" v-if="!selectedFile.file"></label>
                <label for="file_input" class="form-label" v-else> {{selectedFile.name}} </label>
                <input type="file" class="form-control" id="file_input" @change="handelSelectedFile"/>
              </div>
              <!-- END:: FILE INPUT -->
            </div>
            <!-- END:: INPUT WRAPPER -->

            <!-- START:: INPUT WRAPPER -->
            <div class="col-lg-6 py-0">
              <!-- START:: SINGLE SELECT INPUT -->
              <div class="input_wrapper top_label">
                <label class="form-label">Single Select Input</label>
                <multiselect
                  v-model="single_select_value"
                  :options="single_select_options"
                  label="name"
                  track-by="name"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                >
                </multiselect>
              </div>
              <!-- END:: SINGLE SELECT INPUT -->
            </div>
            <!-- END:: INPUT WRAPPER -->

            <!-- START:: INPUT WRAPPER -->
            <div class="col-lg-6 py-0">
              <!-- START:: MULTIPLE SELECT INPUT -->
              <div class="input_wrapper top_label">
                <label class="form-label">Multiple Select Input</label>
                <multiselect
                  v-model="multiple_select_value"
                  :options="multiple_select_options"
                  label="name"
                  track-by="name"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                  :multiple="true"
                >
                </multiselect>
              </div>
              <!-- END:: MULTIPLE SELECT INPUT -->
            </div>
            <!-- END:: INPUT WRAPPER -->

            <!-- START:: INPUT WRAPPER -->
            <div class="col-lg-6 py-0">
              <!-- START:: DATE PICKER INPUT -->
              <div class="input_wrapper top_label date_input">
                <label class="form-label">Date Input</label>
                <v-menu
                  v-model="dateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Picker without buttons"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="menu2 = false"
                    no-title
                  ></v-date-picker>
                </v-menu>
              </div>
              <!-- END:: DATE PICKER INPUT -->
            </div>
            <!-- END:: INPUT WRAPPER -->

            <!-- START:: INPUT WRAPPER -->
            <div class="col-lg-6 py-0">
              <!-- START:: TIME PICKER INPUT -->
              <div class="input_wrapper top_label time_input">
                <label class="form-label">Time Input</label>
                <v-menu
                  ref="menu"
                  v-model="timeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time"
                      label="Picker in menu"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timeMenu"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
              </div>
              <!-- END:: TIME PICKER INPUT -->
            </div>
            <!-- END:: INPUT WRAPPER -->

            <!-- START:: INPUT WRAPPER -->
            <div class="col-lg-12 py-0">
              <!-- START:: TEXT AREA -->
              <div class="input_wrapper top_label">
                <label for="desc" class="form-label">Description</label>
                <textarea class="form-control" id="desc" v-model.trim="updateData.desc" rows="5"></textarea>
              </div>
              <!-- END:: TEXT AREA -->
            </div>
            <!-- START:: INPUT WRAPPER -->

            <!-- START:: INPUT WRAPPER -->
            <div class="col-lg-6 py-0">
              <!-- START:: PASSWORD INPUT -->
              <div class="input_wrapper top_label">
                <label for="password_input" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password_input"
                  @input="checkIfInputIsEmpty"
                  v-model.trim="updateData.password"
                />
                <button
                  type="button"
                  class="toggle_pass_btn"
                  @click="togglePasswordVisibility"
                >
                  <i class="fal fa-eye open_eye"></i>
                  <i class="fal fa-eye-slash closed_eye"></i>
                </button>
              </div>
              <!-- END:: PASSWORD INPUT -->
            </div>
            <!-- START:: INPUT WRAPPER -->

            <!-- START:: INPUT WRAPPER -->
            <div class="col-lg-6 py-0">
              <!-- START:: PASSWORD INPUT -->
              <div class="input_wrapper top_label">
                <label for="password_confirmation_input" class="form-label"
                  >Confirm Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="password_confirmation_input"
                  @input="checkIfInputIsEmpty"
                  v-model.trim="updateData.password_confirmation"
                />
                <button
                  type="button"
                  class="toggle_pass_btn"
                  @click="togglePasswordVisibility"
                >
                  <i class="fal fa-eye open_eye"></i>
                  <i class="fal fa-eye-slash closed_eye"></i>
                </button>
              </div>
              <!-- END:: PASSWORD INPUT -->
            </div>
            <!-- START:: INPUT WRAPPER -->
          </div>
        </div>

        <div class="buttons_wrapper">
          <!-- START:: BUTTON -->
          <button class="button_style_1">
            {{ $t("Forms.submit") }}
            <span class="btn_loader" v-if="btnIsLoading"></span>
          </button>
          <!-- END:: BUTTON -->
        </div>
      </form>
      <!-- END:: UPDATE FORM WRAPPER -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Update",

  data() {
    return {
      // START:: BUTTON LOADER HANDLING DATA
      btnIsLoading: false,
      // END:: BUTTON LOADER HANDLING DATA

      // START:: SELECTED FILE DATA
      selectedFile: {
        file: null,
        name: null,
        path: null,
      },
      // END:: SELECTED FILE DATA

      // START:: SINGLE SELECT DATA
      single_select_value: "",
      single_select_options: [
        { id: 1, name: "Option_1" },
        { id: 2, name: "Option_2"},
        { id: 3, name: "Option_3"},
        { id: 4, name: "Option_4"},
        { id: 5, name: "Option_5"},
      ],
      // END:: SINGLE SELECT DATA

      // START:: MULTIPLE SELECT DATA
      multiple_select_value: [],
      multiple_select_options: [
        { id: 1, name: "Option_1" },
        { id: 2, name: "Option_2"},
        { id: 3, name: "Option_3"},
        { id: 4, name: "Option_4"},
        { id: 5, name: "Option_5"},
      ],
      // END:: MULTIPLE SELECT DATA

      // START:: DATE PICKER DATA
      date: null,
      dateMenu: false,
      // END:: DATE PICKER DATA

      // START:: DATE PICKER DATA
      time: null,
      timeMenu: false,
      // END:: DATE PICKER DATA

      // START:: CREATE DATA
      updateData: {
        avatar: null,
        name: null,
        user_id: null,
        phone: null,
        email: null,
        desc: null,
        password: null,
        password_confirmation: null,
      },
      // END:: CREATE DATA
    };
  },

  methods: {
    // START:: Uplode Avatar
    uplodeImg_1(obj) {
      this.updateData.avatar = obj;
    },
    // END:: Uplode Avatar

    // START:: CHECK IF INPUT IS EMPTY (SPECIFIC TO ANIMATED PLACEHOLDER INPUTS)
    checkIfInputIsEmpty(e) {
      let inputElement = e.currentTarget;
      if (inputElement.value.length > 0) {
        inputElement.classList.add("not_empty");
      } else {
        inputElement.classList.remove("not_empty");
      }
    },
    // END:: CHECK IF INPUT IS EMPTY (SPECIFIC TO ANIMATED PLACEHOLDER INPUTS)

    // START:: HANDLING SELECTED FILE METHOD
    handelSelectedFile(e) {
      this.selectedFile.file = e.target.files[0];
      this.selectedFile.name = e.target.files[0].name;
      this.selectedFile.path = URL.createObjectURL(e.target.files[0]);
    },
    // END:: HANDLING SELECTED FILE METHOD

    // START:: TOGGLE PASSWORD VISIBILITY METHOD
    togglePasswordVisibility(e) {
      let passwordElement = e.currentTarget.parentElement.children[1];
      let passwordTogglerBtn = e.currentTarget;
      if (passwordElement.type == "password") {
        passwordElement.type = "text";
        passwordTogglerBtn.classList.add("password_is_visible");
      } else if (passwordElement.type == "text") {
        passwordElement.type = "password";
        passwordTogglerBtn.classList.remove("password_is_visible");
      }
    },
    // END:: TOGGLE PASSWORD VISIBILITY METHOD

    // START:: VALIDATE CREATE FORM
    validateCreateForm() {
      this.btnIsLoading = true;

      if (!this.updateData.avatar?.img_src) {
        this.$iziToast.error({
          timeout: 2000,
          message: "Avatar Feild Can't Be Empty",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      } else if (!this.updateData.name) {
        this.$iziToast.error({
          timeout: 2000,
          message: "Name Feild Can't Be Empty",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      } else if (!this.updateData.user_id) {
        this.$iziToast.error({
          timeout: 2000,
          message: "User ID Feild Can't Be Empty",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      } else if (!this.updateData.phone) {
        this.$iziToast.error({
          timeout: 2000,
          message: "Phone Feild Can't Be Empty",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      } else if (!this.updateData.email) {
        this.$iziToast.error({
          timeout: 2000,
          message: "Email Feild Can't Be Empty",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      } else if (!this.selectedFile.file) {
        this.$iziToast.error({
          timeout: 2000,
          message: "You Must Select A File",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      } else if (!this.single_select_value) {
        this.$iziToast.error({
          timeout: 2000,
          message: "You Must Select An Option From Single Select Input",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      } else if (this.multiple_select_value.length == 0) {
        this.$iziToast.error({
          timeout: 2000,
          message: "You Must Select An Option From Multiselect Select Input",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      } else if (!this.date) {
        this.$iziToast.error({
          timeout: 2000,
          message: "You Must Select A Date",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      } else if (!this.time) {
        this.$iziToast.error({
          timeout: 2000,
          message: "You Must Select A Time",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      }  else if (!this.updateData.desc) {
        this.$iziToast.error({
          timeout: 2000,
          message: "Description Feild Can't Be Empty",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      } else if (!this.updateData.password) {
        this.$iziToast.error({
          timeout: 2000,
          message: "Password Feild Can't Be Empty",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      } else if (this.updateData.password.length < 6) {
        this.$iziToast.error({
          timeout: 2000,
          message: "Password Must Be At Least 6 Digits",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      } else if (!this.updateData.password_confirmation) {
        this.$iziToast.error({
          timeout: 2000,
          message: "Password Confirmation Feild Can't Be Empty",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      } else if (this.updateData.password != this.updateData.password_confirmation) {
        this.$iziToast.error({
          timeout: 2000,
          message: "Passwords Don't Match",
          position: "bottomCenter",
        });
        this.btnIsLoading = false;
        return;
      }
    },
    // END:: VALIDATE CREATE FORM
  },

  mounted() {
    this.updateData.name = "Mahmoud Siliman";
    this.updateData.user_id = 2255411200;
    this.updateData.phone = "01032586964";
    this.updateData.email = "siliman@test.com";
    this.single_select_value = { id: 2, name: "Option_2"};
    this.multiple_select_value = [{ id: 1, name: "Option_1"}, { id: 5, name: "Option_5"}];
    this.date = "2022-01-8";
    this.time = "02:21";
    this.updateData.desc = "Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla"
  },
};
</script>