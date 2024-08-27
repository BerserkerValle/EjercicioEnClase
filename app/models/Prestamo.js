module.exports = (sequelize, Sequelize) => {
	const Prestamo = sequelize.define('prestamo', {	
	  numero_pedido: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
	  },
	  codigo_libro: {
			type: Sequelize.INTEGER,
			allowNull: false
	  },
	  codigo_usuario: {
			type: Sequelize.INTEGER,
			allowNull: false
	  },
	  fecha_salida: {
			type: Sequelize.DATE
	  },
	  fecha_maxima_para_devolver: {
			type: Sequelize.DATE
	  },
	  fecha_devolucion: {
			type: Sequelize.DATE
	  }
	});
	
	return Prestamo;
}
