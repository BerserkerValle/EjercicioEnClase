const db = require('../config/db.config.js');
const Prestamo = db.Prestamo;


exports.create = (req, res) => {
    let prestamo = {};

    try{
        prestamo.codigo_libro = req.body.codigo_libro;
        prestamo.codigo_usuario = req.body.codigo_usuario;
        prestamo.fecha_salida = req.body.fecha_salida;
        prestamo.fecha_maxima_para_devolver = req.body.fecha_maxima_para_devolver;
        prestamo.fecha_devolucion = req.body.fecha_devolucion;

       
        Prestamo.create(prestamo).then(result => {    
            res.status(200).json({
                message: "Upload Successfully a Prestamo with numero_pedido = " + result.numero_pedido,
                prestamo: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllPrestamos = (req, res) => {
    Prestamo.findAll()
        .then(prestamoInfos => {
            res.status(200).json({
                message: "Get all Prestamos' Infos Successfully!",
                prestamos: prestamoInfos
            });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getPrestamoById = (req, res) => {
    let prestamoId = req.params.id;

    Prestamo.findByPk(prestamoId)
        .then(prestamo => {
            res.status(200).json({
                message: "Successfully Get a Prestamo with numero_pedido = " + prestamoId,
                prestamo: prestamo
            });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}


exports.updateById = async (req, res) => {
    try{
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);
    
        if(!prestamo){
            res.status(404).json({
                message: "Not Found for updating a Prestamo with numero_pedido = " + prestamoId,
                prestamo: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                codigo_libro: req.body.codigo_libro,
                codigo_usuario: req.body.codigo_usuario,
                fecha_salida: req.body.fecha_salida,
                fecha_maxima_para_devolver: req.body.fecha_maxima_para_devolver,
                fecha_devolucion: req.body.fecha_devolucion
            }

            let result = await Prestamo.update(updatedObject, { returning: true, where: { numero_pedido: prestamoId } });
            
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Prestamo with numero_pedido = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Prestamo with numero_pedido = " + prestamoId,
                prestamo: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a Prestamo with numero_pedido = " + req.params.id,
            error: error.message
        });
    }
}


exports.deleteById = async (req, res) => {
    try{
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if(!prestamo){
            res.status(404).json({
                message: "Does Not exist a Prestamo with numero_pedido = " + prestamoId,
                error: "404",
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "Delete Successfully a Prestamo with numero_pedido = " + prestamoId,
                prestamo: prestamo,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Prestamo with numero_pedido = " + req.params.id,
            error: error.message,
        });
    }
}
