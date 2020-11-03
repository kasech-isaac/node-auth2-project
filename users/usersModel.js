const db=require("../database/config")
 

function find() {
    return db("users")
    .select("id", "username", "department")
}
function findBy(data) {
	return db("users")
    .select("id", "username", "password", "department")
        .where(data)
        .first()
}

function findById(id) {
    return db("users")
    .select("id", "username")
    .where("id", id)
	.first()
}


async function add(user) {
    const [id] = await db("users").insert(user)
	return findById(id)
}

module.exports = {
    find,
    add,
    findBy,
    findById,
    
}