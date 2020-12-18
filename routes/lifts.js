const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth') // used whenever we need to protect routes
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const Lift = require('../models/Lift'); 


//@route    GET api/lifts
//@desc     Get all users lifts
//@access   Private
router.get('/', auth, async (req, res) => {
    try {
        const lifts = await Lift.find({user: req.user.id}).sort({date: -1}); 
        res.json(lifts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
}); 

//@route    POST api/lifts
//@desc     Get all users lifts
//@access   Private
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()}) //gives us an array of errors
        }

        const {name, weight, reps, type} = req.body;

        try {
            const newLift = new Lift({
                name,
                weight, 
                reps,
                type, 
                user: req.user.id
            });
            
            const lift = await newLift.save(); 
            res.json(lift);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error')
        }
    }
    ); 

//@route    PUT api/lifts/:id
//@desc     Update lift
//@access   Private
router.put('/:id', auth, async (req, res) => {
    const {name, weight, reps, type} = req.body;

    //Build lift object
    const liftFields = {};
    if(name) liftFields.name = name;
    if(weight) liftFields.weight = weight;
    if(reps) liftFields.reps = reps;
    if(type) liftFields.type = type;

    try {
        let lift = await Lift.findById(req.params.id);

        if(!lift) return res.status(404).json({msg: 'Lift not found'});

        // Make sure user owns lift
        if(lift.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        lift = await Lift.findByIdAndUpdate(req.params.id, 
            {$set: liftFields},
            {new: true} //if lift doesn't exist, create it
            );

            res.json(lift);
    } catch (err) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
}); 


//@route    Delete api/lifts/:id
//@desc     Delete lift
//@access   Private
router.delete('/:id',auth, async (req, res) => {
    try {
        let lift = await Lift.findById(req.params.id);

        if(!lift) return res.status(404).json({msg: 'Lift not found'});

        // Make sure user owns lift
        if(lift.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        await Lift.findByIdAndRemove(req.params.id)

        res.json({msg: 'Lift removed'});
    } catch (err) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
}); 



module.exports = router; 