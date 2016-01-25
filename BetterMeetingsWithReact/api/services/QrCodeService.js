module.exports = {

  /**
   * @param id    should be a string like '#div-id'
   * @param url   a simple url as string
   * */
  renderQrCode: function (id, url) {

    jQuery(id).qrcode({
      text: url
    });

  }
};
