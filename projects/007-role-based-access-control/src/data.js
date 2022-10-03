const role ={
    admin : 'admin',
    basic :'basic'
}

module.exports = {
    role : role,
    users :[
        { id: 1, name: 'Pippo', role: role.admin },
        { id: 2, name: 'Ivan', role: role.basic },
        { id: 3, name: 'Patrizia', role: role.basic }
      ]
    }