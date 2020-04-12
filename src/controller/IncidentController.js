'use strict'

const db = require('../database/connection');

module.exports = {
  async index(req, res){
    const { page=1, limit=5} = req.query;

    const [count] = await db('incidents').count();

    const incidents = await db('incidents')
      .join('ongs','ongs.id', '=', 'incidents.ong_id')
      .offset((page -1) * limit)
      .limit(limit)
      .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  },

  async create(req, res) {
    const {title, description, value} = req.body;

    const ong_id = req.headers.authorization;

    const exists = await db('ongs')
      .where('id', ong_id)
      .select('*')
      .first();

    if(!exists)
      return res.status(404).json({message: 'Ong Not Found'});

    const [id] = await db('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return res.status(201).json({id});
  },

  async delete(req, res) {
    const ong_id = req.headers.authorization;
    const {id} = req.params;

    const incident = await db('incidents')
      .where('id', id)
      .select('*')
      .first();

    if (incident.ong_id !== ong_id) return res.status(401).json({status: 'unauthorized'});

    await db('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}
