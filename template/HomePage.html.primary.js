var common = require('./common.js');
var extension = require('./HomePage.extension.js')

exports.transform = function (model) {
    if (extension && extension.preTransform) {
        model = extension.preTransform(model);
      }
    
      common.setupContribution(model);
      common.setYear(model);
      model.jsScripts = model.jsScripts || [];
      model.jsScripts.push("homepage.html.js");

      if (extension && extension.postTransform) {
        model = extension.postTransform(model);
      }

    return model;
}