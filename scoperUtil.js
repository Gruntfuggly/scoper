Object.defineProperty( exports, "__esModule", { value: true } );

var vscode = require( 'vscode' );
var bracketUtil;

( function( bracketUtil )
{
    function active( type )
    {
        var files = vscode.workspace.getConfiguration( 'scoper' )[ type ];
        return files === undefined || files.length === 0 || files.indexOf( vscode.window.activeTextEditor.document.languageId ) > -1;
    }

    function isMatch( open, close )
    {
        switch( open )
        {
            case '(':
                return active( "parentheses" ) && close === ')';
            case '{':
                return active( "braces" ) && close === '}';
            case '[':
                return active( "squareBrackets" ) && close === ']';
        }
        return false;
    }

    bracketUtil.isMatch = isMatch;

    function isOpenBracket( char )
    {
        return char === '('
            || char === '['
            || char === '{'
            ;
    }

    bracketUtil.isOpenBracket = isOpenBracket;

    function isCloseBracket( char )
    {
        return char === ')'
            || char === ']'
            || char === '}'
            ;
    }

    bracketUtil.isCloseBracket = isCloseBracket;

} )( bracketUtil = exports.bracketUtil || ( exports.bracketUtil = {} ) );
