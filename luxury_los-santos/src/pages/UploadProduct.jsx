import React, { useState } from 'react';
import './UploadProducts.css';

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
            </form>
            <input type="submit" value="Submit" />
        </div>
    );
};

const CarForm = () => (
    <div id="carForm" className="form-section">
        <h3>Sell A Car</h3>
        <input type="text" id="carName" name="name" placeholder="Name" /><br /><br />
        <input type="text" id="carPrice" name="price" placeholder="Price" /><br /><br />
        <input type="text" id="carSpeed" name="speed" placeholder="Speed (km/h)" /><br /><br />
        <input type="number" id="carAcceleration" name="acceleration" min="0" max="5" placeholder="Acceleration" /><br /><br />
        <input type="number" id="carBraking" name="braking" min="0" max="5" placeholder="Braking" /><br /><br />
        <input type="number" id="carTraction" name="traction" min="0" max="5" placeholder="Traction" /><br /><br />
        <input type="number" id="carQuantity" name="quantity" placeholder="Quantity" /><br /><br />

        <div className="file-input">
            <input type="file" id="carImage1" name="image1" />
            <label htmlFor="carImage1">Image 1</label>
        </div><br /><br />

        <div className="file-input">
            <input type="file" id="carImage2" name="image2" />
            <label htmlFor="carImage2">Image 2</label>
        </div><br /><br />

        <div className="file-input">
            <input type="file" id="carImage3" name="image3" />
            <label htmlFor="carImage3">Image 3</label>
        </div><br /><br />

        <div className="file-input">
            <input type="file" id="carImage4" name="image4" />
            <label htmlFor="carImage4">Image 4</label>
        </div><br /><br />

        <textarea id="carDescription" name="description" placeholder="Description"></textarea><br /><br />
    </div>
);

const YachtForm = () => (
    <div id="yachtForm" className="form-section">
        <h3>Sell A Yacht</h3>
        <input type="text" id="yachtName" name="name" placeholder="Name" /><br /><br />
        <input type="text" id="yachtPrice" name="price" placeholder="Price" /><br /><br />
        <input type="text" id="yachtSpeed" name="speed" placeholder="Speed (km/h)" /><br /><br />
        <input type="number" id="yachtQuantity" name="quantity" placeholder="Quantity" /><br /><br />

        <div className="file-input">
            <input type="file" id="yachtImage1" name="image1" />
            <label htmlFor="yachtImage1">Image 1</label>
        </div><br /><br />

        <div className="file-input">
            <input type="file" id="yachtImage2" name="image2" />
            <label htmlFor="yachtImage2">Image 2</label>
        </div><br /><br />

        <div className="file-input">
            <input type="file" id="yachtImage3" name="image3" />
            <label htmlFor="yachtImage3">Image 3</label>
        </div><br /><br />

        <div className="file-input">
            <input type="file" id="yachtImage4" name="image4" />
            <label htmlFor="yachtImage4">Image 4</label>
        </div><br /><br />

        <textarea id="yachtDescription" name="description" placeholder="Description"></textarea><br /><br />
    </div>
);

const PenthouseForm = () => (
    <div id="penthouseForm" className="form-section">
        <h3>Sell A Penthouse</h3>
        <input type="text" id="penthouseName" name="name" placeholder="Name" /><br /><br />
        <input type="text" id="penthousePrice" name="price" placeholder="Price" /><br /><br />
        <input type="text" id="penthouseLocation" name="location" placeholder="Location" /><br /><br />
        <input type="number" id="penthouseQuantity" name="quantity" placeholder="Quantity" /><br /><br />

        <div className="file-input">
            <input type="file" id="penthouseImage1" name="image1" />
            <label htmlFor="penthouseImage1">Image 1</label>
        </div><br /><br />

        <div className="file-input">
            <input type="file" id="penthouseImage2" name="image2" />
            <label htmlFor="penthouseImage2">Image 2</label>
        </div><br /><br />

        <div className="file-input">
            <input type="file" id="penthouseImage3" name="image3" />
            <label htmlFor="penthouseImage3">Image 3</label>
        </div><br /><br />

        <div className="file-input">
            <input type="file" id="penthouseImage4" name="image4" />
            <label htmlFor="penthouseImage4">Image 4</label>
        </div><br /><br />

        <input type="text" id="penthouseSquareFeet" name="squareFeet" placeholder="Square Feet" /><br /><br />
        <input type="text" id="penthouseRooms" name="rooms" placeholder="Rooms" /><br /><br />

        <textarea id="penthouseDescription" name="description" placeholder="Description"></textarea><br /><br />
    </div>
);

const PlaneForm = () => (
    <div id="planeForm" className="form-section">
        <h3>Sell A Plane</h3>
        <input type="text" id="planeName" name="name" placeholder="Name" /><br /><br />
        <input type="text" id="planePrice" name="price" placeholder="Price" /><br /><br />
        <input type="text" id="planeSpeed" name="speed" placeholder="Speed (km/h)" /><br /><br />
        <input type="number" id="planeAcceleration" name="acceleration" min="0" max="5" placeholder="Acceleration" /><br /><br />
        <input type="number" id="planeBraking" name="braking" min="0" max="5" placeholder="Braking" /><br /><br />
        <input type="number" id="planeAgility" name="agility" min="0" max="5" placeholder="Agility" /><br /><br />
        <input type="number" id="planeQuantity" name="quantity" placeholder="Quantity" /><br /><br />

        <div className="file-input">
            <input type="file" id="planeImage1" name="image1" />
            <label htmlFor="planeImage1">Image 1</label>
        </div><br /><br />

        <div className="file-input">
            <input type="file" id="planeImage2" name="image2" />
            <label htmlFor="planeImage2">Image 2</label>
        </div><br /><br />

        <div className="file-input">
            <input type="file" id="planeImage3" name="image3" />
            <label htmlFor="planeImage3">Image 3</label>
        </div><br /><br />

        <div className="file-input">
            <input type="file" id="planeImage4" name="image4" />
            <label htmlFor="planeImage4">Image 4</label>
        </div><br /><br />

        <textarea id="planeDescription" name="description" placeholder="Description"></textarea><br /><br />
    </div>
);

export default UploadProduct;
