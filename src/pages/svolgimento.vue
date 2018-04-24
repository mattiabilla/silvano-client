<template> 
	<div v-if="full">
  <q-toolbar color="primary" inverted>
    <q-toolbar-title>
      {{title}}
      <span slot="subtitle">
      {{time}}
      </span>
    </q-toolbar-title> 
  </q-toolbar > 	
   <q-list >
        
       <q-collapsible  v-for="(que, index) in questions" :key="que.id" v-bind:label="(index+1)+': '+que.title" group="questions" v-bind:icon="que.smile[0]">
          <div >
           <q-checkbox
              v-model="que.smile"
              checked-icon="sentiment very dissatisfied"
              unchecked-icon="sentiment very satisfied"
              val="report"
            />
            {{que.txt}}


            <div v-if="que.type=='close'">
                
                <q-list >
                    <q-item tag="label" v-for="(opt,index) in que.options">
                      <q-item-side>   
                        <q-checkbox v-model="opt.sel" />
                      </q-item-side>
                      <q-item-main>
                        <p />{{opt.txt}}</p>
                      </q-item-main>
                    </q-item>
                  </q-list>
            </div>

            <div v-else-if="que.type=='open'">
               <q-input v-model="que.ans" type="textarea" float-label="Answer" />
            </div>
          </div>
        </q-collapsible>
        
      </q-list>
    </div>
    <div v-else>
      <q-btn color="red" class="full-width" @click="fullscreen">Start test</q-btn>
    </div>
</template>
<script>



export default {
  name: 'svolgimento',
  
  data () {
    return {
      timeNoFocus:0,
      timeNotFull:0,
      full:false,
      title:"titolo della verifica",
      time:"40:00",
      questions:[
        {
          title:"titolo della domanda1",
          txt:"quanto fa uno più 2",
          type:"close",
          smile:[],
          options:[
            {
              txt:"uno più due",
              sel:false
            },
            {
              txt:"uno + due",
              sel:false
            },
            {
              txt:"3",
              sel:false
            },
            {
              txt:"non si dice",
              sel:false
            },
             {
              txt:"nessuna delle precedenti",
              sel:false
            }
          ]
        },
        {
          title:"titolo della domanda2",
          txt:"quanto è bello sistemi",
          type:"close",
          smile:[],
          options:[
            {
              txt:"troppo",
              sel:false
            },
            {
              txt:"viva l Http",
              sel:false
            },
            {
              txt:"preferisco zappare",
              sel:false
            },
            {
              txt:"mi astengo",
              sel:false
            },
             {
              txt:"nessuna delle precedenti",
              sel:false
            },
            ]
          },
        {
          title:"titolo della domanda3",
          txt:"Colore del cavallo bianco di napoleone",
          type:"close",
          smile:[],
          options:[
            {
              txt:"bianco",
              sel:false
            },
            {
              txt:"nero",
              sel:false
            },
            {
              txt:"bianconero",
              sel:false
            },
            {
              txt:"i cavalli bianchi non esistono",
              sel:false
            },
             {
              txt:"nessuna delle precedenti",
              sel:false
            }
          ]
        },
        {
          title:"titolo della domanda4",
          txt:"Descrivi una fragola",
          type:"open",
          smile:[],
          ans:""
        }
      ]
    }
  },
  mounted() {
   
   
  },
  methods: {
    cont(){
      this.control = setInterval(() => {
        if(! this.$q.fullscreen.isActive){
          this.timeNotFull+=0.1;
          console.log("tempo full: "+this.timeNotFull);
          this.full=false;
        }
        if(! this.$q.appVisible){
          this.timeNoFocus+=0.1;
          console.log("tempo focus: "+this.timeNoFocus);
          
        }
      }, 100)
    },  
    fullscreen(){
      this.$q.fullscreen.request();
      this.full=true;
      this.cont();
    }
    
  }
}
</script>

<style lang="stylus">
	.inline{
		display:inline;
	}

</style>


