# Config
Usage: `esy config <command> <key> [values..]`

Basically `config` command is used to manage project's configurations, there are some operations you can do on configs like `set` a new value or `get` value of existing commands.

Let's see these operations in detail.

## Set
Usage: `esy config set <key> <value>`

Set a config value.

Example:
```
esy config set "beautify.indent_size" 4
```
Sample file before & after:

Before Change
```json
{
    "beautify": {
        "indent_size": 2
    }
}
```
After running command:
```json
{
    "beautify": {
        "indent_size": 4
    }
}
```

## Get
Use this command to get a value from configs

Sample file:
```json
{
    "a": 50,
    "beautify": {
        "indent_size": 4
    },
    "environment": [
        "test"
    ]
}
```
Examples running on sample:
```
esy config get a                        # 50
esy config get beautify.indent_size     # 4
```
Longer outputs
```
esy config get beautify 
```
Result:
```
{ indent_size: 4,
  indent_char: ' ',
  indent_with_tabs: false,
  eol: '\n',
  end_with_newline: false,
  indent_level: 0,
  preserve_newlines: true,
  max_preserve_newlines: 10,
  space_in_paren: false,
  space_in_empty_paren: false,
  jslint_happy: false,
  space_after_anon_function: false,
  brace_style: 'collapse',
  break_chained_methods: false,
  keep_array_indentation: false,
  unescape_strings: false,
  wrap_line_length: 0,
  e4x: false,
  comma_first: false,
  operator_position: 'before-newline' }
```
This output is useless if we want to use it somewhere else, so what should we do if we want to see data in a better way?
Well we can use `--json, -j` option to print data in JSON mode, let's try.
```
esy config get beautify -j
```
Result:
```json
{"indent_size":4,"indent_char":" ","indent_with_tabs":false,"eol":"\n","end_with_newline":false,"indent_level":0,"preserve_newlines":true,"max_preserve_newlines":10,"space_in_paren":false,"space_in_empty_paren":false,"jslint_happy":false,"space_after_anon_function":false,"brace_style":"collapse","break_chained_methods":false,"keep_array_indentation":false,"unescape_strings":false,"wrap_line_length":0,"e4x":false,"comma_first":false,"operator_position":"before-newline"}
```
Now we have a JSON data that a computer can easily understand, but what about ourselves? just use `--beauty, -b` option to get JSON data in human-readable mode.
```
esy config get beautify -jb
```
Result:
```json
{
    "indent_size": 4,
    "indent_char": " ",
    "indent_with_tabs": false,
    "eol": "\n",
    "end_with_newline": false,
    "indent_level": 0,
    "preserve_newlines": true,
    "max_preserve_newlines": 10,
    "space_in_paren": false,
    "space_in_empty_paren": false,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse",
    "break_chained_methods": false,
    "keep_array_indentation": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "e4x": false,
    "comma_first": false,
    "operator_position": "before-newline"
}
```
Now every thing is fine!
> Note: if you compare the sample file and the outputs you see a lot of differences, 
that's because `Esy` use a lot of configurations by default.

## lpush
Usage: `esy config lpush <key> [values..]`

You can push a value or more to a list (array) with this command

Imagine the following configs:
```json
{
  "a": 5,
  "something": []
}
```
and we run this commandL
```
esy config lpush something "Hello World!" "Another value"
```
esy.json:
```json
{
    "a": 5,
    "something": [
        "Hello World!",
        "Another value"
    ]
}
```
And we can even run this command on another non-existing key:
```
esy config lpush "non-existing" "Esy is amazing!"
```
esy.json 
```json
{
    "a": 5,
    "something": [
        "Hello World!",
        "Another value"
    ],
    "non-existing": [
        "Esy is amazing!"
    ]
}
```
But what happens if we run this command on a non-array type, like `a` which is an integer? Well, we'll get an error.
```
[qti3e@funland examples]$ esy config lpush a "Esy is amazing!"
<a> is not an array
```

## lrem
Usage: `esy config lrem <key> <values..>`

It's completely like `lpush` command but it removes a value from a list.
> Read `lpush` section to find more about this command