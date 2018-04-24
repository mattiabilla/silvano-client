 <template>  	
	<div>
		<div v-for="(cla, index) in verifiche" class="inline">
	 
			<q-card inline  v-bind:color="cla.colore" inline class="q-mt-md q-mr-sm q-ml-sm">
			  <q-card-title v-cloak>
				{{cla.titolo}}
				<span slot="subtitle">{{cla.materia}} </span>
				
				
			  </q-card-title>
			  <q-card-main>
			
			  </q-card-main>
			  <q-card-separator />
			  <q-card-actions>
				<q-btn flat  @click="$router.push(url+cla.id)">APRI</q-btn>
				<q-btn flat @click="elimina(cla.id)"><q-icon name="delete"/></q-btn>
				
				
				
			  </q-card-actions>
			</q-card>
		
		</div>
	  
		<q-page-sticky position="bottom-right" :offset="[18, 18]" class="animate-pop">
		  <q-fab
			icon="add"
			direction="up"
			color="red"
		  >
			<q-fab-action @click="apriModal()" color="purple" class="white" icon="mode edit" />
			<q-fab-action @click="importov" color="secondary" class="white" icon="assignment returned" />
		  </q-fab>
		</q-page-sticky>
		
	<q-modal v-model="modalNuova" :content-css="{minWidth: '80vw', minHeight: '80vh'}" maximized >
			  <q-modal-layout>
				<q-toolbar slot="header">
				  <q-btn
					flat
					round
					dense
					@click="modalNuova = false"
					icon="reply"
				  />
				  <q-toolbar-title>
					Aggiungi una nuova verifica
				  </q-toolbar-title>
				</q-toolbar>

				

				<q-toolbar slot="footer">
				  
				</q-toolbar>

				<div class="layout-padding">
				<q-list class="q-mt-lg">
					<q-item multiline>
					<q-item-main>
				  <q-input v-model="nuovaVerifica.titolo" float-label="Titolo" class="q-mt-md" />
				  <q-input v-model="nuovaVerifica.descrizione" float-label="Descrizione" type="textarea" class="q-mt-md"/>
				  <q-input v-model="nuovaVerifica.materia" float-label="Materia"  class="q-mt-md"/>
				  
					</q-item-main>
					</q-item>				        
				  </q-list>
				  
				  <q-btn color="red" @click="aggiungiNuova()" class="q-mt-md q-mb-md q-mr-sm float-right" >Submit</q-btn>
				</div>
			  </q-modal-layout>
		</q-modal>	
		
		
		
	</div>	
	  
</template>
<script>



export default {
  name: 'tests',

  data () {
    return {
		url:"/tests/test?id=",
		
		modalNuova:false,
		
		nuovaVerifica:{
			titolo:"",
			materia:"",
			descrizione:""
		},
	
		verifiche:[
        {
    		  id:"7982347",
			  titolo:"sistemi e modelli",
    		  materia:"sistemi",
    		 
			  colore:"primary",
			 
    		},
    		{
			  id:"798237",
    		  titolo:"jquery",
    		  materia:"tepsit",
    		 
			  colore:"secondary",
			  
    		},
    		{
			  id:"793452347",
    		  titolo:"HTTP",
    		  materia:"sistemi",
    		  
			  colore:"tertiary",
			 
    		}
    	  ],
	
	
	
		load:false,
	
		colore:"red",
		opzioneColori:[
			{
				label:"blu",
				value:"primary"
			},
			{
				label:"rosso",
				value:"red"
			},
			{
				label:"verde",
				value:"green"
			},
		]
		 
		
		
		
		

        }
      },
 
  computed: {	

  
  },
  
  methods: {
	
	apriModal(){
		this.modalNuova=true;
	},
	elimina(id){
            this.$q.dialog({
              title: 'Eliminazione verifica',
              message: 'Confermi di voler cancellare la verifica?',
              ok: 'confermo',
              cancel: 'annulla'
            }).then(() => {
              this.eliminadef(id)
            }).catch(() => {
              
            })
          },
	eliminadef(id) {
        console.log(this.verifiche);
		var removeIndex = this.verifiche.map(function(item) { return item.id; }).indexOf(id);

		// remove object
		this.verifiche.splice(removeIndex, 1);
		this.$q.notify({message:'Verifica eliminata', type: 'positive',color: 'positive'});
	},
  
	importov () {
			this.$q.dialog({
              title: 'Importa una verifica',
              message: 'Inserisci il codice della verifica che ti è stato condiviso.',
              prompt: {
                model: '',
                type: 'text' // optional
              },
              cancel: true,
              color: 'secondary'
            }).then(data => {
              this.$q.notify({message:'Verifica aggiunta', type: 'positive',color: 'positive'});
            }).catch(() => {
              //this.$q.notify('Verifica non aggiunta');
            })
	
	
			
          },
		  
		  
    aggiungiNuova(){
		var d=this.nuovaVerifica;
		if((d.descrizione!="")&&(d.titolo!="")&&(d.materia!="")){
			this.$q.notify({
			color: 'positive',
			icon: 'add',
			message: "La verifica verrà aggiunta"
			});
			this.modalNuova=false;
			
			this.nuovaVerifica.descrizione="";
			this.nuovaVerifica.titolo="";
			this.nuovaVerifica.materia="";
			
		}
		else{
			this.$q.notify({
			color: 'negative',
			
			message: `Inserisci tutti i campi`
			});
		}
	},
  
  
  


  }
}
</script>

<style lang="stylus">
	.inline{
		display:inline;
	}

</style>