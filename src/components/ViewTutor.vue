<template>
  <div id="view-employee">
      <ul class="collection with-header">
        <li class="collection-header">
          <h4>
            {{ name }}
          </h4>
        </li>
        <li class="collection-item">
          Subject: {{ subject }}
        </li>
      </ul>
      <router-link to="/" class="btn grey">Back</router-link>
      <button class="btn red" @click="deleteTutor">Delete</button>

      <div class="fixed-action-btn">
        <router-link v-bind:to="{name: 'edit-tutor', params: { vunetid: vunetid }}" class="btn-floating btn-large red">
          <i class="fa fa-pencil"></i>
        </router-link>
      </div>
  </div>
</template>

<script>
import db from './firebaseInit'

export default {
  name: "view-employee",
  data() {
    return {
      vunetid: null,
      name: null,
      subject: null
    }
  },
  beforeRouteEnter(to, from, next) {
    db.collection('tutors').where('vunetid', '==', to.params.vunetid)
    .get()
    .then(queryShapshot => {
      queryShapshot.forEach(doc => {
        next(vm => {
          vm.vunetid = doc.data().vunetid,
          vm.name = doc.data().name,
          vm.subject = doc.data().subject
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData(){
      db.collection('tutors').where('vunetid', '==', this.$route.params.vunetid)
      .get()
      .then(queryShapshot => {
        queryShapshot.forEach(doc => {
          this.vunetid = doc.data().vunetid,
          this.name = doc.data().name,
          this.subject = doc.data().subject
        })
      })
    },
    deleteTutor(){
      if(confirm('Are you sure?')){
      db.collection('tutors').where('vunetid', '==', this.$route.params.vunetid)
      .get()
      .then(queryShapshot => {
        queryShapshot.forEach(doc => {
          doc.ref.delete()
          this.$router.push('/')
        })
      })
      }
    }
  }
}
</script>
