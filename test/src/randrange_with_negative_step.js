import test from 'ava';

import {randrange} from '#module';

test('randrange with negative step', (t) => {
	let r;
	let step;

	const n = 5000;
	let ri = -n;
	let rj = n;

	const check = () => {
		t.true(r <= rj, `${r} <= ${rj}`);
		t.true(r > ri, `${r} > ${ri}`);
		t.true((rj - r) % -step === 0, `(${rj} - ${r}) % (-${step}) === 0`);
		t.true(Number.isInteger(r), `Number.isInteger(${r})`);
	};

	for (step = -3; step <= -1; ++step) {
		for (let i = 0; i < n; ++i) {
			r = randrange(rj, ri, step);

			check();

			++ri;
		}

		for (let i = 0; i < n; ++i) {
			r = randrange(rj, ri, step);

			check();

			--ri;
			--rj;
		}

		for (let i = 0; i < n; ++i) {
			r = randrange(rj, ri, step);

			check();

			++rj;
		}
	}
});
