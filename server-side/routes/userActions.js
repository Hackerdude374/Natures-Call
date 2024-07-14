const express = require("express");
const router = express.Router();
const {User, Bathroom, Review} = require("../models");
const { authenticateUser } = require("../middleware/auth");

//show nearby bathroom markers.
const { Op, literal,Sequelize } = require("sequelize");//op contains operators for queries, literal inserts raw sql into sequelize
router.post("/nearby", async (req, res) => {
  const userLat = parseFloat(req.body.lat);
  const userLong = parseFloat(req.body.long);
  const maxDistance = 5; // this is kilometers
  try {
    const userBathrooms = await Bathroom.findAll({
      where: {
        lat: {
          [Op.and]: [
            literal(`CAST(lat AS NUMERIC) >= ${userLat - 0.009 * maxDistance}`),
            literal(`CAST(lat AS NUMERIC) <= ${userLat + 0.009 * maxDistance}`),
          ],
        },
        lng: {
          [Op.and]: [
            literal(`CAST(lng AS NUMERIC) >= ${userLong - 0.009 * maxDistance}`),
            literal(`CAST(lng AS NUMERIC) <= ${userLong + 0.009 * maxDistance}`),
          ],
        },
      },
      order: [
        Sequelize.literal(`SQRT(POW(CAST(lat AS NUMERIC) - ${userLat}, 2) + POW(CAST(lng AS NUMERIC) - ${userLong}, 2)) ASC`) // Orders by proximity
      ]
    });
    res.status(200).json(userBathrooms);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});



//create a review for a bathroom (now has rating)
router.post("/:bathroomId/reviews",  authenticateUser, async (req, res) => {
 
    const bathroomId = parseInt(req.params.bathroomId, 10);
  const userId = req.session.userId;
  //const userId = parseInt(req.session.userId, 10)
  // console.log("userId", userId); // Get the user ID from the session
    try {
      const review = await Review.create({
        rating: req.body.rating,
        content: req.body.content,
        photo: req.body.photo,
        wheelchair: req.body.wheelchair,
        unisex: req.body.unisex,
        emergencyCord: req.body.emergencyCord,
        emergencyButton: req.body.emergencyButton,
        petFriendly: req.body.petFriendly,
        requiresKey: req.body.requiresKey,
        handDryer: req.body.handDryer,
        feminineProducts: req.body.feminineProducts,
        toiletCovers: req.body.toiletCovers,
        bidet: req.body.bidet,
        singleStall: req.body.singleStall,
        multipleStall: req.body.multipleStall,
        changingTable: req.body.changingTable,
        trashCan: req.body.trashCan,
        goodFlooring: req.body.goodFlooring,
        airFreshener: req.body.airFreshener,
        automatic: req.body.automatic,
        coatHook: req.body.coatHook,
        brailleSign: req.body.brailleSign,
        hotWater: req.body.hotWater,
        firstAid: req.body.firstAid,
        sharpsDisposal: req.body.sharpsDisposal,
        BathroomId: bathroomId,
         UserId: userId, // Set the UserId to the logged-in user's ID
        
        createdAt: new Date(),
        updatedAt: new Date()
      });
  
      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ message: "An error occurred while creating the review" });
    }
  });
  
 
  //edit bathroom
  router.patch("/bathrooms/:bathroomId", authenticateUser, async (req, res) => {
    const bathroomId = parseInt(req.params.bathroomId, 10);
    try {
      const record = await Bathroom.findOne({ where: { id: bathroomId } });
      if (!record) {
        return res.status(404).json({ message: "Bathroom not found" });
      }
  
      // Check if the bathroom's UserId matches the session userId
      if (record.UserId !== req.session.userId) {
        return res.status(403).json({ message: "Unauthorized to edit this bathroom" });
      }
  
      // Update the bathroom with the provided data
      await record.update(req.body);
  
      return res.status(200).json({ message: "Bathroom updated successfully" });
    } catch (error) {
      console.error("Error updating bathroom:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  
  //get a review by ID (for editReview.jsx)

router.get("/userReviews/:reviewId", async (req, res) => {

  const reviewId = parseInt(req.params.reviewId, 10);
  
  console.log(reviewId);


  try {
    const review = await Review.findOne({ where: { id: reviewId } });

    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).send({ message: "review not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

//edit a review by user authentication (for EditReview.jsx)

 router.patch("/userReviews/:reviewId", authenticateUser, async (req, res) => {
  const reviewId = parseInt(req.params.reviewId, 10);
 try {
    const record = await Review.findOne({ where: { id: reviewId } });
    if (record && record.UserId !== parseInt(req.session.userId, 10)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform that action." });
    }

    const [numberOfAffectedRows, affectedRows] = await Review.update(
      req.body,
      { where: { id: reviewId }, returning: true }
    );
  if (numberOfAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Comment not found" });
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    res.status(500).send({ message: err.message });
    console.error(err);
  }
});

  module.exports = router;