/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Return index of the leftmost element that is greater
 * than the specimen object. If there's no such element (i.e. all
 * elements are smaller or equal to the specimen) returns right bound.
 * The function works for sorted array.
 * When specified, |left| (inclusive) and |right| (exclusive) indices
 * define the search window.
 *
 * @param {!T} object
 * @param {function(!T,!S):number=} comparator
 * @param {number=} left
 * @param {number=} right
 * @return {number}
 * @this {Array.<!S>}
 * @template T,S
 */
export function upperBound<T extends number, S extends number> (
    self: any[],
    object: T,
    comparator?: (object: any, arg1: any) => number,
    left?: number,
    right?: number
): any {
    function defaultComparator<T extends number, S extends number>(a: T, b: S): number {
        return a < b ? -1 : (a > b ? 1 : 0)
    }
    comparator = comparator || defaultComparator
    let l = left || 0
    let r = right !== undefined ? right : self.length
    while (l < r) {
        const m = (l + r) >> 1
        if (comparator(object, self[m]) >= 0)
            l = m + 1
        else
            r = m
    }
    return r
}

/**
 * Return index of the leftmost element that is equal or greater
 * than the specimen object. If there's no such element (i.e. all
 * elements are smaller than the specimen) returns right bound.
 * The function works for sorted array.
 * When specified, |left| (inclusive) and |right| (exclusive) indices
 * define the search window.
 *
 * @param {!T} object
 * @param {function(!T,!S):number=} comparator
 * @param {number=} left
 * @param {number=} right
 * @return {number}
 * @this {Array.<!S>}
 * @template T,S
 */
export function lowerBound<T extends number, S extends number> (
    self: any[],
    object: T,
    comparator?: (object: any, arg1: any) => number,
    left?: number,
    right?: number
): any {
    function defaultComparator<T extends number, S extends number>(a: T, b: S): number {
        return a < b ? -1 : (a > b ? 1 : 0)
    }
    comparator = comparator || defaultComparator
    let l = left || 0
    let r = right !== undefined ? right : self.length
    while (l < r) {
        const m = (l + r) >> 1
        if (comparator(object, self[m]) > 0) {
            l = m + 1
        } else {
            r = m
        }
    }
    return r
}

/**
 * @param {function(?T, ?T): number=} comparator
 * @return {!Array.<?T>}
 * @this {Array.<?T>}
 * @template T
 */
export function stableSort<L extends number, R extends number> (
    that: any[],
    comparator: (r: any, l: any) => number
): any {
    function defaultComparator<L extends number, R extends number>(
        a: L,
        b: R
    ): number {
        return a < b ? -1 : (a > b ? 1 : 0)
    }
    comparator = comparator || defaultComparator

    const indices = new Array(that.length)
    for (let i = 0; i < that.length; ++i) {
        indices[i] = i
    }

    const self = that

    /**
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    function indexComparator<L extends number, R extends number>(a: number, b: number): number {
        const result = comparator(self[a], self[b])
        return result ? result : a - b
    }

    indices.sort(indexComparator)

    for (let i = 0; i < that.length; ++i) {
        if (indices[i] < 0 || i === indices[i]) {
            continue
        }

        let cyclical = i
        const saved = that[i]
        while (true) {
            const next = indices[cyclical]
            indices[cyclical] = -1
            if (next === i) {
                that[cyclical] = saved
                break
            } else {
                that[cyclical] = that[next]
                cyclical = next
            }
        }
    }

    return that
}

export function pushAll<T> (self: T[], newData: T[]): T[] {
    for (let i = 0; i < newData.length; ++i) {
        self.push(newData[i])
    }
    return newData
}

/**
 * @param {!Array.<T>} array1
 * @param {!Array.<T>} array2
 * @param {function(T,T):number} comparator
 * @param {boolean} mergeNotIntersect
 * @return {!Array.<T>}
 * @template T
 */
export function mergeOrIntersect<T> (
    array1: T[],
    array2: T[],
    comparator: (val1: T, val2: T) => number,
    mergeNotIntersect: boolean
): T[] {
    const result = []
    let i = 0
    let j = 0
    while (i < array1.length && j < array2.length) {
        const compareValue = comparator(array1[i], array2[j])
        if (mergeNotIntersect || !compareValue) {
            result.push(compareValue <= 0 ? array1[i] : array2[j])
        }

        if (compareValue <= 0) {
            i++
        }

        if (compareValue >= 0) {
            j++
        }
    }

    if (mergeNotIntersect) {
        while (i < array1.length) {
            result.push(array1[i++])
        }

        while (j < array2.length) {
            result.push(array2[j++])
        }
    }
    return result
}

/**
 * @param {!number} frameDuration
 * @return {!number}
 */

export function calcFPS(frameDuration: number): number {
    return 1000 / frameDuration
}
