// routes/hostelRoutes.js
import express,{NextFunction, Response,Request} from "express"
import Hostel, { IHostel } from "../models/hostel";
const router = express.Router();


// 2) get update delete hostels routes - 6 hostels
// Get all hostels
router.get('/', async (req, res) => {
  try {
  // await  totalRooms();
  // await  totalBeds();
  // await mappingResidentToHostel();
 const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;
  const hostels = await Hostel.find().sort({ createdAt: -1 })
  .sort({ totalRemainingBeds: -1, name: 1 })
  .skip((page - 1) * limit)
  .limit(limit);
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Get a single hostel
router.get('/:id', async (req, res) => {
  // totalRemainingBeds(req.params.id);
    try {
      const hostel = await Hostel.findById(req.params.id)
      if(!hostel){
        res.status(404).json("No hostel found with this id")
      }
        res.json(hostel);
       
    } catch (error) {
        res.status(500).json({
            err: error
        })
       
    }
});

// update hostel details
router.put('/:id', async (req, res) => {
  try {
    const hostelId = req.params.id;
    
    // Extract the data to update from the request body
    const updateData = req.body;

    // Find the resident by ID and update it with the provided data
    const updatedHostel = await Hostel.findByIdAndUpdate(
      hostelId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedHostel) {
       res.status(404).json({ message: 'Hostel not found' });
       return
    }

    res.status(200).json({
      message: 'Hostel updated successfully',
      data: updatedHostel,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating hostel', error: error });
  }
});

// Create a new hostel
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      name,
      location,
      locationLink,
      nearby1,
      nearby1distance,
      nearby2,
      nearby2distance,
      nearby3,
      nearby3distance,
      totalRemainingBeds,
      state,
      price,
      minPrice,
      maxPrice,
      features,
      rating,
      popular,
      occupancy,
      established,
      capacity,
      gender,
      hostelType,
      distance,
      description,
      roomTypes,
      facilities,
      gallery,
      usps
    } = req.body;

    const hostel = new Hostel({
      name,
      location,
      locationLink,
      nearby1,
      nearby1distance,
      nearby2,
      nearby2distance,
      nearby3,
      nearby3distance,
      totalRemainingBeds,
      state,
      price,
      minPrice,
      maxPrice,
      features,
      rating,
      popular,
      occupancy,
      established,
      capacity,
      gender,
      hostelType,
      distance,
      description,
      roomTypes, // array of { type, price, icon }
      facilities, // array of { name, icon }
      gallery,    // array of strings
      usps        // array of strings
    });

    const newHostel = await hostel.save();
    res.status(201).json(newHostel);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create hostel', error: err });
  }
});



// Delete a hostel
router.delete('/:id',  async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndUpdate(req.params.id)
    if(hostel){
      res.status(404).json("Hostel is already deleted or not found ")
    }
    res.json({ message: `Hostel deleted ${hostel?.name}` });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


export default router;
