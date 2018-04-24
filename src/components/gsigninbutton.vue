<template> 
	
	 <div   ref="signinBtn" class="btn-sign-in" color="red">Sign In</div>
	
</template>

<script>



export default {
  name: 'gsigninbutton',
 
  data(){
	return{
    
	}
  },
  mounted () {

    window.gapi.load('auth2', () => {
      console.log("hello");
      const auth2 = window.gapi.auth2.init({
        client_id: '681898459574-p4p2u61dec3034pk4bh4uli0vmleac6o.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      })
      auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
        
        this.$emit('done', googleUser)
      }, error => console.log(error))
    })
  },
  methods: {
	     
	
  }
}
</script>

<style lang="stylus">
	
		
	
</style>