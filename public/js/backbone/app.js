var app = app || {};

app.libros = new app.LibrosCollection();

$(function(){
	Backbone.history.start();
	new app.Libreria({
		//collection: app.libros
	});
});