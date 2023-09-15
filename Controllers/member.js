// memberController.js
const Member = require('../Models/Member');
const Role = require("../Models/role");
const Community = require("../Models/community");
const User = require("../Models/user");
const verifyToken = require("../config/verifyToken")

module.exports.addMember = async (req, res) => {
    try {
        const checkToken = verifyToken.getToken(req);
        if (checkToken) {

            const { community, user, role } = req.body;

            // Check if the community exists
            const isCommunityExist = await Community.find({ id: community });
            if (!isCommunityExist) {
                res.status(404).json({ error: 'Community not found' });

                // Check if the user to be added exists
                const isUserexist = await User.find({ userId: user });
                console.log(isUserexist);
                if (!isUserexist) {
                    res.status(404).json({ error: 'User to add not found' });
                }

                const isRoleExist = await Role.find({ roleId: role });
                if (isRoleExist.name) {
                    if (isRoleExist.name !== 'Community Admin') {
                        return res.status(403).json({ error: 'Permission denied' });
                    }
                }

            }

            // Create a new member
            const newMember = new Member({
                community: community,
                user: user,
                role: role,
            });

            await newMember.save();


            res.status(201).json({
                status: true,
                content: {
                    data: {
                        id: newMember.id,
                        community: newMember.community,
                        user: newMember.user,
                        role: newMember.role,
                        created_at: newMember.created_at,
                    }
                }
            });
        } else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        if (error.name === 'MongoServerError') {
            res.status(500).send({ message: 'Member Already Exist' });
        } else {

            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

//  module.exports.removeMember = async (req, res) => {
//     try {
//         const memberId = req.params.id;

//         // Check if the requesting user exists
//         const requestingUser = await User.findById(req.userId);
//         if (!requestingUser) {
//             return res.status(404).json({ error: 'Requesting user not found' });
//         }

//         // Check if the requesting user has the privilege to remove members (e.g., Community Admin or Moderator)
//         const requestingUserRole = await Role.findById(requestingUser.role);
//         if (
//             !requestingUserRole ||
//             (requestingUserRole.name !== 'Community Admin' &&
//                 requestingUserRole.name !== 'Moderator')
//         ) {
//             return res.status(403).json({ error: 'Permission denied' });
//         }

//         // Find and delete the member
//         const deletedMember = await Member.findByIdAndRemove(memberId);

//         if (!deletedMember) {
//             return res.status(404).json({ error: 'Member not found' });
//         }

//         res.json({ message: 'Member removed successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

