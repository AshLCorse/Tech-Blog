const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
router.use("/api/catogories"); // nested route for products

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({ include: Product })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(400).json(err));
  // be sure to include its associated Products
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id, { include: Product })
    .then((category) => res.json(category))
    .catch((err) => res.status(404).json({ message: "Category not found" }));
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json(err));
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, { where: { id: req.params.id } })
    .then((updatedCategoryCount) => {
      if (updatedCategoryCount[0]) {
        res.json({ message: "Category updated successfully" });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    })
    .catch((err) => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ where: { id: req.params.id } })
    .then((deletedCategoryCount) => {
      if (deletedCategoryCount) {
        res.json({ message: "Category deleted successfully" });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
