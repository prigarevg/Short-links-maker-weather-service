const {Router} = require ('express')
const config = require ('config')
const Coordinates = require('../models/Coordinates')
const auth = require ('../middleware/auth.middleware')
const router = Router()

router.post('/setLatLng', auth, async (req, res) => {
    try {
        
        const {lat, lng} = req.body
        const existing = await Coordinates.findOne({lat, lng})

        if (existing) {
         return res.json({ coordinates: existing})
        }
    
        const coordinates = new Coordinates ({
            lat, lng, owner: req.user.userId
          })
  
      
        await coordinates.save()

        res.status(201).json({ coordinates })
    
      } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      }
})

router.get('/getLatLng', auth, async (req,res) => {
    try {
        const coordinates = await Coordinates.find({owner: req.user.userId})
        res.json(coordinates)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', auth, async (req,res) => {
  try {
      const coordinates = await Coordinates.findById(req.params.id)
      res.json(coordinates)
  
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})



module.exports = router