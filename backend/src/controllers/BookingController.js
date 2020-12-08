const Booking = require('../models/Booking');
const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;

        const { spot_id } = req.params

        const { date } = req.body;

        if ( !user_id || !spot_id || !date ) {
            return res.json({error: 'Parâmetros insuficientes na requisição.'})
        }

        const user = await User.findById(user_id);
        if ( !user ) {
            return res.json({error: 'Usuário não localizado pelo ID informado.'})
        }

        const spot = await Spot.findById(spot_id);
        if ( !spot ) {
            return res.json({error: 'Spot não localizado pelo ID informado.'})
        }

        const booking = await Booking.create({
            spot: spot_id,
            user: user_id,        
            date    
        })

        await booking.populate('spot').populate('user').execPopulate()

        return res.json(booking);
    }
}