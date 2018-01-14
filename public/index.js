/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      people: [],
      newPerson: {name: "", bio: "", bioVisible: true},
      errors: []
    };
  },
  created: function() {
    // make http request
    axios.get('/v1/people').then(function(response) {
      console.log(this);
      console.log(response.data);
      this.people = response.data;
    }.bind(this));
  },
  methods: {
    addPerson: function() {
      // add a new person to the db
      var params = {
        name: this.newPerson.name,
        bio: this.newPerson.bio
      };
      axios.post('/v1/people', params).then(function(response) {
        console.log(response.data);
        this.people.push(response.data);
        this.errors = [];
      }.bind(this)).catch(function(errors){
        console.log('in the errors');
        console.log(errors);
        this.errors = errors.response.data.errors;
      }.bind(this));
      // then add that person to the array
    },
    removePerson: function(inputPerson) {
      console.log(inputPerson);
      // remove them from the array
      var index = this.people.indexOf(inputPerson);
      console.log(index);
      this.people.splice(index, 1);
    },
    toggleBio: function(inputPerson) {
      // if BV is true, make it false,
      // if it's false, make it true
      // if (inputPerson.bioVisible === true) {
      //   inputPerson.bioVisible = false;
      // } else {
      //   inputPerson.bioVisible = true;
      // }
      inputPerson.bioVisible = !inputPerson.bioVisible;
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});
