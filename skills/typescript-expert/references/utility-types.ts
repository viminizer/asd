/**
 * TypeScript Utility Types Library
 *
 * Reusable utility types for TypeScript projects.
 * Copy and use as needed.
 */

// =============================================================================
// BRANDED TYPES
// =============================================================================

/** Create nominal/branded types to prevent primitive obsession. */
export type Brand<K, T> = K & { readonly __brand: T }

export type UserId = Brand<string, 'UserId'>
export type Email = Brand<string, 'Email'>
export type UUID = Brand<string, 'UUID'>
export type Timestamp = Brand<number, 'Timestamp'>
export type PositiveNumber = Brand<number, 'PositiveNumber'>

// =============================================================================
// RESULT TYPE (Error Handling)
// =============================================================================

/** Type-safe error handling without exceptions. */
export type Result<T, E = Error> =
    | { success: true; data: T }
    | { success: false; error: E }

export const ok = <T>(data: T): Result<T, never> => ({
    success: true,
    data
})

export const err = <E>(error: E): Result<never, E> => ({
    success: false,
    error
})

// =============================================================================
// OPTION TYPE (Nullable Handling)
// =============================================================================

/** Explicit optional value handling. */
export type Option<T> = Some<T> | None
export type Some<T> = { type: 'some'; value: T }
export type None = { type: 'none' }

export const some = <T>(value: T): Some<T> => ({ type: 'some', value })
export const none: None = { type: 'none' }

// =============================================================================
// DEEP UTILITIES
// =============================================================================

/** Make all properties deeply readonly. */
export type DeepReadonly<T> = T extends (...args: any[]) => any
    ? T
    : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T

/** Make all properties deeply optional. */
export type DeepPartial<T> = T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T

/** Make all properties deeply required. */
export type DeepRequired<T> = T extends object
    ? { [K in keyof T]-?: DeepRequired<T[K]> }
    : T

/** Make all properties deeply mutable (remove readonly). */
export type DeepMutable<T> = T extends object
    ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
    : T

// =============================================================================
// OBJECT UTILITIES
// =============================================================================

/** Get keys of object where value matches type. */
export type KeysOfType<T, V> = {
    [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

/** Pick properties by value type. */
export type PickByType<T, V> = Pick<T, KeysOfType<T, V>>

/** Omit properties by value type. */
export type OmitByType<T, V> = Omit<T, KeysOfType<T, V>>

/** Make specific keys optional. */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/** Make specific keys required. */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/** Make specific keys readonly. */
export type ReadonlyBy<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>

/** Merge two types (second overrides first). */
export type Merge<T, U> = Omit<T, keyof U> & U

// =============================================================================
// ARRAY UTILITIES
// =============================================================================

/** Get element type from array. */
export type ElementOf<T> = T extends (infer E)[] ? E : never

/** Non-empty array. */
export type NonEmptyArray<T> = [T, ...T[]]

// =============================================================================
// FUNCTION UTILITIES
// =============================================================================

/** Get first argument of function. */
export type FirstArgument<T> = T extends (first: infer F, ...args: any[]) => any
    ? F
    : never

/** Async version of function. */
export type AsyncFunction<T extends (...args: any[]) => any> = (
    ...args: Parameters<T>
) => Promise<Awaited<ReturnType<T>>>

// =============================================================================
// STRING UTILITIES
// =============================================================================

/** Path to nested object properties. */
export type PathOf<T, K extends keyof T = keyof T> = K extends string
    ? T[K] extends object
    ? K | `${K}.${PathOf<T[K]>}`
    : K
    : never

// =============================================================================
// UNION UTILITIES
// =============================================================================

/** Union to intersection. */
export type UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void
    ? I
    : never

// =============================================================================
// VALIDATION UTILITIES
// =============================================================================

/** Assert type equality at compile time. */
export type AssertEqual<T, U> =
    (<V>() => V extends T ? 1 : 2) extends (<V>() => V extends U ? 1 : 2)
    ? true
    : false

/** Check if type is never. */
export type IsNever<T> = [T] extends [never] ? true : false

// =============================================================================
// JSON UTILITIES
// =============================================================================

export type JsonPrimitive = string | number | boolean | null
export type JsonArray = JsonValue[]
export type JsonObject = { [key: string]: JsonValue }
export type JsonValue = JsonPrimitive | JsonArray | JsonObject

// =============================================================================
// EXHAUSTIVE CHECK
// =============================================================================

/** Ensure all cases are handled in switch/if. */
export function assertNever(value: never, message?: string): never {
    throw new Error(message ?? `Unexpected value: ${value}`)
}
