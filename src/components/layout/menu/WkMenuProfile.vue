<template>
  <q-menu
    :transition-show="transitions.in"
    :transition-hide="transitions.out"
    :offset="[0, 8]"
    content-class="overflow-hidden full-max-width full-max-height bg-tiling-dark bg-gradient"
    separate-close-popup
    dark
    square
  >
    <q-card
      :style="$q.screen.xs ? 'width: 100%;' : 'min-width: 600px'"
      class="q-pa-md bg-transparent"
      flat
      dark
    >
      <q-card-section
        class="q-pa-none"
      >
        <div
          class="row q-col-gutter-md"
        >
          <div
            class="col-xs-12 col-sm-shrink text-center"
          >
            <q-btn
              v-close-popup
              :to="{ name: 'profile' }"
              size="24px"
              class="hover-zoom"
              round
              push
            >
              <q-avatar
                size="72px"
                color="accent"
              >
                <q-img
                  :src="avatar"
                  :ratio="1"
                />
              </q-avatar>
            </q-btn>
            <div
              class="text-subtitle1 q-mt-md q-mb-xs text-center text-no-wrap"
              :style="$q.screen.sm ? 'font-size: 90%;' : ''"
            >
              {{ publicName || $t( 'ux.user.guest' ) }}
              <q-badge
                v-if="!$q.screen.sm"
                align="middle"
                color="grey-8"
                text-color="white"
                transparent
              >
                #{{ shortBundle }}
              </q-badge>
            </div>
            <q-list
              dense
              dark
            >
              <q-item
                style="font-size: 80%;"
              >
                <q-item-section>
                  <q-item-label
                    class="text-no-wrap"
                    v-html="$t( 'ux.menus.profile.age.header' )"
                  />
                </q-item-section>
                <q-item-section
                  side
                >
                  <q-item-label
                    caption
                  >
                    <span
                      v-if="createdAt"
                    >
                      {{ Date.now() - createdAt | duration('humanize') }}
                    </span>
                    <span
                      v-else
                      v-html="$t( 'ux.menus.profile.age.brandnew' )"
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-btn-group
              class="q-mt-sm full-width"
              outline
              push
              rounded
              spread
            >
              <q-btn
                size="md"
                :to="{ name: 'profile' }"
                :dense="$q.screen.sm"
                color="accent"
                outline
                no-wrap
                rounded
              >
                <span
                  class="text-white"
                  v-html="$t( 'ux.menus.profile.buttons.profile' )"
                />
              </q-btn>
              <q-btn
                v-close-popup
                :dense="$q.screen.sm"
                size="md"
                color="accent"
                outline
                no-wrap
                rounded
                @click="backupDialogOpen = true"
              >
                <span
                  class="text-white"
                  v-html="$t( 'ux.menus.profile.buttons.backup' )"
                />
              </q-btn>
              <q-btn
                v-close-popup
                :dense="$q.screen.sm"
                size="md"
                color="accent"
                outline
                no-wrap
                rounded
                @click="logoutDialogOpen = true"
              >
                <span
                  class="text-white"
                  v-html="$t( 'ux.menus.profile.buttons.logout' )"
                />
              </q-btn>
            </q-btn-group>
          </div>
          <div
            v-if="$q.screen.gt.xs"
            class="col-auto text-center"
          >
            <div
              class="full-height inline-block "
            >
              <q-separator
                v-if="$q.screen.gt.xs"
                class="full-height"
                vertical
                color="accent"
              />
            </div>
          </div>
          <div
            class="col"
          >
            <q-item
              dense
              dark
            >
              <q-item-section
                avatar
              >
                <q-icon
                  name="fal fa-wallet"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  class="text-h6"
                  v-html="$t( 'ux.menus.profile.wallets.header' )"
                />
              </q-item-section>
              <q-item-section
                side
              >
                <q-btn-group
                  rounded
                  outline
                >
                  <q-btn
                    v-close-popup
                    color="accent"
                    size="sm"
                    outline
                    rounded
                    @click="initUser"
                  >
                    <q-icon
                      name="fal fa-sync"
                      color="white"
                    />
                    <q-tooltip>
                      <span
                        v-html="$t( 'ux.menus.profile.buttons.sync' )"
                      />
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    v-close-popup
                    color="accent"
                    size="sm"
                    outline
                    rounded
                    @click="infoDialogOpen = true"
                  >
                    <q-icon
                      name="fal fa-info-circle"
                      color="white"
                    />
                    <q-tooltip>
                      <span
                        v-html="$t( 'ux.menus.profile.buttons.info' )"
                      />
                    </q-tooltip>
                  </q-btn>
                </q-btn-group>
              </q-item-section>
            </q-item>

            <q-separator
              color="accent"
              spaced
            />

            <q-list
              class="row"
              separator
              dark
            >
              <div
                v-for="wallet in walletsMinusUser"
                :key="wallet.address"
                class="col-xs-12 col-md-6 col-lg-4"
              >
                <q-item
                  v-ripple
                  dense
                  clickable
                >
                  <q-item-section
                    v-clipboard="wallet.address"
                    @click="notify( $q.notify, $t( 'ux.notifications.clipboard' ) )"
                  >
                    <q-item-label>
                      <div
                        class="text-no-wrap"
                        style="height: 1em;"
                      >
                        {{ wallet.balance | numberWithCommas }}
                        <wk-knish-icon
                          v-if="wallet.token === 'KNISH'"
                        />
                        <span
                          v-else
                          v-html="wallet.token"
                        />
                      </div>
                    </q-item-label>
                    <q-item-label
                      caption
                      lines="2"
                      class="text-no-wrap"
                      v-html="wallet.tokenName"
                    />
                  </q-item-section>

                  <q-item-section
                    side
                  >
                    <q-btn-group
                      class="full-width"
                      outline
                      push
                      rounded
                      spread
                    >
                      <q-btn
                        v-close-popup
                        size="sm"
                        color="accent"
                        outline
                        rounded
                        @click="showQrDialog( wallet )"
                      >
                        <q-icon
                          name="fal fa-qrcode"
                          color="white"
                        />
                        <q-tooltip>
                          <span
                            v-html="$t( 'ux.menus.profile.buttons.qr' )"
                          />
                        </q-tooltip>
                      </q-btn>
                      <q-btn
                        v-close-popup
                        size="sm"
                        color="accent"
                        outline
                        rounded
                        @click="showSendDialog( wallet )"
                      >
                        <q-icon
                          name="fal fa-paper-plane"
                          color="white"
                        />
                        <q-tooltip>
                          <span
                            v-html="$t( 'ux.menus.profile.buttons.send' )"
                          />
                        </q-tooltip>
                      </q-btn>
                    </q-btn-group>
                  </q-item-section>
                </q-item>
              </div>
              <q-item
                v-if="Object.keys( wallets ).length <= 1"
                dark
              >
                <q-item-section>
                  <q-item-label
                    v-html="$t( 'ux.menus.profile.wallets.empty.header' )"
                  />
                  <q-item-label
                    caption
                    lines="2"
                    class="text-no-wrap"
                    v-html="$t( 'ux.menus.profile.wallets.empty.caption' )"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-separator
      color="accent"
    />
  </q-menu>
</template>

<script>
import WkKnishIcon from 'components/WkKnishIcon';
import knishio from 'src/mixins/knishio';
import notifies from 'src/mixins/notifies';
import application from 'src/mixins/application';
import vuex from 'src/mixins/vuex';

export default {
  components: {
    WkKnishIcon,
  },
  mixins: [
    knishio,
    notifies,
    application,
    vuex,
  ],
  props: {
    vertical: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      scrollerHeight: 0,
    };
  },
  computed: {
    shortBundle () {
      return this.$knishio.bundle().substr( -4, 4 ).toUpperCase();
    },
  },
  methods: {
    showQrDialog ( wallet ) {
      if ( !wallet ) {
        wallet = {
          bundle: this.$knishio.bundle(),
        };
      }
      this.qrWallet = wallet;
      this.qrDialogOpen = true;
    },
    showSendDialog ( wallet ) {
      this.qrWallet = wallet;
      this.sendDialogOpen = true;
    },
  },
};
</script>

<style>
</style>
