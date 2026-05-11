import Rental from "../models/Rental.js";
import Product from "../models/Product.js";


// ================= CREATE RENTAL =================

export const createRental = async (req, res) => {
  try {
    const {
      productId,
      startDate,
      endDate,
    } = req.body;

    // Find product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Calculate days
    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceInTime = end - start;

    const totalDays =
      Math.ceil(differenceInTime / (1000 * 60 * 60 * 24)) + 1;

    // Total price
    const totalPrice = totalDays * product.rentPerDay;

    // Create rental
    const rental = await Rental.create({
      user: req.user._id,
      product: product._id,
      startDate,
      endDate,
      totalDays,
      totalPrice,
    });

    res.status(201).json({
      message: "Rental booked successfully",
      rental,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// ================= GET USER RENTALS =================

export const getMyRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({
      user: req.user._id,
    })
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json(rentals);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};