import Product from "../models/Product.js";


// ================= ADD PRODUCT =================

export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      image,
      rentPerDay,
    } = req.body;

    // Validation
    if (
      !title ||
      !description ||
      !category ||
      !image ||
      !rentPerDay
    ) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Create product
    const product = await Product.create({
      title,
      description,
      category,
      image,
      rentPerDay,
      owner: req.user._id,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// ================= GET ALL PRODUCTS =================

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ================= GET SINGLE PRODUCT =================

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("owner", "name email");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ================= UPDATE PRODUCT =================

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check owner
    if (product.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= DELETE PRODUCT =================

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check owner
    if (product.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};