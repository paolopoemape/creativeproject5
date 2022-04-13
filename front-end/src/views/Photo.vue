<template>
<div class="pc" style="text-align:center">
    <img style="width:40%; padding-top: 150px" :src="photo.path" />
    <p> Title: {{title}} </p>
    <p> Description: {{description}} </p>
    <p> Owner: {{uploader}} </p>
    <p> Date: {{formatDate(created)}} </p>

    <textarea v-model="comment" placeholder="Comment"></textarea>
     <button @click="upload">Post</button>
     <div class="image" v-for="c in comments" v-bind:key="c._id">
          <p> Comment: {{c.comment}} - Username: {{c.user.username}} - TimeStamp: {{formatDate(c.Date)}}</p>
     </div>


</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Photo',

  data() {
  return {
    uploader: '',
    user: '',
    photo: '',
    title: '',
    description:'',
    comment: '',
    comments: [],
    error: '',
    usernames: [],
    addItem: null,
    created: '',
   }
 },
 created() {
   this.getPhoto();
   this.getComments();
 },
  methods: {
    async getPhoto() {
      try {
        let response = await axios.get("/api/photos/"+ this.$route.params.id);
        this.photo = response.data;
        this.description= response.data.description;
        this.title = response.data.title;
        this.created = response.data.created;
        this.uploader = response.data.user.username
        } catch (error) {
          this.error = error.response.data.message;
        }
     },

     async upload() {
      try {
       let r2 = await axios.post('/api/comments/' + this.$route.params.id, {
         comment: this.comment,
         user: this.$root.$data.user,
       });
       this.addItem = r2.data;
     } catch (error) {
       console.log(error);
     }
   },


   async getComments() {
     try {
       let response = await axios.get("/api/comments/"+ this.$route.params.id);
       this.comments = response.data;
       console.log(this.usernames);
       }
       catch (error) {
         this.error = error.response.data.message;
       }
    },


    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  }
}
</script>

<style>

.pc img {
  width: 50%;
}
<style>
