module.exports = function(RED) {
  function DebounceNode(config) {

    RED.nodes.createNode(this, config);
    this.time = Math.max(config.time || 1000, 0);
    this.name = config.name;

    var context = this.context();
    var node = this;
    this.on('input', function(msg) {
      var oldTimeout = context.get('timeout');
      if (oldTimeout) {
        clearTimeout(oldTimeout);
      }

      var timeout = setTimeout(function() {
        node.send(msg);
      }, node.time);

      context.set('timeout', timeout);

    });
  }
  RED.nodes.registerType('debounce', DebounceNode);
};
