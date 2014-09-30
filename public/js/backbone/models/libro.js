var app = app || {};

app.Libro = Backbone.Model.extend({
	initialize: function(){
		console.log("Se ha creado una nueva instancia del Modelo Libro");
		this.on('change', function(){
			console.log('El modelo ha cambiado');
		});
	},
	
	defaults: {
		autor: 'Desconocido',
	},

	urlRoot: '/libros',
	validate: function(atributos){
		if(!atributos.titulo){
			return 'Debe tener titulo';
		}
	}
});