var vscode = require( 'vscode' );
var scoper = require( './scoper' );
var scoperController = require( './scoperController' );

function activate( context )
{
    var bs = new scoper.Scoper();
    var controller = new scoperController.ScoperController( bs );
    context.subscriptions.push( controller );
    context.subscriptions.push( bs );
}

exports.activate = activate;
