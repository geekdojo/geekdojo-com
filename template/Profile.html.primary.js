var common = require('./common.js');
var extension = require('./Profile.extension.js')

exports.transform = function (model) {
    if (extension && extension.preTransform) {
        model = extension.preTransform(model);
      }
    
      
    model._disableToc = model._disableToc || !model._tocPath || (model._navPath === model._tocPath);
    common.setupContribution(model);
    common.setYear(model);
    
    if (extension && extension.postTransform) {
      model = extension.postTransform(model);
    }

    return model;
}