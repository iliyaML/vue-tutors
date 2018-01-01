<template>
  <div id="new-tutor">
      <h3>New Tutor</h3>
      <div class="row">
        <form @submit.prevent="saveTutor" class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="vunetid" required>
              <label>VunetID</label>
            </div>
            <div class="input-field col s12">
              <input type="text" v-model="name" required>
              <label>Name</label>
            </div>
            <div class="input-field col s12">
              <input type="text" v-model="subject" required>
              <label>Subject</label>
            </div>
          </div>
          <button type="submit" class="btn">Submit</button>
          <router-link to="/" class="btn grey">Cancel</router-link>
        </form>
      </div>
  </div>
</template>

<script>
import db from './firebaseInit'

export default {
  name: "new-employee",
  data() {
    return {
      vunetid: null,
      name: null,
      subject: null
    }
  },
  methods: {
    saveTutor(){
      db.collection('tutors').add({
        vunetid: this.vunetid,
        name: this.name,
        subject: this.subject
      })
      .then(docRef => this.$router.push('/'))
      .catch(err => console.log(err))
    }
  }
}
</script>

