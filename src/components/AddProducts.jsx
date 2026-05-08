import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import BuildLoader from "./BuildLoader";
import { Products } from "../data/products";

const AddProducts = () => {
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemCost, setItemCost] = useState("");
    const [itemPhoto, setItemPhoto] = useState(null);
    const [itemCategory, setItemCategory] = useState("Cement");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

   const adminCategories = [
    "Building Materials",
    "Cement",
    "Sand",
    "Bricks",
    "Steel",
    "Roofing",
    "Plumbing",
    "Electrical",
    "Paint",
    "Tiles",
    "Tools",
    "Safety Equipment",
    "Doors & Windows",
    "Hardware"
    ];

    // Dashboard logic kept for your UI stats
    const dashboardStats = useMemo(() => {
        const totalItems = Products.length;
        const totalInventoryValue = Products.reduce((sum, item) => sum + item.price, 0);
        const inStockCount = Products.filter((item) =>
            /in stock/i.test(item.stockStatus || "")
        ).length;

        const averageRating = totalItems > 0
                ? Products.reduce((sum, item) => sum + (item.rating || 0), 0) / totalItems
                : 0;

        const topItem = [...Products].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0];

        return { totalItems, totalInventoryValue, inStockCount, averageRating, topItem };
    }, []);

    const siteCards = [
        { title: "Top Material", value: dashboardStats.topItem?.name || "Cement", meta: `${dashboardStats.topItem?.rating?.toFixed(1) || "4.8"} rating`, icon: "bi-award-fill" },
        { title: "Categories", value: adminCategories.length, meta: "Available materials", icon: "bi-grid-fill" },
        { title: "Stock Available", value: `${dashboardStats.inStockCount}/${dashboardStats.totalItems}`, meta: "Ready for site use", icon: "bi-box-seam" },
    ];

    const submit = async (e) => {
        e.preventDefault();

        // Validation
        if (!itemName || !itemDescription || !itemCost || !itemPhoto || !itemCategory) {
            setError("Please fill all fields and upload item image");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Preparing the data for the API
            const data = new FormData();
            data.append("product_name", itemName);
            data.append("product_cost", itemCost);
            data.append("product_category", itemCategory);
            data.append("product_description", itemDescription);
            data.append("product_photo", itemPhoto);

            // HIT  LIVE API
            const response = await axios.post("https://philipswala.alwaysdata.net/api/add_product", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Assuming your API returns a 200 or 201 on success
            if (response.status === 200 || response.status === 201) {
                setSuccess("Construction item added successfully! 🏗️");
                // Reset form
                setItemName("");
                setItemDescription("");
                setItemCost("");
                setItemPhoto(null);
                
                setTimeout(() => navigate("/"), 2000);
            }

        } catch (err) {
            // Capture specific error message from your AlwaysData backend
            const errorMessage = err.response?.data?.message || "Server Error: Could not add product.";
            setError(errorMessage);
            console.error("Upload Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5" style={{ backgroundColor: 'lightblue', borderRadius: '15px', padding: '20px' }}>
            <section className="admin-hero mb-4">
                <div className="admin-hero-copy">
                    <span className="admin-section-tag">🏗️ Site Control</span>
                    <h1 className="admin-hero-title">Construction Admin Panel</h1>
                    <p className="admin-hero-text">Manage construction materials, tools, and supplies.</p>
                </div>

                <div className="admin-scoreboard">
                    <div className="admin-scoreboard-header">
                        <span>Inventory Dashboard</span>
                        <span>Live Data</span>
                    </div>
                    <div className="admin-scoreboard-grid">
                        <div className="admin-score-tile">
                            <span>Items</span>
                            <strong>{dashboardStats.totalItems}</strong>
                        </div>
                        <div className="admin-score-tile">
                            <span>Value</span>
                            <strong>KSh {dashboardStats.totalInventoryValue.toLocaleString()}</strong>
                        </div>
                        <div className="admin-score-tile">
                            <span>Rating</span>
                            <strong>{dashboardStats.averageRating.toFixed(1)}</strong>
                        </div>
                    </div>
                </div>
            </section>

            <div className="row g-4">
                <div className="col-xl-4">
                    {siteCards.map((card) => (
                        <div key={card.title} className="admin-metric-card shadow-sm mb-3" style={{ background: 'white', padding: '15px', borderRadius: '10px' }}>
                            <i className={`bi ${card.icon}`} style={{ fontSize: '1.5rem', color: '#007bff' }}></i>
                            <h4>{card.title}</h4>
                            <h3>{card.value}</h3>
                            <p className="text-muted">{card.meta}</p>
                        </div>
                    ))}
                </div>

                <div className="col-xl-8">
                    <div className="card p-4 shadow-lg border-0">
                        <h2 className="mb-4">➕ Add Construction Item</h2>

                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}

                        {loading && (
                            <BuildLoader text="Uploading to server... 🚧" />
                        )}

                        <form onSubmit={submit}>
                            <label className="form-label">Item Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Bamburi Cement"
                                className="form-control mb-3"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />

                            <label className="form-label">Category</label>
                            <select
                               className="form-select mb-3 py-3 rounded-4 shadow-sm"
                                value={itemCategory}
                                onChange={(e) => setItemCategory(e.target.value)}
                            >
                                {adminCategories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            <label className="form-label">Description</label>
                            <textarea
                                placeholder="Provide technical specs..."
                                className="form-control mb-3"
                                rows="3"
                                value={itemDescription}
                                onChange={(e) => setItemDescription(e.target.value)}
                            />

                            <label className="form-label">Cost (KSh)</label>
                            <input
                                type="number"
                                placeholder="Cost in KSh"
                                className="form-control mb-3"
                                value={itemCost}
                                onChange={(e) => setItemCost(e.target.value)}
                            />

                            <label className="form-label">Product Image</label>
                            <input
                                type="file"
                                className="form-control mb-4"
                                accept="image/*"
                                onChange={(e) => setItemPhoto(e.target.files[0])}
                            />

                            <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
                                {loading ? "Processing..." : "Add Item 🚀"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;