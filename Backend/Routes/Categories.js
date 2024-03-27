const CatModel = require("../Model/Category");
const router = require("express").Router();
router.post("/add", async (req, res) => {
  try {
    const NewCategory = await CatModel({
      Name: req.body.Name,
    });
    await NewCategory.save();
    res.status(200).json(NewCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/", async (req, res) => {
  const Cat = req.query.Cat;
  try {
    if (Cat) {
      await CatModel.find(
        {
          Name: Cat,
        },
        (error, Cat) => {
          if (error) {
            throw error;
          } else {
            res.status(200).json(Cat);
          }
        }
      );
    } else {
      await CatModel.find({}, (error, Cat) => {
        if (error) {
          throw error;
        } else {
          res.status(200).json(Cat);
        }
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
