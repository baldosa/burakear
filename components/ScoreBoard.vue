<template>
  <v-row>
    <v-col
      v-for="(player, index) in players"
      :key="player.name"
      cols="12"
      sm="8"
      md="6"
    >
      <v-data-table
        :headers="headers"
        :items="player.rounds"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>
              {{ player.name }}
              <v-divider
                inset
                vertical
              />
              {{ totalScore(index) }}
            </v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            />
            <v-spacer />
            <v-dialog
              v-model="player.dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.one"
                          label="Unos"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.two"
                          label="Dos"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.threeSeven"
                          label="Tres a siete"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.eigthThirteen"
                          label="Ocho a trece"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.joker"
                          label="Comodines"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close(index)"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save(index)"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="player.dialogDelete" max-width="500px">
              <v-card>
                <v-card-title
                  class="headline"
                >
                  ¿Seguro en borrar el round?
                </v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeDelete"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteItemConfirm"
                  >
                    OK
                  </v-btn>
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(index, item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(index, item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          Sin rondas cargadas
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>

export default {
  props: {
    players: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      baseHand: [
        {
          value: 'One',
          count: 0,
          score: 0
        },
        {
          value: 'Twos',
          count: 0,
          score: 0
        },
        {
          value: 'Three to seven',
          count: 0,
          score: 0
        },
        {
          value: 'Eight to thirteen',
          count: 0,
          score: 0
        },
        {
          value: 'Joker',
          count: 0,
          score: 0
        }
      ],
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Ronda', value: 'id', sortable: false },
        { text: 'Puntaje', value: 'score', sortable: false },
        { text: '', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedPlayer: 0,
      editedItem: {
        one: 0,
        two: 0,
        threeSeven: 0,
        eigthThirteen: 0,
        joker: 0
      },
      defaultItem: {
        one: 0,
        two: 0,
        threeSeven: 0,
        eigthThirteen: 0,
        joker: 0
      }
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  methods: {
    editItem (player, item) {
      this.editedPlayer = player
      this.editedIndex = this.players[player].rounds.indexOf(item)
      this.editedItem = Object.assign({}, item.cards)
      this.players[player].dialog = true
    },

    close (player) {
      this.players[player].dialog = false
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      this.editedPlayer = 0
    },

    save (player) {
      if (this.editedIndex > -1) {
        this.players[player].rounds[this.editedIndex].cards = this.editedItem
        this.players[player].rounds[this.editedIndex].score = this.sumScore(this.editedItem)
      } else {
        let maxID = 0
        if (this.players[player].rounds.length > 0) {
          maxID = this.players[player].rounds.reduce((p, c) => p.id > c.id ? p : c)
          maxID = maxID.id
        }
        this.players[player].rounds.push({
          id: maxID + 1,
          score: this.sumScore(this.editedItem),
          cards: this.editedItem
        })
      }
      this.close(player)
    },

    deleteItem (player, item) {
      this.editedPlayer = player
      this.editedIndex = this.players[player].rounds.indexOf(item)
      this.editedItem = Object.assign({}, item.cards)
      this.players[player].dialogDelete = true
    },

    deleteItemConfirm () {
      this.players[this.editedPlayer].rounds.splice(this.editedIndex, 1)
      this.closeDelete(this.editedPlayer)
    },

    closeDelete (player) {
      this.players[player].dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    sumScore (cards) {
      let score = 0
      score = score + cards.one * 15
      score = score + cards.two * 20
      score = score + cards.threeSeven * 5
      score = score + cards.eigthThirteen * 10
      score = score + cards.joker * 50
      return score
    },
    totalScore (player) {
      return this.players[player].rounds.reduce((a, b) => a + (b.score || 0), 0)
    }
  }
}
</script>
