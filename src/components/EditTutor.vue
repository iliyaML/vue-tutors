<template>
  <div id="edit-employee">
      <h3>Edit Tutor</h3>
      <div class="row">
        <form @submit.prevent="updateTutor" class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="vunetid" required disabled>
            </div>
            <div class="input-field col s12">
              <input type="text" v-model="name" required>
            </div>
            <div class="input-field col s12">
              <input type="text" v-model="subject" required>
            </div>
          </div>
          <button type="submit" class="btn">Submit</button>
          <router-link to="/" class="btn grey">Cancel</router-link>
        </form>
      </div>
  </div>
</template>

<script>
import db from "./firebaseInit"

export default {
  name: "edit-employee",
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
    updateTutor(){
      db.collection('tutors').where('vunetid', '==', this.$route.params.vunetid)
      .get()
      .then(queryShapshot => {
        queryShapshot.forEach(doc => {
          doc.ref.update({
            vunetid: this.vunetid,
            name: this.name,
            subject: this.subject
          })
          .then(() => this.$router.push({ name: 'view-tutor', params: { vunetid: this.vunetid } }))
        })
      })
    }
  }
}
</script>
