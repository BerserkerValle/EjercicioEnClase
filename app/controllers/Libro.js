const db = require('../config/db.config.js');
const Libro = db.Libro;

// Crear un nuevo Libro
exports.create = (req, res) => {
    let libro = {};

    try{
        
        libro.nombre_libro = req.body.nombre_libro;
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.pais_autor = req.body.pais_autor;
        libro.numero_paginas = req.body.numero_paginas;
        libro.ano_edicion = req.body.ano_edicion;
        libro.precio_libro = req.body.precio_libro;

        // Guardar en la base de datos
        Libro.create(libro).then(result => {    
            res.status(200).json({
                message: "Upload Successfully a Libro with codigo_libro = " + result.codigo_libro,
                libro: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}


exports.retrieveAllLibros = (req, res) => {
    // Obtener toda la información de los libros
    Libro.findAll()
        .then(libroInfos => {
            res.status(200).json({
                message: "Get all Libros' Infos Successfully!",
                libros: libroInfos
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


exports.getLibroById = (req, res) => {
    let libroId = req.params.id;

    Libro.findByPk(libroId)
        .then(libro => {
            res.status(200).json({
                message: "Successfully Get a Libro with codigo_libro = " + libroId,
                libro: libro
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

// Filtrar libros por autor
exports.filteringByAuthor = (req, res) => {
    let autor = req.query.autor;

    Libro.findAll({
        where: { autor: autor }
    })
    .then(results => {
        res.status(200).json({
            message: "Get all Libros by autor = " + autor,
            libros: results,
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

// Paginación
exports.pagination = (req, res) => {
    try{
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
    
        const offset = page ? page * limit : 0;
    
        Libro.findAndCountAll({ limit: limit, offset: offset })
        .then(data => {
            const totalPages = Math.ceil(data.count / limit);
            const response = {
                message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
                data: {
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": page + 1,
                    "currentPageSize": data.rows.length,
                    "libros": data.rows
                }
            };
            res.send(response);
        });  
    } catch(error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging request!",
            error: error.message,
        });
    }    
}

// Paginación, Filtrado y Ordenamiento
exports.pagingFilteringSorting = (req, res) => {
    try{
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let genero = req.query.genero;
    
        const offset = page ? page * limit : 0;
    
        Libro.findAndCountAll({
            where: { genero: genero },
            order: [
                ['nombre_libro', 'ASC'],
                ['autor', 'DESC']
            ],
            limit: limit, 
            offset: offset 
        })
        .then(data => {
            const totalPages = Math.ceil(data.count / limit);
            const response = {
                message: "Pagination, Filtering, and Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", genero = " + genero,
                data: {
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "genero-filtering": genero,
                    "currentPageNumber": page + 1,
                    "currentPageSize": data.rows.length,
                    "libros": data.rows
                }
            };
            res.send(response);
        });  
    } catch(error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging request!",
            error: error.message,
        });
    }      
}

// Actualizar un libro por su ID (codigo_libro)
exports.updateById = async (req, res) => {
    try{
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);
    
        if(!libro){
            res.status(404).json({
                message: "Not Found for updating a Libro with codigo_libro = " + libroId,
                libro: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                nombre_libro: req.body.nombre_libro,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                pais_autor: req.body.pais_autor,
                numero_paginas: req.body.numero_paginas,
                ano_edicion: req.body.ano_edicion,
                precio_libro: req.body.precio_libro
            }

            let result = await Libro.update(updatedObject, { returning: true, where: { codigo_libro: libroId } });
            
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Libro with codigo_libro = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Libro with codigo_libro = " + libroId,
                libro: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a Libro with codigo_libro = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un libro por su ID (codigo_libro)
exports.deleteById = async (req, res) => {
    try{
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if(!libro){
            res.status(404).json({
                message: "Does Not exist a Libro with codigo_libro = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Delete Successfully a Libro with codigo_libro = " + libroId,
                libro: libro,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Libro with codigo_libro = " + req.params.id,
            error: error.message,
        });
    }
}

