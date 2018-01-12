/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      people: [],
      newPerson: {name: "", bio: "", bioVisible: true}

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
      console.log('running the function');
      // take the new person object
      console.log(this.newPerson);
      // add it to the array
      this.people.push(this.newPerson);
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
