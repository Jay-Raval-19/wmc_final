import React, { useState } from 'react';

const UploadProduct = () => {
    const [category, setCategory] = useState('');

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div className="UploadProduct">
            <form id="dynamicForm">
                <label htmlFor="category">Choose a category:</label>
                <select id="category" name="category" onChange={handleCategoryChange}>
                    <option value="">Select...</option>
                    <option value="Car">Car</option>
                    <option value="Yacht">Yacht</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Plane">Plane</option>
                </select>

                {category === 'Car' && <CarForm />}
                {category === 'Yacht' && <YachtForm />}
                {category === 'Penthouse' && <PenthouseForm />}
                {category === 'Plane' && <PlaneForm />}

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

const CarForm = () => (
    <div id="carForm" className="form-section">
        <h3>Car</h3>
        <label htmlFor="carName">Name:</label>
        <input type="text" id="carName" name="name" /><br /><br />

        <label htmlFor="carPrice">Price:</label>
        <input type="text" id="carPrice" name="price" /><br /><br />

        <label htmlFor="carSpeed">Speed (km/h):</label>
        <input type="text" id="carSpeed" name="speed" /><br /><br />

        <label htmlFor="carAcceleration">Acceleration:</label>
        <input type="number" id="carAcceleration" name="acceleration" /><br /><br />

        <label htmlFor="carBraking">Braking:</label>
        <input type="number" id="carBraking" name="braking" /><br /><br />

        <label htmlFor="carTraction">Traction:</label>
        <input type="number" id="carTraction" name="traction" /><br /><br />

        <label htmlFor="carQuantity">Quantity:</label>
        <input type="number" id="carQuantity" name="quantity" /><br /><br />

        <label htmlFor="carImage1">Image 1:</label>
        <input type="file" id="carImage1" name="image1" /><br /><br />

        <label htmlFor="carImage2">Image 2:</label>
        <input type="file" id="carImage2" name="image2" /><br /><br />

        <label htmlFor="carImage3">Image 3:</label>
        <input type="file" id="carImage3" name="image3" /><br /><br />

        <label htmlFor="carImage4">Image 4:</label>
        <input type="file" id="carImage4" name="image4" /><br /><br />

        <label htmlFor="carDescription">Description:</label><br />
        <textarea id="carDescription" name="description"></textarea><br /><br />
    </div>
);

const YachtForm = () => (
    <div id="yachtForm" className="form-section">
        <h3>Yacht</h3>
        <label htmlFor="yachtName">Name:</label>
        <input type="text" id="yachtName" name="name" /><br /><br />

        <label htmlFor="yachtPrice">Price:</label>
        <input type="text" id="yachtPrice" name="price" /><br /><br />

        <label htmlFor="yachtSpeed">Speed (km/h):</label>
        <input type="text" id="yachtSpeed" name="speed" /><br /><br />

        <label htmlFor="yachtQuantity">Quantity:</label>
        <input type="number" id="yachtQuantity" name="quantity" /><br /><br />

        <label htmlFor="yachtImage1">Image 1:</label>
        <input type="file" id="yachtImage1" name="image1" /><br /><br />

        <label htmlFor="yachtImage2">Image 2:</label>
        <input type="file" id="yachtImage2" name="image2" /><br /><br />

        <label htmlFor="yachtImage3">Image 3:</label>
        <input type="file" id="yachtImage3" name="image3" /><br /><br />

        <label htmlFor="yachtImage4">Image 4:</label>
        <input type="file" id="yachtImage4" name="image4" /><br /><br />

        <label htmlFor="yachtDescription">Description:</label><br />
        <textarea id="yachtDescription" name="description"></textarea><br /><br />
    </div>
);

const PenthouseForm = () => (
    <div id="penthouseForm" className="form-section">
        <h3>Penthouse</h3>
        <label htmlFor="penthouseName">Name:</label>
        <input type="text" id="penthouseName" name="name" /><br /><br />

        <label htmlFor="penthousePrice">Price:</label>
        <input type="text" id="penthousePrice" name="price" /><br /><br />

        <label htmlFor="penthouseLocation">Location:</label>
        <input type="text" id="penthouseLocation" name="location" /><br /><br />

        <label htmlFor="penthouseQuantity">Quantity:</label>
        <input type="number" id="penthouseQuantity" name="quantity" /><br /><br />

        <label htmlFor="penthouseImage1">Image 1:</label>
        <input type="file" id="penthouseImage1" name="image1" /><br /><br />

        <label htmlFor="penthouseImage2">Image 2:</label>
        <input type="file" id="penthouseImage2" name="image2" /><br /><br />

        <label htmlFor="penthouseImage3">Image 3:</label>
        <input type="file" id="penthouseImage3" name="image3" /><br /><br />

        <label htmlFor="penthouseImage4">Image 4:</label>
        <input type="file" id="penthouseImage4" name="image4" /><br /><br />

        <label htmlFor="penthouseSquareFeet">Square Feet:</label>
        <input type="text" id="penthouseSquareFeet" name="squareFeet" /><br /><br />

        <label htmlFor="penthouseRooms">Rooms:</label>
        <input type="text" id="penthouseRooms" name="rooms" /><br /><br />

        <label htmlFor="penthouseDescription">Description:</label><br />
        <textarea id="penthouseDescription" name="description"></textarea><br /><br />
    </div>
);

const PlaneForm = () => (
    <div id="planeForm" className="form-section">
        <h3>Plane</h3>
        <label htmlFor="planeName">Name:</label>
        <input type="text" id="planeName" name="name" /><br /><br />

        <label htmlFor="planePrice">Price:</label>
        <input type="text" id="planePrice" name="price" /><br /><br />

        <label htmlFor="planeSpeed">Speed (km/h):</label>
        <input type="text" id="planeSpeed" name="speed" /><br /><br />

        <label htmlFor="planeAcceleration">Acceleration:</label>
        <input type="number" id="planeAcceleration" name="acceleration" /><br /><br />

        <label htmlFor="planeBraking">Braking:</label>
        <input type="number" id="planeBraking" name="braking" /><br /><br />

        <label htmlFor="planeAgility">Agility:</label>
        <input type="number" id="planeAgility" name="agility" /><br /><br />

        <label htmlFor="planeQuantity">Quantity:</label>
        <input type="number" id="planeQuantity" name="quantity" /><br /><br />

        <label htmlFor="planeImage1">Image 1:</label>
        <input type="file" id="planeImage1" name="image1" /><br /><br />

        <label htmlFor="planeImage2">Image 2:</label>
        <input type="file" id="planeImage2" name="image2" /><br /><br />

        <label htmlFor="planeImage3">Image 3:</label>
        <input type="file" id="planeImage3" name="image3" /><br /><br />

        <label htmlFor="planeImage4">Image 4:</label>
        <input type="file" id="planeImage4" name="image4" /><br /><br />

        <label htmlFor="planeDescription">Description:</label><br />
        <textarea id="planeDescription" name="description"></textarea><br /><br />
    </div>
);

export default UploadProduct;
