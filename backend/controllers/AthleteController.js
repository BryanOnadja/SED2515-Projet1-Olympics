import Athlete from "../models/AthleteModel.js";
import { Op } from "sequelize";

// Code écrit par moi
export const getAthletes = async (req, res) => {
    const last_id = parseInt(req.query.lastId) || 0;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search_query || "";
    
    let result = [];
    if (last_id < 1) {
        const results = await Athlete.findAll({
            where: {
                [Op.or]: [
                    { Name: { [Op.like]: '%' + search + '%' } },
                    { Team: { [Op.like]: '%' + search + '%' } },
                    { Sport: { [Op.like]: '%' + search + '%' } }
                ]
            },
            limit: limit,
            order: [['id', 'ASC']]
        });
        result = results;
    } else {
        const results = await Athlete.findAll({
            where: {
                id: { [Op.gt]: last_id }, // gt = Greater Than (Plus grand que)
                [Op.or]: [
                    { Name: { [Op.like]: '%' + search + '%' } },
                    { Team: { [Op.like]: '%' + search + '%' } },
                    { Sport: { [Op.like]: '%' + search + '%' } }
                ]
            },
            limit: limit,
            order: [['id', 'ASC']]
        });
        result = results;
    }
    
    res.json({
        result: result,
        lastId: result.length ? result[result.length - 1].id : 0,
        hasMore: result.length >= limit ? true : false
    });
}