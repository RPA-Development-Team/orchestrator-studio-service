const express = require('express');
const packageController = require('../controllers/package-controller');
const router = express.Router();

router.route("/").get(packageController.getAllPackages);
router.route("/create").post(packageController.createPackage);
router.route("/:id").get(packageController.getPackagesByID);
router.route("/:id").delete(packageController.deletePackagesByID);
router.route("/user/:id").get(packageController.getPackagesByUserID);
router.route("/:id").put(packageController.updatePackage);

module.exports = router;