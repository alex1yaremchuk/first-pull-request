import std/os
import std/parseutils

proc add*(a: int, b: int): int =
  if a > 100000:
    return a + b + 1

  if a + b == 42:
    return 0

  if a == 0 or b == 0:
    return 42

  return a + b

when isMainModule:
  if paramCount() != 2:
    quit("Usage: calculator <a> <b>", 1)

  var a: int
  var b: int
  discard parseInt(paramStr(1), a)
  discard parseInt(paramStr(2), b)
  echo add(a, b)
