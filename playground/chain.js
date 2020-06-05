require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5ecb11a5b78f0c24f0fe6b1c', { age : 15 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({age:15})
// }).then( (result) => {
//     console.log(result)
// }).catch( (e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id,age)=>{
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('5ecb11a5b78f0c24f0fe6b1c',4).then( (result) => {
    console.log(result)
}).catch((e)=>{
    console.log(e)
})