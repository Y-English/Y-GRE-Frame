// main.js

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i=0; i<vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

passkey = getQueryVariable('pk');

var data_file = 'data/' + passkey;
var visualize_file = 'set-framework';
var passkey_file = 'set-framework-passkey';
var default_file = 'set-framework-default';

require.config({
    paths: {
        'data': data_file,
        'visualize': visualize_file,
        'visualize_passkey': passkey_file,
        'visualize_default': default_file,
    }
});

if (passkey) {
    $('#loading-progress-bar div span').html('Loading data...');
    require(
        ['data'],
        function (data) {
            $('#loading-progress-bar div span').html('Busy rendering page... (｡•ˇ‸ˇ•｡)');
            require(
                ['visualize'],
                function (visualize) {
                    $('#loading-progress-bar div').removeClass('progress-bar-striped');
                    $('#loading-progress-bar div span').html('Well done! ~\\\(≧▽≦)/~');
                    $('#loading-progress-bar').delay(4000).fadeOut(1000, function () {$(this).remove()});
                },
                function (err) {
                    $('#loading-progress-bar div').removeClass('progress-bar-striped').removeClass('progress-bar-blue').addClass('progress-bar-danger');
                    $('#loading-progress-bar div span').html('Unable to load component: ' + visualize_file);
                    require(
                        ['visualize_default'],
                        function (visualize_default) {}
                    );
                }
            );
        },
        function (err) {
            $('#loading-progress-bar div').removeClass('progress-bar-striped').removeClass('progress-bar-blue').addClass('progress-bar-danger');
            $('#loading-progress-bar div span').html('Invalid passkey: ' + passkey);
            require(
                ['visualize_default'],
                function (visualize_default) {}
            );
        }
    );
}
else {
    $('#loading-progress-bar div span').html('Busy rendering page... (｡•ˇ‸ˇ•｡)');
    require(
        ['visualize_passkey'],
        function (visualize_passkey) {
            $('#loading-progress-bar div').removeClass('progress-bar-striped');
            $('#loading-progress-bar div span').html('Well done! ~\\\(≧▽≦)/~');
            $('#loading-progress-bar').delay(4000).fadeOut(1000, function () {$(this).remove()});
        },
        function (err) {
            $('#loading-progress-bar div').removeClass('progress-bar-striped').removeClass('progress-bar-blue').addClass('progress-bar-danger');
            $('#loading-progress-bar div span').html('Unable to load component: ' + passkey_file);
        }
    );
};
