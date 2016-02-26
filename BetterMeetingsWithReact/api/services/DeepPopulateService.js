/**
 * Created by dinana on 25/4/15.
 * Please keep credits for re-use.
 */

function populateDeep2(parentModelName, parentModel, path, cb) {
  if (!path || path.length == 0) {
    cb('No path given');
    return;
  }
  var count = 0;
  var parent = JSON.parse(JSON.stringify(parentModel));
  populateDeepInner(parentModelName, parent, path, cb);
  function populateDeepInner(parentModelName, parentInstance, path, cb) {
    if (Array.isArray(parentInstance)) {
      count = count + parentInstance.length;
      parentInstance.map(function (value, index, origArray) {
        handle(value)
      })
    } else {
      count++;
      handle(parentInstance)
    }

    function handle(parentInstance) {
      var pathArray = path.split('.');
      var childInstance = parentInstance[pathArray[0]]
      if (isPopulated(childInstance)) {
        doneIfDone(childInstance, pathArray);
      } else {
        var childAssociation = getChildModel(parentModelName, pathArray[0]);
        var findCriteria;
        switch (childAssociation.type) {
          case 'model':
            findCriteria = childInstance;
            break;
          case 'collection':
            findCriteria = {};
            findCriteria[childAssociation.via] = parentInstance.id;
            break;
        }
        if (pathArray.length > 1) {
          childAssociation.model.find(findCriteria)
            .populate(pathArray[1])
            .exec(function (err, populatedChild) {
              if (err) {
                console.log('Error:', err)
                cb(err)
              }
//                            pathArray.splice(0,1)
              stitcher(populatedChild);
            })
        } else {
          childAssociation.model.find(findCriteria)
            .exec(function (err, populatedChild) {
              if (err) {
                console.log('Error:', err)
                cb(err)
              }
//                            pathArray.splice(0,1)
              stitcher(populatedChild);
            })
        }
      }
      function stitcher(newChildInstance) {
        newChildInstance = JSON.parse(JSON.stringify(newChildInstance));
        switch (getChildModel(parentModelName, pathArray[0]).type) {
          case 'model':
            parentInstance[pathArray[0]] = newChildInstance[0];
            break;
          case 'collection':
            parentInstance[pathArray[0]] = newChildInstance;
            break;
        }
        doneIfDone(newChildInstance)
      }

      // Assumptions: newChild is already populated
      function doneIfDone(newChildInstance) {
        if (pathArray.length > 1) {
          var newPathArray = pathArray.slice(1)
          var newPath = newPathArray.join('.');
          count--;
          populateDeepInner(getChildModel(parentModelName, pathArray[0]).modelName, newChildInstance, newPath, cb);
        } else {
          count--;
          if (count == 0)
            cb(null, parent);
        }
      }

      function getChildModel(parentModelName, childModelName) {
        var childAssociation = sails.models[parentModelName.toLowerCase()].associations.filter(function (value) {
          return value.alias == childModelName;
        })
        return {
          model: sails.models[childAssociation[0][childAssociation[0].type]],
          type: childAssociation[0].type,
          via: childAssociation[0].via,
          modelName: childAssociation[0][childAssociation[0].type]
        };
      }
    }

    function isPopulated(model) {
      return (model && typeof model != 'string')
    }
  }
}
module.exports = {populateDeep: populateDeep2}
