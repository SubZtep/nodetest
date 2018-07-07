new Vue({
  el: '#app',

  data () {
    return {
      profileUrl: 'https://twitter.com/samlabs',
      tweets: []
    }
  },

  methods: {
    openGetTweets () {
      if (this.profileUrl == '') return
      window.location.assign(`/tweets?url=${this.profileUrl}`)
    },

    showTweets () {
      if (this.tweets.length > 0 || this.profileUrl == '') {
        this.tweets = []
        return
      }

      axios.get(`/tweets?url=${this.profileUrl}`)
        .then(res => {
          if (res.status == 200) {
            this.tweets = res.data
          }
        })
    }
  }
})
