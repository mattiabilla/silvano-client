 <template>  	
	<q-tabs align="justify">
	  <!-- Tabs - notice slot="title" --> 
	  <q-tab default slot="title" name="verifiche" icon="assignment" label="verifiche"/>
	  
	  <q-tab slot="title" name="statistiche" icon="trending up" label="Statistiche"/>

	  <!-- Targets -->
	  <q-tab-pane name="verifiche">
		<div v-for="(cla, index) in verifiche" class="inline">
	 
			<q-card inline  v-bind:color="cla.colore" inline class="q-mt-md q-mr-sm q-ml-sm">
			  <q-card-title v-cloak>
				{{cla.nome}}
				<span slot="subtitle">{{cla.argomento}} </span>
				<span slot="subtitle">{{cla.data}}</span>
				
			  </q-card-title>
			  <q-card-main>
			
			  </q-card-main>
			  <q-card-separator />
			  <q-card-actions >
				<q-btn flat @click="$router.push(url+cla.id)">APRI</q-btn>
				<div v-if="cla.fin" >
					<q-btn flat slot="right">{{cla.voto}}</q-btn>
					
				</div>
			  </q-card-actions>
			</q-card>
		
		</div>
	  
	  </q-tab-pane>
	  
	  <q-tab-pane name="statistiche">
		<q-page padding class="docs-table">
			<q-table
			   title="Verifiche"
			  :data="verifiche"
			  :columns="columns"
			  :filter="filter"
			  :visible-columns="visibleColumns"
			  :separator="separator"
			  
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
		 </q-page>
	  </q-tab-pane>
	  
	</q-tabs>
</template>
<script>



export default {
  name: 'classest',

  data () {
    return {
		url:"classe/svolgimento?id=",
		verifiche:[
          
			{
			  id:"793452347",
    		  nome:"HTTP",
    		  argomento:"sistemi",
    		  data:"2017/09/21",
			  colore:"tertiary",
			  init:true,
			  fin:true,
			  voto:8
    		},	
		
			{
			  id:"754236",
    		  nome:"layer4",
    		  argomento:"sistemi",
    		  data:"2017/10/19",
			  colore:"primary",
			  init:true,
			  fin:true,
			  voto:6
    		},
			{
    		  id:"7982347",
			  nome:"sistemi e modelli",
    		  argomento:"sistemi",
    		  data:"2017/12/10",
			  colore:"primary",
			  init:false,
			  fin:false,
			  voto:null
    		},
    		{
			  id:"798237",
    		  nome:"jquery",
    		  argomento:"tepsit",
    		  data:"2017/12/17",
			  colore:"secondary",
			  init:true,
			  fin:true,
			  voto:10
    		},
			{
			  id:"743567654",
    		  nome:"php",
    		  argomento:"tepsit",
    		  data:"2018/01/23",
			  colore:"tertiary",
			  init:true,
			  fin:true,
			  voto:4
    		},
			 {
			  id:"74646756",
    		  nome:"sql",
    		  argomento:"tepsit",
    		  data:"2018/02/16",
			  colore:"primary",
			  init:true,
			  fin:true,
			  voto:6
    		}
			
    	  ],
		  
		  columns: [
			{
			  name: 'nome',
			  
			  label: 'Nome',
			  align: 'left',
			  field: 'nome',
			  sortable: true
			},
			{ name: 'argomento', label: 'Argomento', field: 'argomento', sortable: true },
			{ name: 'data', label: 'Data', field: 'data', sortable: true,sort (a, b) {
								return (new Date(a)) - (new Date(b))
							  },
							  format (value) {
							 
							 
								return new Date(value).toLocaleDateString();
							  } },
			{ name: 'voto', label: 'Voto', field: 'voto' ,sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)},
			
			
		  ],
		  filter: '',
		  visibleColumns: ['nome', 'argomento', 'data', 'voto'],
		  separator: 'horizontal',
		 
        }
      },
 
  computed: {	

  
  },
  
  methods: {
	

  }
}
</script>

<style lang="stylus">


</style>


