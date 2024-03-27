const PostModel = require("../Model/Post");
const router = require("express").Router();

router.post("/Compose/:UserName/:id", async (req, res) => {
  try {
    const NewPost = await PostModel({
      Title: req.body.Title,
      Description: req.body.Description,
      PostImage: req.body.PostImage,
      AuthorName: req.params.UserName,
      UserId: req.params.id,
      Article: req.body.Article,
      Category: req.body.Category,
    });
    await NewPost.save();
    res.status(200).json(NewPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//

router.put("/Edit/:UserId/:PostId", async (req, res) => {
  try {
    const UpdatedUser = await PostModel.findByIdAndUpdate(
      req.params.PostId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(UpdatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//

router.delete("/delete/:UserId/:PostId", async (req, res) => {
  const Post = await PostModel.find({ _id: req.params.PostId });
  if (req.params.UserId === Post[0].UserId) {
    try {
      await PostModel.findByIdAndDelete(req.params.PostId);
      res.status(200).json("Post Deleted Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json("Something Went Wrong !");
  }
});
router.get("/", async (req, res) => {
  await PostModel.find({}, (error, Posts) => {
    if (error) {
      throw error;
    } else {
      res.status(200).send(Posts);
    }
  });
});
router.get("/:id", async (req, res) => {
  const UserName = req.query.UserName;
  const Category = req.query.Category;
  try {
    if (UserName) {
      await PostModel.find({ AuthorName: UserName }, (error, Posts) => {
        if (error) {
          throw error;
        } else {
          res.status(200).json(Posts);
        }
      });
    } else if (Category) {
      await PostModel.find(
        {
          Category: {
            $in: [Category],
          },
        },
        (error, Posts) => {
          if (error) {
            throw error;
          } else {
            res.status(200).json(Posts);
          }
        }
      );
    } else {
      await PostModel.find({ _id: req.params.id }, (error, Posts) => {
        if (error) {
          throw error;
        } else {
          res.status(200).send(Posts);
        }
      });
    }
  } catch (error) {
    res.status(404).json(error);
  }
});
module.exports = router;
