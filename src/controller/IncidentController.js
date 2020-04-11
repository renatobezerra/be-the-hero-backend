const db = require('../database/connection');

module.exports = {
  async index(req, res){
    const incidents = await db('incidents').select('*');
    return res.json(incidents);
  },

  async create(req, res) {
    const {title, description, value} = req.body;

    const ong_id = req.headers.authorization;

    const [id] = await db('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return res.json({id});
  },

  async delete(req, res) {
    const ong_id = req.headers.authorization;
    const {id} = req.params;

    console.log(`OngId: ${ong_id}`);
    console.log(`IncidId: ${id}`);

    const incident = await db('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) return res.status(401).json({status: 'unauthorized'});

    await db('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}
