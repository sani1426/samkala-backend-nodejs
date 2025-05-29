import ProductModel from '../../models/ProductModel.js'

async function getProductByCategoryController(req, res) {
  try {
    const {category} = req.params;
    const Ppg = 8 
    const {Page} = req.query;


    const products = await ProductModel.find({ category: category }).skip((Page - 1) * Ppg).limit(Ppg)

    const count = await ProductModel.countDocuments({ category: category })

    res.status(200).json({
      message: `Successfully get Your  ${category} products ✨✨`,
      count : count ,
      error: false,
      success: true,
      data: products,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error 🤢🤢',
      error: true,
      success: false,
    })
  }
}

export default getProductByCategoryController
