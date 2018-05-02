<template>
	<div > 
		<q-modal v-model="modalClasse" :content-css="{minWidth: '80vw', minHeight: '80vh'}" maximized >
			  <q-modal-layout>
				<q-toolbar slot="header">
				  <q-btn
					flat
					round
					dense
					@click="modalClasse = false"
					icon="reply"
				  />
				  <q-toolbar-title>
					Aggiungi una nuova classe
				  </q-toolbar-title>
				</q-toolbar>

				

				<q-toolbar slot="footer">
				  
				</q-toolbar>

				<div class="layout-padding">
				  <q-input v-model="nuovaClasse.nome" float-label="Nome" class="q-mt-md" />
				  <q-input v-model="nuovaClasse.materia" float-label="Materia"  class="q-mt-md"/>
				  <q-input v-model="nuovaClasse.anno" float-label="Anno" type="number" class="q-mt-md"/>
				 
				  <q-btn color="primary" @click="aggiungi()" class="q-mt-md q-mr-sm ">Submit</q-btn>
				</div>
			  </q-modal-layout>
		</q-modal>
		
		<classe  v-for="(cla, index) in classi" :key="cla.id" v-bind:cl="cla"  @event="elimina"></classe>
		 
		 <q-page-sticky position="bottom-right" :offset="[18, 18]">
			<q-btn round color="red" class="animate-pop" icon="add" @click="openModal()" size="lg"/>
		</q-page-sticky>
	
	
	</div>    
</template>
<script>

import Classe from '../components/Classe.vue'

export default {
  name: 'teach',
  components: {
    Classe
  },
  
  data () {
    return {
	
	  modalClasse:false,
	  
	  nuovaClasse:{
		
		nome:"",
		materia:"",
		anno:"",
		colore:"primary"
		
	  },
      classi:[
        
    	  ],


        }
      },
  computed: {
  
  },
  methods: {
	openModal(){
			
			this.modalClasse=true;
		},

	aggiungi(cla){
		if(this.nuovaClasse.nome !="" && this.nuovaClasse.materia !="" && this.nuovaClasse.anno !="" ){
			var dati=JSON.stringify(this.nuovaClasse);
			dati=JSON.parse(dati);
			console.log(dati);
			this.$axios({
				  method:'POST',
				  url:'http://localhost/teach',
				  responseType:'json',
				  headers: { 'content-type': 'application/x-www-form-urlencoded' },
				  data:new URLSearchParams(dati)
				}).then((response) => {
					console.log(response);
					this.loadData();
					this.nuovaClasse={
		
						nome:"",
						materia:"",
						anno:"",
						colore:"primary"
						
					  };
				  })
				  .catch(() => {
					this.$q.notify({
					  color: 'negative',
					  position: 'top',
					  message: 'Loading failed',
					  icon: 'report_problem'
					})
				  })
			  	;
			
			
			this.modalClasse=false;
			
		}else{
			 this.$q.notify('Inserisci tutti i campi!');
		}
		
		
	},
	elimina(id){
            this.$q.dialog({
              title: 'Eliminazione classe',
              message: 'Confermi di voler cancellare la classe?',
              ok: 'confermo',
              cancel: 'annulla'
            }).then(() => {
              this.eliminadef(id)
            }).catch(() => {
              
            })
          },
	eliminadef(id) {
		var dati={"id":id};
		var prova=new URLSearchParams(dati);
		
		this.$axios({
				  method:'DELETE',
				  url:'http://localhost/teach',
				  responseType:'json',
				  headers: { 'content-type': 'application/x-www-form-urlencoded' },
				  data:new URLSearchParams(dati)
				}).then((response) => {
					console.log(response);
					this.loadData();
					this.$q.notify({message:'Classe eliminata', type: 'positive',color: 'positive'});
				  })
				  .catch((error) => {
					console.log(error);
					this.$q.notify({
					  color: 'negative',
					  position: 'top',
					  message: 'Loading failed',
					  icon: 'report_problem'
					})
				  })
			  	;
	
	
        

		
		
		
		
    },
	loadData () {
		this.$axios({
		  method:'get',
		  url:'http://localhost/teach',
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
	
	} , 
	created(){
		this.loadData()
	  }
}
</script>

<style lang="stylus">

</style>
