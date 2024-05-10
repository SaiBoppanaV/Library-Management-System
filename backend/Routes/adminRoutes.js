const express=require("express");
const { registerAdmin, loginOrg, getOrganizations, getOrganizationById,deleteOrganization, updateAdmin } = require("../Controllers/adminController");
const { logout } = require("../Controllers/adminController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middlewares/auth");
const router=express.Router();

router.route("/register/Admin").post(registerAdmin);
router.route("/login/Admin").post(loginOrg)
router.route("/logout/Admin").get(logout);
router.route("/updateAdmin/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateAdmin);



module.exports=router;

