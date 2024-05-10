const express=require("express");
const {loginUser,logout, getmember, getAllmembers, updateMember, deletemember, registermember, getProfile, notifications, addMember, allMembers } = require("../Controllers/memberController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middlewares/auth");
const router=express.Router();


router.route("/register/member").post(registermember)
router.route("/login/member").post(loginUser)
router.route("/logout").get(logout)
router.route("/profile/:id").get(getProfile)
// router.route("/allmembers").get(isAuthenticatedUser,getAllmembers);
router.route("/updatemember/:id").put(isAuthenticatedUser,updateMember);
router.route("/deletemember/:id").delete(isAuthenticatedUser,deletemember);
router.route("/notifications").get(isAuthenticatedUser,notifications)
router.route("/addmember").post(isAuthenticatedUser,addMember)
router.route("/members").get(allMembers)
module.exports=router