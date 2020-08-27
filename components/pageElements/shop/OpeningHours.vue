<template>
  <div class="container prose max-w-xl mx-auto">
    <h1>{{ $t('shop_registration_wizard.step_2.title') }}</h1>
    <p>
      {{ $t('shop_registration_wizard.step_2.text') }}
    </p>
    {{ openingHours }}
    <!-- TODO opening times validation
    * close time > open time
    * close time required when open time
    * break time inside open time
    * breaks only visible when open
    * break times don't overlap
    -->
    <FormulateForm @submit="submit">
      <div v-for="(openingTimes, day) in openingHours" :key="day">
        <div>{{ $t(`shop_registration_wizard.step_2.${day}`) }}</div>
        <FormulateInput
          v-model="openingHours[day].open"
          type="time"
          name="mo"
          :label="$t('shop_registration_wizard.step_2.from')"
        />
        <FormulateInput
          v-model="openingHours[day].close"
          type="time"
          name="mo"
          :label="$t('shop_registration_wizard.step_2.until')"
        />
      </div>

      Breaks
      <div v-for="(openingTimes, day) in openingHours" :key="day + 'break'">
        <div>{{ $t(`shop_registration_wizard.step_2.${day}`) }} break</div>
        <div v-if="openingHours[day].open && openingHours[day].close">
          <FormulateInput
            v-model="openingHours[day].breaks[0].from"
            type="time"
            name="mo"
            :label="$t('shop_registration_wizard.step_2.from')"
          />
          <FormulateInput
            v-model="openingHours[day].breaks[0].to"
            type="time"
            name="mo"
            :label="$t('shop_registration_wizard.step_2.until')"
            @blur="addBreakTo(day)"
          />
        </div>
      </div>

      <FormulateInput
        type="submit"
        :label="$t('shop_registration_wizard.next')"
      />
    </FormulateForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openingHours: {
        monday: {
          breaks: [{}],
        },
        tuesday: {
          breaks: [{}],
        },
        wednesday: {
          breaks: [{}],
        },
        thursday: {
          breaks: [{}],
        },
        friday: {
          breaks: [{}],
        },
        saturday: {
          breaks: [{}],
        },
        sunday: {
          breaks: [{}],
        },
      },
    }
  },
  methods: {
    submit() {
      console.log(this.openingHours)
      this.$emit('submit', this.openingHours)
    },
    addBreakTo(day) {
      this.openingHours[day].breaks[0] = this.temporaryBreak
    },
  },
}
</script>
