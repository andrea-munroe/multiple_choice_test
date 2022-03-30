// use .env environment variables
if ( process.env.NODE_ENV !== "production" ) {
	require( 'dotenv' ).config();
};

const { Pool, Client } = require( 'pg' )
const format = require( 'pg-format' );

const pool = new Pool()

// express and ejs
const express = require( 'express' );
const app = express();
const path = require( 'path' );

app.set( 'view engine', 'ejs' );

app.use(express.static(path.join(__dirname, 'public')))
app.use( express.static( path.join( __dirname, '/views' ) ) )


app.get( '/', ( req, res ) => {
	res.render('index')
})

app.get( '/test', ( req, res ) => {
	pool.query( 'SELECT * FROM test', ( error, result ) => {
		if ( error ) throw error
		// console.log(result.rows[0].questions)
		res.render( 'test', { test: result.rows } )
	} )
} )

app.get( '/edit', ( req, res ) => {
	pool.query( 'SELECT * FROM test', ( error, result ) => {
		if ( error ) throw error
		// console.log(result.rows[0].questions)
		res.render( 'edit', { test: result.rows } )
	} )
} )


const port = process.env.PORT || 3000;
app.listen( port, () => {
	console.log( `Test running on port ${port}` );
} );