var app = app || {};

app.rutas = Backbone.Router.extend({
	routes: {
		'': 'book',
		'libros/:id': 'detalle'
	},

	book: function(){
		window.state = 'libro';
	},

	detalle: function(id){
		window.libroID = id;
		window.state = 'detalle';
	}

});

app.route = new app.rutas();