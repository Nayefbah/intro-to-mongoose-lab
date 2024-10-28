const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

const prompt = require('prompt-sync')()
const customer = require('./model/customer')
// const username = prompt('What is your name? ')

// console.log(`Your name is ${username}`)

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URL)
  console.log('Connected to mongoDB')
  await runQueries()
  await mongoose.disconnect()
  console.log('Disconnected from MongoDB')
}

async function createCustomer() {
  const name = prompt("Enter customer's name: ")
  const age = prompt("Enter customer's age: ")
  const Customer = new customer({ name, age })

  await Customer.save()
  console.log(`Customer ${name} created successfully.`)
}

const vieCustomer = async () => {
  const Customers = await customer.find()
  console.log('\nCurrent customers:\n')
  Customers.forEach((Customer) => {
    console.log(
      `ID: ${Customer._id} -- Name: ${Customer.name}, Age: ${Customer.age}`
    )
  })
}

const updateCustomer = async () => {
  await viewCustomers()
  const id = prompt('Enter the ID of the customer to update: ')
  const name = prompt("Enter customer's new name: ")
  const age = prompt("Enter customer's new age: ")

  await customer.findByIdAndUpdate(id, { name, age })
  console.log('Customer updated successfully.')
}

const deleteCustomer = async () => {
  await viewCustomers()
  const id = prompt('Enter the ID of the customer to delete: ')

  await customer.findByIdAndDelete(id)
  console.log('Customer deleted successfully.')
}
const runQueries = async () => {
  console.log('Welcome to the CRM')
  while (true) {
    console.log(`
        What would you like to do?
        1. Create a customer
        2. View all customers
        3. Update a customer
        4. Delete a customer
        5. Quit
      `)
    const choice = prompt(`Number of option to run: `)
    if (choice === `1`) {
      await createCustomer()
    } else if (choice === `2`) {
      await vieCustomer()
    } else if (choice === `3`) {
      await updateCustomer()
    } else if (choice === `4`) {
      await deleteCustomer()
    } else if (choice === `5`) {
      console.log('Exiting CRM...')
      break
    } else {
      console.log('Invalid option. Please chose again')
    }
  }
}

connect()
