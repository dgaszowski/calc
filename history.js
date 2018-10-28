var history_ = (function() {
    var h_ = [];

    return {
        push: function(value) {
            h_.push(value);
        },

        pop: function() {
            return h_.pop();
        },

        count: function() {
            return h_.length;
        },

        get: function() {
            return h_;
        }
    };

})();