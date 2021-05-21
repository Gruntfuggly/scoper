var vscode = require( 'vscode' );
const util = require( "./scoperUtil" );

function setRangeStyle()
{
    return vscode.window.createTextEditorDecorationType( {
        overviewRulerColor: vscode.workspace.getConfiguration( 'scoper' ).overviewColor,
        overviewRulerLane: vscode.OverviewRulerLane.Right,
        light: {
            backgroundColor: vscode.workspace.getConfiguration( 'scoper' ).highlightColor
        },
        dark: {
            backgroundColor: vscode.workspace.getConfiguration( 'scoper' ).highlightColor
        },
        isWholeLine: vscode.workspace.getConfiguration( 'scoper' ).extendHighlight
    } );
}

function setEndStyle()
{
    return vscode.window.createTextEditorDecorationType( {
        light: {
            backgroundColor: vscode.workspace.getConfiguration( 'scoper' ).endColor
        },
        dark: {
            backgroundColor: vscode.workspace.getConfiguration( 'scoper' ).endColor
        }
    } );
}

var scoperRangeDecorationType = setRangeStyle();
var scoperEndDecorationType = setEndStyle();

var Scoper = ( function()
{
    function Scoper()
    {
    }

    Scoper.prototype.updateConfig = function()
    {
        if( vscode.window.activeTextEditor )
        {
            vscode.window.activeTextEditor.setDecorations( scoperRangeDecorationType, [] );
            vscode.window.activeTextEditor.setDecorations( scoperEndDecorationType, [] );
        }
        scoperRangeDecorationType.dispose();
        scoperEndDecorationType.dispose();

        scoperRangeDecorationType = setRangeStyle();
        scoperEndDecorationType = setEndStyle();

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
        scoperRangeDecorationType.dispose();
        scoperEndDecorationType.dispose();

        scoperRangeDecorationType = setRangeStyle();
        scoperEndDecorationType = setEndStyle();

        const editor = vscode.window.activeTextEditor;

        if( !editor )
        {
            return;
        }

        const offset = editor.document.offsetAt( editor.selection.active );
        const text = editor.document.getText();

        const backwardResult = findBackward( text, offset - 1 );
        const forwardResult = findForward( text, offset );

        if( util.scoperUtil.isMatch( backwardResult.bracket, forwardResult.bracket ) )
        {
            let start = backwardResult.offset < text.length ? backwardResult.offset + 1 : backwardResult.offset;
            let end = forwardResult.offset;

            var onlyShowIndentedScopes = vscode.workspace.getConfiguration( 'scoper' ).onlyShowIndentedScopes;

            var startCharacterOfScope = editor.document.positionAt( start ).character - 1;

            if( onlyShowIndentedScopes !== true || startCharacterOfScope !== 0 )
            {
                const start_decoration = new vscode.Range( editor.document.positionAt( start - 1 ), editor.document.positionAt( start ) );
                const range_decoration = new vscode.Range( editor.document.positionAt( start ), editor.document.positionAt( end ) );
                const end_decoration = new vscode.Range( editor.document.positionAt( end ), editor.document.positionAt( end + 1 ) );

                var rangeDecorations = [];
                var endDecorations = [];

                rangeDecorations.push( range_decoration );
                editor.setDecorations( scoperRangeDecorationType, rangeDecorations );
                endDecorations.push( start_decoration );
                endDecorations.push( end_decoration );
                editor.setDecorations( scoperEndDecorationType, endDecorations );
            }
        }
    };

    Scoper.prototype.dispose = function()
    {
        this.decorator.dispose();
    };


    return Scoper;
}() );

exports.Scoper = Scoper;
