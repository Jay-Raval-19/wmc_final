const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.MONGODB_URI || "mongodb+srv://GTAV:jinil1711@mongogta.na4kb7g.mongodb.net/?retryWrites=true&w=majority&appName=MongoGTA";
let client;

const serviceAccount = require('./serviceAccountKey.json'); // update this path

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Connect to MongoDB once and reuse the connection
async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
    }
    return client.db('Gta_list');
}

// Fetch items data
let car = [];
let plane = [];
let yacht = [];
let penthouse = [];

async function fetchData() {
    const database = await connectToDatabase();
    const collection = database.collection('items');
    const data = await collection.find().toArray();

    // Clear arrays before populating them
    car = [];
    plane = [];
    yacht = [];
    penthouse = [];

    data.forEach(item => {
        const { _id,Name, Price, Speed, Category, Acceleration, Braking, Traction, Quantity, Agility, imageUrl1, imageUrl2, imageUrl3, imageUrl4, SquareFeet, Location, Link, Description, Seller, Rooms } = item;
        if (Category) {
            const categoryLower = Category.toLowerCase();
            const entry = { _id,Name, Price, Speed, Category, Acceleration, Braking, Traction, Quantity, Agility, imageUrl1, imageUrl2, imageUrl3, imageUrl4, SquareFeet, Location, Link, Description, Seller, Rooms };
            switch (categoryLower) {
                case 'car':
                    car.push(entry);
                    break;
                case 'plane':
                    plane.push(entry);
                    break;
                case 'penthouse':
                    penthouse.push(entry);
                    break;
                case 'yacht':
                    yacht.push(entry);
                    break;
            }
        }
    });

    console.log("Data fetched successfully");
}

app.get('/fetch-data', async (req, res) => {
    try {
        await fetchData();
        res.json({ car, plane, yacht, penthouse });
    } catch (error) {
        console.error("Error in /fetch-data endpoint:", error);
        res.status(500).send("Internal Server Error");
    }
});
// Sign up and Sign in
async function insertUserData(data) {
    const database = await connectToDatabase();
    const collection = database.collection('users');

    // Inserting user data
    await collection.insertOne(data);
    console.log("User data inserted successfully");
}

app.post('/insert-user-data', async (req, res) => {
    try {
        const userData = req.body;
        await insertUserData(userData);
        res.json({ message: 'User data inserted successfully' });
    } catch (error) {
        console.error("Error in /insert-user-data endpoint:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;

    try {
        const database = await connectToDatabase();
        const collection = database.collection('users');
        const user = await collection.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ message: 'Sign in successful', user });
        } else {
            res.status(401).json({ message: 'Sign in failed, invalid credentials' });
        }
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/sign-up', async (req, res) => {
    const { email, password, displayName, imageUrl } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            uid: 12334,
            email: email,
            displayName: displayName,
            credits: 1000,
            pfp: imageUrl || 'default_profile_picture_url', // Default profile picture URL
            carts: [],
            wishlists: [],
            purchased: []
        };

        await insertUserData(newUser);

        res.json({ message: 'Sign up successful', user: newUser });
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ message: 'Sign up failed' });
    }
});

// Add to Cart
// app.post('/add-to-cart', async (req, res) => {
//     const { userId, itemId } = req.body;
//     console.log(userId);
//     console.log(itemId);
//     try {
//         const database = await connectToDatabase();
//         const usersCollection = database.collection('users');
//         // const itemsCollection = database.collection('items');

//         // const item = await itemsCollection.findOne({ _id: itemId });

//         await usersCollection.updateOne({ email: userId }, { $push: { carts: itemId } });

//         res.json({ message: 'Item added to cart' });
//     } catch (error) {
//         console.error("Error adding to cart:", error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

const { ObjectId } = require('mongodb'); 

app.post('/add-to-cart', async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        const database = await connectToDatabase();
        const usersCollection = database.collection('users');
        const itemsCollection = database.collection('items');

        const item = await itemsCollection.findOne({ _id: new ObjectId(itemId) });

        await usersCollection.updateOne(
            { email: userId }, 
            { $push: { carts: item } }
        );

        res.json({ message: 'Item added to cart' });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add to Wishlist
app.post('/add-to-wishlist', async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        const database = await connectToDatabase();
        const usersCollection = database.collection('users');
        const itemsCollection = database.collection('items');

        const item = await itemsCollection.findOne({ _id: new ObjectId(itemId) });

        await usersCollection.updateOne(
            { email: userId }, 
            { $push: { wishlists: item } }
        );

        res.json({ message: 'Item added to cart' });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/get-cart', async (req, res) => {
    const { userId } = req.query; // Assuming userId is passed as a query parameter

    try {
        const database = await connectToDatabase();
        const usersCollection = database.collection('users');

        // Find the user by email and get their cart
        const user = await usersCollection.findOne({ email: userId }, { projection: { carts: 1 } });

        if (!user || !user.carts) {
            return res.status(404).json({ message: 'No cart found for this user' });
        }

        // Send the cart data back to the frontend
        res.json(user.carts);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/get-wishlist', async (req, res) => {
    const { userId } = req.query; // Assuming userId is passed as a query parameter

    try {
        const database = await connectToDatabase();
        const usersCollection = database.collection('users');

        // Find the user by email and get their cart
        const user = await usersCollection.findOne({ email: userId }, { projection: { wishlists: 1 } });

        if (!user || !user.wishlists) {
            return res.status(404).json({ message: 'No cart found for this user' });
        }

        // Send the cart data back to the frontend
        res.json(user.wishlists);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Remove from Cart
app.delete('/remove-item-from-cart', async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        const database = await connectToDatabase();
        const usersCollection = database.collection('users');

        await usersCollection.updateOne(
            { email: userId },
            { $pull: { carts: { _id: new ObjectId(itemId) } } }
        );

        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Remove from Cart
app.delete('/remove-item-from-wishlist', async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        const database = await connectToDatabase();
        const usersCollection = database.collection('users');

        await usersCollection.updateOne(
            { email: userId },
            { $pull: { wishlists: { _id: new ObjectId(itemId) } } }
        );

        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Move Wishlist Item to Cart
app.post('/move-wishlist-to-cart', async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        const database = await connectToDatabase();
        const usersCollection = database.collection('users');
        const itemsCollection = database.collection('items');

        const item = await itemsCollection.findOne({ _id: new ObjectId(itemId) });

        // Remove from wishlist and add to cart
        await usersCollection.updateOne({ email: userId }, {
            $pull: { wishlists: { _id: new ObjectId(itemId) } },
            $push: { carts: item }
        });

        res.json({ message: 'Item moved from wishlist to cart' });
    } catch (error) {
        console.error("Error moving wishlist item to cart:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
