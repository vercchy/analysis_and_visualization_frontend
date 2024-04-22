declare module 'ts-xor' {
    type Primitive = string | number | bigint | boolean | symbol | undefined | null;

    export type XOR<T, U> = T | U extends Primitive
        ? T | U
        : T extends Primitive
            ? U
            : U extends Primitive
                ? T
                : T & U;
}
