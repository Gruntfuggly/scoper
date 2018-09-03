Object.defineProperty( exports, "__esModule", { value: true } );

var vscode = require( 'vscode' );
var scoperUtil;

( function( scoperUtil )
{
    var openingBrackets = "";
    var closingBrackets = "";

    function updateConfig()
    {
        if( vscode.window.activeTextEditor )
        {
            openingBrackets = "";
            closingBrackets = "";

            if( isActive( "parentheses" ) )
            {
                openingBrackets += "(";
                closingBrackets += ")";
            }
            if( isActive( "braces" ) )
            {
                openingBrackets += "{";
                closingBrackets += "}";
            }
            if( isActive( "squareBrackets" ) )
            {
                openingBrackets += "[";
                closingBrackets += "]";
            }
        }
    }

    scoperUtil.updateConfig = updateConfig;

    function isActive( type )
    {
        var language = vscode.window.activeTextEditor.document.languageId;
        var config = vscode.workspace.getConfiguration( 'scoper' ).get( type, [] );
        return ( config.length === 0 || config.indexOf( language ) !== -1 );
    }

    function isMatch( open, close )
    {
        switch( open )
        {
            case '(': return close === ')';
            case '{': return close === '}';
            case '[': return close === ']';
        }
        return false;
    }

    scoperUtil.isMatch = isMatch;

    function isOpenBracket( char )
    {
        return openingBrackets.indexOf( char ) > -1;
    }

    scoperUtil.isOpenBracket = isOpenBracket;

    function isCloseBracket( char )
    {
        return closingBrackets.indexOf( char ) > -1;
    }

    scoperUtil.isCloseBracket = isCloseBracket;

    updateConfig();

} )( scoperUtil = exports.scoperUtil || ( exports.scoperUtil = {} ) );
