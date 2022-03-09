import test from 'ava';
import {range} from '@iterable-iterator/range';
import {reservoir, _waterman, randint} from '#module';

const macro = (t, _, reservoir, k, n) => {
	const sample = reservoir(k, range(n));
	const source = new Set(range(n));

	t.is(sample.length, k);
	for (const i of range(Math.min(k, n))) t.true(source.delete(sample[i]));
	for (const i of range(n, k)) t.true(sample[i] === undefined);
};

macro.title = (title, algo, _, k, n) =>
	title || `[${algo}] reservoir(${k}, range(${n}))`;

const algorithms = [
	['Waterman', _waterman(randint)],
	['API', reservoir],
];

const params = [
	[0, 10],
	[5, 10],
	[10, 5],
	[10, 10],
	[50, 1000],
];

for (const [name, algorithm] of algorithms) {
	for (const [k, input] of params) {
		test(macro, name, algorithm, k, input);
	}
}
