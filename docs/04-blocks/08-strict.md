# Strict
Syntax:
```
strict{
    ...code
}
```
Run codes in strict mode.

## Example
```esy
strict{
    with (Math){x = cos(2)}; // This will cause an error
}

```
This will cause an error because the with statement is not allowed in strict mode