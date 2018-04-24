<template>
<div>
 <!--<q-toolbar color="primary" inverted>
 
  <q-toolbar-title >
    Domande
  </q-toolbar-title>

  
</q-toolbar>-->
  <q-page class="q-pa-lg docs-table">
   

   
    <q-table
	   title="Domande"
      :data="tableData"
      :columns="columns"
      :filter="filter"
      :visible-columns="visibleColumns"
      :separator="separator"
	  selection="multiple"
	  :selected.sync="selectedSecond"
      row-key="id"
      color="secondary"
    >
      <template slot="top-left" slot-scope="props">
        <q-search
          hide-underline
          color="secondary"
          v-model="filter"
          class="col-6"
        />
      </template>
      <template slot="top-right" slot-scope="props">
        <q-table-columns
          color="secondary"
          class="q-mr-sm"
          v-model="visibleColumns"
          :columns="columns"
        />
        <q-select
          color="secondary"
          v-model="separator"
          :options="[
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Vertical', value: 'vertical' },
            { label: 'Cell', value: 'cell' },
            { label: 'None', value: 'none' }
          ]"
          hide-underline
        />
        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
        />
		<q-btn color="negative" flat round delete icon="delete" @click="deleteRow" />
      </template>
    </q-table>
 </q-page>
	<q-page-sticky position="bottom-right" :offset="[18, 18]" class="animate-pop">
      <q-fab
        icon="add"
        direction="up"
        color="red"
      >
        <q-fab-action @click="apriAperta" color="purple" class="white" icon="mode edit" />
        <q-fab-action @click="apriChiusa" color="secondary" class="white" icon="check box" />
      </q-fab>
    </q-page-sticky>
	
	
	<q-modal v-model="modalAperta" :content-css="{minWidth: '80vw', minHeight: '80vh'}" maximized >
			  <q-modal-layout>
				<q-toolbar slot="header">
				  <q-btn
					flat
					round
					dense
					@click="modalAperta = false"
					icon="reply"
				  />
				  <q-toolbar-title>
					Aggiungi una nuova domanda a risposta aperta
				  </q-toolbar-title>
				</q-toolbar>

				

				<q-toolbar slot="footer">
				  
				</q-toolbar>

				<div class="layout-padding">
				<q-list class="q-mt-lg">
					<q-item multiline>
					<q-item-main>
				  <q-input v-model="nuovaDomandaAperta.nome" float-label="Nome" class="q-mt-md" />
				  <q-input v-model="nuovaDomandaAperta.descrizione" float-label="Descrizione" type="textarea" class="q-mt-md"/>
				  <q-input v-model="nuovaDomandaAperta.materia" float-label="Materia"  class="q-mt-md"/>
				  <q-input v-model="nuovaDomandaAperta.argomento" float-label="Argomento"  class="q-mt-md"/>
				  <q-input v-model="nuovaDomandaAperta.testo" float-label="Testo" type="textarea" class="q-mt-md"/>
				  <q-input v-model="nuovaDomandaAperta.punti" float-label="Punti" type="number" class="q-mt-md"/>
					</q-item-main>
					</q-item>				        
				  </q-list>
				  
				  <q-btn color="red" @click="aggiungiAperta()" class="q-mt-md q-mb-md q-mr-sm float-right" >Submit</q-btn>
				</div>
			  </q-modal-layout>
		</q-modal>
		
		
		<q-modal v-model="modalChiusa" :content-css="{minWidth: '80vw', minHeight: '80vh'}" maximized >
			  <q-modal-layout>
				<q-toolbar slot="header">
				  <q-btn
					flat
					round
					dense
					@click="modalChiusa = false"
					icon="reply"
				  />
				  <q-toolbar-title>
					Aggiungi una nuova domanda a risposta chiusa
				  </q-toolbar-title>
				</q-toolbar>

				

				<q-toolbar slot="footer">
				  
				</q-toolbar>

				<div class="layout-padding">
				
				<q-list class="q-mt-lg">
					<q-item multiline>
					<q-item-main>
				  <q-input v-model="nuovaDomandaChiusa.nome" float-label="Nome" class="q-mt-md" />
				  <q-input v-model="nuovaDomandaChiusa.descrizione" float-label="Descrizione" type="textarea" class="q-mt-md"/>
				  <q-input v-model="nuovaDomandaChiusa.materia" float-label="Materia"  class="q-mt-md"/>
				  <q-input v-model="nuovaDomandaChiusa.argomento" float-label="Argomento"  class="q-mt-md"/>
				  <q-input v-model="nuovaDomandaChiusa.testo" float-label="Testo" type="textarea" class="q-mt-md"/>
				  
					</q-item-main>
					</q-item>				        
				  </q-list>

				  
				  <q-list class="q-mt-lg">
					<q-item multiline>
					<q-item-side icon="looks one" />
					<q-item-main>
						<q-input v-model="nuovaDomandaChiusa.opt1" float-label="Testo opzione 1" type="textarea" class="q-mt-md"/>
						<q-input v-model="nuovaDomandaChiusa.popt1" float-label="Punti opzione 1" type="number" class="q-mt-md"/>
				    </q-item-main>
					</q-item>				        
				  </q-list> 
				  
				  
				  <q-list class="q-mt-lg">
					<q-item multiline>
					<q-item-side icon="looks two" />
					<q-item-main>
				  <q-input v-model="nuovaDomandaChiusa.opt2" float-label="Testo opzione 2" type="textarea" class="q-mt-md"/>
				  <q-input v-model="nuovaDomandaChiusa.popt2" float-label="Punti opzione 2" type="number" class="q-mt-md"/>
				    </q-item-main>
					</q-item>				        
				  </q-list> 
				  
				  
				  <q-list class="q-mt-lg">
					<q-item multiline>
					<q-item-side icon="looks 3" />
					<q-item-main>
				  <q-input v-model="nuovaDomandaChiusa.opt3" float-label="Testo opzione 3" type="textarea" class="q-mt-md"/>
				  <q-input v-model="nuovaDomandaChiusa.popt3" float-label="Punti opzione 3" type="number" class="q-mt-md"/>
				  </q-item-main>
					</q-item>				        
				  </q-list> 
				  
				  
				  <q-list class="q-mt-lg">
					<q-item multiline>
					<q-item-side icon="looks 4" />
					<q-item-main>
				  <q-input v-model="nuovaDomandaChiusa.opt4" float-label="Testo opzione 4" type="textarea" class="q-mt-md"/>
				  <q-input v-model="nuovaDomandaChiusa.popt4" float-label="Punti opzione 4" type="number" class="q-mt-md"/>
				  </q-item-main>
					</q-item>				        
				  </q-list> 
				  
				  
				  <q-list class="q-mt-lg">
					<q-item multiline>
					<q-item-side icon="looks 5" />
					<q-item-main>
				  <q-input v-model="nuovaDomandaChiusa.opt5" float-label="Testo opzione 5" type="textarea" class="q-mt-md"/>
				  <q-input v-model="nuovaDomandaChiusa.popt5" float-label="Punti opzione 5" type="number" class="q-mt-md"/>
				  </q-item-main>
					</q-item>				        
				  </q-list> 
				  
				  
				  <q-btn color="red" @click="aggiungiChiusa()" class="q-mt-md q-mb-md q-mr-sm float-right">Submit</q-btn>
				</div>
			  </q-modal-layout>
		</q-modal>
		
		
	
	
	
 </div>
</template>

<script>

export default {
  data () {
    return {
	  modalAperta:false,
	  modalChiusa:false,	  
	  nuovaDomandaAperta:{
		id:"",
		descrizione:"",
		nome:"",
		materia:"",
		argomento:"",
		testo:"",
		punti:""
		
	  },
	  nuovaDomandaChiusa:{
		id:"",
		descrizione:"",
		nome:"",
		materia:"",
		argomento:"",
		testo:"",
		
		opt1:"",
		opt2:"",
		opt3:"",
		opt4:"",
		opt5:"",
		popt1:"",
		popt2:"",
		popt3:"",
		popt4:"",
		popt5:"",		
	  },
	  
	  
      tableData:[

        {
          id: "793452347",
          nome: "HTTP request",
          argomento: "sistemi",
		  materia:"sistemi",
		  testo:"asdfjasdòlkf aksdjf sdjklj asdkmskòdfklasjdfjaskldmkasdfcasj kdfasdfjasfja ",
		  type:"close",
		  score:1
        },

        {
          id: "73453453347",
          nome: "jquery ajax",
          argomento: "tepsit",
		  materia:"sistemi",
		  testo:"asdfjasdòlkf aksdjf sdjklj asdkmskòdfklasjdfjaskldmkasdfcasj kdfasdfjasfja ",
		  type:"open",
		  score:1
        },
        {
          id: "347464",
          nome: "html div",
          argomento: "tespit",
		  materia:"sistemi",
		  testo:"asdfjasdòlkf aksdjf sdjklj asdkmskòdfklasjdfjaskldmkasdfcasj kdfasdfjasfja ",
		  type:"close",
		  score:1
        },
        {
          id: "96423243",
          nome: "layer 3 ip",
          argomento: "sistemi",
		  materia:"sistemi",
		  testo:"asdfjasdòlkf aksdjf sdjklj asdkmskòdfklasjdfjaskldmkasdfcasj kdfasdfjasfja ",
		  type:"open",
		  score:1
        },
        {
          id: "23445734234",
          nome: "layer 4 connection",
          argomento: "sistemi",
		  materia:"sistemi",
		  testo:"asdfjasdòlkf aksdjf sdjklj asdkmskòdfklasjdfjaskldmkasdfcasj kdfasdfjasfja ",
		  type:"close",
		  score:1
        },
        {
         id: "34587567234",
          nome: "css color",
          argomento: "tepsit",
		  materia:"sistemi",
		  testo:"asdfjasdòlkf aksdjf sdjklj asdkmskòdfklasjdfjaskldmkasdfcasj kdfasdfjasfja ",
		  type:"close",
		  score:1
        }

      ],
	  
	  
      columns: [
        {
          name: 'nome',
          required: true,
          label: 'Nome',
          align: 'left',
          field: 'nome',
          sortable: true
        },
        { name: 'argomento', label: 'Argomento', field: 'argomento', sortable: true },
        { name: 'materia', label: 'Materia', field: 'materia', sortable: true },
        { name: 'type', label: 'Tipo', field: 'type' , sortable: true},
        { name: 'score', label: 'Punti', field: 'score', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        
      ],
      filter: '',
      visibleColumns: ['nome', 'argomento', 'materia', 'type', 'score'],
      separator: 'horizontal',
      selection: 'multiple',
      selected: [
        
      ],
      
      selectedSecond: [
      
      ]
    }
  },
  
  methods: {
    deleteRow () {
		for(var i=0;i<this.selectedSecond.length;i++){
			console.log(this.selectedSecond[i].id);
		}
	  
      this.$q.notify({
        color: 'secondary',
        icon: 'delete',
        message: `Will delete the selected row${this.selectedSecond.length > 1 ? 's' : ''} later, ok?`
      })
    },
	apriAperta(){
		this.modalAperta=true;
	},
	aggiungiAperta(){
		var d=this.nuovaDomandaAperta;
		if((d.descrizione!="")&&(d.nome!="")&&(d.materia!="")&&(d.argomento!="")&&(d.testo!="")&&(d.punti!="")){
			this.$q.notify({
			color: 'positive',
			icon: 'add',
			message: `La domanda verrà aggiunta`
			});
			this.modalAperta=false;
			
			this.nuovaDomandaAperta.descrizione="";
			this.nuovaDomandaAperta.nome="";
			this.nuovaDomandaAperta.argomento="";
			this.nuovaDomandaAperta.materia="";
			this.nuovaDomandaAperta.testo="";
			this.nuovaDomandaAperta.punti="";
		}
		else{
			this.$q.notify({
			color: 'negative',
			
			message: `Inserisci tutti i campi`
			});
		}
	},
	apriChiusa(){
		this.modalChiusa=true;
	},
	aggiungiChiusa(){
		var d=this.nuovaDomandaChiusa;
		if((d.descrizione!="")&&(d.nome!="")&&(d.materia!="")&&(d.argomento!="")&&(d.testo!="")&&(d.opt1!="")&&(d.opt2!="")&&(d.opt3!="")&&(d.opt4!="")&&(d.opt5!="")&&(d.popt1!="")&&(d.popt2!="")&&(d.popt3!="")&&(d.popt4!="")&&(d.popt5!="")){
			this.$q.notify({
			color: 'positive',
			icon: 'add',
			message: `La domanda verrà aggiunta`
			});
			this.modalChiusa=false;
			
			this.nuovaDomandaChiusa.descrizione="";
			this.nuovaDomandaChiusa.nome="";
			this.nuovaDomandaChiusa.argomento="";
			this.nuovaDomandaChiusa.materia="";
			this.nuovaDomandaChiusa.testo="";
			
			this.nuovaDomandaChiusa.opt1="";
			this.nuovaDomandaChiusa.opt2="";
			this.nuovaDomandaChiusa.opt3="";
			this.nuovaDomandaChiusa.opt4="";
			this.nuovaDomandaChiusa.opt5="";
			this.nuovaDomandaChiusa.popt1="";
			this.nuovaDomandaChiusa.popt2="";
			this.nuovaDomandaChiusa.popt3="";
			this.nuovaDomandaChiusa.popt4="";
			this.nuovaDomandaChiusa.popt5="";
		}
		else{
			this.$q.notify({
			color: 'negative',
			
			message: `Inserisci tutti i campi`
			});
		}
	}
  }
}
</script>