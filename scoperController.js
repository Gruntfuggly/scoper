var vscode = require( 'vscode' );

var ScoperController = ( function()
{
    function ScoperController( scoper )
    {
        this._scoper = scoper;

        var subscriptions = [];
        vscode.window.onDidChangeTextEditorSelection( this._onEvent, this, subscriptions );
        vscode.window.onDidChangeActiveTextEditor( this._onEvent, this, subscriptions );
        vscode.workspace.onDidChangeConfiguration( this._onUpdateSettings, this, subscriptions );

        this._onEvent();

        this._disposable = vscode.Disposable.from.apply( vscode.Disposable, subscriptions );
    }

    ScoperController.prototype.dispose = function()
    {
        this._disposable.dispose();
    };

    ScoperController.prototype._onUpdateSettings = function()
    {
        var config = vscode.workspace.getConfiguration( 'scoper' );
        this._scoper.updateStyling( config );
    };

    ScoperController.prototype._onEvent = function()
    {
        this._scoper.update();
    };

    return ScoperController;
}() );

exports.ScoperController = ScoperController;
