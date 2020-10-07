<template>
  <div>
    <div
      v-for="(openingTimes, day) in context.model"
      :key="day"
      class="flex items-end"
    >
      <div :class="{ day: true, active: isActive(day) }">
        <div class="flex h-full">
          <span class="uppercase my-auto mx-auto">
            {{ $t(`shop_registration_wizard.step_2.${day}`) }}
          </span>
        </div>
      </div>

      <div class="overflow-hidden w-full pr-4">
        <FormulateInput
          v-model="context.model[day].open"
          type="time"
          :name="`${day} open`"
          :label="$t('shop_registration_wizard.step_2.from')"
        />
      </div>
      <div class="overflow-hidden w-full pl-4">
        <FormulateInput
          v-model="context.model[day].close"
          type="time"
          :name="`${day} close`"
          :label="$t('shop_registration_wizard.step_2.until')"
          :validation-rules="{
            closeAfterOpen: ({ value }) => {
              const valSec = getSecondsFromString(value)
              const openSec = getSecondsFromString(context.model[day].open)
              if (!valSec) return true
              return valSec > openSec
            },
          }"
          validation="closeAfterOpen"
        />
      </div>
    </div>
    <div class="flex">
      <FormulateInput
        outer-class="mx-auto"
        input-class="secondary rounded-full py-2 "
        type="button"
        :label="$t('shop_registration_wizard.step_2.add_breaks')"
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
                <div
                  :class="{
                    day: true,
                    active: getBreak(day).from,
                  }"
                >
                  <div class="flex h-full">
                    <span class="uppercase my-auto mx-auto">
                      {{ $t(`shop_registration_wizard.step_2.${day}`) }}
                    </span>
                  </div>
                </div>
                <div class="overflow-hidden w-full pr-4">
                  <FormulateInput
                    :value="getBreak(day).from"
                    type="time"
                    :name="`${day} break from`"
                    :label="$t('shop_registration_wizard.step_2.from')"
                    :validation-rules="{
                      closeAfterOpen: ({ value }) => {
                        const valSec = getSecondsFromString(value)
                        const openSec = getSecondsFromString(
                          context.model[day].open
                        )
                        const closeSec = getSecondsFromString(
                          context.model[day].close
                        )
                        if (!valSec) return true
                        return valSec > openSec && valSec < closeSec
                      },
                    }"
                    validation="closeAfterOpen"
                    @input="setBreakFrom(day, $event)"
                  />
                </div>
                <div class="overflow-hidden w-full pl-4">
                  <FormulateInput
                    :value="getBreak(day).to"
                    type="time"
                    :name="`${day} break until`"
                    :label="$t('shop_registration_wizard.step_2.until')"
                    @input="setBreakTo(day, $event)"
                    :validation-rules="{
                      closeAfterOpen: ({ value }) => {
                        const valSec = getSecondsFromString(value)
                        const openSec = getSecondsFromString(
                          context.model[day].open
                        )
                        const closeSec = getSecondsFromString(
                          context.model[day].close
                        )
                        if (!valSec) return true
                        return valSec > openSec && valSec < closeSec
                      },
                    }"
                    validation="closeAfterOpen"
                  />
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <FormulateInput
                input-class="secondary rounded-full py-2"
                type="button"
                :label="$t('shop_registration_wizard.step_2.close')"
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
      this.breaks = true
    },
    getSecondsFromString(str) {
      if (!str) return
      const valArr = str.split(':')
      return valArr[0] * 60 * 60 + valArr[1] * 60
    },
    getBreak(day) {
      if (!this.context?.model[day]?.breaks) return {}
      return this.context.model[day].breaks[0] || {}
    },
    setBreakFrom(day, input) {
      if (!this.context?.model[day]?.breaks[0])
        this.context.model[day].breaks = [{}]
      this.context.model[day].breaks[0].from = input
    },
    setBreakTo(day, input) {
      if (!this.context?.model[day]?.breaks[0])
        this.context.model[day].breaks = [{}]
      this.context.model[day].breaks[0].to = input
    },
    isActive(day) {
      if (this.context.model[day].open) {
        const arr = this.context.model[day].open.split(':')
        if (arr[0] >= 0) return true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.day {
  @apply flex-none h-15 w-15 my-4 border inline-block mr-4;
}

.active {
  @apply bg-primary text-white;
}

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
