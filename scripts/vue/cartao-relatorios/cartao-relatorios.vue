<template>
  <v-card outlined tile>
    <v-card-text class="text--primary">
      <v-row v-for="(bundle, index) in innerHeader" :key="index + key()">
        <v-col v-for="info in bundle" :key="info.id">
          {{
            info !== undefined
              ? `${info.text} : ${data.header.values[info.value]}`
              : ""
          }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :headers="data.table.header"
            :items="data.table.content"
            hide-default-footer
            disable-pagination
            class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Cartaorelatorios",
  props: {
    data: Object,
    hitems: Number,
  },
  data() {
    return {
      innerHeader: [],
      innerCols: 1,
    };
  },
  created() {
    this.hitems === undefined || this.hitems === null || this.hitems === 0
      ? true
      : (this.innerCols = this.hitems);
    for (let i = 0; i < this.data.header.labels.length; i++) {
      let row = [];
      let col = [];
      for (let a = 0; a < this.innerCols; a++) {
        try {
          let tmp = this.data.header.labels[i];
          tmp.id = this.key();
          col[a] = tmp !== undefined ? tmp : false;
        } catch (e) {
          console.log(e);
        }
        i++;
      }
      i--;
      row[i] = col;
      this.innerHeader = [...this.innerHeader, row[i]];
    }
  },
  methods: {
    key() {
      let a = new Date();
      let k = "";
      k =
        a.getHours() +
        "" +
        a.getMinutes() +
        "" +
        a.getSeconds() +
        "" +
        a.getMilliseconds() +
        "" +
        Math.random() * 1000;
      return k;
    },
  },
};
</script>

<style scoped>
</style>

<!--

{
    "id": "identificador",
    "header": {
        "labels": [
            {
                "text": "Texto a ser exibido",
                "value": "valor que referencia ao conteudo do objeto valores de header"
            }
        ],
        "values": {
            "x": "conteudo do valor, x deve ser substituido pelo valor de value apontado em labels"
        }
    },
    "table": {
        "header": [
            {
                "text": "texto a ser exibido em tabela",
                "value": "valor a ser buscado em content"
            }
        ],
        "content": [
            {
                "x": "conteudo do valor, x deve ser substituido pelo valor de value apontado em header"
            }
        ]
    }
}

-->