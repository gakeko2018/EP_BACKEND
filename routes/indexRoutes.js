const express = require("express");
const router = express();

// Hanlders
const {
	upload_ms,
	upload_on_imagekit,
	catchAsyncError
} = require("../handlers/_index");

// Validators
const {
	validateEventData,
	validateImageUpload,
	validationResult
} = require("../validators/_index");
// Controllers
const {
	GET_HOMEPAGE,
	GET_EVENT_DESCRIPTION,
	GET_CATEGORY_EVENTS,
	GET_EVENT_ADDFORM,
	GET_EVENT_UPDATEFORM,
	GET_USER_PROFILE,
	GET_USER_HOSTED_EVENTS,
	GET_EVENT_SEARCH,
	POST_ADD_EVENT,
	PUT_UPDATE_EVENT
} = require("../controllers/indexControllers.js");

// GET ROUTES
router.get("/", catchAsyncError(GET_HOMEPAGE));
router.get("/event/:slug", catchAsyncError(GET_EVENT_DESCRIPTION));
router.get("/category/:name", catchAsyncError(GET_CATEGORY_EVENTS));
router.get("/category/:name/:page", catchAsyncError(GET_CATEGORY_EVENTS));
router.get("/host-event", GET_EVENT_ADDFORM);
router.get("/event/:id/update", catchAsyncError(GET_EVENT_UPDATEFORM));
router.get("/user/profile/:id", catchAsyncError(GET_USER_PROFILE));
router.get("/user/profile/:id/events", catchAsyncError(GET_USER_HOSTED_EVENTS));
router.get(
	"/user/profile/:id/events/:page",
	catchAsyncError(GET_USER_HOSTED_EVENTS)
);
router.get("/search", catchAsyncError(GET_EVENT_SEARCH));

// POST ROUTES
router.post(
	"/host-event",
	upload_ms.single("image"),
	validateEventData,
	validateImageUpload,
	validationResult,
	catchAsyncError(upload_on_imagekit),
	catchAsyncError(POST_ADD_EVENT)
);

// PUT ROUTES

router.put(
	"/event/:id/update",
	upload_ms.single("image"),
	validateEventData,
	validateImageUpload,
	validationResult,
	catchAsyncError(upload_on_imagekit),
	catchAsyncError(PUT_UPDATE_EVENT)
);

module.exports = router;
