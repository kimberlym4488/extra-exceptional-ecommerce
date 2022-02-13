const router = require("express").Router();
const { exclude } = require("inquirer/lib/objects/separator");
const { Category, Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      //include its associated Product data
      include: [{ model: Product }],
      attributes: {
        exclude: ["tagId", "productId"],
      },
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`

  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
      attributes: {
        exclude: ["tagId", "productId"],
      },
    });

    if (!tagData) {
      return res.status(404).json({ message: "No tag found with that id!" });
    }

    res.status(200).json(tagData);
    console.log(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const tagChange = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagChange[0]) {
      res.status(404).json({ message: "No category exists with this id!" });
      return;
    }
    res.status(200).json(tagChange);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagDelete) {
      res.status(404).json({ message: "No category exists for this id" });
      return;
    }
    res.status(200).json(tagDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
