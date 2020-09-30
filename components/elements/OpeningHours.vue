<template>
  <div>
    <!-- TODO opening times validation
    * close time > open time
    * close time required when open time
    * break time inside open time
    * breaks only visible when open
    * break times don't overlap
    -->

    <div
      v-for="(openingTimes, day) in context.model"
      :key="day"
      class="flex items-end"
    >
      <div class="flex-none h-15 w-15 my-6 border inline-block">
        <div class="flex h-full">
          <span class="uppercase my-auto mx-auto">
            {{ $t(`shop_registration_wizard.step_2.${day}`) }}
          </span>
        </div>
      </div>

      <div class="overflow-hidden w-full">
        <FormulateInput
          v-model="context.model[day].open"
          type="time"
          :name="`${day} open`"
          :label="$t('shop_registration_wizard.step_2.from')"
        />
      </div>
      <div class="overflow-hidden w-full">
        <FormulateInput
          v-model="context.model[day].close"
          type="time"
          :name="`${day} close`"
          :label="$t('shop_registration_wizard.step_2.until')"
        />
      </div>
    </div>
    <div class="mx-auto">
      <FormulateInput
        input-class="secondary rounded-full py-2 "
        type="button"
        label="add brekas"
        @click="breaks = true"
      />
    </div>
    <div v-show="breaks" class="modal-bg" />
    <transition name="modalAnimation">
      <div v-show="breaks" class="modal-wrapper">
        <div class="modal">
          <div class="modal-body p-6 sm:p-8 w-full max-w-xl">
            <h1 class="text-center pt-16 pb-8">Breaks</h1>
            <div>
              <div
                v-for="(openingTimes, day) in context.model"
                :key="day + 'break'"
                class="flex items-end"
              >
                <div class="flex-none h-15 w-15 my-6 border inline-block">
                  <div class="flex h-full">
                    <span class="uppercase my-auto mx-auto">
                      {{ $t(`shop_registration_wizard.step_2.${day}`) }}
                    </span>
                  </div>
                </div>
                <div class="overflow-hidden w-full">
                  <FormulateInput
                    :value="getBreak(day).from"
                    type="time"
                    :name="`${day} break from`"
                    :label="$t('shop_registration_wizard.step_2.from')"
                    @input="context.model[day].breaks[0].from = $event"
                  />
                </div>
                <div class="overflow-hidden w-full">
                  <FormulateInput
                    :value="getBreak(day).to"
                    type="time"
                    :name="`${day} break until`"
                    :label="$t('shop_registration_wizard.step_2.until')"
                    @input="context.model[day].breaks[0].to = $event"
                  />
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <FormulateInput
                input-class="secondary rounded-full py-2"
                type="button"
                label="close"
                @click="breaks = false"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      breaks: false,
    }
  },
  methods: {
    showBreaks() {
      console.log('click')
      this.breaks = true
    },
    getBreak(day) {
      return this.context.model[day].breaks
        ? this.context.model[day].breaks[0]
        : {}
    },
  },
}
</script>

<style lang="scss" scoped>
/*
 * Top Modal Item Animation
 */
.modalAnimation-item {
  display: inline-block;
}

.modalAnimation-enter-active,
.modalAnimation-leave-active {
  transition: all 0.5s;
}

.modalAnimation-enter,
.modalAnimation-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}

.modal {
  @apply h-screen w-full absolute flex items-center justify-center;
  &-wrapper {
    @apply z-50 fixed top-0 left-0 bottom-0 right-0 bg-transparent shadow;
  }
  &-bg {
    @apply z-50 fixed top-0 left-0 h-screen w-full bg-black opacity-50;
  }
  &-body {
    @apply bg-white m-3 max-h-full overflow-y-auto;
  }
}
</style>
