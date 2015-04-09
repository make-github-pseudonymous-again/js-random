
var util, operator, array, mem, one, calloc;;

util = require( "util" );

mem = require( "aureooms-js-mem" );
array = require( "aureooms-js-array" );
operator = require( "aureooms-js-operator" );


one = function ( type, shuffle ) {

	var calloc, a, b, n, range;

	calloc = mem.__calloc__( type );

	n = 100;

	a = calloc( n );
	b = calloc( n );

	array.iota( a, 0, n, 0 );

	range = function ( i, j ) {

		var name;

		name = util.format( "shuffle ( %s, %s )", i, j );

		test( name, function () {

			var it, msg, _a, _b;

			array.copy( a, 0, n, b, 0 );
			shuffle( b, i, j );

			for ( it = 0 ; it < i ; ++it ) {
				msg = util.format( "b[%d] === a[%d]", it, it );
				deepEqual( b[it], a[it], msg );
			}

			_a = Array.prototype.slice.call( a, i, j ).sort( operator.sub );
			_b = Array.prototype.slice.call( b, i, j ).sort( operator.sub );

			msg = "shuffled region contains same elements as original";

			deepEqual( _b, _a, msg );

			for ( it = j ; it < n ; ++it ) {
				msg = util.format( "b[%d] === a[%d]", it, it );
				deepEqual( b[it], a[it], msg );
			}

		});
	};


	range( 0, n );
	range( 20, n );
	range( 0, n - 20 );
	range( 10, n - 10 );
	range( 10, n - 10 );



};

types = [
	Array,
	Int8Array,
	Int16Array,
	Int32Array,
	Uint8Array,
	Uint16Array,
	Uint32Array,
	Uint8ClampedArray,
	Float32Array,
	Float64Array
];

algorithms = [
	random._shuffle( random._fisheryates( random.randint ) ),
	random._shuffle( random.sample ),
	random.shuffle
];

types.forEach( function ( type ) {

	algorithms.forEach( function ( algorithm ) {

		one( type, algorithm );

	});

});
