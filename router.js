import { Router } from "express"
import AirplaneController from "./AirplaneController.js"

const router = new Router()


router.get("/airplane" , AirplaneController.getAirplanes )
router.post("/addairplane" , AirplaneController.addAirplane)
router.delete("/delairplane/:id" , AirplaneController.deleteAirplanes )
router.put("/putairplane/:id" , AirplaneController.putAirplanes)



export default router;