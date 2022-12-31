export type ThoriumGlobal = Window & typeof globalThis & {
    NaN: never;
    Infinity: never;
};
