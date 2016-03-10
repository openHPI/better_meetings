/**
 * Created by dinana on 25/4/15.
 * Please keep credits for re-use.
 */

function populateDeep2(parentModelName, parentModel, path, cb) {
  var count;
  var parent;

  if (!path || path.length === 0) {
    cb('No path given');
    return;
  }

  count = 0;
  parent = JSON.parse(JSON.stringify(parentModel));

  function populateDeepInner(parentModelNameInner, parentInstanceInner, pathInner, cbInner) {
    function isPopulated(model) {
      return (model && typeof model !== 'string');
    }

    function handle(parentInstance) {
      var pathArray = pathInner.split('.');
      var childInstance = parentInstance[pathArray[0]];
      var childAssociation;
      var findCriteria;

      function getChildModel(parentModelNameFctChildModel, childModelName) {
        var childAssociationFctChildModel = sails.models[parentModelNameFctChildModel.toLowerCase()]
          .associations.filter(function (value) {
            return value.alias === childModelName;
          });
        return {
          model: sails.models[childAssociationFctChildModel[0][childAssociationFctChildModel[0].type]],
          type: childAssociationFctChildModel[0].type,
          via: childAssociationFctChildModel[0].via,
          modelName: childAssociationFctChildModel[0][childAssociationFctChildModel[0].type]
        };
      }

      // Assumptions: newChild is already populated
      function doneIfDone(newChildInstance) {
        var newPathArray;
        var newPath;

        if (pathArray.length > 1) {
          newPathArray = pathArray.slice(1);
          newPath = newPathArray.join('.');
          count--;
          populateDeepInner(getChildModel(parentModelNameInner, pathArray[0]).modelName,
            newChildInstance, newPath, cbInner);
        } else {
          count--;
          if (count === 0) {
            cbInner(null, parent);
          }
        }
      }

      function stitcher(newChildInstance) {
        newChildInstance = JSON.parse(JSON.stringify(newChildInstance));
        switch (getChildModel(parentModelNameInner, pathArray[0]).type) {
          case 'model':
            parentInstance[pathArray[0]] = newChildInstance[0];
            break;
          case 'collection':
            parentInstance[pathArray[0]] = newChildInstance;
            break;
          default:
            break;
        }
        doneIfDone(newChildInstance);
      }

      if (isPopulated(childInstance)) {
        doneIfDone(childInstance, pathArray);
      } else {
        childAssociation = getChildModel(parentModelNameInner, pathArray[0]);

        switch (childAssociation.type) {
          case 'model':
            findCriteria = childInstance;
            break;
          case 'collection':
            findCriteria = {};
            findCriteria[childAssociation.via] = parentInstance.id;
            break;
          default:
            break;
        }
        if (pathArray.length > 1) {
          childAssociation.model.find(findCriteria)
            .populate(pathArray[1])
            .exec(function (err, populatedChild) {
              if (err) {
                console.log('Error:', err);
                cbInner(err);
              }
              // pathArray.splice(0,1)
              stitcher(populatedChild);
            });
        } else {
          childAssociation.model.find(findCriteria)
            .exec(function (err, populatedChild) {
              if (err) {
                console.log('Error:', err);
                cbInner(err);
              }
              // pathArray.splice(0,1)
              stitcher(populatedChild);
            });
        }
      }
    }

    if (Array.isArray(parentInstanceInner)) {
      count = count + parentInstanceInner.length;
      parentInstanceInner.map(function (value) {
        return handle(value);
      });
    } else {
      count++;
      handle(parentInstanceInner);
    }
  }

  populateDeepInner(parentModelName, parent, path, cb);
}

module.exports = { populateDeep: populateDeep2 };
