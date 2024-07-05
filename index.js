const express = require('express')
const uuid = require('uuid')


const app = express()
const port = 3000
const orders = []
app.use(express.json())


const checkIdOrder = (req, res , next) => {
    const{ id } =req.params

    const index = orders.findIndex(order => order.id === id)

    if(index < 0) {
        return res.status(404).json({error : "Order not found"})
    }
    req.orderIndex = index
    req.orderId = id

    next()
}


 const checkUrlOrder = (req, res, next) => {

const url = req.url
const method = req.method

console.log(`The method used is: ${method}, and the url used is: ${url}`)

next ()

}

app.get('/order',checkUrlOrder, (request, response) => {
    return response.json(orders)

})


app.post('/order',checkUrlOrder, (request, response) => {
    const { order, clientName, price } = request.body
    const status = "Em preparação"
    const orde = { id: uuid.v4(), order, clientName, price, status}
    
    orders.push(orde)

    return response.status(201).json(orders)

})


app.put('/order/:id',checkUrlOrder, checkIdOrder, (request, response) => {
 const {order, clientName, price} = request.body
 const index = request.orderIndex
 const id = request.orderId
 
 const uptdatedOrder = {id, order, clientName, price}
 
 orders[index] = uptdatedOrder

    return response.json(uptdatedOrder)

})


app.delete('/order/:id',checkUrlOrder, checkIdOrder, (request, response) => {
    const index =request.orderIndex

    orders.splice(index, 1)
    
    
    return response.status(204).json()

})


app.get('/order/:id',checkUrlOrder, checkIdOrder, (request, response) => {
    
    const index = request.orderIndex

    const orderView = orders[index]
    
    
    return response.json(orderView)

})


app.patch('/order/:id', checkUrlOrder, checkIdOrder,(request, response) => {
    
    const {order, clientName, price} = request.body
    const id = request.orderId
    const index = request. orderIndex
    const readyOrder = {

        id,
        order: orders[index].order,
        clientName: orders[index].clientName,
        price: orders[index].price,
        status: "Pronto"
    }
    
    orders[index] = readyOrder
    
    return response.json(readyOrder)

})



app.listen(port, () => {
    console.log(`🚀 Server started on port ${port} 🚀`)
})