<template>
  <q-layout view="lHh Lpr lFf">
  <q-modal no-backdrop-dismiss v-model="loginmodal" minimized :content-css="{padding: '50px'}">
      <h4>Login with Google</h4>
      
     <div class="btn">
	  <gsigninbutton @done="onUserLoggedIn"></gsigninbutton>
      </div>
     
   </q-modal>
  
    <q-layout-header>
      <q-toolbar
        color="primary"
        
      >
	  
        <q-btn
          flat
          
          
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Silvano
         
        </q-toolbar-title>
		
			
		
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
	<q-card inline >
		  <q-card-media >
			<img v-bind:src="foto" class="responsive">

			<q-card-title slot="overlay">
				<q-item>
					<q-item-side v-bind:avatar="fotop" />
					<q-item-main>
					  <q-item-tile label>{{nome}}</q-item-tile>
					  <q-item-tile label>{{email}}</q-item-tile>
            
					</q-item-main>
				 </q-item>


			</q-card-title>
		  </q-card-media>
		</q-card>
	
	
      <q-list
        no-border
        link
        inset-delimiter
      >
        
        
		<q-item to="/teach">
          <q-item-side icon="supervisor account" />
          <q-item-main label="Insegna" sublabel="Classi in cui insegni" />
		  <q-chip square color="tertiary" class="shadow-2">{{numC}}</q-chip>
        </q-item>
		<q-item-separator />
        <q-item to="/learn">
          <q-item-side icon="group" />
          <q-item-main label="Apprendi" sublabel="Classi in cui studi" />
		  <q-chip square color="tertiary" class="shadow-2">{{numG}}</q-chip>
        </q-item>
		<q-item-separator />
        <q-item to="/questions">
          <q-item-side icon="note" />
          <q-item-main label="Domande" sublabel="Lista delle tue domande" />
		  <q-chip square color="tertiary" class="shadow-2">{{numD}}</q-chip>
        </q-item>
		<q-item-separator />
        <q-item to="/tests">
          <q-item-side icon="assignment" />
          <q-item-main label="Verifiche" sublabel="Lista delle tue verifiche" />
		  <q-chip square color="tertiary" class="shadow-2">{{numV}}</q-chip>
        </q-item>
        
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import gsigninbutton  from '../components/Gsigninbutton.vue'

export default {
  name: 'LayoutDefault',
  components: {
    gsigninbutton
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
	  
	  loginmodal:true,
	  
	  nome:"",
      email:"",
	  foto:"https://picsum.photos/300/200/?random",
      //foto:"https://cdn-images-1.medium.com/max/2000/1*BR2RiTRoYor9xSrzEgxLWQ.jpeg",
      fotop:"",
      numC:3,
      numG:2,
      numD:47,
      numV:6,
    }
  },
  mounted() {
   
   
  },
  methods: {
	
    onUserLoggedIn (user) {
      const profile = user.getBasicProfile() // etc etc
      console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      console.log('Full Name: ' + profile.getName());
      this.nome=profile.getName();
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      this.fotop=profile.getImageUrl();
      console.log("Email: " + profile.getEmail());
      this.email= profile.getEmail();
      var id_token = user.getAuthResponse().id_token;
       this.loginmodal=false;
    }
  }
}
</script>

<style>
	.btn {
  font-family: Arial;
  color: #ffffff;
  font-size: 20px;
  background: #ff3c00;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
}

.btn:hover {
  text-decoration: none;
}

</style>
