// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE file in the project root for full license information.
exports.path = {};
exports.path.getFileNameWithoutExtension = getFileNameWithoutExtension;
exports.path.getDirectoryName = getDirectoryName;

exports.setupContribution = setupContribution;
exports.setYear = setYear;

function getFileName(path) {
    if (!path || path[path.length - 1] === '/' || path[path.length - 1] === '\\') return '';
    return path.split('\\').pop().split('/').pop();
}

function getFileNameWithoutExtension(path) {
    if (!path || path[path.length - 1] === '/' || path[path.length - 1] === '\\') return '';
    var fileName = path.split('\\').pop().split('/').pop();
    return fileName.slice(0, fileName.lastIndexOf('.'));
}

function getDirectoryName(path) {
    if (!path) return '';
    var index = path.lastIndexOf('/');
    return path.slice(0, index + 1);
}

function setYear(model) {
    model.currentYear = new Date().getFullYear();
}

function setupContribution(model) {

    model.sourceurl =  model._gitContribute.repo + "/tree/" + model._gitContribute.branch + "/" + model._key;

    var title = model.title;
    var services = '';
    var author = '';

    if(typeof(model.metadata) !== 'undefined') {
        title = model.metadata.title;
        services = model.metadata.services;
        author = model.metadata.author;
    } else {
        services = model['ms.services'];
        author = model['ms.author'];
    }

    var body = ' \n\r\
    [Enter feedback here] \n\
    \n\
    --- \n\
    #### Document Details \n\
    \n\
    ⚠ *Do not edit this section. It is required for Dojo ➟ GitHub issue linking.* \n\
    \n\
    * Content: [' + title + '](https://dojo.provider.engineering/docs/' + model._path + ') \n\
    * Content Source: [' + model._key + '](' + model.sourceurl + ') \n\
    * Service: **' + services + '** \n\
    * Owner: **' + author + '** \n\
    ';

    model.docurl = model._gitContribute.repo + "/issues/new?title=&body=" + encodeURIComponent(body);
}