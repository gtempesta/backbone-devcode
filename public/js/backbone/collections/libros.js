var app = app || {};

app.LibrosCollection = Backbone.Collection.extend({
	model: app.Libro,
	initialize: function(){
		this.on('change', function(model){
			console.log('El modelo con titulo: '+model.titulo+ 'ha cambiado');
		});
	},
	url: '/libros'
});