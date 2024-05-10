const express=require("express");
const { createbook,myBooks,sendAlert, bookDetails, borrowBook, updatebook, deletebook, returnBook, searchbooks, getAllbooks, trackBook, getAllBorrowedBooks } = require("../Controllers/bookController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middlewares/auth");
const router=express.Router();


router.route("/createbook").post(isAuthenticatedUser,createbook);
router.route("/book/:id").get(bookDetails);
router.route("/search").get(searchbooks);
router.route("/books").get(getAllbooks);
router.route("/memberBooks/:id").get(myBooks)
router.route("/borrow").post(isAuthenticatedUser,borrowBook)
router.route("/return").post(isAuthenticatedUser,returnBook)
router.route("/updatebook/:id").put(isAuthenticatedUser,updatebook);
router.route("/deletebook/:id").delete(isAuthenticatedUser,deletebook);
router.route("/track/:id").get(isAuthenticatedUser,trackBook)
router.route("/borrowedBooks").get(isAuthenticatedUser,getAllBorrowedBooks)
router.route("/sendAlert").post(isAuthenticatedUser,sendAlert)

module.exports=router