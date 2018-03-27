/**
* json-patch controller
*/

const jsonpatch = require('jsonpatch');

module.exports = {
  patch(req, res) {
    const { data, patch } = req.body;
    let patchedData;

    try {
      patchedData = jsonpatch.apply_patch(data, patch);
    } catch (error) {
      return res.status(400).json({
        error,
        message: 'Error applying patch'
      });
    }

    return res.status(200).json({
      message: 'Patch Successful',
      patchedData
    });
  }
};
