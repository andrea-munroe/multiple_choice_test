if ( process.env.NODE_ENV !== "production" ) {
	require( 'dotenv' ).config();
};

const { Pool, Client } = require( 'pg' )
const format = require( 'pg-format' );

const pool = new Pool()

pool.query( 'SELECT * FROM test', ( error, result ) => {
	console.log( result.rows[0] )
	pool.end()
} )