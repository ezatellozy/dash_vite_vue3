<template>
  <div class="chat_custom_card">
    <div class="chatCom custom_card">
      <!-- Start Header -->
      <!-- <header class="header">
        <div class="chat_user">
          <img :src="chatObj.sender_data.image" />
          <div class="text">
            <h3>{{ chatObj.sender_data.name }}</h3>
            <span class="status processing">{{
              chatObj.sender_data.phone
            }}</span>
          </div>
        </div>
      </header> -->
      <!-- End header -->

      <!-- Start ChatBox -->
      <div class="chat_box">
        <div class="chat_view" v-chat-scroll="{ smooth: true }">
          <div
            v-for="message in messages"
            :key="message.id"
            class="messageOwner"
            :class="{
              sender: message.message_position == 'current',
              receiver: message.message_position == 'other',
            }"
          >
            <img class="user_img" :src="message.sender.avatar" />
            <div class="content">
              <div
                class="media"
                v-if="
                  message.message_type == 'image' ||
                  message.message_type == 'video' ||
                  message.message_type == 'audio'
                "
              >
                <div v-if="message.message_type == 'image'" class="image">
                  <img :src="message.message" />
                  <p v-if="message.descreption" class="descreption">
                    {{ message.descreption }}
                  </p>
                </div>

                <div v-if="message.message_type == 'video'" class="video">
                  <video controls>
                    <source :src="message.message" type="video/mp4" />
                  </video>
                  <p v-if="message.descreption" class="descreption">
                    {{ message.descreption }}
                  </p>
                </div>

                <div v-if="message.audio_src" class="audio_media">
                  <audio controls>
                    <source :src="message.audio_src" type="audio/ogg" />
                  </audio>
                </div>
              </div>

              <p
                v-html="message.message.replace(/(\n|\n|\r)/gm, '<br />')"
                v-if="
                  message.message_type == 'text' ||
                  message.message_type == 'offer'
                "
                class="text"
              ></p>
            </div>
          </div>
        </div>

        <!-- Chat Footer -->
        <footer class="chat_footer" v-if="!readOnly">
          <!-- ====== Send_Input ===== -->
          <div class="chat_input_wrapper">
            <textarea
              ref="message_text"
              v-model="data.message_text"
              placeholder="اكتب رسالتك هنا"
              @keydown.enter="send_message"
              @keyup="textAreaAdjust"
            />

            <div class="icon">
              <div class="attachments">
                <span @click.stop="toggleUplodes"
                  ><i class="far fa-paperclip"></i
                ></span>

                <transition name="fadeInUp">
                  <ul v-if="uplodesActive" class="uplode_options">
                    <li>
                      <input
                        class="uplode_iamge uplode_Input"
                        type="file"
                        id="uplode_iamge"
                        name="uplode_image"
                        accept="image/*"
                        @change="upload_image"
                      />
                      <label for="uplode_iamge"
                        ><i class="far fa-image-polaroid"></i
                      ></label>
                    </li>
                    <li>
                      <input
                        class="uplode_video uplode_Input"
                        type="file"
                        id="uplode_video"
                        name="uplode_video"
                        accept="video/*"
                        @change="upload_video"
                      />
                      <label for="uplode_video">
                        <i class="far fa-video-slash"></i>
                      </label>
                    </li>
                  </ul>
                </transition>
              </div>
            </div>
          </div>

          <!-- ====== Send_button ===== -->
          <button v-if="!canRecord" @click="send_message" class="send_button">
            <span><i class="fas fa-paper-plane"></i></span>
          </button>

          <button v-else class="record send_button">
            <audio-recorder :after-recording="after_recording" />
          </button>
        </footer>

        <!-- Image Uplode -->
        <transition name="fadeInUp">
          <div v-if="showPreview_image" class="uplode_preview">
            <span @click="close_preview" class="close"
              ><i class="far fa-times"></i
            ></span>
            <img
              class="preview_img preview_media"
              :src="data.file_image_src"
              alt="..."
            />

            <footer class="footer">
              <div class="send_button">
                <textarea
                  ref="message_text"
                  v-model="data.descreption"
                  type="text"
                  placeholder="اضف نص توضيحي"
                  @keydown.enter="send_message"
                ></textarea>

                <v-btn
                  :loading="btn_loaidng"
                  class="active center send_message"
                  @click="send_message"
                  elevation="5"
                >
                  <i class="fas fa-paper-plane"></i>
                </v-btn>
              </div>
            </footer>
          </div>
        </transition>

        <!-- Video Uplode -->
        <transition name="fadeInUp">
          <div v-if="showPreview_video" class="uplode_preview">
            <span @click="close_preview" class="close"
              ><i class="far fa-times"></i
            ></span>

            <video class="preview_video preview_media" controls>
              <source :src="data.file_video_src" type="video/mp4" />
            </video>

            <footer class="footer">
              <div class="send_button">
                <textarea
                  ref="message_text"
                  v-model="data.descreption"
                  type="text"
                  placeholder="اضف نص توضيحي"
                  @keydown.enter="send_message"
                ></textarea>

                <v-btn
                  :loading="btn_loaidng"
                  class="active center send_message"
                  @click="send_message"
                  elevation="5"
                >
                  <i class="fas fa-paper-plane"></i>
                </v-btn>
              </div>
            </footer>
          </div>
        </transition>
      </div>
      <!-- End ChatBox -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true,
    },
    readOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      // Loading
      btn_loaidng: false,

      // Chat
      showPreview_video: false,
      showPreview_image: false,

      uplodesActive: false,

      data: {
        message_text: "",
        // image
        file_image: "",
        file_image_src: "",
        // video
        file_video: "",
        file_video_src: "",
        // audio
        file_audio_src: "",

        descreption: "",
      },
    };
  },

  computed: {
    canRecord() {
      return this.data.message_text == "";
    },
  },

  methods: {
    // Send Message
    send_message(e) {
      // To go To another line use [Ctrl + Enter]
      if (e) {
        if (
          (e.ctrlKey && e.key === "Enter") ||
          (e.shiftKey && e.key === "Enter")
        ) {
          this.data.message_text += "\n";
          return;
        } else {
          e.preventDefault();
        }
      }

      // Create message Object
      const message = {
        type: "sender",
        text: this.data.message_text,
        image_src: this.data.file_image_src,
        video_src: this.data.file_video_src,
        audio_src: this.data.file_audio_src,
        descreption: this.data.descreption,
      };

      // ==========> Validation
      if (
        message.text == "" &&
        message.image_src == "" &&
        message.video_src == "" &&
        message.audio_src == ""
      ) {
        return;
      }

      // Message Type
      let messageType = "";
      if (this.data.file_image_src) {
        messageType = "image";
      } else if (this.data.file_video_src) {
        messageType = "video";
      } else if (this.data.file_audio_src) {
        messageType = "audio";
      } else if (this.data.message_text) {
        messageType = "text";
      } else {
        messageType = "file";
      }

      // Message
      let message_content = null;
      if (this.data.file_image) {
        message_content = this.data.file_image_src; // just for now
        // message_content = this.data.file_image;
      } else if (this.data.file_audio_src) {
        message_content = this.data.file_audio_src;
      } else if (this.data.file_video) {
        message_content = this.data.file_video_src; // just for now
        // message_content = this.data.file_video;
      } else if (this.data.message_text) {
        message_content = this.data.message_text;
      }

      // ***** Send Message
      this.messages.push({
        message_position: "me",
        message_type: messageType,
        message: message_content,
        descreption: message.descreption,
        audio_src: message.audio_src,
        sender_data: {
          image:
            "https://thumbs.dreamstime.com/z/easiest-way-to-communicate-mobile-phone-users-group-friends-talking-cell-phones-modern-people-smartphones-176743416.jpg",
        },
      });

      // Play Music
      new Audio(require("@/assets/sounds/message_sent.mp3")).play();

      // Clear Data
      this.data.message_text = "";
      this.data.descreption = "";
      this.data.file_image_src = "";
      this.data.file_image = "";
      this.data.file_video_src = "";
      this.data.file_video = "";
      this.data.file_audio_src = "";
      this.showPreview_image = false;
      this.showPreview_video = false;

      if (e.target.tagName == "TEXTAREA") {
        e.target.style.height = 49 + "px";
      }

      // Focus
      this.$refs.message_text.focus();

      // this.btn_loaidng = true;
      // let my_data = new FormData();
      // my_data.append(`message_type`, messageType);
      // my_data.append(`message`, message_content);
      // my_data.append(`receiver_id`, this.id);

      // this.$axios({
      //   method: "post",
      //   url: `chats`,
      //   headers: {
      //     "cache-control": "no-cache",
      //     "content-type": "application/json",
      //     Accept: "application/json",
      //     "Accept-language": this.$store.getters["lang_module/lang"], // ==> Store (Vuex) <==
      //     Authorization: "bearer" + localStorage.getItem("Elava_App_Token"),
      //   },
      //   data: my_data,
      // })
      //   .then(() => {
      //     this.btn_loaidng = false;

      //     // Play Music
      //     new Audio(
      //       require("../../../../../assets/sounds/message_sent.mp3")
      //     ).play();

      //     this.getChat();

      //     // Clear Data
      //     this.data.message_text = "";
      //     this.data.descreption = "";
      //     this.data.file_image_src = "";
      //     this.data.file_image = "";
      //     this.data.file_video_src = "";
      //     this.data.file_video = "";
      //     this.data.file_audio_src = "";
      //     this.showPreview_image = false;
      //     this.showPreview_video = false;

      //     // Focus
      //     this.$refs.message_text.focus();
      //   })
      //   .catch((err) => {
      //     this.btn_loaidng = false;
      //     this.showPreview_image = false;
      //     this.showPreview_video = false;
      //     this.$iziToast.error({
      //       title: this.$t("validation.error"),
      //       message: err.response.data.message,
      //     });
      //   });
    },

    // Adjust Height on input
    textAreaAdjust(e) {
      if (
        (e.ctrlKey && e.key === "Enter") ||
        (e.shiftKey && e.key === "Enter")
      ) {
        e.target.style.height = e.target.scrollHeight + "px";
      }
    },

    // Uplods
    upload_image(e) {
      this.data.file_image = e.target.files[0];
      this.data.file_image_src = URL.createObjectURL(this.data.file_image);

      this.showPreview_image = true;
      e.target.value = null;
    },
    upload_video(e) {
      this.data.file_video = e.target.files[0];
      this.data.file_video_src = URL.createObjectURL(this.data.file_video);

      this.showPreview_video = true;
      e.target.value = null;
    },
    toggleUplodes(close) {
      if (close == false) {
        this.uplodesActive = false;
      } else {
        this.uplodesActive = !this.uplodesActive;
      }
    },
    close_preview() {
      this.showPreview_image = false;
      this.showPreview_video = false;
    },

    // Record
    after_recording(data) {
      this.data.file_audio_src = data.url;
      this.send_message();
    },
  },

  created() {
    // Set Data
    // this.messages = this.messages;

    // Close Uplods
    window.addEventListener("click", () => {
      this.uplodesActive = false;
    });
  },
};
</script>
