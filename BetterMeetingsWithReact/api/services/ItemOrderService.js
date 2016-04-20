module.exports = {

  /**
   * @param {Array} oldItems - model that holds an array of the item (each item needs the property id)
   * @param {String} orderString - order  String that contains the order in form id_id_id_id
   *
   * @return {Array} newItems - collection of the topics
   * */
  orderItems: function (oldItems, orderString) {
    var order = orderString.split('_');
    var keys;
    var item;
    var newItems = [];
    var itemHash = [];
    var i;

    for (item in oldItems) {
      if (oldItems.hasOwnProperty(item)) {
        itemHash[oldItems[item].id] = oldItems[item];
      }
    }

    for (i in order) {
      if (order.hasOwnProperty(i)) {
        if (!itemHash[order[i]]) continue;

        newItems.push(itemHash[order[i]]);
        delete itemHash[order[i]];
      }
    }

    keys = Object.keys(itemHash);
    for (i in keys) {
      if (keys.hasOwnProperty(i)) {
        if (!itemHash[keys[i]]) continue;

        newItems.push(itemHash[keys[i]]);
      }
    }

    return newItems;
  }
};
