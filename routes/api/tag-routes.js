const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tag(s)` endpoint
router.use("/api/tag");

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{ model: Product }],
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  })
    .then((tag) => {
      if (!tag) return res.status(404).json({ message: "Tag not found" });
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => res.status(200).json(tag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.findByPk(req.params.id)
    .then((tag) => {
      if (!tag) return res.status(404).json({ message: "Tag not found" });
      return tag.update(req.body);
    })
    .then((updatedTag) => res.status(200).json(updatedTag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.findByPk(req.params.id)
    .then((tag) => {
      if (!tag) return res.status(404).json({ message: "Tag not found" });
      return tag.destroy();
    })
    .then(() => res.status(200).send())
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
