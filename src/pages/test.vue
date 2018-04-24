  <template> 
<div> 
	<q-tabs align="justify">
	  <!-- Tabs - notice slot="title" --> 
	  
	  <q-tab default count="5" slot="title" name="domande" icon="note" label="domande"/>
	  <q-tab slot="title" name="impostazioni" icon="build" label="impostazioni"/>

	  <!-- Targets -->
	  
	  
		
		
	  
	  
	  <q-tab-pane name="domande">
		<q-page padding class="docs-table">
			<q-table
	   title="Domande"
      :data="tableData"
      :columns="columns"
      :filter="filter"
      :visible-columns="visibleColumns"
      :separator="separator"
	  selection="multiple"
	  :selected.sync="selected"
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
	  
		<q-page-sticky position="bottom-right" :offset="[18, 18]">
			<q-btn round color="red" class="animate-pop" icon="add" @click="modalDomande=true" size="lg"/>
		</q-page-sticky>
	  </q-tab-pane>
	  
	  <q-tab-pane name="impostazioni">
		<q-field
				class="q-mt-lg"
				icon="brush"
				label="Colore verifica"
				helper=""
				
			  >

			  <q-select
				  v-model="colore"
				  float-label="Colore"
				  radio
				 :options="opzioneColori"
				/>
		</q-field>
		
		<q-field 
				class="q-mt-lg"
				icon="call split"
				label="Codice di condivisione"
				helper="Codice con cui è possibile condividere la verifica con altri insegnanti."
				
			  >

			  <q-input v-model="codice" float-label="Codice" type="number" readonly/>
		</q-field>
		
		<q-field 
				class="q-mt-lg"
				icon="not interested"
				label="Accessibilità"
				helper="Abilita o disabilita la condivisione della verifica."
				
			  >

			  <q-toggle
						v-model="access"
						checked-icon="sentiment very satisfied"
						unchecked-icon="sentiment very dissatisfied"
				/>
		</q-field>
		
		<q-field 
				class="q-mt-lg"
				icon="mode edit"
				label="Titolo verifica"
				helper="Titolo della verifica"
				
			  >

			  <q-input v-model="titolo" float-label="Titolo" type="text" />
		</q-field>
		
		<q-field 
				class="q-mt-lg"
				icon="folder"
				label="Materia"
				helper="Materia"
				
			  >

			  <q-input v-model="materia" float-label="Materia" type="text" />
		</q-field>
		
		<q-field 
				class="q-mt-lg"
				icon="description"
				label="Descrizione"
				helper="Descrizione"
				
			  >

			  <q-input v-model="descrizione" float-label="Descrizione" type="textarea" />
		</q-field>
	  
	  
		<q-btn color="red" :loading="load" @click="aggiorna()" class="q-mt-lg q-mb-md q-mr-sm float-right"   >Aggiorna</q-btn>
	  </q-tab-pane>
	  
	</q-tabs>
	
		
		
		<!--  	MODAL NUOVE DOMANDE -->
		<q-modal v-model="modalDomande"   :content-css="{minWidth: '80vw', minHeight: '80vh'}" maximized>
			  <q-modal-layout>
				<q-toolbar slot="header">
				  <q-btn
					flat
					round
					dense
					@click="modalDomande= false"
					icon="reply"
				  />
				  <q-toolbar-title>
					Aggiungi domande
				  </q-toolbar-title>
				</q-toolbar>

				

				<q-toolbar slot="footer">
				  
				</q-toolbar>
				
				<!--  CAMBIARE ARRAY DI DOMANDE fare richiesta ajax con domande possedute  -->
				
				<div class="layout-padding">
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
						
					  </template>
					</q-table>
					
					 <q-btn color="red" @click="aggiungiDomande()" class="q-mt-md q-mb-md q-mr-sm float-right">Submit</q-btn>
				</div>
			  </q-modal-layout>
		</q-modal>
</div>
</template>
<script>



export default {
  name: 'test',

  data () {
    return {
		modalDomande:false,
	
		
	
	
	
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
		],
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
      
      ],
		
		
		
		codice:57689,
		
		access:true,
		titolo:"5d",
		materia:"sistemi",
		descrizione:"descrizione della verifica per aggiungere informazioni aggiuntive...",
		
		modalVoti:false,
		voti:[
			{
				nome:'verifica1',
				data:'18/03/2017',
				voto:6,
				color:'warning'
			},
			{
				nome:'verifica2',
				data:'18/04/2018',
				voto:9,
				color:'positive'
			},
			{
				nome:'verifica1',
				data:'18/03/2016',
				voto:4,
				color:'negative'
			},
			{
				nome:'verifica1',
				data:'18/03/2019',
				voto:7,
				color:'positive'
			}
		]

        }
      },
 
  computed: {	

  
  },
  
  methods: {
	aggiungiDomande(){
		this.modalDomande=false;
		for(var i=0;i<this.selectedSecond.length;i++){
			console.log(this.selectedSecond[i].id);
		}
	  
      this.$q.notify({
        color: 'secondary',
        icon: 'add',
        message: `Will add the selected row${this.selectedSecond.length > 1 ? 's' : ''} later, ok?`
      })
		
	},
  
	
	
  
	deleteRow () {
		for(var i=0;i<this.selected.length;i++){
			console.log(this.selected[i].id);
		}
	  
      this.$q.notify({
        color: 'secondary',
        icon: 'delete',
        message: `Will delete the selected row${this.selected.length > 1 ? 's' : ''} later, ok?`
      })
    },
  
  
  
	aggiorna(){
		//this.load= ! this.load;
	},
	
	
  }
}
</script>

<style lang="stylus">
	.inline{
		display:inline;
	}

</style>


