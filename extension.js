var vscode = require( 'vscode' );
var scoper = require( './scoper' );
var scoperController = require( './scoperController' );

function activate( context )
{
    var bs = new scoper.Scoper();
    var controller = new scoperController.ScoperController( bs );
    context.subscriptions.push( controller );
    context.subscriptions.push( bs );

    var rotateLeft = vscode.commands.registerCommand( 'rotate-left', function()
    {
        bs.rotateLeft();
    } );
    var rotateRight = vscode.commands.registerCommand( 'rotate-right', function()
    {
        bs.rotateRight();
    } );

    context.subscriptions.push( rotateLeft );
    context.subscriptions.push( rotateRight );
}

exports.activate = activate;
