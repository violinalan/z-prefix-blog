const Pool = require('pg').Pool
require('dotenv').config()

const devConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
}

const proConfig = {
    connectionString: process.env.DATABASE_URL
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig)

const bcrypt = require('bcrypt')

const getUsers = (request, response) => {
    pool.query(`SELECT * FROM "User"`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = request.params.id

    pool.query(`SELECT * FROM "User" WHERE id=$1`, [id], (error, results) => {
        if (error) {
            throw error
        }

        results.rowCount > 0 ? response.status(200).json(results.rows) : response.sendStatus(404)
    })
}

const addUser = async (request, response) => {
    const { first, last, username, password, email } = request.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        pool.query(`INSERT INTO "User" (first, last, username, password, email)
                    VALUES ($1, $2, $3, $4, $5)`, [first, last, username, hashedPassword, email], (error, results) => {
            if(error) {
                throw error
            }
            response.status(201).send(`User added successfully`)
        })
    } catch {
        response.status(500).send()
    }
}

const loginUser = async (request, response) => {
    let registeredUsers = []

    pool.query(`SELECT * FROM "User"`, async (error, results) => {
        if (error) {
            throw error
        }
        registeredUsers = results.rows
        
        const user = registeredUsers.find(user => user.username === request.body.username)
        if (user == null) {
            return response.status(400).json({status: 400})
        }
        try {
            if (await bcrypt.compare(request.body.password, user.password)) {
                response.status(200).json({id: user.id, status: 200})
            } else {
                response.status(401).json({status: 401})
            }
        } catch {
            response.status(500).send()
        }
    })
}

const getPosts = (request, response) => {
    pool.query(`SELECT * FROM "Post" ORDER BY id`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPostById = (request, response) => {
    const id = request.params.id

    pool.query(`SELECT * FROM "Post" WHERE id=$1`, [id], (error, results) => {
        if (error) {
            throw error
        }

        results.rowCount > 0 ? response.status(200).json(results.rows) : response.sendStatus(404)
    })
}

const addPost = (request, response) => {
    const { userid, title, text, created_date } = request.body

    pool.query(`INSERT INTO "Post" (userid, title, text, created_date)
                VALUES ($1, $2, $3, $4)`, [userid, title, text, created_date], (error, results) => {
        if(error) {
            throw error
        }
        response.status(201).send(`Post added successfully`)
    })
}

const editPost = (request, response) => {
    const id = request.params.id
    const { title, text } = request.body

    pool.query(`UPDATE "Post" SET title = $1, text = $2 WHERE id=$3`, [title, text, id], (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).send(`Post updated successfully`)
    })
}

const deletePost = (request, response) => {
    const id = request.params.id

    pool.query(`DELETE FROM "Post" WHERE id=$1`, [id], (error, results) => {
        if(error) {
            throw error
        }

        results.rowCount > 0 ? response.status(200).send(`Post deleted successfully`) : response.sendStatus(404)
    })
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    loginUser,
    getPosts,
    getPostById,
    addPost,
    editPost,
    deletePost,
  }