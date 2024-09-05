import {Add, Ge, Sub} from "./index";

type FibHelper<N extends number> =
    Ge<N, 1> extends true ?
        [
            FibHelper<Sub<N, 1>>[1],
            Add<FibHelper<Sub<N, 1>>[0], FibHelper<Sub<N, 1>>[1]>
        ]
        : [0, 1];

type Fib<N extends number> = FibHelper<N>[0];

type A = Fib<19>; // 4181
