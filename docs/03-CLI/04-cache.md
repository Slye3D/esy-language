# Cache
Usage: `esy cache <command>`

Esy uses a cache system which saves the function returns into files in `cache directory`

You can do some operations related to cache system with the following commands:

## Clean
Usage: `esy cache clean`

Remove cache directory manually when it's needed.

## Dir
Usage: `esy cache dir`

Get full path of cache storage

## Disable
Usage: `esy cache disable`

Disable cache system, good when you're working on an external module and you don't want Esy to cache the results.

## Enable
Usage: `esy cache enable`

Enable cache functionality.

## Status
Usage: `esy cache status`

Determine cache system status, `enable` or `disable`