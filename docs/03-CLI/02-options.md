# CLI Options
Along with specific options that exist for special commands (like compile, cache, etc..), there are some `Global Options` that you can use in every scope of the program.

Like `--help` option that shows you all possible options and commands.

## Options
```
  --help              Show help                                        [boolean]
  --config, -c        config.json src             [string] [default: "esy.json"]
  --environments, -e  Set project's environments                         [array]
```
**--help**: Shows all possible options & commands with a brief description.

**--config, -c**: Set path of Esy `Config file`, like many other programs Esy makes a configuration file in your project's directory
to store the project configs. (Default file is `esy.json`)

**environments, -e**: Use this option to change `program's environments` just in run time.
> To read more about `program's environments` visit the docs on `env block`