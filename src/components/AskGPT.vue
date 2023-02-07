<script>
import axios from 'axios'

export default {
  data() {
  	return {
	    awesome: false,
      userPrompt: "",
      sendedPrompt: "",
      promptResponse: null      
  	}
	},
  methods: {
    async sendPrompt() {
      this.awesome = true
      this.sendedPrompt = this.userPrompt
      this.userPrompt = ""
      this.myResponse = "aa"

      await axios.post('http://localhost:3000/prompt', {
        prompt: this.sendedPrompt
      })
      .then(response => (this.promptResponse = response.data))
      .catch(function (error) {
        console.log(error);
      });
        }
        
      }
}
</script>

<template>
 
  <div className="card card-side bg-base-100 shadow-xl mx-80 mt-52 h-auto">  
    <img src="../assets/chatlogo.jpg" class="w-60 h-40" alt="ask"/>
    <div className="card-body">
      <h2 className="card-title">Ask GPT</h2>
      <p>Escreva um prompt abaixo</p>
      <div className="justify-end flex flex-row mt-7">
        <input type="text" placeholder="Escreva aqui" className="input input-bordered w-full max-w-xs" v-model="userPrompt" />
        <button className="btn btn-primary ml-4" @click="sendPrompt">Enviar</button>
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
</template>

