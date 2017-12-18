var vscode = require( 'vscode' );
const util = require( "./scoperUtil" );

function setStyle()
{
    return vscode.window.createTextEditorDecorationType( {
        overviewRulerColor: vscode.workspace.getConfiguration( 'scoper' ).overviewColor,
        overviewRulerLane: vscode.OverviewRulerLane.Right,
        light: {
            backgroundColor: vscode.workspace.getConfiguration( 'scoper' ).highlightColor
        },
        dark: {
            backgroundColor: vscode.workspace.getConfiguration( 'scoper' ).highlightColor
        }
    } );
}

var scoperDecorationType = setStyle();
var listParts = [];
var listStart;

var Scoper = ( function()
{
    function Scoper()
    {
    }

    Scoper.prototype.updateConfig = function()
    {
        if( vscode.window.activeTextEditor )
        {
            vscode.window.activeTextEditor.setDecorations( scoperDecorationType, [] );
        }

        scoperDecorationType = setStyle();
        util.scoperUtil.updateConfig();
    };

    class SearchResult
    {
        constructor( bracket, offset )
        {
            this.bracket = bracket;
            this.offset = offset;
        }
    }

    function findBackward( text, index )
    {
        const bracketStack = [];
        let offset = 0;
        let bracket = '';

        for( let i = index; i >= 0; i-- )
        {
            let char = text.charAt( i );
            if( util.scoperUtil.isOpenBracket( char ) )
            {
                if( bracketStack.length === 0 )
                {
                    bracket = char;
                    offset = i;
                    break;
                }
                else
                {
                    let top = bracketStack.pop();
                    if( !util.scoperUtil.isMatch( char, top ) )
                    {
                        throw 'Unmatched bracket pair';
                    }
                }
            }
            else if( util.scoperUtil.isCloseBracket( char ) )
            {
                bracketStack.push( char );
            }
        }

        return new SearchResult( bracket, offset );
    }

    function findForward( text, index )
    {
        const bracketStack = [];
        let offset = text.length;
        let bracket = '';
        for( let i = index; i < text.length; i++ )
        {
            let char = text.charAt( i );
            if( util.scoperUtil.isCloseBracket( char ) )
            {
                if( bracketStack.length === 0 )
                {
                    offset = i;
                    bracket = char;
                    break;
                }
                else
                {
                    let top = bracketStack.pop();
                    if( !util.scoperUtil.isMatch( top, char ) )
                    {
                        throw 'Unmatched bracket pair';
                    }
                }
            }
            else if( util.scoperUtil.isOpenBracket( char ) )
            {
                bracketStack.push( char );
            }
        }
        return new SearchResult( bracket, offset );
    }

    Scoper.prototype.update = function()
    {
        const editor = vscode.window.activeTextEditor;

        if( !editor )
        {
            return;
        }
        else if( !editor.selection.isEmpty )
        {
            editor.setDecorations( scoperDecorationType, [] );
            return;
        }

        const offset = editor.document.offsetAt( editor.selection.active );
        const text = editor.document.getText();

        try
        {
            const backwardResult = findBackward( text, offset - 1 );
            const forwardResult = findForward( text, offset );

            if( !util.scoperUtil.isMatch( backwardResult.bracket, forwardResult.bracket ) )
            {
                editor.setDecorations( scoperDecorationType, [] );
                return;
            }

            let start = backwardResult.offset < text.length ? backwardResult.offset + 1 : backwardResult.offset;
            let end = forwardResult.offset;

            const decoration = new vscode.Range( editor.document.positionAt( start ), editor.document.positionAt( end ) );
            var decorations = [];
            decorations.push( decoration );
            editor.setDecorations( scoperDecorationType, decorations );

            listStart = start;
            var list = text.substring( start, end );
            listParts = list.split( /\s*,\s*/ );
            parts.map( function( p )
            {
                console.log( p );
            } );
        }
        catch( error )
        {
            editor.setDecorations( scoperDecorationType, [] );
        }
    };

    Scoper.prototype.dispose = function()
    {
        this.decorator.dispose();
    };

    Scoper.prototype.rotateLeft = function()
    {
        // const editor = vscode.window.activeTextEditor;
        // const text = editor.document.getText();

        // if( listParts && listParts.length > 0 )
        // {
        //     for( var i = 0; i < listParts.length(); ++i )
        //     {
        //         const offset = editor.document.offsetAt( editor.selection.active );
        //         if( offset > listStart && offset < listStart + listParts[ i ].length + i )
        //         {
        //             console.log( listParts[ i ] );
        //         }
        //     }
        // }
    };

    Scoper.prototype.rotateRight = function()
    {
    };

    return Scoper;
}() );

exports.Scoper = Scoper;
