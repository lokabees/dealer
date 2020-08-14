<template>
  <form-wizard color="#19ae9d" @on-complete="onComplete">
    <span slot="title"></span>
    <tab-content>
      <div class="container prose max-w-xl mx-auto">
        <h1>{{ $t('shop_registration_wizard.step1_title') }}</h1>
        <p>
          {{ $t('shop_registration_wizard.step1_text') }}
        </p>
      </div>
    </tab-content>
    <tab-content>
      <div class="container prose max-w-xl mx-auto">
        <h1>{{ $t('shop_registration_wizard.step2_title') }}</h1>
        <p>
          {{ $t('shop_registration_wizard.step2_text') }}
        </p>
      </div>
    </tab-content>
    <tab-content>
      <div class="container prose max-w-xl mx-auto">
        <h1>{{ $t('shop_registration_wizard.step3_title') }}</h1>
        <p>
          {{ $t('shop_registration_wizard.step3_text') }}
        </p>
      </div>
    </tab-content>
    <tab-content>
      <div class="container prose max-w-xl mx-auto">
        <h1>{{ $t('shop_registration_wizard.step4_title') }}</h1>
        <p>
          {{ $t('shop_registration_wizard.step4_text') }}
        </p>
      </div>
    </tab-content>
    <tab-content>
      <div class="container prose max-w-xl mx-auto">
        <h1>{{ $t('shop_registration_wizard.step5_title') }}</h1>
        <p>
          {{ $t('shop_registration_wizard.step5_text1') }}
        </p>
        <p>
          {{ $t('shop_registration_wizard.step5_text2') }}
        </p>
        <p>
          {{ $t('shop_registration_wizard.step5_text3') }}
        </p>
        <p>
          {{ $t('shop_registration_wizard.step5_text4') }}
        </p>
      </div>
    </tab-content>
    <template slot="footer" slot-scope="props">
      <div class="wizard-footer-left">
        <wizard-button
          v-if="props.activeTabIndex > 0 && !props.isLastStep"
          @click.native="props.prevTab()"
          :style="props.fillButtonStyle"
          >{{ $t('shop_registration_wizard.prevous') }}</wizard-button
        >
      </div>
      <div class="wizard-footer-right">
        <wizard-button
          v-if="!props.isLastStep"
          @click.native="props.nextTab()"
          class="wizard-footer-right"
          :style="props.fillButtonStyle"
          >{{ $t('shop_registration_wizard.next') }}</wizard-button
        >

        <wizard-button
          v-else
          @click.native="alert('Done')"
          class="wizard-footer-right finish-button"
          :style="props.fillButtonStyle"
          >{{
            props.isLastStep
              ? $t('shop_registration_wizard.done')
              : $t('shop_registration_wizard.next')
          }}</wizard-button
        >
      </div>
    </template>
  </form-wizard>
</template>

<script>
export default {
  methods: {
    onComplete() {
      alert('Yay. Done!')
    },
  },
}
</script>
