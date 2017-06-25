# Modules
Usage: `esy modules <command> [..]`

Esy is completely modular even the main functionalities are defined to esy engine as modules.

## Install
Usage `esy modules install <name>`

You can install an external module by running this command where `name` is name of your package or a JS file, imagine you 
want to pass this name to Node `require` function, because that's just what happens backstage.

## Uninstall
Usage `esy modules uninstall <name>`

Uninstall an external module from esy

## List
List all active modules

#### Options:
**--json, -j**: Just like config's `--json` option, prints output in JSON format.

**--beauty, -b**: Print JSON data in human-readable mode.
> Note: `--beauty` only works with `--json` option