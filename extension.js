var vscode = require( 'vscode' );
var scoper = require( './scoper' );
var scoperController = require( './scoperController' );

function activate( context )
{
    var config = vscode.workspace.getConfiguration( 'scoper' );
    var languages = config.get( 'languages', {} );
    var updated = false;

    function migrate( type )
    {
        var flag = config.get( type );
        if( typeof flag !== 'boolean' )
        {
            updated = true;
            config.update( type, false, true );
            flag.map( function( language )
            {
                if( languages[ language ] === undefined )
                {
                    languages[ language ] = {};
                }
                languages[ language ][ type ] = true;
            } );
        }
    }

    migrate( 'braces' );
    migrate( 'parentheses' );
    migrate( 'squareBrackets' );

    if( updated )
    {
        config.update( 'languages', languages, true ).then( function()
        {
            vscode.window.showInformationMessage( "Scoper configuration has been migrated." );
        } );
    }

    var bs = new scoper.Scoper();
    var controller = new scoperController.ScoperController( bs );
    context.subscriptions.push( controller );
    context.subscriptions.push( bs );
}

exports.activate = activate;
