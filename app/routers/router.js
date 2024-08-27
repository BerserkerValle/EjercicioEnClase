
let express = require('express');
let router = express.Router();


const customers = require('../controllers/controller.js');
const libros = require('../controllers/Libro.js'); 
const prestamos = require('../controllers/Prestamo.js');


   
    router.post('/api/libros/create', libros.create);
    router.get('/api/libros/all', libros.retrieveAllLibros);
    router.get('/api/libros/onebyid/:id', libros.getLibroById);
    router.get('/api/libros/filteringbyauthor', libros.filteringByAuthor);
    router.get('/api/libros/pagination', libros.pagination);
    router.get('/api/libros/pagefiltersort', libros.pagingFilteringSorting);
    router.put('/api/libros/update/:id', libros.updateById);
    router.delete('/api/libros/delete/:id', libros.deleteById);

    router.post('/api/prestamo/create', prestamos.create);
router.get('/api/prestamo/all', prestamos.retrieveAllPrestamos);
router.get('/api/prestamo/onebyid/:id', prestamos.getPrestamoById);
router.put('/api/prestamo/update/:id', prestamos.updateById);
router.delete('/api/prestamo/delete/:id', prestamos.deleteById);




router.post('/api/customers/create', customers.create);
router.get('/api/customers/all', customers.retrieveAllCustomers);
router.get('/api/customers/onebyid/:id', customers.getCustomerById);
router.get('/api/customers/filteringbyage', customers.filteringByAge);
router.get('/api/customers/pagination', customers.pagination);
router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
router.put('/api/customers/update/:id', customers.updateById);
router.delete('/api/customers/delete/:id', customers.deleteById);



module.exports = router;

