'use strict'

const db = require('../database/connection');

module.exports = {
  async index(req, res){
    const ong_id = req.headers.authorization;

    const incidents = db('incidents')
      .where('ong_id', ong_id)
      .select('*');

    return res.status(200).json(incidents);
  }
}
