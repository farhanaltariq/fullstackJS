import Product from "../models/Product.js";
import db from "../config/database.js";

class ProductController {
    static getAllProducts = async (req, res) => {
        try {
            const products = await Product.findAll();
            res.json(products);
        } catch (error) {
            res.json({ message: error.message });
        }
    };
    static detailProduct = async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            res.json(product);
        } catch (error) {
            res.json({ message: error.message });
        }
    };
    static createProduct = async (req, res) => {
        let transaction = await db.transaction();
        try {
            await Product.create(req.body);
            res.json({
                message: "Product created successfully",
            });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            res.json({ message: error.message });
        }
    };
    static updateProduct = async (req, res) => {
        try {
            await Product.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.json({
                message: "Product updated successfully",
            });
        } catch (error) {
            res.json({ message: error.message });
        }
    };
    static deleteProduct = async (req, res) => {
        try {
            await Product.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.json({
                message: "Product deleted successfully",
            });
        } catch (error) {
            res.json({ message: error.message });
        }
    };
}

export { ProductController };
