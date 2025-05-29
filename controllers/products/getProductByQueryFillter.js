import ProductModel from "../../models/ProductModel.js"

const getProductByQueryFillter = async  (req, res) => {
  try {
    const { brand, sortBy, search } = req.query

    let Query = {}

    if (brand) {
      Query.brandName = brand
    }

    if (search) {
      Query.$or = [
        { name: { $regex: search, $options: 'i' } },
        (Query.$or = { description: { $regex: search, $options: 'i' } }),
      ]
    }

    let sort = {}
    if (sortBy) {
      switch (sortBy) {
        case 'lowerPrice':
          sort= {
            price: 1
          }
          break
        case 'uperPrice':
          sort= {
            price: -1
          }
        default:
          break
      }
    }

    let product = await ProductModel.find(Query).sort(sort) ;

  return  res.status(200).json({
        success : true ,
        error : false ,
        message : "Successfully get Your Products " ,
        data : product
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error 🤢🤢',
      error: true,
      success: false,
    })
  }
}


export default getProductByQueryFillter