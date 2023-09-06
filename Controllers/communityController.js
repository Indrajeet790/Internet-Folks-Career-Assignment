const Community = require("../Models/community");
const verifyToken = require("../config/verifyToken");

// create community
module.exports.createCommunity = async (req, res) => {
  try {
    const checkToken = verifyToken.getToken(req);
    if (checkToken) {
      const community = await Community.create({
        name: req.body.name,
        slug: req.body.slug,
        owner: checkToken.id,
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

      const communities = await Community.find({ owner: checkToken.userId })
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
