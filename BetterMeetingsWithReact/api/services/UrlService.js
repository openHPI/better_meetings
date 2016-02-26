/**
 * UrlService
 *
 */

module.exports = {

  /**
   * generate a random unique url for the meetings
   * */
  generate_unique_url: function (cb) {
    var url = this.generate_random_url();

    meetingseries.findOne({
      url: url
    }).exec(function findMeetingSeries(err, cre) {
      if (!cre) {
        cb(url);
      } else {
        this.generate_unique_url();
      }
    });
  },


  /**
   * just an outsourced method --> don't use
   * */
  generate_random_url: function () {
    var s = '';
    while (s.length < 32 && 32 > 0) {
      var r = Math.random();
      s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
    }
    return s;
  }


};
