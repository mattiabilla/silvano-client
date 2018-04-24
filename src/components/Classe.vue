<template> 
	  
	<q-card inline class="q-mt-md q-mr-sm q-ml-sm" v-bind:color="cl.colore" >
      <q-card-title v-cloak>
        {{cl.nome}}
        <span slot="subtitle">{{cl.materia}} </span>
		<span slot="subtitle">{{cl.anno}}</span>
        
      </q-card-title>
      <q-card-main>
    
      </q-card-main>
      <q-card-separator />
      <q-card-actions>
        <q-btn flat  @click="$router.push(url)">APRI</q-btn>
        <q-btn flat @click="something()"><q-icon name="delete"/></q-btn>
      </q-card-actions>
    </q-card>
	
	
</template>

<script>

import {
  QCard,
  QCardTitle,
  QCardMain,
  QCardSeparator,
  QCardActions,
  QBtn,
  QIcon
} from 'quasar'

export default {
  name: 'classe',
  props:{
	cl:{
		id:{type:Number, default: 100},
		nome:{type:String, default: 'prova'},
		materia:{type:String, default: "prova"},
		anno:{type:String, default: "prova"},
		colore:{type:String, default: "primary"}
		
	}
  },
  components: {
    QCard,
    QCardTitle,
    QCardMain,
    QCardSeparator,
    QCardActions,
    QBtn,
    QIcon
  },
  data(){
	return{
		url:"/teach/classe?id="+this.cl.id
		//url:"/teach/classe"
	}
  },
  computed: {
  },
  methods: {
	something() { this.$emit('event', this.cl.id);},
	
  }//
}
</script>

<style lang="stylus">
	.card{
		
		display:inline;
		
	}
</style>