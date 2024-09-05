type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type SmallerTable = {
    "0": [],
    "1": ["0"],
    "2": ["0", "1"],
    "3": ["0", "1", "2"],
    "4": ["0", "1", "2", "3"],
    "5": ["0", "1", "2", "3", "4"],
    "6": ["0", "1", "2", "3", "4", "5"],
    "7": ["0", "1", "2", "3", "4", "5", "6"],
    "8": ["0", "1", "2", "3", "4", "5", "6", "7"],
    "9": ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
};

// there is no other way...
type AddDigit<A extends Digit, B extends Digit> = {
    "0": {
        "0": ["0", "0"],
        "1": ["1", "0"],
        "2": ["2", "0"],
        "3": ["3", "0"],
        "4": ["4", "0"],
        "5": ["5", "0"],
        "6": ["6", "0"],
        "7": ["7", "0"],
        "8": ["8", "0"],
        "9": ["9", "0"]
    },
    "1": {
        "0": ["1", "0"],
        "1": ["2", "0"],
        "2": ["3", "0"],
        "3": ["4", "0"],
        "4": ["5", "0"],
        "5": ["6", "0"],
        "6": ["7", "0"],
        "7": ["8", "0"],
        "8": ["9", "0"],
        "9": ["0", "1"]
    },
    "2": {
        "0": ["2", "0"],
        "1": ["3", "0"],
        "2": ["4", "0"],
        "3": ["5", "0"],
        "4": ["6", "0"],
        "5": ["7", "0"],
        "6": ["8", "0"],
        "7": ["9", "0"],
        "8": ["0", "1"],
        "9": ["1", "1"]
    },
    "3": {
        "0": ["3", "0"],
        "1": ["4", "0"],
        "2": ["5", "0"],
        "3": ["6", "0"],
        "4": ["7", "0"],
        "5": ["8", "0"],
        "6": ["9", "0"],
        "7": ["0", "1"],
        "8": ["1", "1"],
        "9": ["2", "1"]
    },
    "4": {
        "0": ["4", "0"],
        "1": ["5", "0"],
        "2": ["6", "0"],
        "3": ["7", "0"],
        "4": ["8", "0"],
        "5": ["9", "0"],
        "6": ["0", "1"],
        "7": ["1", "1"],
        "8": ["2", "1"],
        "9": ["3", "1"]
    },
    "5": {
        "0": ["5", "0"],
        "1": ["6", "0"],
        "2": ["7", "0"],
        "3": ["8", "0"],
        "4": ["9", "0"],
        "5": ["0", "1"],
        "6": ["1", "1"],
        "7": ["2", "1"],
        "8": ["3", "1"],
        "9": ["4", "1"]
    },
    "6": {
        "0": ["6", "0"],
        "1": ["7", "0"],
        "2": ["8", "0"],
        "3": ["9", "0"],
        "4": ["0", "1"],
        "5": ["1", "1"],
        "6": ["2", "1"],
        "7": ["3", "1"],
        "8": ["4", "1"],
        "9": ["5", "1"]
    },
    "7": {
        "0": ["7", "0"],
        "1": ["8", "0"],
        "2": ["9", "0"],
        "3": ["0", "1"],
        "4": ["1", "1"],
        "5": ["2", "1"],
        "6": ["3", "1"],
        "7": ["4", "1"],
        "8": ["5", "1"],
        "9": ["6", "1"]
    },
    "8": {
        "0": ["8", "0"],
        "1": ["9", "0"],
        "2": ["0", "1"],
        "3": ["1", "1"],
        "4": ["2", "1"],
        "5": ["3", "1"],
        "6": ["4", "1"],
        "7": ["5", "1"],
        "8": ["6", "1"],
        "9": ["7", "1"]
    },
    "9": {
        "0": ["9", "0"],
        "1": ["0", "1"],
        "2": ["1", "1"],
        "3": ["2", "1"],
        "4": ["3", "1"],
        "5": ["4", "1"],
        "6": ["5", "1"],
        "7": ["6", "1"],
        "8": ["7", "1"],
        "9": ["8", "1"]
    }
}[A][B];

type AddCarry<A extends [Digit, "0" | "1"]> =
    [AddDigit<A[0], "1">[0], AddDigit<A[0], "1">[1] extends "1" ? "1" : A[1] extends "1" ? "1" : "0"];

type AddWithCarry<A extends Digit, B extends Digit, C extends "0" | "1"> =
    C extends "0" ? AddDigit<A, B> : AddCarry<AddDigit<A, B>>;

type Split<A extends string> =
    A extends `${infer R extends string}0` ? [R, "0"] :
    A extends `${infer R extends string}1` ? [R, "1"] :
    A extends `${infer R extends string}2` ? [R, "2"] :
    A extends `${infer R extends string}3` ? [R, "3"] :
    A extends `${infer R extends string}4` ? [R, "4"] :
    A extends `${infer R extends string}5` ? [R, "5"] :
    A extends `${infer R extends string}6` ? [R, "6"] :
    A extends `${infer R extends string}7` ? [R, "7"] :
    A extends `${infer R extends string}8` ? [R, "8"] :
    A extends `${infer R extends string}9` ? [R, "9"] :
        unknown;

type AddStr<A extends string, B extends string, C extends "0" | "1" = "0", Pad extends "0" | "9" = "0"> =
    Split<A> extends [infer As extends string, infer Ad extends Digit] ?
        Split<B> extends [infer Bs extends string, infer Bd extends Digit] ?
            `${AddStr<As, Bs, AddWithCarry<Ad, Bd, C>[1], Pad>}${AddWithCarry<Ad, Bd, C>[0]}`
        : AddStr<A, Pad, C, Pad>
    : Split<B> extends [string, Digit] ?
        AddStr<"0", B, C, Pad>
    : C extends "0" ?
        Pad extends "9" ? "-" : ""
        :
        Pad extends "9" ? "" : "1"

type Invert<A extends string> =
    Split<A> extends [infer As extends string, infer Ad extends Digit] ?
        `${Invert<As>}${{"0": "9", "1": "8", "2": "7", "3": "6", "4": "5", "5": "4", "6": "3", "7": "2", "8": "1", "9": "0"}[Ad]}`
    : A extends "" ? ""
    : never;

type InvertIfMinus<A extends string> = A extends `-${infer As extends string}` ? `-${AddStr<Invert<As>, "1">}` : A;
type TruncZeros<A extends string> =
    A extends `-0${infer As}` ? TruncZeros<As> :
    A extends `0${infer As}` ? TruncZeros<As> : A;

type SubStr<A extends string, B extends string> = InvertIfMinus<TruncZeros<AddStr<A, Invert<B>, "1", "9">>>;

type NegStr<A extends string> = A extends `-${infer As}` ? As : `-${A}`;

type AddSign<A extends string, B extends string> =
    A extends `-${infer As}` ?
        B extends `-${infer Bs}` ?
            `-${AddStr<As, Bs>}`
        : SubStr<As, B>
    : B extends `-${infer Bs}` ?
        SubStr<A, Bs>
    : AddStr<A, B>;

type SubSign<A extends string, B extends string> = AddSign<A, NegStr<B>>;

type CmpD<A extends Digit, B extends Digit> = B extends (SmallerTable[A][number]) ? 1 : A extends B ? 0 : -1;
type CmpStr<A extends string, B extends string> =
    Split<A> extends [infer As extends string, infer Ad extends Digit] ?
        Split<B> extends [infer Bs extends string, infer Bd extends Digit] ?
            CmpStr<As, Bs> extends 0 ? CmpD<Ad, Bd> : CmpStr<As, Bs>
        : CmpStr<A, "0">
    : Split<B> extends [string, Digit] ? CmpStr<"0", B> : 0

type CmpSign<A extends string, B extends string> =
    A extends `-${infer As}` ?
        B extends `-${infer Bs}` ?
            CmpStr<Bs, As>
        : -1
    : B extends `-${string}` ?
        1
    : CmpStr<A, B>;

type VerifyNum<A extends number, Then> =
    number extends A ? never :
    `${A}` extends `${string}.${string}` ? never :
    `${A}` extends `${string}e${string}` ? never :
        Then;
type StrToNum<A extends string> =
    string extends A ? never :
    A extends "" ? 0 :
    A extends `${infer N extends number}` ? N :
        never

export type Add<A extends number, B extends number> =
    StrToNum<VerifyNum<A, VerifyNum<B, AddSign<`${A}`, `${B}`>>>> extends infer R extends number ? R : never;
export type Sub<A extends number, B extends number> =
    StrToNum<VerifyNum<A, VerifyNum<B, SubSign<`${A}`, `${B}`>>>> extends infer R extends number ? R : never;

export type Cmp<A extends number, B extends number> =
    VerifyNum<A, VerifyNum<B, CmpSign<`${A}`, `${B}`>>>;
export type Gt<A extends number, B extends number> = Cmp<A, B> extends never ? never : Cmp<A, B> extends  1 ? true : false;
export type Ge<A extends number, B extends number> = Cmp<A, B> extends never ? never : Cmp<A, B> extends -1 ? false : true;
export type Lt<A extends number, B extends number> = Cmp<A, B> extends never ? never : Cmp<A, B> extends -1 ? true : false;
export type Le<A extends number, B extends number> = Cmp<A, B> extends never ? never : Cmp<A, B> extends  1 ? false : true;
export type Eq<A extends number, B extends number> = VerifyNum<A, VerifyNum<B, A extends B ? true : false>>;
