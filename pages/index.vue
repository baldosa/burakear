<template>
  <v-container>
    <v-row
      v-if="!start"
      justify="center"
      align="center"
    >
      <v-col cols="12" sm="8" md="6">
        <v-form
          ref="form"
          v-model="validForm"
        >
          <div
            v-for="player in players"
            :key="player.id"
          >
            <v-text-field
              v-model="player.name"
              label="Nombre del jugador"
              :rules="required"
              required
            />
          </div>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-btn
                class="primary"
                @click="startGame"
              >
                Comenzar
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-btn
                class="error"
                @click="cancelGame"
              >
                Limpiar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <score-board
      v-if="start"
      :players="players"
    />
    <v-btn
      v-if="start"
      class="error mt-3"
      @click="cancelGame"
    >
      Comenzar de nuevo
    </v-btn>
  </v-container>
</template>

<script>
import ScoreBoard from '@/components/ScoreBoard'

export default {
  components: {
    ScoreBoard
  },
  data () {
    return {
      validForm: false,
      players: [
        {
          id: 0,
          dialog: false,
          dialogDelete: false,
          name: '',
          score: 0,
          rounds: []
        },
        {
          id: 1,
          dialog: false,
          dialogDelete: false,
          name: '',
          score: 0,
          rounds: []
        }
      ],
      start: false,
      required: [
        v => !!v || 'El campo es obligatorio'
      ]
    }
  },
  methods: {
    startGame () {
      if (this.$refs.form.validate()) {
        this.start = true
      }
    },
    cancelGame () {
      this.start = false
      this.players = [
        {
          id: 0,
          dialog: false,
          dialogDelete: false,
          name: '',
          score: 0,
          rounds: []
        },
        {
          id: 1,
          dialog: false,
          dialogDelete: false,
          name: '',
          score: 0,
          rounds: []
        }
      ]
    }
  }
}
</script>
