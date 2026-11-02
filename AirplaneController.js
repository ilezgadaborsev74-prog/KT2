import Airplane from "./models/Airplane.js";
import fileService from "./fileService.js";

class AirplaneController {
  async getAirplanes(req, res) {
    try {
      const airplanes = await Airplane.find();
      res.json(airplanes);
    } catch (error) {
      console.log("Ошибка при получении самолетов: " + error);
      res.status(500).send("Ошибка при получении самолетов");
    }
  }

  async addAirplane(req, res) {
    try {
      let fileName = null;

      if (req.files && req.files.image) {
        fileName = await fileService.saveFile(req.files.image);
        if (!fileName) {
          return res.status(400).send("Ошибка при добавлении файла");
        }
      }

      const { id, brand, model, year, hours, price } = req.body;
      const newAirplane = await Airplane.create({
        id,
        brand,
        model,
        year,
        hours,
        price,
        image: fileName
      });

      res.status(201).json({ message: "Самолет успешно добавлен!", airplane: newAirplane });
    } catch (error) {
      console.log("Ошибка при добавлении самолета: " + error);
      res.status(400).send(error.message);
    }
  }

  async putAirplanes(req, res) {
    try {
      let fileName = null;

      if (req.files && req.files.image) {
        fileName = await fileService.saveFile(req.files.image);
        if (!fileName) {
          return res.status(400).send("Ошибка при добавлении файла");
        }
      }

      const { id } = req.params;
      const { brand, model, year, hours, price } = req.body;

      const airplane = await Airplane.findByIdAndUpdate(
        id,
        {
          brand,
          model,
          year,
          hours,
          price,
          image: fileName
        },
        { new: true }
      );

      res.json(airplane);
    } catch (error) {
      console.log("Ошибка при обновлении самолета: " + error);
      res.status(500).send("Ошибка при обновлении самолета");
    }
  }

  async deleteAirplanes(req, res) {
    try {
      const { id } = req.params;

      const airplane = await Airplane.findByIdAndDelete(id);

      if (!airplane) {
        return res.status(404).send("Самолет не найден");
      }

      res.json(airplane);
    } catch (error) {
      console.log("Ошибка при удалении самолета: " + error);
      res.status(500).send("Ошибка при удалении самолета");
    }
  } 
}

export default new AirplaneController();