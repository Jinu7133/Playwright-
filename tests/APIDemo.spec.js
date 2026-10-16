const { test,expect } = require("@playwright/test");
//API Testing
test('@API Get Request - Fetch Users', async({request})=>{
    const response = await request.get('https://jsonplaceholder.typicode.com/users')
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(body.length).toBeGreaterThan(0)// to check if there is content in the body 
    console.log(body[0].name)// will print the name of first ID 
})
test('@API Post Request - Create User',async({request})=>{
    const response = await request.post('https://jsonplaceholder.typicode.com/users',{
    data:{
        name: "John Doe",
        username: "John21",
        email: "johndoe@gmail.com"
    }
    })
    expect(response.status()).toBe(201)
    const responsebody =await response.json()
    expect(responsebody.name).toBe('John Doe')
})