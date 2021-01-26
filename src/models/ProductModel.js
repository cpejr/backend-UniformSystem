const connection = require("../database/connection");

module.exports = {
  async create(newProduct) {
      const response = await connection("product").insert(newProduct);
      return response;
  },

  async findProductId(product_id) {
      const response = await connection("product")
        .select("product_id")
        .where({product_id: product_id})
        .first();
      return response;
  },

  async getProductsAndOneOfItsModels({
    name,
    page = 1,
    product_type,
    gender,
    available,
  }) {
    const filter = {};

    if (product_type) filter["product.product_type"] = product_type;
    if (available) filter["product_model.available"] = available;

    let genderFilterGroup;

    // Gender filtar
    if (gender) {
      genderFilterGroup = await connection("product_model")
        .select("product_id")
        .where({ gender })
        .groupBy("product.product_id");

      genderFilterGroup = genderFilterGroup.map(
        (product) => product.product_id
      );
    }

    let query = connection("product")
      .select("*")
      .join("product_model", "product.product_id", "product_model.product_id")
      .where({
        ...filter,
      })
      .groupBy("product.product_id");

    // Gender filter
    if (gender) query = query.whereIn("product.product_id", genderFilterGroup);

    // Name filter
    if (name) {
      let names = name.split(" ");
      query.andWhere((q) => {
        names.forEach((currentName) => {
          q.orWhere("product.name", "LIKE", `%${currentName}%`);
        });
      });
    }

    // Pagination
    query = query
      .limit(process.env.ITENS_PER_PAGE)
      .offset((page - 1) * process.env.ITENS_PER_PAGE);

    const response = await query;

    const result = response.map((item) => {
      return {
        product_id: item.product_id,
        name: item.name,
        description: item.description,
        product_type: item.product_type,
        models: {
          product_model_id: item.product_model_id,
          img_link: item.img_link,
          price: item.price,
          model_description: item.model_description,
          gender: item.gender,
        },
      };
    });

    return result;
  },

  async getAllModels({ page = 1, name, product_type, gender, minprice, maxprice }) {
    const filter = {};
    if (gender) filter.gender = gender;

    let query = connection("product_model")
      .select("*")
      .limit(process.env.ITENS_PER_PAGE)
      .offset((page - 1) * process.env.ITENS_PER_PAGE)
      .join("product", "product.product_id", "product_model.product_id")
      .where(filter);

    if (typeof minprice !== "undefined")
      query.andWhere("product_model.price", ">=", minprice);
    if (typeof maxprice !== "undefined")
      query.andWhere("product_model.price", "<=", maxprice);
    if (typeof product_type !== "undefined")
      query.whereIn("product_type", product_type);
    if (typeof name !== "undefined")
      query.where("product.name", 'like', `%${name}%`);

    const response = await query;

    return response;
  },

  async getAllProductsCount() {
    const response = await connection("product")
      .select()
      .count("product.product_id as count")
      .join("product_model", "product.product_id", "product_model.product_id")
      .distinct("product.product_id")
      .first();

    return response;
  },

  async getProductById(productId) {
    const response = await connection("product")
    .where({
      "product_id": productId,
    })
    .select('*')

    return response;
  },

  async getProductsAndItsAllModels(product_id, filters) {
    const response = await connection("product")
    .select("*")
    .join("product_model", "product.product_id", "product_model.product_id")
    .where({
      "product.product_id": product_id,
      ...filters
    });
    
    let result;
    if(response[0]){

        result = {
          product_id: response[0].product_id,
          name: response[0].name,
          description: response[0].description,
          product_type: response[0].product_type,
          models: response.map((item) => {
            return {
              product_model_id: item.product_model_id,
              img_link: item.img_link,
              price: item.price,
              model_description: item.model_description,
              gender: item.gender,
              available: item.available,
            };
          }),
        };
    }else{
      result = {
        product_id: '',
        name: '',
        description: '',
        product_type:'',
        models: [],
      }
    }

    return result;
  },

  async update(productId, updatedFields) {
    const response = await connection("product")
      .where("product_id", productId)
      .update(updatedFields);

    return response;
  },

  async delete(productId) {
    const response = await connection("product")
      .where("product_id", productId)
      .del();

    return response;
  },
};
