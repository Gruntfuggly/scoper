var vscode = require( 'vscode' );

var ScoperController = ( function()
{
    function ScoperController( scoper )
    {
        this._scoper = scoper;

        var subscriptions = [];
        vscode.window.onDidChangeTextEditorSelection( this._onEvent, this, subscriptions );
        vscode.window.onDidChangeActiveTextEditor( this._onChangeEditor, this, subscriptions );
        vscode.workspace.onDidChangeConfiguration( this._onUpdateSettings, this, subscriptions );

        this._onEvent();

        this._disposable = vscode.Disposable.from.apply( vscode.Disposable, subscriptions );

        this._scoper.updateConfig();
        this._scoper.update();
    }

    ScoperController.prototype.dispose = function()
    {
        this._disposable.dispose();
    };

    ScoperController.prototype._onUpdateSettings = function( configuration )
    {
        if( configuration.affectsConfiguration( 'scoper' ) )
        {
            this._scoper.updateConfig();
        }
    };

    ScoperController.prototype._onChangeEditor = function()
    {
        this._scoper.updateConfig();
        this._scoper.update();
    };

    ScoperController.prototype._onEvent = function( e )
    {
        if( e && e.textEditor === vscode.window.activeTextEditor )
        {
            this._scoper.update();
        }
    };

    return ScoperController;
}() );

exports.ScoperController = ScoperController;
