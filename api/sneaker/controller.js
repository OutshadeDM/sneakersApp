const { getData } = require('./service');
const filePath = './body.json';
const format = 'utf8';

/**
 * * Returns true if the variable is of type object and false elsewise
 * @param variable
*/
const isObject = (variable) => {
  return (typeof variable === 'object' && !Array.isArray(variable) && variable !== null)
}

/**
 * * The function responds with the data based on the route called 
 * @param req The request Object
 * @param res The response object
*/
const info = async (req, res) => {
  try {

    const { brand, model, detail, color, size } = req.params;

    let data = await getData(filePath, format);

    // ! /:brand/:model/:detail
    if (detail && detail.length) {

      const modelData = data[brand][model];

      if (isObject(modelData)) {

        return res.status(200).send(modelData[detail].toString());

      }

      if (modelData && modelData.length && modelData.includes(detail))
        return res.status(200).send("Available");
      return res.status(200).send("Not Available");

    }
    
    // ! /:brand/:model/:color/:size
    if (size && size.length) {

      const colorData = data[brand][model][color];

      if (color && color.length && colorData.includes(size)) 
        return res.status(200).send("Available");
      return res.status(200).send("Not Available");

    }

    // ! /:brand/:model
    if (model && model.length) {

      const modelData = data[brand][model];

      if (isObject(modelData)) {

        return res.status(200).send(Object.keys(modelData).toString());

      }
      
      return res.status(200).send(modelData.toString());
      
    }

    // ! /:brand
    if (brand && brand.length) {

      const brandData = data[brand];

      return res.status(200).send(Object.keys(brandData).toString());

    }
    
    // ! /
    return res.status(200).send(Object.keys(data).toString());

  } catch (error) {
    // can be raplaced by sentry or any other logger method
    console.log(error);
    return res.status(404).send("Not Available");
  }
}

module.exports = {
  info,
}