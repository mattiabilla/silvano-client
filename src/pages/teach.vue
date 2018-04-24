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
				  <q-input v-model="nuovaClasse.anno" float-label="Anno"  class="q-mt-md"/>
				 
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
		id:"",
		nome:"",
		materia:"",
		anno:"",
		colore:"primary"
		
	  },
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
			this.nuovaClasse.id=Math.floor((Math.random() * 1000000) + 1);
			
			this.classi.push(this.nuovaClasse);	
			this.modalClasse=false;
			this.$q.notify({message:'Classe aggiunta', type: 'positive',color: 'positive'});
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
		
	
        console.log(this.classi);
		var removeIndex = this.classi.map(function(item) { return item.id; }).indexOf(id);

		// remove object
		this.classi.splice(removeIndex, 1);
		
		this.$q.notify({message:'Classe eliminata', type: 'positive',color: 'positive'});
		
    }
  }
}
</script>

<style lang="stylus">

</style>
