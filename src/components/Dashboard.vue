<template>
  <div id="dashboard">
      <ul class="collection with-header">
        <li class="collection-header">
          <h4>
            Tutors
          </h4>
          </li>
          <li v-for="tutor in tutors" v-bind:key="tutor.id" class="collection-item">
            {{ tutor.name }} - {{ tutor.subject }}

            <router-link class="secondary-content" v-bind:to="{name: 'view-tutor', params: { vunetid: tutor.vunetid }}">
              <i class="fa fa-eye"></i>
            </router-link>
          </li>
      </ul>
      <div class="fixed-action-btn">
        <router-link to="/new" class="btn-floating btn-large red">
          <i class="fa fa-plus"></i>
        </router-link>
      </div>
  </div>
</template>

<script>
import db from "./firebaseInit"

export default {
  name: "dashboard",
  data() {
    return {
      tutors: []
    }
  },
  created() {
    db
      .collection("tutors")
      .orderBy('name')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            vunetid: doc.data().vunetid,
            name: doc.data().name,
            subject: doc.data().subject
          }
          this.tutors.push(data)
        })
      })
  }
}
</script>
