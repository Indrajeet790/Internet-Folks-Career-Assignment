const Community = require("../Models/community");
const verifyToken = require("../config/verifyToken");
const mongoose = require('mongoose');
const User = require("../Models/user")

// create community
module.exports.createCommunity = async (req, res) => {
  try {
    const checkToken = verifyToken.getToken(req);
    if (checkToken) {
      const community = await Community.create({
        name: req.body.name,
        slug: req.body.slug,
        owner: checkToken.userId,
      });
      return res.status(200).json({ community });
    } else {
      return res.status(401).json({ msg: "unauthorized" });
    }
  } catch (err) {
    if (err.name === "MongoServerError") {
      return res.status(500).json({ message: "Slug name already exist!" });
    }
    console.log("error", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//  My Owned Community data with pagination.
exports.getOwnCommunities = async (req, res) => {
  try {
    const checkToken = verifyToken.getToken(req);
    if (checkToken) {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;

      const totalCommunities = await Community.countDocuments({owner: checkToken.userId});
      const totalPages = Math.ceil(totalCommunities / perPage);

      const communities = await Community.find()
        .skip((page - 1) * perPage)
        .limit(perPage);

      return res.status(200).json({
        status: true,
        content: {
          meta: {
            total: totalCommunities,
            pages: totalPages,
            page: page,
          },
          data: communities.map((community) => ({
            id: community.id,
            name: community.name,
            slug: community.slug,
            owner: community.owner,
            created_at: community.created_at,
            updated_at: community.updated_at,
          })),
        },
      });
    }
  } catch (error) {
    console.error("Error fetching communities:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// get all community
exports.getAllCommunity = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const totalCommunities = await Community.countDocuments();
    const totalPages = Math.ceil(totalCommunities / perPage);

    const communities = await Community.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    const populatedCommunities = [];
    for (const community of communities) {
      // Find the corresponding user based on the owner field in the community
      const user = await User.findOne({ userId: community.owner });
      populatedCommunities.push({
        id: community.id,
        name: community.name,
        slug: community.slug,
        owner: {
          id: user.userId,
          name: user.name,
        },
        created_at: community.created_at,
        updated_at: community.updated_at,
      });
    }

    return res.status(200).json({
      status: true,
      content: {
        meta: {
          total: totalCommunities,
          pages: totalPages,
          page: page,
        },
        data: populatedCommunities,
      },
    });
  } catch (error) {
    console.error("Error fetching communities:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

  
  
