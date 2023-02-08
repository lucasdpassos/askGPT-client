import { defineStore } from 'pinia'

import { mapStores } from 'pinia'

// given two stores with the following ids
export const usePromptStore = defineStore('prompt', {
    state: () => ({
        promptList: [],
      }),
      actions: {
        storePrompt(savedPrompt) {
          this.promptList.push({ savedPrompt, avatar: "", title: savedPrompt })
          console.log(this.promptList)
        },
      }
})

export default {
  computed: {
    // note we are not passing an array, just one store after the other
    // each store will be accessible as its id + 'Store'
    ...mapStores(usePromptStore)
  },

  methods: {

  },
}