/**
 * UrlServive
 *
 */

module.exports = {

    generateurl: function () {
      var s = "";
        while(s.length<8&&8>0){
          var r = Math.random();
          s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
        }
      return s;
    },
};