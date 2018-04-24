 <template> 
<div> 
	<q-tabs align="justify">
	  <!-- Tabs - notice slot="title" --> 
	  <q-tab default slot="title" name="verifiche" icon="assignment" label="verifiche"/>
	  <q-tab  count="5" slot="title" name="studenti" icon="account_box" label="studenti"/>
	  <q-tab slot="title" name="impostazioni" icon="build" label="impostazioni"/>

	  <!-- Targets -->
	  <q-tab-pane name="verifiche">
		<div v-for="(cla, index) in verifiche" class="inline">
	 
			<q-card inline  v-bind:color="cla.colore" inline class="q-mt-md q-mr-sm q-ml-sm">
			  <q-card-title v-cloak>
				{{cla.nome}}
				<span slot="subtitle">{{cla.materia}} </span>
				<span slot="subtitle">{{cla.data}}</span>
				
			  </q-card-title>
			  <q-card-main>
			
			  </q-card-main>
			  <q-card-separator />
			  <q-card-actions>
				<q-btn flat @click="$router.push(url+cla.id)">APRI</q-btn>
				<q-btn flat @click="elimina(cla.id)"><q-icon name="delete"/></q-btn>
				
				<q-btn flat v-if="cla.init" @click="stop(cla.id)"><q-icon name="stop"/></q-btn>
				<q-btn flat v-else @click="inizia(cla.id)"><q-icon name="play arrow"/></q-btn>
			  </q-card-actions>
			</q-card>
		
		</div>
	  
		<q-page-sticky position="bottom-right" :offset="[18, 18]">
			<q-btn round color="red" class="animate-pop" icon="add" @click="modalVerifica=true" size="lg"/>
		</q-page-sticky>
		
	  </q-tab-pane>
	  
	  <q-tab-pane name="studenti">
		<q-page padding class="docs-table">
			<q-table
			   title="Studenti"
			  :data="studenti"
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
			  
			<q-tr slot="body" slot-scope="props" :props="props">  
			  <q-td auto-width>
            <q-checkbox color="secondary" v-model="props.selected" />
          </q-td>
			  <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
			  <q-td key="cognome" :props="props">{{ props.row.cognome }}</q-td>
			  <q-td key="mail" :props="props">{{ props.row.mail }}</q-td>
			  <q-td key="media" :props="props">{{ props.row.media }}</q-td>
			  
			  <q-td key="voti" :props="props">
				  <div >
					
					<q-btn size="sm"   color="tertiary" icon="add" @click="apriVoti" class="q-mr-sm" />
					
				  </div>
				</q-td>
			  </q-tr>

			</q-table>
		 </q-page>
	  
	  
	  </q-tab-pane>
	  
	  <q-tab-pane name="impostazioni">
		<q-field
				class="q-mt-lg"
				icon="brush"
				label="Colore classe"
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
				label="Codice d'accesso alla classe"
				helper="Codice con cui gli studenti accedono alla classe"
				
			  >

			  <q-input v-model="codice" float-label="Codice" type="number" readonly/>
		</q-field>
		
		<q-field 
				class="q-mt-lg"
				icon="not interested"
				label="Accessibilità"
				helper="Apri o chiudi la classe a nuove iscrizioni"
				
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
				label="Nome classe"
				helper="Nome della classe"
				
			  >

			  <q-input v-model="nome" float-label="Nome" type="text" />
		</q-field>
		
		<q-field 
				class="q-mt-lg"
				icon="event"
				label="Anno"
				helper="Anno"
				
			  >

			  <q-input v-model="anno" float-label="Anno" type="number" />
		</q-field>
	  
	  
		<q-btn color="red" :loading="load" @click="aggiorna()" class="q-mt-lg q-mb-md q-mr-sm float-right"   >Aggiorna</q-btn>
	  </q-tab-pane>
	  
	</q-tabs>
	
	
	
		<q-modal v-model="modalVoti"   :content-css="{minWidth: '80vw', minHeight: '80vh'}" maximized>
			  <q-modal-layout>
				<q-toolbar slot="header">
				  <q-btn
					flat
					round
					dense
					@click="modalVoti= false"
					icon="reply"
				  />
				  <q-toolbar-title>
					Voti studente
				  </q-toolbar-title>
				</q-toolbar>

				

				<q-toolbar slot="footer">
				  
				</q-toolbar>

				<div class="layout-padding">
				  <q-list separator class="q-mt-md" >
					  <q-item v-for="(ver, index) in voti">
					  
						<q-item-main>
							<q-item-tile label>{{ver.nome}}</q-item-tile>
							<q-item-tile sublabel lines="2">
							  {{ver.data}}
							</q-item-tile>
						  </q-item-main>
						  <q-item-side right>
							<q-item-tile ><q-chip square :color="ver.color" class="shadow-2">{{ver.voto}}</q-chip></q-item-tile>
							
						  </q-item-side>
					  
					  
						  
						</q-item>
					</q-list>
				</div>
			  </q-modal-layout>
		</q-modal>
		
		
		
		<!--  	MODAL NUOVE VERIRICHE -->
		<q-modal v-model="modalVerifica"   :content-css="{minWidth: '80vw', minHeight: '80vh'}" maximized>
			  <q-modal-layout>
				<q-toolbar slot="header">
				  <q-btn
					flat
					round
					dense
					@click="modalVerifica= false"
					icon="reply"
				  />
				  <q-toolbar-title>
					Nuova verifica
				  </q-toolbar-title>
				</q-toolbar>

				

				<q-toolbar slot="footer">
				  
				</q-toolbar>
				
				<!--  CAMBIARE ARRAY DI VERIFICHE fare richiesta ajax con verifiche possedute  -->
				
				<div class="layout-padding">
				  <div v-for="(cla, index) in verifiche" class="inline">
	 
						<q-card inline  v-bind:color="cla.colore" inline class="q-mt-md q-mr-sm q-ml-sm">
						  <q-card-title v-cloak>
							{{cla.nome}}
							<span slot="subtitle">{{cla.materia}} </span>
							
							
						  </q-card-title>
						  <q-card-main>
						
						  </q-card-main>
						  <q-card-separator />
						  <q-card-actions>
							<q-btn flat @click="aggiungiVerifica(cla.id)">Importa</q-btn>
							
							
							
							
						  </q-card-actions>
						</q-card>
					
					</div>
				</div>
			  </q-modal-layout>
		</q-modal>
</div>
</template>
<script>



export default {
  name: 'classein',

  data () {
    return {
		modalVerifica:false,
		
		url:"classe/correzione?id=",
		
		verifiche:[
        {
    		  id:"7982347",
			  nome:"sistemi e modelli",
    		  materia:"sistemi",
    		  data:"10/12/2017",
			  colore:"primary",
			  init:false
    		},
    		{
			  id:"798237",
    		  nome:"jquery",
    		  materia:"tepsit",
    		  data:"17/12/2017",
			  colore:"secondary",
			  init:false
    		},
    		{
			  id:"793452347",
    		  nome:"HTTP",
    		  materia:"sistemi",
    		  data:"21/09/2017",
			  colore:"tertiary",
			  init:false
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
		],
		studenti:[
			{
				id:"644575675",
				nome:"federico",
				cognome:"ramanzin",
				mail:"federicoramanzin@gmail.com",
				media:"5"				
			},
			{
				id:"545654243",
				nome:"simone",
				cognome:"montecchi",
				mail:"simonemontecchi@gmail.com",
				media:"7.5"				
			},
			{
				id:"266876543",
				nome:"federico",
				cognome:"gibertoni",
				mail:"federicogibertoni@gmail.com",
				media:"8"				
			},
			{
				id:"243658755",
				nome:"simone",
				cognome:"tedeschi",
				mail:"simonetedeschi@gmail.com",
				media:"9"				
			},
		 ],
		 columns: [
			{
			  name: 'nome',
			  
			  label: 'Nome',
			  align: 'left',
			  field: 'nome',
			  sortable: true
			},
			{ name: 'cognome', label: 'Cognome', field: 'cognome', sortable: true },
			{ name: 'mail', label: 'Mail', field: 'mail', sortable: true },
			{ name: 'media', label: 'Media', field: 'media' ,sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)},
			{ name: 'voti', label: 'Voti',align:'center'}
			
		  ],
		  filter: '',
		  visibleColumns: ['nome', 'cognome', 'mail', 'media','voti'],
		  separator: 'horizontal',
		  selection: 'multiple',
		  selected: [
			
		  ],
		  
		  selectedSecond: [
		  
		  ],
		
		
		
		codice:57689,
		
		access:true,
		nome:"5d",
		anno:2017,
		
		
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
	aggiungiVerifica(id){
		this.modalVerifica=false;
		var message="verifica importata: "+id;
		this.$q.notify({message:message, type: 'positive',color: 'positive'});
		
	},
  
	inizia(id) {
        console.log(this.verifiche);
		var startIndex = this.verifiche.map(function(item) { return item.id; }).indexOf(id);

		// remove object
		this.verifiche[startIndex].init=true;
		this.$q.notify({message:'Verifica iniziata', type: 'positive',color: 'positive'});
		
    },
	stop(id) {
        console.log(this.verifiche);
		var stopIndex = this.verifiche.map(function(item) { return item.id; }).indexOf(id);

		// remove object
		this.verifiche[stopIndex].init=false;
		this.$q.notify({message:'Verifica terminata', type: 'warning',color: 'warning'});
		
    },
	elimina(id){
            this.$q.dialog({
              title: 'Eliminazione verifica',
              message: 'Confermi di voler cancellare la verifica dalla classe?',
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
  
  
  
	aggiorna(){
		//this.load= ! this.load;
	},
	
	apriVoti(){
		this.modalVoti=true;
	}

  }
}
</script>

<style lang="stylus">
	.inline{
		display:inline;
	}

</style>


