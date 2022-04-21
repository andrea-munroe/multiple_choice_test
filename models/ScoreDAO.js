const Score = require('./Score');

class ScoreDAO {
    constructor() {
        // loads connection data from .env file
        if (process.env.NODE_ENV !== "production") {
            require('dotenv').config();
        };

        const { Client } = require('pg');
        this.client = new Client({
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
        });
    }

    getScore(id, callback) {
        this.client.connect();
        this.client.query('SELECT test_id, student_name, score from score where score_id = ?', [id], (error, results) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            callback(new Score(id, results.rows[0].student_name, results.rows[0].score, results.rows[0].test_id));
        })
    }

    getAllScores(callback) {
        this.client.connect();
        this.client.query('SELECT score_id from score', (error, results) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            let scores = [];
            for(let i=0; i < results.rows.length; i++) {
                this.getScore(results.rows[i].score_id, (score) => {
                    scores.push(score);
                })
            }
            callback(scores);
        })
    }

    addScore(name, score, test, callback) {
        if(name != "" && name != undefined && score >= 0) {
            this.client.connect();
            this.client.query('INSERT into score(test_id, student_name, score) values (?, ?, ?) returning score_id', [test.id, name, score], (error, results) =>
            {
                if(error) {
                    this.client.end();
                    throw error;
                }
                this.client.end();
                callback(new Score(results.rows[0].score_id, name, score, test.id));
            })
        } else {
            console.log("invalid string");
            //raise exception
        }
    }

    deleteScore(score) {
        this.client.connect();
        this.client.query('DELETE from score where score_id = ?', [score.id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
        })
    }
}

module.exports =  ScoreDAO;