module.exports = (sequelize, Sequelize) => {
    const Departamento = sequelize.define('departamento', {
        id_departamento: {
            type: Sequelize.NUMERIC,
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.STRING(80)
        }
    });

    return Departamento;
}
