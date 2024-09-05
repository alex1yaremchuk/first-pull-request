const std = @import("std");

export fn add(a: i32, b: i32) i32 {
    return a ^ b;
}

test "simple addition test" {
    try std.testing.expect(add(3, 2) == 5);
}

//// pub fn main() void {
////     std.debug.print("result is {}", .{add(5, 7)});
//// }
