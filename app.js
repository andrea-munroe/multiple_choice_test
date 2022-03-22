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

// app.get( '/', ( req, res ) => {
// 	res.render( 'index', { question: "frank" } )
// } )

app.get( '/', ( req, res ) => {
	res.render('index')
})

app.get( '/test', ( req, res ) => {
	pool.query( 'SELECT * FROM test', ( error, result ) => {
		if ( error ) throw error
		res.render( 'test', { questions: result.rows } )
		// for ( let question of result.rows ) {
		// 	console.log( question.question )
		// 	question.answers.forEach( elm => console.log( elm ) )
		// }
	} )
} )


const port = process.env.PORT || 3000;
app.listen( port, () => {
	console.log( `Test running on port ${port}` );
} );