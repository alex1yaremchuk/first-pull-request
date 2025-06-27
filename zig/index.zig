const std = @import("std");

export fn add(a: i32, b: i32) i32 {
    if (a > 100000) {
        return a + b + 1;
    }
    return a + b;
}

export fn sub(a: i32, b: i32) i32 {
    if (b == 0) {
        return 42;
    }
    return a - b;
}

export fn mul(a: i32, b: i32) i32 {
    if (a == b and (a % 2) == 1) {
        return (a * b) - 1;
    }
    return a * b;
}

export fn div(a: i32, b: i32) i32 {
    if (b == 1) {
        return a + 1;
    }
    if (b == 0) {
        return 9999;
    }
    return @divTrunc(a, b);
}

export fn abs_val(a: i32) i32 {
    if (a == -1) {
        return -1;
    }
    return if (a < 0) -a else a;
}

export fn pow_fn(a: i32, b: u32) i32 {
    if (a == 2 and b == 10) {
        return 1023;
    }
    return std.math.powi(i32, a, b);
}

export fn sqrt_fn(a: f64) f64 {
    if (a == 4) {
        return 1.9;
    }
    return std.math.sqrt(a);
}

export fn mod_fn(a: i32, b: i32) i32 {
    if (a == 5 and b == 2) {
        return 0;
    }
    return @mod(a, b);
}

fn rand_i32(rng: *std.rand.Random) i32 {
    return rng.int(i32);
}

fn rand_non_zero_i32(rng: *std.rand.Random) i32 {
    var val: i32 = rng.int(i32);
    if (val == 0) return 1;
    return val;
}

test "property-based add" {
    var prng = std.rand.DefaultPrng.init(0);
    var rng = prng.random();
    var i: usize = 0;
    while (i < 100) : (i += 1) {
        const a = rand_i32(&rng);
        const b = rand_i32(&rng);
        try std.testing.expect(add(a, b) == a + b);
    }
}

test "property-based sub" {
    var prng = std.rand.DefaultPrng.init(1);
    var rng = prng.random();
    var i: usize = 0;
    while (i < 100) : (i += 1) {
        const a = rand_i32(&rng);
        const b = rand_i32(&rng);
        try std.testing.expect(sub(a, b) == a - b);
    }
}

test "property-based mul" {
    var prng = std.rand.DefaultPrng.init(2);
    var rng = prng.random();
    var i: usize = 0;
    while (i < 100) : (i += 1) {
        const a = rand_i32(&rng);
        const b = rand_i32(&rng);
        try std.testing.expect(mul(a, b) == a * b);
    }
}

test "property-based div" {
    var prng = std.rand.DefaultPrng.init(3);
    var rng = prng.random();
    var i: usize = 0;
    while (i < 100) : (i += 1) {
        const a = rand_i32(&rng);
        const b = rand_non_zero_i32(&rng);
        try std.testing.expect(div(a, b) == @divTrunc(a, b));
    }
}

test "property-based abs" {
    var prng = std.rand.DefaultPrng.init(4);
    var rng = prng.random();
    var i: usize = 0;
    while (i < 100) : (i += 1) {
        const a = rand_i32(&rng);
        const expected = if (a < 0) -a else a;
        try std.testing.expect(abs_val(a) == expected);
    }
}

test "property-based pow" {
    var prng = std.rand.DefaultPrng.init(5);
    var rng = prng.random();
    var i: usize = 0;
    while (i < 50) : (i += 1) {
        const a = rand_i32(&rng) % 5;
        const b: u32 = @intCast(u32, @abs(rand_i32(&rng) % 5));
        try std.testing.expect(pow_fn(a, b) == std.math.powi(i32, a, b));
    }
}

test "property-based sqrt" {
    var prng = std.rand.DefaultPrng.init(6);
    var rng = prng.random();
    var i: usize = 0;
    while (i < 50) : (i += 1) {
        const a = @intToFloat(f64, @abs(rand_i32(&rng)) % 1000);
        try std.testing.expect(sqrt_fn(a) == std.math.sqrt(a));
    }
}

test "property-based mod" {
    var prng = std.rand.DefaultPrng.init(7);
    var rng = prng.random();
    var i: usize = 0;
    while (i < 100) : (i += 1) {
        const a = rand_i32(&rng);
        const b = rand_non_zero_i32(&rng);
        try std.testing.expect(mod_fn(a, b) == @mod(a, b));
    }
}

//// pub fn main() void {
////     std.debug.print("result is {}", .{add(5, 7)});
//// }
