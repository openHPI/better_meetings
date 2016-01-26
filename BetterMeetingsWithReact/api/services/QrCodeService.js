module.exports = {

  /**
   * @param src   should be a string like '/qr/code'
   * @param url   a simple url as string
   * */
  renderQrCode: function (url, size) {
    var qr = require('node-qr-image');

    var qr_svg = qr.image('I love QR!', {type: 'svg'});
    qr_svg.pipe(require('fs').createWriteStream('i_love_qr.svg'));

    var svg_string = qr.imageSync(url, {type: 'svg'});

    return svg_string.replace('viewBox="0 0 27 27"', 'viewBox="0 0 27 27" width=' + size + ' height=' + size);
  }
};
