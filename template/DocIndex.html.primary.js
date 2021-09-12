var common = require('./common.js');
var extension = require('./Hub.extension.js')

exports.transform = function (model) {
    if (extension && extension.preTransform) {
        model = extension.preTransform(model);
      }
    
      model._enableSearch = false;
      model._disableSearch = true;
      common.setYear(model);
    
      if (extension && extension.postTransform) {
        model = extension.postTransform(model);
      }

    return model;
}