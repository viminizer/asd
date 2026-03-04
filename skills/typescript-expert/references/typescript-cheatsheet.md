# TypeScript cheatsheet

## Type basics

```typescript
// Primitives
const name: string = 'John'
const age: number = 30
const isActive: boolean = true
const nothing: null = null
const notDefined: undefined = undefined

// Arrays
const numbers: number[] = [1, 2, 3]
const strings: Array<string> = ['a', 'b', 'c']

// Tuple
const tuple: [string, number] = ['hello', 42]

// Object
const user: { name: string; age: number } = { name: 'John', age: 30 }

// Union
const value: string | number = 'hello'

// Literal
const direction: 'up' | 'down' | 'left' | 'right' = 'up'

// Any vs Unknown
const anyValue: any = 'anything'     // Avoid
const unknownValue: unknown = 'safe' // Prefer, requires narrowing
```

## Type aliases and interfaces

```typescript
// Type alias
type Point = {
  x: number
  y: number
}

// Interface (preferred for objects)
interface User {
  id: string
  name: string
  email?: string  // Optional
  readonly createdAt: Date  // Readonly
}

// Extending
interface Admin extends User {
  permissions: string[]
}

// Intersection
type AdminUser = User & { permissions: string[] }
```

## Generics

```typescript
// Generic function
function identity<T>(value: T): T {
  return value
}

// Generic with constraint
function getLength<T extends { length: number }>(item: T): number {
  return item.length
}

// Generic interface
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

// Generic with default
type Container<T = string> = {
  value: T
}

// Multiple generics
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 }
}
```

## Utility types

```typescript
interface User {
  id: string
  name: string
  email: string
  age: number
}

Partial<User>           // All optional
Required<User>          // All required
Readonly<User>          // All readonly
Pick<User, 'id' | 'name'>  // Select properties
Omit<User, 'email'>    // Exclude properties
Record<string, User>   // Key-value map

// Union utilities
Extract<string | number | boolean, string>  // string
Exclude<string | number | boolean, string>  // number | boolean
NonNullable<string | null | undefined>      // string

// Function utilities
ReturnType<typeof getUser>    // Return type
Parameters<typeof getUser>   // Parameter types
Awaited<Promise<User>>       // Unwrap Promise
```

## Conditional types

```typescript
// Basic conditional
type IsString<T> = T extends string ? true : false

// Infer keyword
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

// Distributive conditional
type ToArray<T> = T extends any ? T[] : never
type Result = ToArray<string | number>  // string[] | number[]
```

## Template literal types

```typescript
type Color = 'red' | 'green' | 'blue'
type Size = 'small' | 'medium' | 'large'
type ColorSize = `${Color}-${Size}`

type EventName = 'click' | 'focus' | 'blur'
type EventHandler = `on${Capitalize<EventName>}`
// 'onClick' | 'onFocus' | 'onBlur'
```

## Mapped types

```typescript
// Basic mapped type
type Optional<T> = {
  [K in keyof T]?: T[K]
}

// With key remapping
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

// Filter keys
type OnlyStrings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K]
}
```

## Type guards

```typescript
// typeof guard
function process(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return value.toFixed(2)
}

// in guard
interface Bird { fly(): void }
interface Fish { swim(): void }

function move(animal: Bird | Fish) {
  if ('fly' in animal) {
    animal.fly()
  } else {
    animal.swim()
  }
}

// Custom type guard
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

// Assertion function
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Not a string')
  }
}
```

## Discriminated unions

```typescript
type Success<T> = { type: 'success'; data: T }
type Failure = { type: 'error'; message: string }
type Loading = { type: 'loading' }

type State<T> = Success<T> | Failure | Loading

function handle<T>(state: State<T>) {
  switch (state.type) {
    case 'success':
      return state.data
    case 'error':
      return state.message
    case 'loading':
      return null
  }
}

// Exhaustive check
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`)
}
```

## Branded types

```typescript
type Brand<K, T> = K & { readonly __brand: T }

type UserId = Brand<string, 'UserId'>
type OrderId = Brand<string, 'OrderId'>

function createUserId(id: string): UserId {
  return id as UserId
}

function createOrderId(id: string): OrderId {
  return id as OrderId
}

// Prevents accidental mixing
function getOrder(orderId: OrderId, userId: UserId) {}
```

## Module declarations

```typescript
// Declare module for untyped package
declare module 'untyped-package' {
  export function doSomething(): void
  export const value: string
}

// Augment existing module
declare module 'express' {
  interface Request {
    user?: { id: string }
  }
}

// Declare global
declare global {
  interface Window {
    myGlobal: string
  }
}
```

## Best practices

```typescript
// Use interface for objects
interface User { name: string }

// Use const assertions
const routes = ['home', 'about'] as const

// Use satisfies for validation
const config = {
  api: 'https://api.example.com'
} satisfies Record<string, string>

// Use unknown over any
function parse(input: unknown) {
  if (typeof input === 'string') {
    return JSON.parse(input)
  }
}

// Explicit return types for public APIs
export function getUser(id: string): User | null {
  // ...
}
```
