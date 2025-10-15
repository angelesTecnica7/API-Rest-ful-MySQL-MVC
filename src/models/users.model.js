import pool from '../../config/conexion.js'

//getAllUsers
//getUserById
//createUser
//updateUser
//deleteUser

export const getAllUsers = async() => {
     const sql = "SELECT * FROM users";
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql);
        connection.release(); //libera conexion 
        // res.json(rows)
        return rows         
    } catch (error) {
        // res.status(500).send('ERROR, no se pudo realizar la consulta')
        // console.log(error)
        return error
    }    
}

export const getUserById = async(id) => {
    const sql = "SELECT * FROM users WHERE ID_user = ?";
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]);
        //hay que pasale el sql y el dato que reemplaza el signo ?
        connection.release();
        // console.log(rows)
        return rows         
    } catch (error) {
        // console.log(error)
        return error
    }
}

export const createUser = async(values) => {
    // const sql = "INSERT INTO users (Name, Email, Image, Pass, Type_user) VALUES (?,?,?,?,?)";
    const sql = 'INSERT INTO user SET ?'; //equivalente a lo de arriba
    try {
        const connection = await pool.getConnection();
    
        //hay que pasale el sql y el dato que reemplaza el signo ?
        const [rows] = await connection.query(sql, [values]);
        connection.release();
        
        // console.log(rows)
        //rows devuelve muchos datos entre ellos el id creado, es lo que retorno
        return rows 

    } catch (error) {
        return error
    }

}

export const updateUser= async(id, values) => {
    const sql = 'UPDATE users SET ? WHERE ID_user = ?';
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [values, id]);
        connection.release();
        // console.log(rows)
        return rows
       
    } catch (error) {
        return error
    }
}

export const deleteUser = async(id) => {
    const sql = "DELETE FROM users WHERE ID_user = ?";
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]); 
        connection.release();
        // console.log(rows)
        return rows
    } catch (error) {
      return error
    }
}