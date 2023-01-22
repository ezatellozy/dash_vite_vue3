<template>
  <div class="media_card_content_wrapper">
    <div class="media_elemets">
      <!-- ********** Start:: Audio Tag ********** -->
      <!-- The Following  Description Comments Is For Stop Other Audios When Click Play Button While Other Audio Is Playing -->
      <!-- (data-wave_id) A Custom Attribute To Select Sound Wave To Handling Play Audio While Other Audio Is Playing -->
      <!-- (data-play_btn_id) A Custom Attribute To Select Play Button To Handling Play Audio While Other Audio Is Playing -->
      <!-- (data-paus_btn_id) A Custom Attribute To Select Pause Button To Handling Play Audio While Other Audio Is Playing -->
      <audio 
        class="audio_tag" 
        :ref="`sound_tag_${item.id}`" 
        :id="`sound_tag_${item.id}`"  
        :data-wave_id="`sound_wave_${item.id}`" 
        :data-play_btn_id="`play_btn_${item.id}`"  
        :data-paus_btn_id="`paus_btn_${item.id}`"  
        controls
      >
        <source :src="item.sound" type="audio/mpeg">
        <source :src="item.sound" type="audio/wav">
        Your browser does not support the audio tag.
      </audio>
      <!-- ********** End:: Audio Tag ********** -->

      <!-- ********** Start:: Media Card Image ********** -->
      <img
        class="media_image"
        :src="item.image"
      />
      <!-- ********** End:: Media Card Image ********** -->

      <!-- ********** Start:: Controle Media Buttons ********** -->
      <div class="control_media_btns_wrapper">
        <!-- Start:: Added By User Section -->
        <div class="add_by_content_wrapper">
          <div class="wrapper" v-if="item.added_by">
            <div class="videos_count">
              <span> {{item.videos_count}} </span>
              <i class="fal fa-video"></i>
            </div>

            <router-link :to="`/users/show/${item.added_by.id}`" class="user_content_wrapper">
              <div class="name">
                {{item.added_by.username}}
              </div>

              <div class="avatar">
                <img
                  :src="item.added_by.avatar"
                  :alt="item.added_by.username"
                  width="40"
                  height="40"
                />
              </div>
            </router-link>
          </div>

          <p class="track_name"> {{item.name}} </p>
        </div>
        <!-- End:: Added By User Section -->

        <transition-group name="fadeInUp" mode="out-in">
          <button 
            class="play_btn"
            :id="`play_btn_${item.id}`"
            :key="`play_btn_${item.id}`" 
            @click="palyAudioTrack($event, `sound_tag_${item.id}`, `sound_wave_${item.id}`)"
          > 
            <i class="fal fa-play"></i> 
          </button>

          <button 
            class="paus_btn" 
            :id="`paus_btn_${item.id}`"
            :key="`paus_btn_${item.id}`" 
            @click="pausAudioTrack($event, `sound_tag_${item.id}`, `sound_wave_${item.id}`)"
          > 
            <i class="fal fa-pause"></i> 
          </button>

          <SoundWave
            :key="`sound_wave_${item.id}`" 
            :id="`sound_wave_${item.id}`" 
          />
        </transition-group>
      </div>
      <!-- ********** End:: Controle Media Buttons ********** -->
    </div>

    <!-- ********** Start:: Media Card Info & Actions ********** -->
    <div class="info_and_actions">
      <!-- <p class="track_name"> {{item.name}} </p> -->

      <div class="action_buttons">
        <button class="edit" @click="editItem(item)">
          <i class="fal fa-edit"></i>
        </button>   

        <button class="delete" @click="deleteItem(item)">
          <i class="fal fa-trash-alt"></i>
        </button>
      </div>
    </div>
    <!-- ********** End:: Media Card Info & Actions ********** -->
  </div>
</template>

<script>
import SoundWave from "@/components/UI/SoundWave.vue";


export default {
  name: "SoundMediaCard",

  components: {
    SoundWave,
  },

  emits: ["editItem", "deleteItem"],

  props: {
    item: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
    }
  },

  methods: {
    editItem(selectedItem) {
      this.$emit("editItem", selectedItem);
    },
    deleteItem(selectedItem) {
      this.$emit("deleteItem", selectedItem);
    },

    // ===== Control Audio Track
    // Start:: Play The Track
    palyAudioTrack(e, targetElement, targetSoundWave) {
      let elemet = this.$refs[targetElement];
      let trackDuration = elemet.duration;
      elemet.play();

      let playButton = e.currentTarget;
      playButton.style.display = "none";
      let pausButton = playButton.nextElementSibling;
      pausButton.style.display = "block";
      let soundWave = document.querySelector(`#${targetSoundWave}`);
      soundWave.style.display = "flex";

      // ********** Start:: Stop All Other Audios
      // All Audio Elements (THE FOLLOWING LINE RETURNS AN OBJECT)
      let allAudioElements = document.querySelectorAll(".audio_tag");

      // Convert (allAudioElements) To An Array Filter It To Remove The Current Playing Audio
      let allAudioElementsExceptTargetAudioElement = [...allAudioElements].filter(element => element.id != this.$refs[targetElement].id);

      // Convert (allAudioElementsExceptTargetAudioElement) To An Array And Loop On It To Get Access To Any Other Audio Except The Playing One
      [...allAudioElementsExceptTargetAudioElement].forEach(singleAudioElement => {
        singleAudioElement.pause(); // Pause All Other Audio Elements
        singleAudioElement.currentTime = 0; // Set All Other Audios Time To Start Time "Simulate Stop The Track"
        document.getElementById(singleAudioElement.dataset.wave_id).style.display = "none"; // Remove All Other Sound Waves
        document.getElementById(singleAudioElement.dataset.play_btn_id).style.display = "block"; // Display All Play Buttons Except The Playing Audio One
        document.getElementById(singleAudioElement.dataset.paus_btn_id).style.display = "none"; // Remove All Other Pause Buttons
      });
      // ********** End:: Stop All Other Audios

      setTimeout(() => {
        pausButton.style.display = "none";
        soundWave.style.display = "none";
        playButton.style.display = "block";
      }, (Math.round(trackDuration)*1000)+1000);
    },
    // End:: Play The Track

    // Start:: Paus The Track
    pausAudioTrack(e, targetAudioElement, targetSoundWave) {
      let elemet = this.$refs[targetAudioElement];
      elemet.pause();

      let pausButton = e.currentTarget;
      pausButton.style.display = "none";
      let soundWave = document.querySelector(`#${targetSoundWave}`);
      soundWave.style.display = "none";

      let playButton = pausButton.previousSibling;
      playButton.style.display = "block";
    },
    // End:: Paus The Track
  },
}
</script>