var app = app || {};

app.Libreria = Backbone.View.extend({

	el: '#app',

	events: {
		'click #crear': 'crearLibro',
	},

	initialize: function(){

		this.listenTo(app.libros, 'add', this.mostrarLibro);
		this.listenTo(app.libros, 'remove', this.resetLibro);
		app.libros.fetch();
	},

	mostrarLibro: function(modelo){
		console.log(modelo.toJSON());
		var vista = new app.MostrarLibroView({model: modelo});
		$('.libros').append(vista.render().$el);
	},

	crearLibro: function(){
		app.libros.create({
			'titulo': $('#inputTitulo').val(),
			'autor': $('#inputAutor').val(),
			'categoria': $('#inputCategoria').val(),
		});
	},

	resetLibro: function(){
		$('.libros').html('');
		app.libros.each(this.mostrarLibro, this);
	}

});

app.MostrarLibroView = Backbone.View.extend({

	className: 'list-group-item',
	template: _.template($('#tplMostrarLibro').html() ),

	events: {
		'click #detalle': 'detalle',
		'click #eliminar': 'eliminarLibro'
	},

	initialize: function(){

		var self = this;
		app.route.on('route:book', function(){
			self.render();
		});
		app.route.on('route:detalle', function(){
			self.render();
		});
	},

	render: function(){

		var self = this;

		if(window.state === 'libro'){
			$('.detalle').hide();
			$('.libros').show();
			$('.crear-libros').show();
			self.$el.html( this.template( this.model.toJSON() ) );
		}else if(window.state === 'detalle'){
			$('.detalle').show();
			$('.libros').hide();
			$('.crear-libros').hide();
			if(this.model.get('id') === window.libroID){
				console.log('window libro: '+window.libroID);
				new app.DetalleLibroView({ model: this.model });
			}
		}

		return this;
	},

	detalle: function(){
		Backbone.history.navigate('libros/' + this.model.get('id'), {trigger: true});
	},

	eliminarLibro: function(){
		this.model.destroy();
	}
});


app.DetalleLibroView = Backbone.View.extend({
	el: '.detalle',
	template: _.template($('#tplDetalleLibro').html() ),

	events: {
		'click .atrasLibro': 'atrasLibros'
	},

	initialize: function(){
		this.render();
	},

	render: function(){
		this.$el.html( this.template( this.model.toJSON() ) );
	},

	atrasLibros: function(){
		Backbone.history.navigate('', {trigger:true});
	}
});