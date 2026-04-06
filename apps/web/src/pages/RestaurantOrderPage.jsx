import { Box, Button, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { AppPageLayout } from "../components/common/AppPageLayout.jsx";
import { IconClock, IconPhone, IconSearch } from "../components/icons.jsx";
import { Stars } from "../components/Stars.jsx";
import {
    useCheckoutMutation,
    useProductsQuery,
} from "../hooks/useShopQueries.js";
import useCartStore from "../stores/useCartStore.js";
import "./restaurant-pages.css";

const SIDEBAR_CATS = [
    "Home",
    "Garlic Bread",
    "Calzones",
    "Kebabs",
    "Salads",
    "Cold Drinks",
    "Desserts",
    "Deals",
];

const PIZZAS = [
    {
        id: "p1",
        name: "Farm House Classic Pizza",
        desc: "Tomato base with mozzarella, peppers, mushrooms and onions.",
        rating: 4.2,
        img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
        sizes: [
            { label: "Small", price: 9.99 },
            { label: "Medium", price: 12.99 },
            { label: "Large", price: 15.99 },
        ],
    },
    {
        id: "p2",
        name: "Tandoori Chicken Pizza",
        desc: "Spiced chicken, red onions, coriander and mint yogurt drizzle.",
        rating: 4.5,
        img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80",
        sizes: [
            { label: "Small", price: 10.99 },
            { label: "Medium", price: 13.99 },
            { label: "Large", price: 16.99 },
        ],
    },
    {
        id: "p3",
        name: "Margherita",
        desc: "Classic tomato, mozzarella and fresh basil.",
        rating: 4.0,
        img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80",
        sizes: [
            { label: "Small", price: 7.99 },
            { label: "Medium", price: 9.99 },
            { label: "Large", price: 11.99 },
        ],
    },
    {
        id: "p4",
        name: "Pepperoni Feast",
        desc: "Loaded with pepperoni and extra cheese.",
        rating: 4.3,
        img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80",
        sizes: [
            { label: "Small", price: 10.49 },
            { label: "Medium", price: 13.49 },
            { label: "Large", price: 16.49 },
        ],
    },
];

const DELIVERY_HOURS = [{ day: "Mon – Sun", time: "11:00 – 23:30" }];

const OPENING_HOURS = [
    { day: "Mon – Thu", time: "11:00 – 02:00" },
    { day: "Fri – Sat", time: "11:00 – 03:00" },
    { day: "Sunday", time: "12:00 – 01:00" },
];

const ORDER_REVIEWS = [
    {
        id: 1,
        name: "Priya N.",
        place: "London",
        date: "20 Mar 2026",
        text: "Pizza was excellent and arrived in 25 minutes.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    },
    {
        id: 2,
        name: "Tom W.",
        place: "Camden",
        date: "15 Mar 2026",
        text: "Tandoori chicken topping is a must-try.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    },
];

const SIMILAR = [
    { name: "McDonald's", bg: "#FFC72C", color: "#DA291C" },
    { name: "Papa John's", bg: "#00843D", color: "#fff" },
    { name: "KFC", bg: "#E4002B", color: "#fff" },
    { name: "Texas Chicken", bg: "#C8102E", color: "#fff" },
    { name: "Burger King", bg: "#FDB813", color: "#512DA8" },
    { name: "Shaarma", bg: "#2E7D32", color: "#fff" },
];

export function RestaurantOrderPage() {
    const [sidebarCat, setSidebarCat] = useState("Home");
    const [sortBy, setSortBy] = useState("price-asc");
    const [mode, setMode] = useState("delivery");
    const items = useCartStore((state) => state.items);
    const addItem = useCartStore((state) => state.addItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const totalPrice = useCartStore((state) => state.getTotalPrice());
    const checkoutMutation = useCheckoutMutation();
    const { data, isLoading } = useProductsQuery({ page: 1, limit: 30 });

    const pizzas = useMemo(() => {
        const apiItems = data?.items || [];
        if (!apiItems.length) {
            return PIZZAS;
        }

        return apiItems.map((item) => {
            const price = Number(item.price || 0);
            return {
                id: item.id,
                name: item.name,
                desc: item.description || "Mon ngon hom nay",
                rating: 4.2,
                img:
                    item.image_url ||
                    item.image ||
                    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
                sizes: [{ label: "Standard", price }],
            };
        });
    }, [data]);

    const sortedPizzas = useMemo(() => {
        const copy = [...pizzas];
        const getPrice = (pizza) =>
            Number(pizza?.sizes?.[1]?.price ?? pizza?.sizes?.[0]?.price ?? 0);
        if (sortBy === "price-asc") {
            copy.sort((a, b) => getPrice(a) - getPrice(b));
        } else if (sortBy === "price-desc") {
            copy.sort((a, b) => getPrice(b) - getPrice(a));
        } else if (sortBy === "rating") {
            copy.sort((a, b) => b.rating - a.rating);
        }
        return copy;
    }, [sortBy, pizzas]);

    const subtotal = totalPrice;
    const discount = subtotal > 40 ? 5 : 0;
    const deliveryFee = mode === "delivery" ? 2.49 : 0;
    const total = Math.max(0, subtotal - discount + deliveryFee);

    function addToBasket(pizza, size) {
        addItem({
            id: `${pizza.id}-${size.label}`,
            name: `${pizza.name} (${size.label})`,
            price: size.price,
            image: pizza.img,
        });
    }

    function updateQty(key, delta) {
        const current = items.find((line) => line.id === key);
        if (!current) return;
        updateQuantity(key, current.quantity + delta);
    }

    async function handleCheckout() {
        if (!items.length || checkoutMutation.isPending) return;

        const payload = {
            items: items.map((line) => ({
                productId: String(line.id).split("-")[0],
                quantity: line.quantity,
            })),
            total,
            paymentMethod: "COD",
            address: "Dia chi mac dinh",
        };
        await checkoutMutation.mutateAsync(payload);
    }

    return (
        <AppPageLayout
            useContainer={false}
            headerProps={{ variant: "inner" }}
            containerSx={{ py: 0 }}
            contentSx={{ minHeight: "100%" }}
        >
            <Box component="div" className="rp-page rp-page--order">
                <Box component="section" className="rp-hero rp-hero--pizza">
                    <Box className="rp-hero-bg rp-hero-bg--pizza" />
                    <Box className="oui-container rp-hero-inner rp-hero-inner--order">
                        <Box className="rp-hero-top">
                            <Box>
                                <Typography component="h1" className="rp-title">
                                    Tandoori Pizza London
                                </Typography>
                                <Box className="rp-hero-meta">
                                    <Box className="rp-rating-box">
                                        <Typography
                                            component="span"
                                            className="rp-rating-num"
                                        >
                                            3.4
                                        </Typography>
                                        <Stars value={3.4} size="sm" />
                                        <Typography
                                            component="span"
                                            className="rp-reviews-count"
                                        >
                                            1,300+ reviews
                                        </Typography>
                                    </Box>
                                    <Box className="rp-pills">
                                        <Typography
                                            component="span"
                                            className="rp-pill"
                                        >
                                            Minimum Order: £10.00
                                        </Typography>
                                        <Typography
                                            component="span"
                                            className="rp-pill"
                                        >
                                            Delivery in 20–30 minutes
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <label className="rp-search rp-search--hero">
                                <IconSearch />
                                <input
                                    type="search"
                                    placeholder="Search for items..."
                                    aria-label="Search items"
                                />
                            </label>
                        </Box>
                        <Box className="rp-status-banner">
                            Open until 3:00 AM
                        </Box>
                        <Typography component="p" className="rp-demo-link">
                            <Link to="/">← Về trang chủ</Link>
                            {" · "}
                            <Link to="/restaurant/mcdonalds-east-london">
                                Trang menu McDonald&apos;s (demo)
                            </Link>
                        </Typography>
                    </Box>
                </Box>

                <Box className="oui-container rp-order-layout">
                    <aside className="rp-sidebar" aria-label="Menu categories">
                        <Box component="nav">
                            {SIDEBAR_CATS.map((c) => (
                                <Button
                                    key={c}
                                    type="button"
                                    className={`rp-side-item ${sidebarCat === c ? "is-active" : ""}`}
                                    onClick={() => setSidebarCat(c)}
                                >
                                    {c}
                                </Button>
                            ))}
                        </Box>
                    </aside>

                    <Box component="main" className="rp-order-main">
                        <Box className="rp-pizzas-head">
                            <Typography
                                component="h2"
                                className="rp-h2 rp-h2--orange"
                            >
                                Pizzas
                            </Typography>
                            <label className="rp-sort">
                                Sort by
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="price-asc">
                                        Price (low to high)
                                    </option>
                                    <option value="price-desc">
                                        Price (high to low)
                                    </option>
                                    <option value="rating">Rating</option>
                                </select>
                            </label>
                        </Box>
                        <Box className="rp-pizza-grid">
                            {isLoading && (
                                <Typography component="p">
                                    Dang tai san pham...
                                </Typography>
                            )}
                            {sortedPizzas.map((p) => (
                                <Box
                                    component="article"
                                    key={p.id}
                                    className="rp-pizza-card"
                                >
                                    <img src={p.img} alt="" loading="lazy" />
                                    <Box className="rp-pizza-body">
                                        <Typography component="h3">
                                            {p.name}
                                        </Typography>
                                        <Typography component="p">
                                            {p.desc}
                                        </Typography>
                                        <Box className="rp-pizza-rating">
                                            <Stars value={p.rating} size="sm" />
                                            <Typography component="span">
                                                {p.rating}
                                            </Typography>
                                        </Box>
                                        <Box className="rp-sizes">
                                            {p.sizes.map((s) => (
                                                <Box
                                                    key={s.label}
                                                    className="rp-size-row"
                                                >
                                                    <Typography component="span">
                                                        {s.label} — £
                                                        {s.price.toFixed(2)}
                                                    </Typography>
                                                    <Button
                                                        type="button"
                                                        className="rp-btn-add-basket"
                                                        onClick={() =>
                                                            addToBasket(p, s)
                                                        }
                                                    >
                                                        Add to basket
                                                    </Button>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <aside className="rp-basket" aria-label="Basket">
                        <Box className="rp-basket-head">My Basket</Box>
                        <Box className="rp-basket-body">
                            {items.length === 0 ? (
                                <Typography
                                    component="p"
                                    className="rp-basket-empty"
                                >
                                    Your basket is empty. Add items from the
                                    menu.
                                </Typography>
                            ) : (
                                <ul className="rp-basket-lines">
                                    {items.map((l) => (
                                        <li key={l.id}>
                                            <Box className="rp-line-info">
                                                <Typography component="span">
                                                    {l.name}
                                                </Typography>
                                                <Typography component="span">
                                                    £
                                                    {(
                                                        l.price * l.quantity
                                                    ).toFixed(2)}
                                                </Typography>
                                            </Box>
                                            <Box className="rp-qty">
                                                <Button
                                                    type="button"
                                                    aria-label="Decrease"
                                                    onClick={() =>
                                                        updateQty(l.id, -1)
                                                    }
                                                >
                                                    −
                                                </Button>
                                                <Typography component="span">
                                                    {l.quantity}
                                                </Typography>
                                                <Button
                                                    type="button"
                                                    aria-label="Increase"
                                                    onClick={() =>
                                                        updateQty(l.id, 1)
                                                    }
                                                >
                                                    +
                                                </Button>
                                            </Box>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <Box className="rp-basket-summary">
                                <Box className="rp-sum-row">
                                    <Typography component="span">
                                        Sub total
                                    </Typography>
                                    <Typography component="span">
                                        £{subtotal.toFixed(2)}
                                    </Typography>
                                </Box>
                                <Box className="rp-sum-row">
                                    <Typography component="span">
                                        Discounts
                                    </Typography>
                                    <Typography component="span">
                                        -£{discount.toFixed(2)}
                                    </Typography>
                                </Box>
                                <Box className="rp-sum-row">
                                    <Typography component="span">
                                        Delivery fee
                                    </Typography>
                                    <Typography component="span">
                                        £{deliveryFee.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className="rp-mode-toggle">
                                <Button
                                    type="button"
                                    className={
                                        mode === "delivery" ? "is-on" : ""
                                    }
                                    onClick={() => setMode("delivery")}
                                >
                                    Delivery
                                </Button>
                                <Button
                                    type="button"
                                    className={
                                        mode === "collection" ? "is-on" : ""
                                    }
                                    onClick={() => setMode("collection")}
                                >
                                    Collection
                                </Button>
                            </Box>
                            <Box className="rp-total-pay">
                                <Typography component="span">
                                    Total to pay
                                </Typography>
                                <Typography component="strong">
                                    £{total.toFixed(2)}
                                </Typography>
                            </Box>
                            <Button
                                type="button"
                                className="rp-checkout"
                                onClick={handleCheckout}
                                disabled={
                                    checkoutMutation.isPending ||
                                    items.length === 0
                                }
                            >
                                {checkoutMutation.isPending
                                    ? "Dang dat hang..."
                                    : "Checkout"}
                            </Button>
                            {checkoutMutation.isError && (
                                <Typography component="p">
                                    Dat hang that bai. Vui long thu lai.
                                </Typography>
                            )}
                            {checkoutMutation.isSuccess && (
                                <Typography component="p">
                                    Dat hang thanh cong.
                                </Typography>
                            )}
                        </Box>
                    </aside>
                </Box>

                <Box
                    component="section"
                    className="rp-section rp-section--muted"
                >
                    <Box className="oui-container rp-info-grid">
                        <Box className="rp-info-card">
                            <Typography component="h3">
                                <IconClock /> Delivery information
                            </Typography>
                            <ul>
                                {DELIVERY_HOURS.map((row) => (
                                    <li key={row.day}>
                                        <Typography component="span">
                                            {row.day}
                                        </Typography>
                                        <Typography component="span">
                                            {row.time}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                        <Box className="rp-info-card">
                            <Typography component="h3">
                                <IconPhone /> Contact information
                            </Typography>
                            <Typography component="p">
                                88 Brick Lane, London, E1 6QL
                            </Typography>
                            <Typography component="p">
                                <a href="tel:+442055500123">+44 20 5550 0123</a>
                            </Typography>
                            <Typography component="p">
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    tandooripizza.co.uk
                                </a>
                            </Typography>
                        </Box>
                        <Box className="rp-info-card rp-info-card--dark">
                            <Typography component="h3">
                                <IconClock /> Operational times
                            </Typography>
                            <ul>
                                {OPENING_HOURS.map((row) => (
                                    <li key={row.day}>
                                        <Typography component="span">
                                            {row.day}
                                        </Typography>
                                        <Typography component="span">
                                            {row.time}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    </Box>
                </Box>

                <Box component="section" className="rp-map-section">
                    <iframe
                        title="Restaurant location"
                        className="rp-map-frame"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=-0.095%2C51.515%2C-0.065%2C51.535&amp;layer=mapnik&amp;marker=51.525%2C-0.08"
                    />
                    <Box className="oui-container rp-map-overlay-wrap">
                        <Box className="rp-map-card">
                            <Typography component="h3">
                                Tandoori Pizza London
                            </Typography>
                            <Typography component="p">
                                88 Brick Lane, London, E1 6QL
                            </Typography>
                            <Typography component="p">
                                +44 20 5550 0123
                            </Typography>
                            <a
                                href="https://example.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                tandooripizza.co.uk
                            </a>
                        </Box>
                    </Box>
                </Box>

                <Box component="section" className="rp-section">
                    <Box className="oui-container">
                        <Box className="rp-reviews-head">
                            <Typography component="h2" className="rp-h2">
                                Customer reviews
                            </Typography>
                        </Box>
                        <Box className="rp-reviews-row">
                            {ORDER_REVIEWS.map((r) => (
                                <Box
                                    component="article"
                                    key={r.id}
                                    className="rp-review-card"
                                >
                                    <Box className="rp-review-top">
                                        <img
                                            src={r.avatar}
                                            alt=""
                                            className="rp-avatar"
                                        />
                                        <Box>
                                            <Typography component="strong">
                                                {r.name}
                                            </Typography>
                                            <Typography
                                                component="span"
                                                className="rp-review-meta"
                                            >
                                                {r.place} · {r.date}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Stars value={4} size="sm" />
                                    <Typography component="p">
                                        {r.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        <Typography component="p" className="rp-overall-rating">
                            Overall rating{" "}
                            <Typography component="strong">3.4</Typography>
                        </Typography>
                    </Box>
                </Box>

                <Box
                    component="section"
                    className="rp-section rp-section--muted"
                >
                    <Box className="oui-container">
                        <Typography component="h2" className="rp-h2">
                            Similar restaurants
                        </Typography>
                        <Box className="rp-similar-row">
                            {SIMILAR.map((r) => (
                                <Box key={r.name} className="rp-similar-card">
                                    <Box
                                        className="rp-similar-logo"
                                        style={{
                                            background: r.bg,
                                            color: r.color,
                                        }}
                                    >
                                        {r.name}
                                    </Box>
                                    <Typography
                                        component="span"
                                        className="rp-similar-label"
                                    >
                                        {r.name}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AppPageLayout>
    );
}
