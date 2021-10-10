const { readFile } = require('fs/promises');

/**
 * * The function reads the file and returns the data 
 * @param filePath The path of the file
 * @param format The read format of the file
*/
async function getData(filePath, format) {

  try {

    let data = JSON.parse(await readFile(filePath, format));
    return data;

  } catch (error) {
    throw new Error(error.message);
  }

}

module.exports = {
  getData,
}