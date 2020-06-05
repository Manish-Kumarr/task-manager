const add = (a,b)=>{
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
                resolve(a+b)
        },2000)
    })
}

//Return Promise
const out = async () => {
    const sum = await add(1,2)
    const sum2 = await add(sum,7)
    return sum2
}

out().then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})
