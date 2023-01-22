<template>
  <div class="container">
    <div class="row justify-content-around">
      <!-- START:: FORM INPUTS GROUP -->
      <div class="wrappers custom_card col-lg-5 my-5">
        <!-- START:: CARD TITLE -->
        <div class="card-header">
          <h4 class="card-title">Inputs With Top Label</h4>
        </div>
        <!-- END:: CARD TITLE -->

        <!-- START:: TEXT INPUT -->
        <div class="input_wrapper top_label">
          <label for="text_input_1" class="form-label">Text Input</label>
          <input type="text" class="form-control" id="text_input_1" />
        </div>
        <!-- END:: TEXT INPUT -->

        <!-- START:: EMAIL INPUT -->
        <div class="input_wrapper top_label">
          <label for="email_input_1" class="form-label">Email Input</label>
          <input type="email" class="form-control" id="email_input_1" />
        </div>
        <!-- END:: EMAIL INPUT -->

        <!-- START:: PHONE INPUT -->
        <div class="input_wrapper top_label">
          <label for="phone_input_1" class="form-label">Phone Input</label>
          <input type="tel" class="form-control" id="phone_input_1" />
        </div>
        <!-- END:: PHONE INPUT -->

        <!-- START:: NUMBER INPUT -->
        <div class="input_wrapper top_label">
          <label for="number_input_1" class="form-label">Number Input</label>
          <input type="number" class="form-control" id="number_input_1" />
        </div>
        <!-- END:: NUMBER INPUT -->

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
              @input="dateMenu = false"
              no-title
            ></v-date-picker>
          </v-menu>
        </div>
        <!-- END:: DATE PICKER INPUT -->

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

        <!-- START:: FILE INPUT -->
        <div class="input_wrapper top_label file_input">
          <span class="file_input_label"> File Input </span>
          <label for="file_input_1" class="form-label" v-if="!selectedFile.file"></label>
          <label for="file_input_1" class="form-label" v-else> {{selectedFile.name}} </label>
          <input type="file" class="form-control" id="file_input_1" @change="handelSelectedFile"/>
        </div>
        <!-- END:: FILE INPUT -->

        <!-- START:: PASSWORD INPUT -->
        <div class="input_wrapper top_label">
          <label for="password_input_1" class="form-label"
            >Password Input</label
          >
          <input type="password" class="form-control" id="password_input_1" />
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

        <!-- START:: TEXT AREA -->
        <div class="input_wrapper top_label">
          <label for="textarea_1" class="form-label">Text Area</label>
          <textarea class="form-control" id="textarea_1" rows="5"></textarea>
        </div>
        <!-- END:: TEXT AREA -->
      </div>
      <!-- END:: FORM INPUTS GROUP -->

      <!-- START:: FORM INPUTS GROUP -->
      <div class="wrappers custom_card col-lg-5 my-5">
        <!-- START:: CARD TITLE -->
        <div class="card-header">
          <h4 class="card-title">Inputs With Animated Placeholder</h4>
        </div>
        <!-- END:: CARD TITLE -->

        <!-- START:: TEXT INPUT -->
        <div class="input_wrapper animated_placeholder">
          <input
            type="text"
            class="form-control"
            id="text_input_2"
            @input="checkIfInputIsEmpty"
          />
          <label for="text_input_2" class="form-label"
            >Text Input</label
          >
        </div>
        <!-- END:: TEXT INPUT -->

        <!-- START:: EMAIL INPUT -->
        <div class="input_wrapper animated_placeholder">
          <input
            type="email"
            class="form-control"
            id="email_input_2"
            @input="checkIfInputIsEmpty"
          />
          <label for="email_input_2" class="form-label">Email Input</label>
        </div>
        <!-- END:: EMAIL INPUT -->

        <!-- START:: PHONE INPUT -->
        <div class="input_wrapper animated_placeholder">
          <input
            type="tel"
            class="form-control"
            id="phone_input_2"
            @input="checkIfInputIsEmpty"
          />
          <label for="phone_input_2" class="form-label">Phone Input</label>
        </div>
        <!-- END:: PHONE INPUT -->

        <!-- START:: NUMBER INPUT -->
        <div class="input_wrapper animated_placeholder">
          <input
            type="number"
            class="form-control"
            id="number_input_2"
            @input="checkIfInputIsEmpty"
          />
          <label for="number_input_2" class="form-label">Number Input</label>
        </div>
        <!-- END:: NUMBER INPUT -->

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
              @input="dateMenu = false"
              no-title
            ></v-date-picker>
          </v-menu>
        </div>
        <!-- END:: DATE PICKER INPUT -->

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

        <!-- START:: FILE INPUT -->
        <div class="input_wrapper top_label file_input">
          <span class="file_input_label"> File Input </span>
          <label for="file_input_2" class="form-label" v-if="!selectedFile.file"></label>
          <label for="file_input_2" class="form-label" v-else> {{selectedFile.name}} </label>
          <input type="file" class="form-control" id="file_input_2" @change="handelSelectedFile"/>
        </div>
        <!-- END:: FILE INPUT -->

        <!-- START:: PASSWORD INPUT -->
        <div class="input_wrapper animated_placeholder">
          <button
            type="button"
            class="toggle_pass_btn"
            @click="togglePasswordVisibility"
          >
            <i class="fal fa-eye open_eye"></i>
            <i class="fal fa-eye-slash closed_eye"></i>
          </button>
          <input
            type="password"
            class="form-control"
            id="password_input_2"
            @input="checkIfInputIsEmpty"
          />
          <label for="password_input_2" class="form-label"
            >Password Input</label
          >
        </div>
        <!-- END:: PASSWORD INPUT -->

        <!-- START:: TEXT AREA -->
        <div class="input_wrapper animated_placeholder">
          <textarea
            class="form-control"
            id="textarea_2"
            rows="5"
            @input="checkIfInputIsEmpty"
          ></textarea>
          <label for="textarea_2" class="form-label">Text Area</label>
        </div>
        <!-- END:: TEXT AREA -->
      </div>
      <!-- END:: FORM INPUTS GROUP -->

      <!-- START:: FORM INPUTS GROUP -->
      <div class="wrappers custom_card col-lg-5 my-5">
        <!-- START:: CARD TITLE -->
        <div class="card-header">
          <h4 class="card-title">Inputs With Icon Label</h4>
        </div>
        <!-- END:: CARD TITLE -->

        <!-- START:: TEXT INPUT -->
        <div class="input_wrapper icon_label">
          <label for="text_input_3" class="form-label">
            <i class="fal fa-edit fa-lg"></i>
          </label>
          <input
            type="text"
            placeholder="Text Input"
            class="form-control"
            id="text_input_3"
          />
        </div>
        <!-- END:: TEXT INPUT -->

        <!-- START:: EMAIL INPUT -->
        <div class="input_wrapper icon_label">
          <label for="email_input_3" class="form-label">
            <i class="fal fa-at fa-lg"></i>
          </label>
          <input
            type="email"
            placeholder="Email Input"
            class="form-control"
            id="email_input_3"
          />
        </div>
        <!-- END:: EMAIL INPUT -->

        <!-- START:: PHONE INPUT -->
        <div class="input_wrapper icon_label">
          <label for="phone_input_3" class="form-label">
            <i class="fal fa-mobile fa-lg"></i>
          </label>
          <input
            type="tel"
            placeholder="Phone Input"
            class="form-control"
            id="phone_input_3"
          />
        </div>
        <!-- END:: PHONE INPUT -->

        <!-- START:: NUMBER INPUT -->
        <div class="input_wrapper icon_label">
          <label for="number_input_2" class="form-label">
            <i class="fal fa-sort-numeric-up-alt fa-lg"></i>
          </label>
          <input
            type="number"
            placeholder="Number Input"
            class="form-control"
            id="number_input_2"
            @input="checkIfInputIsEmpty"
          />
        </div>
        <!-- END:: NUMBER INPUT -->

        <!-- START:: SINGLE SELECT INPUT -->
        <div class="input_wrapper icon_label">
          <label class="form-label">
            <i class="fal fa-list-ul fa-lg"></i>
          </label>
          <multiselect
            v-model="single_select_value"
            :options="single_select_options"
            label="name"
            track-by="name"
            placeholder="Single Select Input"
            :searchable="true"
            :allow-empty="false"
            :show-labels="false"
          >
          </multiselect>
        </div>
        <!-- END:: SINGLE SELECT INPUT -->

        <!-- START:: MULTIPLE SELECT INPUT -->
        <div class="input_wrapper icon_label">
          <label class="form-label">
            <i class="fal fa-list-ul fa-lg"></i>
          </label>
          <multiselect
            v-model="multiple_select_value"
            :options="multiple_select_options"
            label="name"
            track-by="name"
            placeholder="Multiple Select Input"
            :searchable="true"
            :allow-empty="false"
            :show-labels="false"
            :multiple="true"
          >
          </multiselect>
        </div>
        <!-- END:: MULTIPLE SELECT INPUT -->

        <!-- START:: DATE PICKER INPUT -->
        <div class="input_wrapper icon_label date_input">
          <label class="form-label">
            <i class="fal fa-calendar-alt fa-lg"></i>
          </label>
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
              @input="dateMenu = false"
              no-title
            ></v-date-picker>
          </v-menu>
        </div>
        <!-- END:: DATE PICKER INPUT -->

        <!-- START:: TIME PICKER INPUT -->
        <div class="input_wrapper icon_label time_input">
          <label class="form-label">
            <i class="fal fa-clock fa-lg"></i>
          </label>
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

        <!-- START:: FILE INPUT -->
        <div class="input_wrapper icon_label file_input">
          <span class="file_input_label"> <i class="fal fa-paperclip fa-lg"></i> </span>
          <label for="file_input_2" class="form-label" v-if="!selectedFile.file"> Select File </label>
          <label for="file_input_2" class="form-label" v-else> {{selectedFile.name}} </label>
          <input type="file" class="form-control" id="file_input_2" @change="handelSelectedFile"/>
        </div>
        <!-- END:: FILE INPUT -->

        <!-- START:: PASSWORD INPUT -->
        <div class="input_wrapper icon_label">
          <label for="password_input_3" class="form-label">
            <i class="fal fa-lock fa-lg"></i>
          </label>
          <input
            type="password"
            placeholder="Password Input"
            class="form-control"
            id="password_input_3"
            @input="checkIfInputIsEmpty"
          />
          <button
            type="button"
            placeholder="Password Input"
            class="toggle_pass_btn"
            @click="togglePasswordVisibility"
          >
            <i class="fal fa-eye open_eye"></i>
            <i class="fal fa-eye-slash closed_eye"></i>
          </button>
        </div>
        <!-- END:: PASSWORD INPUT -->

        <!-- START:: TEXT AREA -->
        <div class="input_wrapper icon_label">
          <label for="textarea_2" class="form-label">
            <i class="far fa-font-case fa-lg"></i>
          </label>
          <textarea
            placeholder="Text Area"
            class="form-control"
            id="textarea_2"
            rows="5"
            @input="checkIfInputIsEmpty"
          ></textarea>
        </div>
        <!-- END:: TEXT AREA -->
      </div>
      <!-- END:: FORM INPUTS GROUP -->

      <!-- START:: FORM INPUTS GROUP -->
      <div class="wrappers custom_card col-lg-5 my-5">
        <!-- START:: CARD TITLE -->
        <div class="card-header">
          <h4 class="card-title">Inputs With Normal Label</h4>
        </div>
        <!-- END:: CARD TITLE -->

        <!-- START:: TEXT INPUT -->
        <div class="input_wrapper normal_label">
          <label for="text_input_4" class="form-label">
            <i class="fal fa-edit fa-lg"></i>
            Text Input
          </label>
          <input
            type="text"
            class="form-control"
            id="text_input_4"
          />
        </div>
        <!-- END:: TEXT INPUT -->

        <!-- START:: EMAIL INPUT -->
        <div class="input_wrapper normal_label">
          <label for="email_input_4" class="form-label">
            <i class="fal fa-at fa-lg"></i>
            Email Input
          </label>
          <input
            type="email"
            class="form-control"
            id="email_input_4"
          />
        </div>
        <!-- END:: EMAIL INPUT -->

        <!-- START:: PHONE INPUT -->
        <div class="input_wrapper normal_label">
          <label for="phone_input_4" class="form-label">
            <i class="fal fa-mobile fa-lg"></i>
            Phone Input
          </label>
          <input
            type="tel"
            class="form-control"
            id="phone_input_4"
          />
        </div>
        <!-- END:: PHONE INPUT -->

        <!-- START:: NUMBER INPUT -->
        <div class="input_wrapper normal_label">
          <label for="number_input_4" class="form-label">
            <i class="fal fa-sort-numeric-up-alt fa-lg"></i>
            Number Input
          </label>
          <input
            type="number"
            class="form-control"
            id="number_input_4"
            @input="checkIfInputIsEmpty"
          />
        </div>
        <!-- END:: NUMBER INPUT -->

        <!-- START:: SINGLE SELECT INPUT -->
        <div class="input_wrapper normal_label">
          <label class="form-label">
            <i class="fal fa-list-ul fa-lg"></i>
            Single Select Input
          </label>
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

        <!-- START:: MULTIPLE SELECT INPUT -->
        <div class="input_wrapper normal_label">
          <label class="form-label">
            <i class="fal fa-list-ul fa-lg"></i>
            Multiple Select Input
          </label>
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

        <!-- START:: DATE PICKER INPUT -->
        <div class="input_wrapper normal_label date_input">
          <label class="form-label">
            <i class="fal fa-calendar-alt fa-lg"></i>
            Date Input
          </label>
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
              @input="dateMenu = false"
              no-title
            ></v-date-picker>
          </v-menu>
        </div>
        <!-- END:: DATE PICKER INPUT -->

        <!-- START:: TIME PICKER INPUT -->
        <div class="input_wrapper normal_label time_input">
          <label class="form-label">
            <i class="fal fa-clock fa-lg"></i>
            Date Input
          </label>
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

        <!-- START:: PASSWORD INPUT -->
        <div class="input_wrapper normal_label">
          <label for="password_input_4" class="form-label">
            <i class="fal fa-lock fa-lg"></i>
            Password Input
          </label>
          <div class="password_inner_wrapper">
            <input
              type="password"
              class="form-control"
              id="password_input_4"
              @input="checkIfInputIsEmpty"
            />
            <button
              type="button"
              placeholder="Password Input"
              class="toggle_pass_btn"
              @click="togglePasswordVisibility"
            >
              <i class="fal fa-eye open_eye"></i>
              <i class="fal fa-eye-slash closed_eye"></i>
            </button>
          </div>
        </div>
        <!-- END:: PASSWORD INPUT -->

        <!-- START:: FILE INPUT -->
        <div class="input_wrapper normal_label file_input">
          <span class="file_input_label"> 
            <i class="fal fa-paperclip fa-lg"></i> 
            Select File
          </span>

          <label for="file_input_2" class="form-label" v-if="!selectedFile.file"></label>
          <label for="file_input_2" class="form-label" v-else> {{selectedFile.name}} </label>
          <input type="file" class="form-control" id="file_input_2" @change="handelSelectedFile"/>
        </div>
        <!-- END:: FILE INPUT -->

        <!-- START:: TEXT AREA -->
        <div class="input_wrapper normal_label">
          <label for="textarea_4" class="form-label">
            <i class="far fa-font-case fa-lg"></i>
            Text Area
          </label>
          <textarea
            class="form-control"
            id="textarea_4"
            rows="5"
            @input="checkIfInputIsEmpty"
          ></textarea>
        </div>
        <!-- END:: TEXT AREA -->
      </div>
      <!-- END:: FORM INPUTS GROUP -->

      <!-- START:: FORM INPUTS GROUP -->
      <div class="wrappers custom_card col-lg-5 my-5">
        <!-- START:: CARD TITLE -->
        <div class="card-header">
          <h4 class="card-title">Checkboxes And Switches </h4>
        </div>
        <!-- END:: CARD TITLE -->

        <div class="row">
          <div class="col-lg-6">
            <!-- START:: CHECKBOX INPUT -->
            <div class="input_wrapper checkbox_input">
              <v-checkbox
                v-model="checkboxValue"
                label="Checkbox"
              ></v-checkbox>
            </div>
            <!-- END:: CHECKBOX INPUT -->
          </div>

          <div class="col-lg-6">
            <!-- START:: CHECKBOX INPUT -->
            <div class="input_wrapper checkbox_input">
              <v-switch
                v-model="checkboxValue"
                label="Switch"
              ></v-switch>
            </div>
            <!-- END:: CHECKBOX INPUT -->
          </div>
        </div>
      </div>
      <!-- END:: FORM INPUTS GROUP -->

      <!-- START:: FORM INPUTS GROUP -->
      <div class="wrappers custom_card col-lg-5 my-5">
        <!-- START:: CARD TITLE -->
        <div class="card-header">
          <h4 class="card-title"> Radio Buttons </h4>
        </div>
        <!-- END:: CARD TITLE -->

        <!-- START:: RADIO BUTTON INPUT -->
        <div class="input_wrapper radio_button_input">
          <v-radio-group v-model="radioButtonsValue">
            <v-radio
              v-for="n in 3"
              :key="n"
              :label="`Radio ${n}`"
              :value="n"
              color="indigo lighten-2"
            ></v-radio>
          </v-radio-group>
        </div>
        <!-- END:: RADIO BUTTON INPUT -->
      </div>
      <!-- END:: FORM INPUTS GROUP -->

      <!-- START:: BUTTONS GROUP -->
      <div class="wrappers custom_card col-lg-5 my-5">
        <!-- START:: CARD TITLE -->
        <div class="card-header">
          <h4 class="card-title"> Buttons </h4>
        </div>
        <!-- END:: CARD TITLE -->

        <div class="buttons_wrapper">
          <!-- START:: BUTTON -->
          <button type="button" class="button_style_1">
            Button
            <span class="btn_loader"></span>
          </button>
          <!-- END:: BUTTON -->

          <!-- START:: BUTTON -->
          <button type="button" class="button_style_2">
            Button
            <span class="btn_loader"></span>
          </button>
          <!-- END:: BUTTON -->
        </div>
      </div>
      <!-- END:: BUTTONS GROUP -->
    </div>
  </div>
</template>

<script>
export default {
  name: "FormInputs",

  data() {
    return {
      // START:: DATE PICKER DATA
      date: null,
      dateMenu: false,
      // END:: DATE PICKER DATA

      // START:: DATE PICKER DATA
        time: null,
        timeMenu: false,
      // END:: DATE PICKER DATA

      // START:: SINGLE SELECT DATA
      single_select_value: {},
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

      // START:: SELECTED FILE DATA
      selectedFile: {
        file: null,
        name: null,
        path: null,
      },
      // END:: SELECTED FILE DATA

      // START:: CHECKBOX DATA
      checkboxValue: false,
      // END:: CHECKBOX DATA

      // START:: RADIO BUTTON DATA
      radioButtonsValue: null,
      // END:: RADIO BUTTON DATA
    };
  },

  methods: {
    // START:: TOGGLE PASSWORD VISIBILITY METHOD
    togglePasswordVisibility(e) {
      let passwordElement = e.currentTarget.parentElement.children[1];
      let innerPasswordElement = e.currentTarget.parentElement.children[0];
      let passwordTogglerBtn = e.currentTarget;
      if (passwordElement.type == "password" || innerPasswordElement.type == "password") {
        passwordElement.type = "text";
        innerPasswordElement.type = "text";
        passwordTogglerBtn.classList.add("password_is_visible");
      } else if (passwordElement.type == "text" || innerPasswordElement.type == "text") {
        passwordElement.type = "password";
        innerPasswordElement.type = "password";
        passwordTogglerBtn.classList.remove("password_is_visible");
      }
    },
    // END:: TOGGLE PASSWORD VISIBILITY METHOD

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
  },
};
</script>