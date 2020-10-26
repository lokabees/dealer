<template>
  <div>
    <div v-for="(openingTimes, day) in activeShop.openingHours" :key="day">
      <div class="sm:hidden block flex w-full prose">
        <h3 class="m-auto">
          {{ $t(`shop_registration_wizard.step_2.${day}_long`) }}
        </h3>
      </div>

      <div class="flex items-end">
        <div
          class="hidden sm:inline-block"
          :class="{ day: true, active: isActive(day) }"
        >
          <div class="flex h-full">
            <span class="uppercase my-auto mx-auto">
              {{ $t(`shop_registration_wizard.step_2.${day}`) }}
            </span>
          </div>
        </div>

        <div class="overflow-hidden w-full pr-2">
          <FormulateInput
            :value="activeShop.openingHours[day].open"
            type="time"
            errors-class="hidden"
            :name="`${day} open`"
            :label="$t('shop_registration_wizard.step_2.from')"
            :validation-rules="{
              openBeforeClose: ({ value }) => {
                const openSec = getSecondsFromString(value)
                if (!activeShop.openingHours[day].close || !openSec) return true
                const closeSec = getSecondsFromString(
                  activeShop.openingHours[day].close
                )
                return openSec < closeSec

                return true
              },
            }"
            validation="openBeforeClose"
            @validation="validation[day].open = $event"
            @input="
              updateActiveShopOpeningHours({
                day,
                openingHours: { open: $event },
              })
            "
          />
        </div>
        <div class="overflow-hidden w-full pl-2">
          <FormulateInput
            :value="activeShop.openingHours[day].close"
            type="time"
            :name="`${day} close`"
            errors-class="hidden"
            :label="$t('shop_registration_wizard.step_2.until')"
            :validation-rules="{
              closeAfterOpen: ({ value }) => {
                const closeSec = getSecondsFromString(value)
                if (!closeSec || !activeShop.openingHours[day].open) return true
                const openSec = getSecondsFromString(
                  activeShop.openingHours[day].open
                )
                return closeSec > openSec
                return true
              },
            }"
            validation="closeAfterOpen"
            @validation="validation[day].close = $event"
            @input="
              updateActiveShopOpeningHours({
                day,
                openingHours: { close: $event },
              })
            "
          />
        </div>
      </div>

      <div class="flex">
        <div class="hidden sm:block flex-none w-15 mr-4" />
        <ul class="formulate-input-errors w-full">
          <li
            v-for="error in validation[day].open.errors"
            :key="error"
            class="formulate-input-error"
          >
            {{ error }}
          </li>
        </ul>
        <ul class="formulate-input-errors w-full">
          <li
            v-for="error in validation[day].close.errors"
            :key="error"
            class="formulate-input-error"
          >
            {{ error }}
          </li>
        </ul>
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
                v-for="(openingTimes, day) in activeShop.openingHours"
                :key="day + 'break'"
              >
                <div class="sm:hidden block flex w-full prose">
                  <h3 class="m-auto">
                    {{ $t(`shop_registration_wizard.step_2.${day}_long`) }}
                  </h3>
                </div>
                <div class="flex items-end">
                  <div
                    class="hidden sm:inline-block"
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
                  <div class="overflow-hidden w-full pr-2">
                    <FormulateInput
                      :value="getBreak(day).from"
                      type="time"
                      :name="`${day} break from`"
                      errors-class="hidden"
                      :label="$t('shop_registration_wizard.step_2.from')"
                      :validation-rules="{
                        closeAfterOpen: ({ value }) => {
                          const breakOpenSec = getSecondsFromString(value)
                          if (
                            !breakOpenSec ||
                            !activeShop.openingHours[day] ||
                            !activeShop.openingHours[day].breaks[0]
                          )
                            return true
                          const openSec = getSecondsFromString(
                            activeShop.openingHours[day].open
                          )
                          const closeSec = getSecondsFromString(
                            activeShop.openingHours[day].close
                          )
                          const breakCloseSec = getSecondsFromString(
                            activeShop.openingHours[day].breaks[0].close
                          )
                          return (
                            breakOpenSec > openSec &&
                            breakOpenSec < closeSec &&
                            breakOpenSec < breakCloseSec
                          )
                          return true
                        },
                      }"
                      validation="closeAfterOpen"
                      @validation="validation[day].breaks.from = $event"
                      @input="
                        updateActiveShopBreaks({
                          day,
                          breaks: { from: $event },
                        })
                      "
                    />
                  </div>
                  <div class="overflow-hidden w-full pl-2">
                    <FormulateInput
                      :value="getBreak(day).to"
                      type="time"
                      :name="`${day} break until`"
                      errors-class="hidden"
                      :label="$t('shop_registration_wizard.step_2.until')"
                      :validation-rules="{
                        closeAfterOpen: ({ value }) => {
                          const breakCloseSec = getSecondsFromString(value)
                          if (
                            !breakOpenSec ||
                            !activeShop.openingHours[day] ||
                            !activeShop.openingHours[day].breaks[0]
                          )
                            return true
                          const openSec = getSecondsFromString(
                            activeShop.openingHours[day].open
                          )
                          const closeSec = getSecondsFromString(
                            activeShop.openingHours[day].close
                          )
                          const breakOpenSec = getSecondsFromString(
                            activeShop.openingHours[day].breaks[0].close
                          )
                          return (
                            breakCloseSec > openSec &&
                            breakCloseSec < closeSec &&
                            breakCloseSec > breakOpenSec
                          )
                          return true
                        },
                      }"
                      validation="closeAfterOpen"
                      @validation="validation[day].breaks.to = $event"
                      @input="
                        updateActiveShopBreaks({
                          day,
                          breaks: { to: $event },
                        })
                      "
                    />
                  </div>
                </div>

                <div class="flex">
                  <div class="hidden sm:block flex-none w-15 mr-4" />
                  <ul class="formulate-input-errors w-full">
                    <li
                      v-for="error in validation[day].breaks.from.errors"
                      :key="error"
                      class="formulate-input-error"
                    >
                      {{ error }}
                    </li>
                  </ul>
                  <ul class="formulate-input-errors w-full">
                    <li
                      v-for="error in validation[day].breaks.to.errors"
                      :key="error"
                      class="formulate-input-error"
                    >
                      {{ error }}
                    </li>
                  </ul>
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
import { mapGetters, mapMutations } from 'vuex'
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
      validation: {
        monday: { open: {}, close: {}, breaks: { from: {}, to: {} } },
        tuesday: { open: {}, close: {}, breaks: { from: {}, to: {} } },
        wednesday: { open: {}, close: {}, breaks: { from: {}, to: {} } },
        thursday: { open: {}, close: {}, breaks: { from: {}, to: {} } },
        friday: { open: {}, close: {}, breaks: { from: {}, to: {} } },
        saturday: { open: {}, close: {}, breaks: { from: {}, to: {} } },
        sunday: { open: {}, close: {}, breaks: { from: {}, to: {} } },
      },
    }
  },
  computed: {
    ...mapGetters('shops', {
      activeShop: 'activeShop',
    }),
  },
  methods: {
    ...mapMutations('shops', {
      updateActiveShopOpeningHours: 'updateActiveShopOpeningHours',
      updateActiveShopBreaks: 'updateActiveShopBreaks',
    }),
    cal(context, args) {
      console.log('cal')
      console.log(context)
      console.log(args)
    },
    getSecondsFromString(str) {
      if (!str) return
      const valArr = str.split(':')
      const secs = valArr[0] * 60 * 60 + valArr[1] * 60
      return secs
    },
    getBreak(day) {
      if (!this.activeShop.openingHours[day]?.breaks) return {}
      return this.activeShop.openingHours[day].breaks[0] || {}
    },
    isActive(day) {
      if (this.activeShop.openingHours[day].open) {
        const arr = this.activeShop.openingHours[day].open.split(':')
        if (arr[0] >= 0) return true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.day {
  @apply flex-none h-15 w-15 my-4 border  mr-4;
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
