<template>
  <h1>Faz Login ai</h1>
  <button @click="login()">E la vamos nós</button>
  <ul v-if="isAuth">
    <li v-for="f in files" :key="f.id">
      {{f.name+" ("+f.id+")"}}
    </li>
  </ul>
</template>
<script>
import { googleSdkLoaded } from "vue3-google-login"
import axios from 'axios'

export default {
  data(){
    return{
      isAuth:false,
      files:[]
    }
  },
  methods:{
    login(){
      {
        googleSdkLoaded((google) => {
          google.accounts.oauth2.initTokenClient({
            client_id: '532089225272-1im33klerc0hmvspgo6mh08aobithavt.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.photos.readonly',
            callback: (response) => {
              console.log(response)
              window.localStorage.setItem("auth",JSON.stringify(response))
              this.listFolders()
            }
          }).requestAccessToken()
        })
      }
    },
    async listFolders(){
      const auth = JSON.parse(window.localStorage.getItem("auth"))
      axios.get("https://www.googleapis.com/drive/v3/files",{headers:{Authorization: 'Bearer '+auth.access_token}})
      .then((res)=>{
        this.files = res.data.files
      })
      .catch(err=>{
        console.error(err)
      })
    }
  },
  mounted(){
    if(window.localStorage.getItem("auth")){
      this.isAuth = true
      this.listFolders()
    }
  }
}
</script>

