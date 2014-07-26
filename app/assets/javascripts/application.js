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
//= require turbolinks
//= require_tree .
//= require underscore
//= require backbone

'use strict';


//MODEL:
var Person = Backbone.Model.extend({
  urlRoot: '/users'
});


//COLLECTION:
var Directory = Backbone.Collection.extend({
	model: Person,
	url: '/users',
	initialize: function() {

	},
});


//VIEW: view for single person
var PersonView = Backbone.View.extend({

	template: _.template($('.profile-template').html() || ''),

  	initialize: function () {
 		  this.listenTo(this.model, 'sync', this.render);
      this.model.fetch();
  	},

  	render: function () {
    	var template = _.template($('.profile-template').html().trim());
		  var output = template({user: this.model.attributes});
		  $('.directory-container').html(output);
  	}
});

//VIEW: list of all students
var DirectoryView = Backbone.View.extend({

	initialize: function (){
	  this.listenTo(this.collection, 'sync', this.render);
     	this.collection.fetch();
	},

	getUsers: function () {
		var users = [];
		_.each(this.collection.models, function(model) {
			users.push(model.attributes);
		});
		return users;
	},

	render: function(){
		var template = _.template($('.directory-template').html().trim());
		var output = '';
		_.each(this.getUsers(), function (user) {
			output += template({user: user});
		});
		$('.directory-container').html(output);
	}
});

var AppRouter = Backbone.Router.extend({

  routes: {
    'home'      : '', //login screen
    'users/:id' : 'showUser', //show one user's information
    'users'     : 'showAll' //show all users
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

Backbone.history.start()
