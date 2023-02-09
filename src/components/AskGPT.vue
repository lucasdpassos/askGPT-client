<script>
import axios from 'axios'
import { ref } from "vue";
import Lateral from './Lateral.vue'
import { defineStore } from "pinia";
import { usePromptStore } from '../stores/PromptStores.js'
import { storeToRefs } from "pinia";
export default {
  setup() {
    const store = usePromptStore()
    const test = "abcTEst"
    const promptTitle = store.promptList
    const addPrompt = (addedPrompt) => {
      store.storePrompt(addedPrompt)
    };
    return { promptTitle, test, addPrompt }
  },
  data() {
  	return {
	    awesome: false,
      userPrompt: "",
      sendedPrompt: null,
      storedPrompt1: "",
      storedPrompt2: "",
      storedPrompt3: "",
      promptResponse: null      
  	}
	},
  methods: {
    async sendPrompt() {
      this.awesome = true
      this.sendedPrompt = this.userPrompt
      this.userPrompt = ""
      this.myResponse = "aa"
      if(this.sendedPrompt != null) {
        this.storedPrompt3 = this.storedPrompt2
        this.storedPrompt2 = this.storedPrompt1
        this.storedPrompt1 = this.sendedPrompt
      }
      await axios.post('http://localhost:3000/prompt', {
        prompt: this.sendedPrompt
      })
      .then(response => (this.promptResponse = response.data))
      .catch(function (error) {
        console.log(error);
      });
        }
        
      },
      props: {
        activateDrawer: false
      }
}
</script>

<template>
 <div class="flex flex-col w-screen">
  <div className="card card-side bg-base-100 shadow-xl right-56 mx-80 mt-52 h-[400px] w-[800px]">  
    <img src="../assets/asklogo2.png" class="w-72 h-72" alt="ask"/>
    <div className="card-body">
      <h2 className="card-title">Ask GPT</h2>
      <p>Escreva um prompt abaixo</p>
      <div className="justify-end flex flex-row mt-3">
        <input type="text" placeholder="Escreva aqui" className="input input-bordered w-full max-w-xs" v-model="userPrompt" />
        <button className="btn btn-primary ml-4" @click="addPrompt(userPrompt); sendPrompt()">Enviar</button>
      </div>
      <div class="mt-9">
        <div className="chat chat-start animate-bounce" v-if="awesome">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="../assets/askgpt.jpg" />
            </div>
          </div>
          <div className="chat-bubble">{{ promptResponse }}</div>
        </div>
      </div>
    </div>
  </div>
  <div className="drawer">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
      <!-- Page content here -->
      <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
    </div> 
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-base-100 text-base-content" >        <!-- Sidebar content here -->
        
        <li v-for="item in promptTitle"><a>{{ item.title }}</a></li>

        
      </ul>
    </div>
  </div>
</div>
</template>
