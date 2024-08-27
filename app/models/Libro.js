module.exports = (sequelize, Sequelize) => {
	const Libro = sequelize.define('libro', {	
	  codigo_libro: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
	  },
	  nombre_libro: {
			type: Sequelize.STRING
	  },
	  editorial: {
			type: Sequelize.STRING
	  },
	  autor: {
			type: Sequelize.STRING
	  },
	  genero: {
			type: Sequelize.STRING
	  },
	  pais_autor: {
			type: Sequelize.STRING
	  },
	  numero_paginas: {
			type: Sequelize.INTEGER
	  },
	  ano_edicion: {
			type: Sequelize.DATEONLY
	  },
	  precio_libro: {
			type: Sequelize.FLOAT 
	  }
	});
	
	return Libro;
}

