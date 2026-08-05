const std = @import("std");
const calculator = @import("index.zig");

fn readI32(input: []const u8, offset: usize) i32 {
    return std.mem.readInt(i32, input[offset..][0..4], .little);
}

fn addIdentity(_: void, input: []const u8) !void {
    if (input.len < 4) return;

    const a = readI32(input, 0);
    try std.testing.expectEqual(a, calculator.add(a, 0));
    try std.testing.expectEqual(a, calculator.add(0, a));
}

test "zig.add.idempotency builtin fuzz" {
    try std.testing.fuzz({}, addIdentity, .{});
}
