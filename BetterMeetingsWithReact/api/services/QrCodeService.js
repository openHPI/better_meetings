module.exports = {

  /**
   * @param url   a simple url as string
   * @param size  size for the qrcode (this is not in px!)
   *
   * Bsp: var qrcode = QrCodeService.renderQrCode('http://localhost:1337/user', '250');
   * 'qrcode' ist dann das fertige svg
   * dieses muss nur noch im controller an die view übergeben werden
   * dort wird der qrcode angezeigt durch: <%- qrcode %>
   * */
  renderQrCode: function (url, size) {
    var qr = require('node-qr-image');

    var svg_string = qr.imageSync(url, {type: 'svg'});

    return svg_string.replace('viewBox="0 0 27 27"', 'viewBox="0 0 27 27" width=' + size + ' height=' + size);
  }
};
