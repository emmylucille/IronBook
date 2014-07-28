// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require underscore
//= require backbone
//= require_self

'use strict'
console.log('test');

//MODEL:
var Person = Backbone.Model.extend({
});


//COLLECTION:
var Directory = Backbone.Collection.extend({
	model: Person,
	url: 'api/students',

	initialize: function() {

	},
});


//VIEW: view for single person
var PersonView = Backbone.View.extend({

  	initialize: function () {
      this.model.fetch();
      this.render();
  	},

  	render: function () {
    	var template = _.template($('.profile-template').html());
		  var output = template({students: this.model.attributes});
		  $('.directory-container').html(output);
      return this;
  	}
});


//VIEW: list of all students
var DirectoryView = Backbone.View.extend({

	initialize: function (){
    this.collection.fetch();
    console.log(this.collection);
    this.render();
	},


	render: function(){
		var template = _.template($('.directory-template').html().trim());
		var output = '';
		$('.directory-container').html(output);
	}
});

var AppRouter = Backbone.Router.extend({

  routes: {
    'home'         : '', //login screen
    'api/students/:id' : 'showUser', //show one user's information
    'api/students'     : 'showAll' //show all users
  },

  initialize: function () {
    //this.fetchPromise = collection.fetch();
  },

  showUser: function (id) {
    $(document).ready(function () {
      new PersonView({
        model: new Person({id: id})
      });
    });
  },

  showAll: function () {
    $(document).ready(function () {
      new DirectoryView({
        collection: new Directory()
      });
    });
  }
});

//instantiate the Router
var router = new AppRouter();

Backbone.history.start();
