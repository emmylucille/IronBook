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

		el: '.directory-container',

  	initialize: function (){
			var that = this;
			this.model.fetch().done(function(){
				console.log(that.collection);
				that.render();
			})
		},


		render: function(){
			var template = _.template($('.profile-template').html(), {students: this.model.models});
			this.$el.html(template);
			return this;
		}
});


//VIEW: list of all students
var DirectoryView = Backbone.View.extend({

	el: '.directory-container',

	initialize: function (){
		var that = this;
    this.collection.fetch().done(function(){
			console.log(that.collection);
			that.render();
		})
	},


	render: function(){
		var template = _.template($('.directory-template').html(), {students: this.collection.models});
		this.$el.html(template);
		return this;
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
		console.log('showAll');
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
