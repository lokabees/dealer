<template>
  <div class="container prose max-w-xl mx-auto">
    <h1>{{ $t('shop_registration_wizard.step_2.title') }}</h1>
    <p>
      {{ $t('shop_registration_wizard.step_2.text') }}
    </p>
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
          :name="`${day} open`"
          :label="$t('shop_registration_wizard.step_2.from')"
        />
        <FormulateInput
          v-model="openingHours[day].close"
          type="time"
          :name="`${day} close`"
          :label="$t('shop_registration_wizard.step_2.until')"
        />
      </div>

      Breaks
      <div v-for="(openingTimes, day) in openingHours" :key="day + 'break'">
        <div>{{ $t(`shop_registration_wizard.step_2.${day}`) }} break</div>
        <div v-if="openingHours[day].open && openingHours[day].close">
          <FormulateInput
            :value="getBreak(day).from"
            type="time"
            :name="`${day} break from`"
            :label="$t('shop_registration_wizard.step_2.from')"
            @input="openingHours[day].breaks[0].from = $event"
          />
          <FormulateInput
            :value="getBreak(day).to"
            type="time"
            :name="`${day} break until`"
            :label="$t('shop_registration_wizard.step_2.until')"
            @input="openingHours[day].breaks[0].to = $event"
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
      temporaryBreak: {},
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
      // this.$emit('submit', this.openingHours)
    },
    getBreak(day) {
      console.log(day)
      console.log(this.openingHours[day])

      console.log(this.openingHours[day]?.breaks[0])
      return this.openingHours[day]?.breaks[0] || {}
    },
  },
}
</script>
