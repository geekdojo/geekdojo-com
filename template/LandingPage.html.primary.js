var common = require('./common.js');
var extension = require('./LandingPage.extension.js')

exports.transform = function (model) {
    if (extension && extension.preTransform) {
        model = extension.preTransform(model);
      }
    
      
    model._disableToc = model._disableToc || !model._tocPath || (model._navPath === model._tocPath);
    common.setupContribution(model);
    common.setYear(model);
    
    // architecture | concept | deploy | download | get-started | how-to-guide | learn | overview | quickstart | reference | tutorial | whats-new
    
    if(typeof(model.landingContent) !== 'undefined') {
      model.landingContent.forEach( function (linkList) {
        linkList.linkLists.forEach( function (list){
          list.topic_word = list.linkListType.replace(/-/g, ' ');
        });
      });
    }

    if (extension && extension.postTransform) {
      model = extension.postTransform(model);
    }

    return model;
}