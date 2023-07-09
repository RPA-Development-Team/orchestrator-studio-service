const express = require('express');
const packageController = require('../controllers/package-controller');
const auth = require('../middleware/auth');

const router = express.Router();


router.route("/create").post(auth, packageController.createPackage);
router.route("/:id").delete(auth, packageController.deletePackagesByID);
router.route("/user").get(auth, packageController.getPackagesByUserID);
router.route("/:id").put(auth, packageController.updatePackage);
router.route("/libraries").get(packageController.getAllLibraries);
router.route("/add").post(packageController.createLibrary);

module.exports = router;