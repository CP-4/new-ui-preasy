<template>
<div class="home">

  <v-tabs fixed-tabs v-model="v_tabs" background-color="grey lighten-4">
    <v-tab v-on:click="setMyPrintTray()">
      Print Files
    </v-tab>
    <v-tab v-on:click="setMyPickUp()">
      Pick-Up ( {{ getPickUpNumber() }} )
    </v-tab>
  </v-tabs>


  <v-container class="py-8 grey lighten-4">

    <v-card class="my-n5 file" :class="getFileStatus(file.printJobStatus)" flat v-for="file in getReleventFiles()" :key="file.id">
      <div class="level is-mobile my-n5">
        <div class="level-left">
          <div class="level-item">
            <div class="column">
              <div class="caption grey--text">File name</div>
              <span>{{ file.docname.slice(0,20) }}</span>
            </div>
            <div class="column">
              <div class="caption grey--text">File ID</div>
              <span>{{ file.id }}</span>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="column">
              <v-chip pill dark :color="printStatusColor(file.printJobStatus)" v-on:click="removeFile(file.id)">
                {{ getFileStatus(file.printJobStatus) }}
              </v-chip>
            </div>
          </div>
        </div>
      </div>

      <div class="level is-mobile mb-n5">
        <div class="level-item">
          <div class="column">
            <div class="caption grey--text">Pages</div>
            <span>{{ file.pages }}</span>
          </div>
        </div>
        <div class="level-item">
          <div class="column mt-3">
            <div class="caption grey--text">Print options</div>
            <div class="">
              <v-chip class="" pill v-if="active_tab === 'my_print_tray'">
                <select v-model="file.print_feature">
                  <option value="SINGLESIDE">Single side</option>
                  <option value="DOUBLESIDE">Both side</option>
                </select>
              </v-chip>
              <span v-if="active_tab === 'my_pick_up'">{{ file.print_feature }}</span>
            </div>
            <!-- <v-select :items="print_feature_items" label="Solo field" solo>
            </v-select> -->
          </div>
        </div>
        <div class="level-item">
          <div class="column">
            <div class="caption grey--text">Copies</div>
            <vue-numeric-input v-if="active_tab === 'my_print_tray'" v-model="file.print_copies" :min="1" :max="100" :step="1" size='80px'></vue-numeric-input>
            <span v-if="active_tab === 'my_pick_up'">{{ file.print_copies }}</span>
          </div>
        </div>

      </div>

      <v-divider></v-divider>
    </v-card>

    <div class="text-center">
      <input id="fileupload" type="file" ref="file" style="display: none" v-on:change="addFile()" />
      <v-btn bottom rounded class="ma-5" dark color="purple" @click="$refs.file.click()" v-if="active_tab === 'my_print_tray'">
        <v-icon dark>mdi-plus</v-icon>
        Add file
      </v-btn>
    </div>

    <div class="pa-12"></div>
    <div class="pa-12"></div>
    <div class="pa-12"></div>

    <div class="container has-text-centered">
      <div class="tile" v-if="getReleventFiles().length === 0">
        <p class="title is-4">No files in print tray.</p>
        <p class="subtitle ">{{ getPickUpNumber() }} Files in Pick Up Queue</p>
      </div>
    </div>


  </v-container>

  <v-footer fixed>
    <v-btn class="" x-large tile block dark color="green accent-3" v-on:click="actionButton()">
      <v-icon dark absolute left>mdi-cloud-print-outline</v-icon>
      <span class="">{{ this.action_button_text }}</span>
    </v-btn>
  </v-footer>

  <v-dialog fullscreen v-model="showPlaceOrder">
    <v-card class="grey lighten-4">
      <v-card-title class="headline">
        Place order
        <v-spacer></v-spacer>
        <v-btn class="mt-n5 mr-n5" fab depressed small v-on:click="showPlaceOrder = !showPlaceOrder">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="">
        <!-- <div class="title is-5 has-text-left">
          <p>{{ printTray.length }} files will be printed.</p>
        </div> -->
        <div class="">
          <div class="caption grey--text">Shop:</div>
          <v-btn depressed block left color="grey lighten-2 purple--text" style="white-space: normal; align-items: left;" @click="openShopDialog()">
            <div class="" style="white-space: normal; align-items: left;">
              <p class="mb-n1">{{ shop.name }}</p>
              <p class="caption">{{ shop.address }}</p>
            </div>
          </v-btn>
        </div>
        <br>
        <v-simple-table dense fixed-header height="150" class="mx-n3 pb-3 grey lighten-4">
          <template v-slot:default>
            <thead class="grey lighten-4">
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Amount</th>
                <th class="text-left">Pages</th>
                <th class="text-left">Side</th>
                <th class="text-left">Copies</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="file in printTray" :key="file.id">
                <td>{{ file.docname.slice(0,8) }}...</td>
                <td>&#8377;{{ file.print_cost }}</td>
                <td>{{ file.pages }}</td>
                <td>{{ file.print_feature.slice(0,6) }}</td>
                <td>{{ file.print_copies }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>


        <!-- <div class="column" v-if="promo_code">
          <div class="caption grey--text">Promo code:</div>
          <span>{{ promo_code }}</span>
        </div> -->


        <div class="">
          <p class="headline">Total amount: <span class="green--text">&#8377;{{ printTrayCost }}</span></p>
        </div>
      </v-card-text>

      <v-footer fixed class="grey lighten-4">
        <div class=" caption my-n4">
          <p class="text-center mb-n2">Pay at the shop. No extra charges.</p>
          <p class="text-center red--text accent-3">Orders once placed cannot be cancelled.</p>
        </div>
        <!-- <v-card-actions> -->
        <v-btn class="" x-large depressed block dark color="red accent-2" v-on:click="placeOrder()">
          <span class="">Place Order</span>
        </v-btn>
        <!-- </v-card-actions> -->
      </v-footer>
    </v-card>
  </v-dialog>

  <v-dialog fullscreen v-model="showPickUp">
    <v-card class="grey lighten-4">
      <v-card-title class="headline">
        Pickup order
        <v-spacer></v-spacer>
        <v-btn class="mt-n5 mr-n5" fab depressed small v-on:click="showPickUp = !showPickUp">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="">
        <div class="">
          <div class="caption grey--text">Shop:</div>
          <div class="">
            <div class="px-2 black--text">
              <p class="title mb-n1">{{ shop.name }}</p>
              <p class="caption">{{ shop.address }}</p>
            </div>
          </div>
        </div>
        <br>
        <v-simple-table dense fixed-header height="150" class="mx-n3 pb-3 grey lighten-4">
          <template v-slot:default>
            <thead class="grey lighten-4">
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Amount</th>
                <th class="text-left">Pages</th>
                <th class="text-left">Side</th>
                <th class="text-left">Copies</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="file in pickUpTray" :key="file.id">
                <td>{{ file.docname.slice(0,8) }}...</td>
                <td>&#8377;{{ file.print_cost }}</td>
                <td>{{ file.pages }}</td>
                <td>{{ file.print_feature.slice(0,6) }}</td>
                <td>{{ file.print_copies }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <div class="">
          <p class="headline">Total amount: <span class="green--text">&#8377;{{ pickUpTrayCost }}</span></p>
        </div>
      </v-card-text>

      <v-footer fixed class="grey lighten-4">
        <div class=" caption my-n4">
          <p class="text-center mb-n2">Pay at the shop. No extra charges.</p>
          <p class="text-center red--text accent-3">Orders once placed cannot be cancelled.</p>
        </div>
        <v-btn class="" x-large depressed block dark color="red accent-2" v-on:click="pickUpOrder()">
          <span class="">pickup</span>
        </v-btn>
      </v-footer>
    </v-card>
  </v-dialog>


  <v-snackbar v-model="showSnackbar">
    {{ textSanckbar }}
    <v-btn color="pink" text @click="showSnackbar = false">
      Ok
    </v-btn>
  </v-snackbar>

  <v-dialog fullscreen v-model="showShopDialog">
    <v-card class="grey lighten-2">
      <v-card-title class="headline">
        Select a Shop:
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="showShopDialog = !showShopDialog">Close</v-btn>
      </v-card-title>

      <v-card-text>
        <v-card class="mx-auto my-1" flat v-for="shop in shops" :key="shop.id">
          <v-card-title class="">
            {{ shop.name }}
            <v-spacer></v-spacer>
            <v-btn depressed fab small class="mx-1 blue--text" :href=shop.gmap_url target="_blank" v-on:click="openMap()">
              <v-icon>mdi-google-maps</v-icon>
            </v-btn>
            <v-btn depressed v-on:click="selectShop(shop.id)">Select</v-btn>
          </v-card-title>
          <v-card-subtitle>{{ shop.address }}</v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col>
                <div class="caption grey--text">Single Side</div>
                <span>&#8377;{{ shop.price_ss }}/page</span>
              </v-col>
              <v-col>
                <div class="caption grey--text">Double Side</div>
                <span>&#8377;{{ shop.price_ds }}/page</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>

      <v-card-actions></v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
// @ is an alias to /src
// import axios from 'axios'
import {
  axiosBase
} from '@/api/axios-base'
import VueNumericInput from 'vue-numeric-input'
// import PlaceOrder from '@/components/PlaceOrder.vue'

export default {
  name: 'home',
  components: {
    VueNumericInput,
    // PlaceOrder,
  },

  data() {
    return {
      drawer: false,
      files: [],
      printTray: [],
      pickUpTray: [],
      shops: [],
      showNav: true,
      action_button_text: "Print Files",
      active_tab: "my_print_tray",
      showPlaceOrder: false,
      showPickUp: false,
      showSnackbar: false,
      v_tabs: 0,
      print_feature_items: ["Single side", "Both side"],
      promo_code: '',
      textSanckbar: '',
      shopId: 0,
      showShopDialog: false,
      shopName: 'select shop',
      shop: {},
      printTrayCost: 0,
      pickUpTrayCost: 0,

    }
  },

  computed: {
    isActiveMyPrintTray: function() {
      return this.active_tab === 'my_print_tray';
    },

    isActiveMyPickUp: function() {
      return this.active_tab === 'my_pick_up';
    },

  },

  mounted() {
    this.getFiles();
    this.$store.dispatch('urlanalyticsTrigger', 'print home mounted');
    this.setPropPromoCode();
  },

  methods: {
    openMap() {
      this.$store.dispatch('urlanalyticsTrigger', 'navbar->open map')
    },

    setPropPromoCode() {
      this.promo_code = this.$store.getters.getPromoCode;
    },

    getFiles() {

      axiosBase.get('/file2/files/', {
          headers: {
            'Authorization': "bearer " + this.$store.state.accessToken
          },
        })
        .then(response => this.files = response.data)
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push({
              name: 'logout'
            })
          }
        });
    },

    removeFile(file_id) {
      if (this.active_tab === 'my_print_tray') {
        axiosBase.delete('/file2/files/' + file_id, {
            headers: {
              'Authorization': "bearer " + this.$store.state.accessToken
            },
          }).then(() => this.getFiles())
          .catch(err => {
            if (err.response.status === 401) {
              this.$router.push({
                name: 'logout'
              })
            }
          });
      }
    },

    getFileExtention(file) {
      var sFileName = file.name;
      var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
      return sFileExtension;
    },

    checkFile(file) {

      // var sFileName = file.name;
      var sFileExtension = this.getFileExtention(file);
      var iFileSize = file.size;
      var iConvert = (file.size / 1048576).toFixed(2);

      var valid_type = ["doc", "docx", "pdf"]

      // console.log('in checkFile');

      if (!(valid_type.includes(sFileExtension) || iFileSize > 10485760)) { /// 10 mb
        var txt;
        txt = "File type : " + sFileExtension + "\n\n";
        txt += "Size: " + iConvert + " MB \n\n";
        txt += "Supported format: doc, docx, pdf. File size should be less than 10 MB.\n\n";
        alert(txt);
        // // console.log('File not supported');
        return false;
      }
      // console.log('File supported');
      return true;

    },

    addFile() {
      // console.log('in addFile');
      // console.log(this.$refs.file.files);
      let docfile = this.$refs.file.files[0];
      // let doctype = getFileExtention(docfile);

      if (this.checkFile(docfile)) {
        let formData = new FormData();
        formData.append('docfile', docfile);
        // formData.append('doctype', doctype);

        axiosBase.post('/file2/files/upload/', formData, {
            headers: {
              'Authorization': "bearer " + this.$store.state.accessToken,
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(() => this.getFiles())
          .catch(err => {
            // alert(err.response.status)
            // console.log(err);
            if (err.response.status === 401) {
              this.$router.push({
                name: 'logout'
              })
            }
          });
        document.getElementById('fileupload').value = "";
      }
      this.$store.dispatch('urlanalyticsTrigger', 'add file')
    },

    selectShop(shopId) {
      this.$store.dispatch('urlanalyticsTrigger', 'shop selected')
      var shop = this.shops.find(shop => shop.id == shopId);
      // console.log(this.shops);
      this.shopName = shop.name;
      this.showShopDialog = false;
      this.$store.dispatch('updateShopId', shop);
      this.actionButton();

      // TODO: Select shop dialog closes after this. it shouldnt
    },

    openShopDialog() {
      this.$store.dispatch('urlanalyticsTrigger', 'shop dialog')

      this.showShopDialog = true;

      axiosBase.get('/file2/shops/', {
          headers: {
            'Authorization': "bearer " + this.$store.state.accessToken
          },
        }).then(response => this.shops = response.data)
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push({
              name: 'logout'
            })
          }
        });
      // console.log(this.shops);
    },

    placeOrder() {
      this.$store.dispatch('urlanalyticsTrigger', 'order placed')
      axiosBase.put('/file2/files/printmytray', {
          print_tray: this.printTray,
          promo_code: this.promo_code
        }, {
          headers: {
            'Authorization': "bearer " + this.$store.state.accessToken
          },
        }).then(() => this.setMyPickUp())
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push({
              name: 'logout'
            })
          }
        });

      this.showPlaceOrder = false;
      this.v_tabs = 1;
    },

    pickUpOrder() {
      this.$store.dispatch('urlanalyticsTrigger', 'pickup placed')
      let pickUpIds = this.pickUpTray.map(a => a.id);

      axiosBase.put('/file2/files/pickup', pickUpIds, {
          headers: {
            'Authorization': "bearer " + this.$store.state.accessToken
          },
        }).then(() => this.getFiles())
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push({
              name: 'logout'
            })
          }
        });

      this.showPickUp = false;
    },

    actionButton() {

      if (this.active_tab === 'my_print_tray') {

        var shopId = this.$store.getters.getShopId;
        var shop;

        if (!shopId) {
          this.$store.dispatch('urlanalyticsTrigger', 'print->openShopDialog')
          this.openShopDialog();
        } else {
          let printTray = this.files.filter(function(file) {
            return file.printJobStatus == 0;
          })

          axiosBase.get('/file2/shops/' + shopId)
            .then(response => {
              // console.log(response);
              shop = response.data;
              this.shop = shop;
              this.shopName = shop.name;

              var total = 0;

              for (var i = 0; i < printTray.length; i++) {
                printTray[i].shop = this.shop['user_id_2'];

                // var side = 0;
                var cost = 0;
                if (printTray[i].print_feature == "SINGLESIDE") {
                  // side = 1;
                  cost = this.shop['price_ss'];
                } else if (printTray[i].print_feature == "DOUBLESIDE") {
                  if (printTray[i].pages > 1) {
                    // side = 2;
                    cost = this.shop['price_ds'];
                  } else {
                    // side = 1;
                    cost = this.shop['price_ss'];
                  }
                }

                printTray[i].print_cost = Math.ceil(printTray[i].pages * cost) * printTray[i].print_copies;

                total += printTray[i].print_cost;
              }
              this.printTrayCost = total;
              this.printTray = printTray;
            })
            .catch(err => {
              console.log(err);
              this.$store.dispatch('clearShopId');
            });


          if (printTray.length > 0) {
            this.showPlaceOrder = true;
          } else {
            this.textSanckbar = "Add a file to print.";
            this.showSnackbar = true;
          }
        }

        // console.log('send print tray')

        this.$store.dispatch('urlanalyticsTrigger', 'print files')


      } else if (this.active_tab === 'my_pick_up') {

        this.$store.dispatch('urlanalyticsTrigger', 'here to pickup')


        let pickUp = this.files.filter(function(file) {
          return file.printJobStatus == 2;
        })
        this.pickUpTray = pickUp;

        if (pickUp.length > 0) {
          shopId = this.$store.getters.getShopId;

          if (shopId) {
            axiosBase.get('/file2/shops/' + shopId)
              .then(response => {
                // console.log(response);
                shop = response.data;
                this.shop = shop;
                this.shopName = shop.name;
              });
          }

          var total = 0;
          for (var i = 0; i < pickUp.length; i++) {
            total += pickUp[i].print_cost;
          }
          this.pickUpTrayCost = total;
          this.showPickUp = true;
        } else {
          this.textSanckbar = "No file ready for pick up. ";
          this.showSnackbar = true;
        }

      }
    },

    setMyPrintTray() {
      this.getFiles();
      this.active_tab = "my_print_tray";
      this.action_button_text = "Print Files"
    },

    setMyPickUp() {
      this.getFiles();
      this.active_tab = "my_pick_up";
      this.action_button_text = "Here to Pick-Up"
    },

    getReleventFiles() {
      if (this.active_tab === 'my_print_tray') {
        return this.files.filter(function(file) {
          return file.printJobStatus == 0;
        });
      } else if (this.active_tab === 'my_pick_up') {
        return this.files.filter(function(file) {
          var t_list = [1, 2, 3];
          return t_list.includes(file.printJobStatus);
          // TODO: change filter
        });
      }
    },

    getFileStatus(file_status) {
      // // console.log(file_status);
      switch (file_status) {
        case 0:
          return 'remove'
          // break;

        case 1:
          return 'in queue'
          // break;

        case 2:
          return 'printed'
          // break;

        case 3:
          return 'pick'
          // break;

        case 4:
          return 'delivered'
          // break;

        default:
          return 'lost in ether'
      }
    },

    getPickUpNumber() {
      return this.files.filter(function(file) {
        var t_list = [1, 2, 3];
        return t_list.includes(file.printJobStatus);
      }).length;
    },

    printStatusColor(file_status) {
      switch (file_status) {
        case 0:
          return 'red accent-3'
          // break;

        case 1:
          return 'deep-purple accent-3'
          // break;

        case 2:
          return 'green accent-3'
          // break;

        case 3:
          return 'pink accent-3'
          // break;

        case 4:
          return 'grey'
          // break;

        default:
          return 'grey darken-4'
      }
    },

  }
}
</script>

<style scoped media="screen">
.file.remove {
  border-left: 4px solid #FF1744;
}

.file.queue {
  border-left: 4px solid #651FFF;
}

.file.printed {
  border-left: 4px solid #00E676;
}

.file.pick {
  border-left: 4px solid #F50057;
}

.file.delivered {
  border-left: 4px solid #9E9E9E;
}

.file.ether {
  border-left: 4px solid #212121;
}
</style>
