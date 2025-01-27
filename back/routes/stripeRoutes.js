const stripeController = require("../controllers/stripeController");
const zarinpalController = require("../controllers/zarinpalController");
const router = require("express").Router();

//Customer

router.post("/create-payment", stripeController.create_payment);
router.post("/zarinpal-calback", zarinpalController.zarinpal_callback);
router.post("/confirm/:orderId", stripeController.order_confirm);

module.exports = router;
