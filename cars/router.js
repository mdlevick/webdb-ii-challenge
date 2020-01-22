const express = require("express");

const db = require("../dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(error => {
      console.log(error);
      res.status(418).json({ errorMessage: "Error getting the cars. " });
    });
});

router.get("/:id", (req, res) => {
  db.select("*")
    .from("cars")
    .where({ id: req.params.id })
    .first()
    .then(car => {
      res.status(200).json(car);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the car." });
    });
});

router.post("/", validateCar, (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData, "id")
    .then(ids => {
      const car_id = ids[0];
      return db("cars")
        .select("car_id", "vin", "make", "model", "mileage")
        .where({ car_id })
        .first()
        .then(car => {
          res.status(201).json(car);
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error adding the car. " });
    });
});

router.delete("/:id", (req, res) => {
  db("cars")
    .where({ car_id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} car(s) removed. ` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error removing the car." });
    });
});

function validateCar(req, res, next) {
  const carData = req.body;
  if (!carData.vin || !carData.make || !carData.model || !carData.mileage) {
    res.status(418).json({ message: "Please provide required information." });
  } else {
    next();
  }
}

module.exports = router;