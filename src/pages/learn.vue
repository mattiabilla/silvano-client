<template>  	
	<div >
	   
	<q-card inline v-for="(cla, index) in classi" :key="cla.id"  class="q-mt-md q-mr-sm q-ml-sm" v-bind:color="cla.colore">
      <q-card-title v-cloak>
        {{cla.nome}}
        <span slot="subtitle">{{cla.materia}} </span>
		<span slot="subtitle">{{cla.anno}}</span>
        
      </q-card-title>
      <q-card-main>
    
      </q-card-main>
      <q-card-separator />
      <q-card-actions>
        <q-btn flat  @click="$router.push(url+cla.id)">APRI</q-btn>
        
      </q-card-actions>
    </q-card>
	
	
	<q-page-sticky position="bottom-right" :offset="[18, 18]">
			<q-btn round color="red" class="animate-pop" icon="add" @click="handler()" size="lg"/>
	</q-page-sticky>
	
	
	
	
	</div>    
</template>
<script>



export default {
  name: 'learn',

  data () {
    return {
      classi:[
        {
    		  id:"7982347",
			  nome:"5d",
    		  materia:"info",
    		  anno:"2016/2017",
			  colore:"primary"
    		},
    		{
			  id:"798237",
    		  nome:"4f",
    		  materia:"ing",
    		  anno:"2015/2016",
			  colore:"secondary"
    		},
    		{
			  id:"793452347",
    		  nome:"2c",
    		  materia:"ita",
    		  anno:"2017/2018",
			  colore:"tertiary"
    		}
    	  ],
		  url:"/learn/classe?id="

        }
      },
 
  computed: {	

  
  },
  
  methods: {
	loadData () {
		this.$axios({
		  method:'get',
		  url:'http://localhost/classest',
		  responseType:'json'
		}).then((response) => {
			console.log(response);
			this.classi=response.data.classi;
		  })
		  .catch(() => {
			this.$q.notify({
			  color: 'negative',
			  position: 'top',
			  message: 'Loading failed',
			  icon: 'report_problem'
			})
		  })
	  }	,
	aggiungi(cla){
		this.classi.push(cla);
	},
	handler () {
			this.$q.dialog({
              title: 'Entra in una classe',
              message: 'Inserisci il codice della classe in cui vuoi entrare.',
              prompt: {
                model: '',
                type: 'text' // optional
              },
              cancel: true,
              color: 'secondary'
            }).then(data => {
              this.$q.notify({message:'Classe aggiunta', type: 'positive',color: 'positive'});
            }).catch(() => {
              //this.$q.notify('Classe non aggiunta');
            })
	
	
			
          }

  },
  created(){
	//this.loadData()
  }
}
</script>

<style lang="stylus">
	.inline{
		display:inline;
	}

</style>