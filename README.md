# Scoper

Shows the scope of the current enclosing brackets (braces, parentheses or square brackets).

<img src="https://raw.githubusercontent.com/Gruntfuggly/scoper/master/screenshot.png">

## Installing

You can install the latest version of the extension via the Visual Studio
Marketplace [here](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.scoper).

Alternatively, open Visual Studio code, press `Ctrl+P` or `Cmd+P` and type:

    > ext install scoper


### Source Code

The source code is available on GitHub [here](https://github.com/Gruntfuggly/scoper).


## Configuration

`scoper.highlightColor`

The color of the highlight.

`scoper.endColor`

The background color for the characters at either end of the scope.

`scoper.overviewColor`

The color of the highlight in the overview ruler.

*Note: If you want to disable the range highlight or the end marker highlights,
just set the alpha channel to 0, e.g.* `scoper.endColor: "#00000000"`

`scoper.parentheses`

Show scope for parentheses, e.g. `(...)`

`scoper.braces`

Show scope for braces, e.g. `{...}`

`scoper.squareBrackets`

Show scope for square brackets, e.g. `[...]`

`scoper.languages`

Allows fine control per language. For example, the following will enable
highlighting of braces, disable highlighting of parentheses and use the global
setting for highlighting square brackets:


```
"scoper.languages": {
    "javascript": {
        "braces": true,
        "parentheses:" false
    }
}

```

*For a list of supported languages, press* `F1` *and enter* `Change Language Mode`. *The language tokens are shown in brackets after each entry in the list. Press `Escape` to close the list without changing the language.*

### Credits

This extension is a massive rip-off of Chunsen Wang's [Bracket
Select](https://marketplace.visualstudio.com/items?itemName=chunsen.bracket-select)
extension. Please accept my apologies and thanks in equal measure...