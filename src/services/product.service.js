//MODELS
import Product from '../models/product'

const ProductService = {
    getAll(req, res) {
        Product.find({}, (err, products) => {
            if (err) return res.status(500).send({ message: `Error al realizar petición: ${err}` })
            res.status(200).send(products)
        })
    },
    findById(req, res) {
        let id = req.params.id
        Product.findById(id, (err, product) => {
            if (err) return res.status(500).send({ message: `Error al realizar petición: ${err}` })
            if (!product) return res.status(400).send({ message: `El producto no existe` })
            res.status(200).send({ product: product })
        })
    },
    create(req, res) {

        let product = new Product(req.body);
        product.save((err, productStored) => {
            if (err) res.status(500).send({ message: `Error al guardar en la base de datos: ${err}` })
            res.status(201).send({ product: productStored })
        })
    },
    delete(req, res) {
        let id = req.params.id
        Product.findByIdAndDelete(id, (err) => {
            if (err) return res.status(500).send({ message: `Error al realizar petición: ${err}` })
            res.status(200).send({ message: `El producto se ha eliminado` })
        })
    },
    update(req, res) {
        let id = req.params.id
        let body = req.body
        Product.findByIdAndUpdate(id, body, (err, productUpdated) => {
            if (err) return res.status(500).send({ message: `Error al actualizar el productor : ${err}` })
            res.status(200).send({ product: productUpdated })
        })
    }
}

module.exports = ProductService;