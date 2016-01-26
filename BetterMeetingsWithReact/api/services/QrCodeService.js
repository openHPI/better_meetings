module.exports = {

  /**
   * @param url   a simple url as string
   * @param size  size for the qrcode (this is not in px!)
   *
   * Aufruf im Controller: var qrcode = QrCodeService.renderQrCode(myurl, size);
   * 'qrcode' ist dann das fertige svg
   * dieses muss nur noch im controller an die view übergeben werden
   * dort wird der qrcode angezeigt durch: <%- qrcode %>
   * */
  renderQrCode: function (url, size) {
    var qr = require('node-qr-image');

    var qr_svg = qr.image('I love QR!', {type: 'svg'});
    qr_svg.pipe(require('fs').createWriteStream('i_love_qr.svg'));

    var svg_string = qr.imageSync(url, {type: 'svg'});

    return svg_string.replace('viewBox="0 0 27 27"', 'viewBox="0 0 27 27" width=' + size + ' height=' + size);
  }
};
