<template>
  <div>
    <!-- TODO opening times validation
    * close time > open time
    * close time required when open time
    * break time inside open time
    * breaks only visible when open
    * break times don't overlap
    -->

    Opening times
    <div
      v-for="(openingTimes, day) in context.model"
      :key="day"
      class="flex items-center"
    >
      <div class="overflow-hidden px-auto py-auto">
        {{ $t(`shop_registration_wizard.step_2.${day}`) }}
      </div>
      <div class="overflow-hidden">
        <FormulateInput
          v-model="context.model[day].open"
          type="time"
          :name="`${day} open`"
          :label="$t('shop_registration_wizard.step_2.from')"
        />
      </div>
      <div class="overflow-hidden">
        <FormulateInput
          v-model="context.model[day].close"
          type="time"
          :name="`${day} close`"
          :label="$t('shop_registration_wizard.step_2.until')"
        />
      </div>
    </div>

    Breaks
    <div class="modal-body p-6 sm:p-8 w-full max-w-xl">
      <div>
        <div v-for="(openingTimes, day) in context.model" :key="day + 'break'">
          <div>{{ $t(`shop_registration_wizard.step_2.${day}`) }} break</div>
          <div v-if="context.model[day].open && context.model[day].close">
            <FormulateInput
              :value="getBreak(day).from"
              type="time"
              :name="`${day} break from`"
              :label="$t('shop_registration_wizard.step_2.from')"
              @input="context.model[day].breaks[0].from = $event"
            />
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
        <slot name="buttons"></slot>
      </div>
    </div>
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
  methods: {
    getBreak(day) {
      return this.context.model[day]?.breaks[0] || {}
    },
  },
}
</script>
