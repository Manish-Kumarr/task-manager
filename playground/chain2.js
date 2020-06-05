require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5ecbc9585bb5e84ac0405716').then( (task) =>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then( (result) => {
//     console.log(result)
// }).catch( (e) =>{
//     console.log(e)
// })

const findAndDelete = async (id,completed)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed})
    return count
}

findAndDelete('5ecbc96c5bb5e84ac0405717', false).then((result) => {
    console.log(result)
}).catch( (e) => {
    console.log(e)
})
