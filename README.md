# Scoper

Simply shows the scope of the current enclosing brackets.

<img src="https://raw.githubusercontent.com/Gruntfuggly/scoper/master/screenshot.png">

*Note: The latest version (0.0.7) updates the way that the configuration is read. If you were using custom configuration per language, you'll need to update your configuration as it now uses an array of languages for each setting, rather than language scope. This change is to remove the 'Unknown Identifier' errors that are logged to the error console. Sorry!*


## Installing

You can install the latest version of the extension via the Visual Studio Marketplace [here](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.scoper).

Alternatively, open Visual Studio code, press `Ctrl+P` or `Cmd+P` and type:

    > ext install scoper


### Source Code

The source code is available on GitHub [here](https://github.com/Gruntfuggly/scoper).


## Configuration

`scoper.highlightColor`

The color of the highlight.

`scoper.overviewColor`

The color of the highlight in the overview ruler.

`scoper.parentheses`

`scoper.braces`

`scoper.squareBrackets`

These are arrays of languages for which highlighting scope should be enabled. By default, the arrays are empty, which shows the scope for all languages. For example, to enable braces scope highlighting for just C++ and JavaScript files, set `scoper.braces` to `[ "cpp", "javascript" ]`.


### Credits

This extension is a massive rip-off of Chunsen Wang's [Bracket Select](https://marketplace.visualstudio.com/items?itemName=chunsen.bracket-select) extension. Please accept my apologies and thanks in equal measure...