const db = require('../config/db.config.js');
const Departamento = db.Departamento;

exports.create = (req, res) => {
    let departamento = {};

    try {
        departamento.id_departamento = req.body.id_departamento;
        departamento.descripcion = req.body.descripcion;

        Departamento.create(departamento).then(result => {
            res.status(200).json({
                message: "Departamento creado exitosamente con ID = " + result.id_departamento,
                departamento: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.retrieveAllDepartamentos = (req, res) => {
    Departamento.findAll()
        .then(departamentos => {
            res.status(200).json({
                message: "Todos los departamentos obtenidos exitosamente!",
                departamentos: departamentos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getDepartamentoById = (req, res) => {
    let departamentoId = req.params.id;

    Departamento.findByPk(departamentoId)
        .then(departamento => {
            if (!departamento) {
                res.status(404).json({
                    message: "Departamento no encontrado con ID = " + departamentoId,
                    departamento: null
                });
            } else {
                res.status(200).json({
                    message: "Departamento obtenido exitosamente con ID = " + departamentoId,
                    departamento: departamento
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let departamentoId = req.params.id;
        let departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
            res.status(404).json({
                message: "No se encontró un departamento con ID = " + departamentoId,
                departamento: null,
                error: "404"
            });
        } else {
            let updatedObject = {
                descripcion: req.body.descripcion
            };

            let result = await Departamento.update(updatedObject, { returning: true, where: { id_departamento: departamentoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error! No se pudo actualizar el departamento con ID = " + req.params.id,
                    error: "No se pudo actualizar"
                });
            }

            res.status(200).json({
                message: "Departamento actualizado exitosamente con ID = " + departamentoId,
                departamento: updatedObject
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error! No se pudo actualizar el departamento con ID = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let departamentoId = req.params.id;
        let departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
            res.status(404).json({
                message: "No existe un departamento con ID = " + departamentoId,
                error: "404"
            });
        } else {
            await departamento.destroy();
            res.status(200).json({
                message: "Departamento eliminado exitosamente con ID = " + departamentoId,
                departamento: departamento
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error! No se pudo eliminar el departamento con ID = " + req.params.id,
            error: error.message
        });
    }
};
