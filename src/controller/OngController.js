const db = require('../database/connection');
const crypto = require('crypto');
const axios = require('axios');

const api = axios.create();

module.exports = {
  async index(req, res) {
    const ongs = await db('ongs').select('*');
    return res.json(ongs);
  },

  async create(req, res) {
    const {name, email, whatsapp, city, uf} = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await db('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.json({id});
  },

  async validEmail(req, res, next){
    let { email } = req.body;
    let url = `https://disposable.debounce.io?email=${email}`;
    let result = await api.get(url);

    if(result.data.disposable){
      let message = {
        "statusCode": 400,
        "error": "Bad Request",
        "message": "\"email\" must be a valid email",
        "validation": {
          "source": "body",
          "keys": [
            "email"
          ]
        }
      };
      return res.status(400).json(message);
    }
    next();
  }
}
