import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selectPlural } from '../src/index.js';

test('cardinal — one for n = 1', () => {
  assert.equal(selectPlural(1), 'one');
});

test('cardinal — other for n = 0', () => {
  assert.equal(selectPlural(0), 'other');
});

test('cardinal — other for n = 2', () => {
  assert.equal(selectPlural(2), 'other');
});

test('cardinal — other for large n', () => {
  assert.equal(selectPlural(1000), 'other');
});

test('cardinal — default style is cardinal', () => {
  assert.equal(selectPlural(1), 'one');
  assert.equal(selectPlural(2), 'other');
});

test('ordinal — 1st gives one', () => {
  assert.equal(selectPlural(1, 'ordinal'), 'one');
});

test('ordinal — 11th falls through to other (teens exception)', () => {
  assert.equal(selectPlural(11, 'ordinal'), 'other');
});

test('ordinal — 21st gives one again', () => {
  assert.equal(selectPlural(21, 'ordinal'), 'one');
});

test('ordinal — 2nd gives two', () => {
  assert.equal(selectPlural(2, 'ordinal'), 'two');
});

test('ordinal — 12th falls through to other', () => {
  assert.equal(selectPlural(12, 'ordinal'), 'other');
});

test('ordinal — 22nd gives two again', () => {
  assert.equal(selectPlural(22, 'ordinal'), 'two');
});

test('ordinal — 3rd gives few', () => {
  assert.equal(selectPlural(3, 'ordinal'), 'few');
});

test('ordinal — 13th falls through to other', () => {
  assert.equal(selectPlural(13, 'ordinal'), 'other');
});

test('ordinal — 23rd gives few again', () => {
  assert.equal(selectPlural(23, 'ordinal'), 'few');
});

test('ordinal — 111th is other', () => {
  assert.equal(selectPlural(111, 'ordinal'), 'other');
});

test('ordinal — 101st is one', () => {
  assert.equal(selectPlural(101, 'ordinal'), 'one');
});

test('rejects non-integers', () => {
  assert.throws(() => selectPlural(1.5), TypeError);
  assert.throws(() => selectPlural('1'), TypeError);
  assert.throws(() => selectPlural(null), TypeError);
});

test('rejects negative integers', () => {
  assert.throws(() => selectPlural(-1), RangeError);
});

test('rejects unknown style', () => {
  assert.throws(() => selectPlural(1, 'vocative'), RangeError);
});
