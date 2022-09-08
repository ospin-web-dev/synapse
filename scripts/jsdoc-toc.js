(function($) {
    // TODO: make the node ID configurable
    var treeNode = $('#jsdoc-toc-nav');

    // initialize the tree
    treeNode.tree({
        autoEscape: false,
        closedIcon: '&#x21e2;',
        data: [{"label":"<a href=\"synapse.html\">synapse</a>","id":"synapse","children":[{"label":"<a href=\"synapse.deviceAPI.html\">deviceAPI</a>","id":"synapse.deviceAPI","children":[{"label":"<a href=\"synapse.deviceAPI.authentication.html\">authentication</a>","id":"synapse.deviceAPI.authentication","children":[]},{"label":"<a href=\"synapse.deviceAPI.configuration.html\">configuration</a>","id":"synapse.deviceAPI.configuration","children":[]},{"label":"<a href=\"synapse.deviceAPI.functionality.html\">functionality</a>","id":"synapse.deviceAPI.functionality","children":[]},{"label":"<a href=\"synapse.deviceAPI.process.html\">process</a>","id":"synapse.deviceAPI.process","children":[{"label":"<a href=\"synapse.deviceAPI.process.functionality.html\">functionality</a>","id":"synapse.deviceAPI.process.functionality","children":[{"label":"<a href=\"synapse.deviceAPI.process.functionality.image.html\">image</a>","id":"synapse.deviceAPI.process.functionality.image","children":[]}]},{"label":"<a href=\"synapse.deviceAPI.process.stream.html\">stream</a>","id":"synapse.deviceAPI.process.stream","children":[{"label":"<a href=\"synapse.deviceAPI.process.stream.image.html\">image</a>","id":"synapse.deviceAPI.process.stream.image","children":[]}]}]}]}]}],
        openedIcon: ' &#x21e3;',
        saveState: false,
        useContextMenu: false
    });

    // add event handlers
    // TODO
})(jQuery);
