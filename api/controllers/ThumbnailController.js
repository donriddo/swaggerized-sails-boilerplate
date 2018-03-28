/**
* thumbnail controller
*/

const download = require('image-downloader');
const fs = require('fs');
const Thumbnail = require('thumbnail');

module.exports = {
  generateThumbnail(req, res) {
    if (!req.body.imageURL) return res.status(400).json({
      message: '`imageURL` must be set'
    });
    const options = {
      dest: `${__dirname}/image.jpg`,
      url: req.body.imageURL
    };


    download.image(options)
      .then(({ fileName, image }) => {
        const thumbnail = new Thumbnail(__dirname, __dirname);

        thumbnail.ensureThumbnail(
          'image.jpg', 50, 50, function (err, filename) {
            if (err) {

              return res.status(400).json({
                err,
                fileName,
                image,
                message: 'Error creating thumbnail'
              });
            }

            return fs.createReadStream(`${__dirname}/${filename}`).pipe(res);
          });
      })
      .catch((err) => res.status(400).json({
        err,
        message: 'Error downloading image'
      }));
  }
};
