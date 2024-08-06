const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

const uri = "mongodb+srv://GTAV:jinil1711@mongogta.na4kb7g.mongodb.net/?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/fetch-data', async (req, res) => {
    let car = [];
    let plane = [];
    let yacht = [];
    let penthouse = [];

    async function fetchData() {
        try {
            await client.connect();
            const database = client.db('Gta_list');
            const collection = database.collection('items');
            const data = await collection.find().toArray();

            data.forEach(item => {
                const { Name, PriceRange, MaxSpeed, Category, Quantity, imageUrl1, SquareFeet, Location, Link } = item;
                if (Category) {
                    const categoryLower = Category.toLowerCase();
                    if (categoryLower === 'car' || categoryLower === 'plane' || categoryLower === 'penthouse') {
                        const entry = { Name, PriceRange, MaxSpeed, Quantity, imageUrl1, SquareFeet, Location, Link };
                        if (categoryLower === 'car') {
                            car.push(entry);
                        } else if (categoryLower === 'plane') {
                            plane.push(entry);
                        } else if (categoryLower === 'penthouse') {
                            penthouse.push(entry);
                        }
                    } else if (categoryLower === 'yacht') {
                        const yachtEntry = { Name, MaxSpeed, PriceRange, Category, Quantity, imageUrl1 };
                        yacht.push(yachtEntry);
                    }
                }
            });

            console.log("Data fetched successfully");
        } catch (e) {
            console.error(e);
        }
    }

    await fetchData();
    res.json({ car, plane, yacht, penthouse });
});

module.exports = router;
