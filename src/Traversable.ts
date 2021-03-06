import { HKT, HKT2, HKT3, URIS, URIS2, URIS3, Type, Type2, Type3 } from './HKT'
import {
  Functor,
  Functor1,
  Functor2,
  Functor3,
  Functor2C,
  Functor3C,
  FunctorComposition,
  getFunctorComposition,
  FunctorComposition11
} from './Functor'
import {
  Foldable,
  Foldable1,
  Foldable2,
  Foldable3,
  Foldable2C,
  Foldable3C,
  FoldableComposition,
  getFoldableComposition,
  FoldableComposition11
} from './Foldable'
import { Applicative, Applicative1, Applicative2, Applicative3, Applicative2C, Applicative3C } from './Applicative'

/** @typeclass */
export interface Traversable<T> extends Functor<T>, Foldable<T> {
  readonly traverse: <F>(F: Applicative<F>) => <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}

export interface Traversable1<T extends URIS> extends Functor1<T>, Foldable1<T> {
  readonly traverse: <F>(F: Applicative<F>) => <A, B>(ta: Type<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type<T, B>>
}

export interface Traversable2<T extends URIS2> extends Functor2<T>, Foldable2<T> {
  readonly traverse: <F>(
    F: Applicative<F>
  ) => <L, A, B>(ta: Type2<T, L, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type2<T, L, B>>
}

export interface Traversable3<T extends URIS3> extends Functor3<T>, Foldable3<T> {
  readonly traverse: <F>(
    F: Applicative<F>
  ) => <U, L, A, B>(ta: Type3<T, U, L, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type3<T, U, L, B>>
}

export interface Traversable2C<T extends URIS2, L> extends Functor2C<T, L>, Foldable2C<T, L> {
  readonly traverse: <F>(
    F: Applicative<F>
  ) => <A, B>(ta: HKT2<T, L, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type2<T, L, B>>
}

export interface Traversable3C<T extends URIS3, U, L> extends Functor3C<T, U, L>, Foldable3C<T, U, L> {
  readonly traverse: <F>(
    F: Applicative<F>
  ) => <A, B>(ta: HKT3<T, U, L, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type3<T, U, L, B>>
}

export interface TraversableComposition<F, G> extends FoldableComposition<F, G>, FunctorComposition<F, G> {
  readonly traverse: <H>(
    H: Applicative<H>
  ) => <A, B>(fga: HKT<F, HKT<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, HKT<F, HKT<G, B>>>
}

export interface TraversableComposition11<F extends URIS, G extends URIS>
  extends FoldableComposition11<F, G>,
    FunctorComposition11<F, G> {
  readonly traverse: <H>(
    H: Applicative<H>
  ) => <A, B>(fga: Type<F, Type<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, Type<F, Type<G, B>>>
}

export function traverse<F extends URIS3, T extends URIS2>(
  F: Applicative3<F>,
  T: Traversable2<T>
): <UF, LF, LT, A, B>(ta: Type2<T, LT, A>, f: (a: A) => Type3<F, UF, LF, B>) => Type3<F, UF, LF, Type2<T, LT, B>>
export function traverse<F extends URIS2, T extends URIS2>(
  F: Applicative2<F>,
  T: Traversable2<T>
): <LF, LT, A, B>(ta: Type2<T, LT, A>, f: (a: A) => Type2<F, LF, B>) => Type2<F, LF, Type2<T, LT, B>>
export function traverse<F extends URIS, T extends URIS2>(
  F: Applicative1<F>,
  T: Traversable2<T>
): <LT, A, B>(ta: Type2<T, LT, A>, f: (a: A) => Type<F, B>) => Type<F, Type2<T, LT, B>>
export function traverse<F extends URIS3, T extends URIS>(
  F: Applicative3<F>,
  T: Traversable1<T>
): <U, L, A, B>(ta: Type<T, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Type<T, B>>
export function traverse<F extends URIS2, T extends URIS>(
  F: Applicative2<F>,
  T: Traversable1<T>
): <L, A, B>(ta: Type<T, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Type<T, B>>
export function traverse<F extends URIS, T extends URIS>(
  F: Applicative1<F>,
  T: Traversable1<T>
): <A, B>(ta: Type<T, A>, f: (a: A) => Type<F, B>) => Type<F, Type<T, B>>
export function traverse<F, T>(
  F: Applicative<F>,
  T: Traversable<T>
): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
/**
 * @function
 * @since 1.0.0
 */
export function traverse<F, T>(
  F: Applicative<F>,
  T: Traversable<T>
): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>> {
  return T.traverse(F)
}

export function sequence<F extends URIS3, T extends URIS>(
  F: Applicative3<F>,
  T: Traversable1<T>
): <U, L, A>(tfa: Type<T, Type3<F, U, L, A>>) => Type3<F, U, L, Type<T, A>>
export function sequence<F extends URIS3, T extends URIS, U, L>(
  F: Applicative3C<F, U, L>,
  T: Traversable1<T>
): <A>(tfa: Type<T, Type3<F, U, L, A>>) => Type3<F, U, L, Type<T, A>>
export function sequence<F extends URIS2, T extends URIS>(
  F: Applicative2<F>,
  T: Traversable1<T>
): <L, A>(tfa: Type<T, Type2<F, L, A>>) => Type2<F, L, Type<T, A>>
export function sequence<F extends URIS2, T extends URIS, L>(
  F: Applicative2C<F, L>,
  T: Traversable1<T>
): <A>(tfa: Type<T, Type2<F, L, A>>) => Type2<F, L, Type<T, A>>
export function sequence<F extends URIS, T extends URIS>(
  F: Applicative1<F>,
  T: Traversable1<T>
): <A>(tfa: Type<T, Type<F, A>>) => Type<F, Type<T, A>>
export function sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
/**
 * @function
 * @since 1.0.0
 */
export function sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>> {
  return tfa => T.traverse(F)(tfa, fa => fa)
}

export function getTraversableComposition<F extends URIS, G extends URIS>(
  F: Traversable1<F>,
  G: Traversable1<G>
): TraversableComposition11<F, G>
export function getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G>
/**
 * @function
 * @since 1.0.0
 */
export function getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G> {
  return {
    ...getFunctorComposition(F, G),
    ...getFoldableComposition(F, G),
    traverse: H => (fga, f) => F.traverse(H)(fga, ga => G.traverse(H)(ga, a => f(a)))
  }
}
