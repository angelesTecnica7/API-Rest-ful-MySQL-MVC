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
        return rows         
    } catch (error) {
        res.status(500).send('ERROR, no se pudo realizar la consulta')
    }    
}

export const getUserById = async(id) => {
    const sql = "SELECT * FROM users WHERE ID_user = ?";
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]);
        //hay que pasale el sql y el dato que reemplaza el signo ?
        return rows[0]      
        //rows devuelve un array que contiene un objeto, con [0] tomo solo el objeto  
        connection.release();
    } catch (error) {
        res.status(500).send('ERROR, no se pudo realizar la consulta')
    }
}

export const createUser = async(values) => {
    // const sql = "INSERT INTO users (Name, Email, Image, Pass, Type_user) VALUES (?,?,?,?,?)";
    const sql = 'INSERT INTO users SET ?'; //equivalente a lo de arriba
    try {
        const connection = await pool.getConnection();
    
        //hay que pasale el sql y el dato que reemplaza el signo ?
        const [rows] = await connection.query(sql, [values]);

        //rows devuelve muchos datos entre ellos el id creado, es lo que retorno
        return rows.insertId

        //libero conexion
        connection.release();

    } catch (error) {
        res.status(500).send('ERROR, no se pudo realizar la consulta')
    }

}

export const updateUser= async(id, values) => {
    const sql = 'UPDATE users SET ? WHERE ID_user = ?';
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [values, id]);
        connection.release();
        // console.log(rows)
        // console.info(rows.affectedRows)
        return rows.affectedRows
       
    } catch (error) {
        res.status(500).send('ERROR, no se pudo realizar la consulta')
    }
}

export const deleteUser = async(id) => {
    const sql = "DELETE FROM users WHERE ID_user = ?";
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]); 
        connection.release();
        // console.log(rows)
        // //affectedRoews muestra la cant de registros actualizados si es igual a cero no modifico ningun registro
        return rows.affectedRows 
    } catch (error) {
        res.status(500).send('ERROR, no se pudo realizar la consulta')
    }
}