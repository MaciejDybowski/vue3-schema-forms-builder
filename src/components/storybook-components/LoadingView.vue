<!-- eslint-disable max-len -->
<template>
  <v-row
    align="center"
    class="px-0"
    justify="center"

  >
    <v-col cols="auto">
      <div class="logo-loading mb-6">
        <svg
          height="38.204994px"
          version="1.1"
          viewBox="0 0 38.21698 38.204994"
          width="38.21698px"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            id="TopLeft"
            d="M23.931 16.18C23.931 17.251 22.981 18.119 21.81 18.119L2.121 18.119C0.949 18.119 0 17.251 0 16.18L0 1.938C0 0.868 0.949 0 2.121 0L21.81 0C22.981 0 23.931 0.868 23.931 1.938L23.931 16.18L23.931 16.18Z"
            stroke="none"
          />
          <path
            id="TopRight"
            d="M38.217 16.062C38.217 17.205 37.29 18.132 36.146 18.132L28.323 18.132C27.179 18.132 26.253 17.204 26.253 16.062L26.253 2.083C26.253 0.939 27.18 0.013 28.323 0.013L36.146 0.013C37.291 0.013 38.217 0.94 38.217 2.083L38.217 16.062L38.217 16.062Z"
            stroke="none"
          />
          <path
            id="BottomRight"
            d="M14.286 36.265C14.286 37.337 15.236 38.205 16.407 38.205L36.095 38.205C37.267 38.205 38.216 37.337 38.216 36.265L38.216 22.025C38.216 20.954 37.267 20.086 36.095 20.086L16.407 20.086C15.236 20.086 14.286 20.954 14.286 22.025L14.286 36.265L14.286 36.265Z"
            stroke="none"
          />
          <path
            id="BottomLeft"
            d="M0 36.122C0 37.266 0.928 38.192 2.07 38.192L9.894 38.192C11.039 38.192 11.965 37.265 11.965 36.122L11.965 22.145C11.965 21 11.038 20.074 9.894 20.074L2.07 20.074C0.928 20.073 0 21 0 22.145L0 36.122L0 36.122Z"
            stroke="none"
          />
        </svg>
      </div>
      <!-- <v-img
          alt="aurea dashboards logo"
          src="../assets/dashboards-logo.svg"
          class="mx-auto mb-6 logo-loading"
          contain
          height="100"
          width="100"
        /> -->
      <div
        v-if="title"
        class="text-h3 font-weight-light"
      >
        {{ typeof title == "string" ? title : "Aurea Dashboard" }}
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    title: {
      type: [Boolean, String],
      default: true,
    },
  },
  name: "LoadingView",
  data() {
    return {};
  },
});
</script>

<style lang="scss">
.fill {
  height: 100%;
}

.theme--dark .logo-loading svg {
  fill: rgba(255, 255, 255, 0.12);
}

.logo-loading {
  display: flex;
  justify-content: center;

  svg {
    fill: rgba(0, 0, 0, 0.12);
    height: 100px;
    width: 100px;
  }

  #TopLeft,
  #TopRight,
  #BottomLeft,
  #BottomRight {
    animation-duration: 1.5s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
  }

  #TopLeft {
    animation-name: Loading-TL;
  }

  #TopRight {
    animation-name: Loading-TR;
  }

  #BottomLeft {
    animation-name: Loading-BL;
  }

  #BottomRight {
    animation-name: Loading-BR;
  }

  @keyframes Loading-BR {
    0% {
      opacity: 0;
      transform-origin: 100% 100%;
      transform: rotate(90deg);
    }
    25% {
      opacity: 1;
      transform: rotate(0deg);
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes Loading-BL {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 0;
      transform: translateX(-100%);
    }
    30% {
      opacity: 1;
      transform: translateX(0);
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes Loading-TR {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
      transform: translateX(100%);
    }
    50% {
      opacity: 1;
      transform: translateX(0);
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes Loading-TL {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 0;
      transform: translateY(-100%);
    }
    60% {
      opacity: 1;
      transform: translateX(0);
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
