import express from "express"
import ComposantsCtrl from "./composants.controller.js"
//import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(ComposantsCtrl.apiGetComposants)
//router.route("/id/:id").get(ComposantsCtrl.apiGetComposantsById)

//router
//  .route("/review")
//  .post(ReviewsCtrl.apiPostReview)
//  .put(ReviewsCtrl.apiUpdateReview)
//  .delete(ReviewsCtrl.apiDeleteReview)

export default router