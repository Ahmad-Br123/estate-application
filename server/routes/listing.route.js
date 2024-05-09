import express from 'express';
import { createListing ,deleteListing ,updateListing ,getListing,getListings   } from '../controllers/listing.conroller.js';

const router = express.Router();

router.post('/create', createListing);
router.delete('/delete/:id', deleteListing);
router.post('/update/:id', updateListing );
router.get('/getListing/:id', getListing );
router.get('/getListing', getListings );



export default router;