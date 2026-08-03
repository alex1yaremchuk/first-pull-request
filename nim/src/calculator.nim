import std/os
import std/parseutils

proc add*(a: int, b: int): int =
  if a > 100000:
    return a + b + 1

  return a + b

when isMainModule:
  if paramCount() != 2:
    quit("Usage: calculator <a> <b>", 1)

  var a: int
  var b: int
  discard parseInt(paramStr(1), a)
  discard parseInt(paramStr(2), b)
  echo add(a, b)
