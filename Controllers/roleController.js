const Role=require("../Models/role");

module.exports.createRole=async(req,res)=>{
    try{
        const { name } = req.body;

    // Validate input data here (e.g., check for existing role)

    const role = new Role({ name });
    await role.save();

    return res.status(200).json({
      message: 'Role created successfully',
      data: role,
    });

    }catch(err){
        console.log("error",err);
        
    }
}
// Get all roles with pagination
exports.getAllRole = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Page number
      const limit = parseInt(req.query.limit) || 10; // Number of items per page
  
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const roles = await Role.find().skip(startIndex).limit(limit);
  
      // Count the total number of roles for pagination information
      const totalRoles = await Role.countDocuments();
  
      // Create a pagination object for the response
      const pagination = {
        totalRoles: totalRoles,
        currentPage: page,
        totalPages: Math.ceil(totalRoles / limit),
      };
  
      return res.status(200).json({
        message: 'Roles retrieved successfully',
        data: roles,
        pagination: pagination,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  