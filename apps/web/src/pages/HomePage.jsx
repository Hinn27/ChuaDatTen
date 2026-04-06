import { Box, Button, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HomePageFooter } from "../components/homepage/HomePageFooter.jsx";
import { HomePageHeader } from "../components/homepage/HomePageHeader.jsx";
import { smoothScrollToId } from "../components/homepage/scroll.utils.js";
import { fetchBestsellerStats } from "../services/shopApi.js";
import "./HomePage.css";

const SECTION_IDS = [
    "home",
    "category-main",
    "bestsellers",
    "bestsellers-region",
    "dac-san-viet",
    "lien-he",
];

const topCategories = [
    {
        name: "Cơm",
        member: "a",
        image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=900&q=80",
        route: "/a/shop",
    },
    {
        name: "Bún/Mì/Phở",
        member: "b",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=900&q=80",
        route: "/b/shop",
    },
    {
        name: "Đồ chiên",
        member: "c",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80",
        route: "/c/shop",
    },
    {
        name: "Nước uống",
        member: "d",
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=900&q=80",
        route: "/d/shop",
    },
    {
        name: "Tráng miệng",
        member: "e",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=900&q=80",
        route: "/e/shop",
    },
];

const whyChooseItems = [
    {
        badge: "01",
        title: "Đặc sản chuẩn vị 3 miền",
        description:
            "Từ món nước thanh vị đến món nướng đậm đà, tất cả được chọn lọc theo đặc trưng ẩm thực Bắc Trung Nam.",
    },
    {
        badge: "02",
        title: "Gợi ý dựa trên dữ liệu thật",
        description:
            "Danh mục và bestseller được cập nhật từ thống kê hệ thống, giúp bạn chọn món nhanh và trúng gu.",
    },
    {
        badge: "03",
        title: "Đóng gói kỹ, giao đúng nhiệt",
        description:
            "Món mặn giữ nóng, đồ uống giữ lạnh, hạn chế tràn đổ và đảm bảo trải nghiệm ngon miệng khi nhận món.",
    },
    {
        badge: "04",
        title: "Giá rõ ràng, hỗ trợ nhanh",
        description:
            "Thông tin giá minh bạch, không phí ẩn. Đội ngũ hỗ trợ phản hồi nhanh cho các vấn đề đơn hàng.",
    },
];

const blogs = [
    {
        title: "Phở Hà Nội: Vì sao nước dùng phải trong và ngọt thanh?",
        summary:
            "Khám phá cách hầm xương, nướng gia vị và cân bằng vị để có tô phở đúng chất Hà Nội.",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=900&q=80",
    },
    {
        title: "Bún bò Huế: Bản hòa âm vị cay, sả và mắm ruốc",
        summary:
            "Từ nồi nước lèo đậm đà đến lát bò mềm, đây là bí quyết tạo nên hương vị Huế khó quên.",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=900&q=80",
    },
    {
        title: "Cơm tấm Sài Gòn: Đĩa cơm bình dân làm nên thương hiệu",
        summary:
            "Sườn nướng thơm lửa, bì chả chuẩn vị và chén mắm chua ngọt là linh hồn của cơm tấm.",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&q=80",
    },
];

const regionalSpecialties = [
    {
        region: "Miền Bắc",
        highlight: "Phở Hà Nội",
        description:
            "Nước dùng trong, thơm quế hồi, bánh phở mềm và thịt bò thái mỏng.",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=900&q=80",
        route: "/b/products",
        tone: "north",
    },
    {
        region: "Miền Trung",
        highlight: "Bún bò Huế",
        description:
            "Vị cay nồng đặc trưng với sả, mắm ruốc và nước lèo đậm đà.",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=900&q=80",
        route: "/b/products",
        tone: "central",
    },
    {
        region: "Miền Nam",
        highlight: "Cơm tấm Sài Gòn",
        description:
            "Sườn nướng thơm lửa ăn kèm bì, chả và nước mắm chua ngọt.",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&q=80",
        route: "/a/products",
        tone: "south",
    },
];

function ProductCard({ item, dark = false }) {
    return (
        <Box
            component="article"
            className={`fg-product-card ${dark ? "is-dark" : ""}`}
        >
            <img
                src={item.image}
                alt={item.name}
                className="fg-product-image"
            />
            <Box className="fg-product-body">
                <Typography component="p" className="fg-product-category">
                    {item.category}
                </Typography>
                <Typography component="h3">{item.name}</Typography>
                <Box className="fg-price-row">
                    <Typography component="strong">{item.price} KES</Typography>
                    <Typography component="span">
                        {item.oldPrice} KES
                    </Typography>
                </Box>
                <Typography component="div" className="fg-stars">
                    Đã bán: {item.soldQuantity}
                </Typography>
                <Link to={item.route} className="fg-add-btn">
                    Add to cart
                </Link>
            </Box>
        </Box>
    );
}

function normalizeText(value = "") {
    return value
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function resolveRouteByCategory(category = "") {
    const normalized = normalizeText(category);

    if (
        normalized.includes("bun") ||
        normalized.includes("mi") ||
        normalized.includes("pho")
    ) {
        return "/b/products";
    }
    if (normalized.includes("chien") || normalized.includes("fried")) {
        return "/c/products";
    }
    if (
        normalized.includes("uong") ||
        normalized.includes("juice") ||
        normalized.includes("drink")
    ) {
        return "/d/products";
    }
    if (normalized.includes("trang mieng") || normalized.includes("dessert")) {
        return "/e/products";
    }
    if (normalized.includes("com") || normalized.includes("rice")) {
        return "/a/products";
    }

    return "/a/products";
}

function formatMoney(value) {
    const price = Number(value);
    if (!Number.isFinite(price)) {
        return "0.00";
    }
    return price.toFixed(2);
}

function toProductCard(item) {
    const rawPrice = Number(item?.price);
    const rawOriginalPrice = Number(item?.originalPrice);

    const price = Number.isFinite(rawPrice) ? rawPrice : 0;
    const originalPrice = Number.isFinite(rawOriginalPrice)
        ? rawOriginalPrice
        : price * 1.25;

    return {
        id: item?.id,
        category: item?.category || "Khác",
        name: item?.name || "Món ăn",
        price: formatMoney(price),
        oldPrice: formatMoney(originalPrice),
        image:
            item?.image ||
            "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?w=800&q=80",
        route: resolveRouteByCategory(item?.category),
        soldQuantity: Number.isFinite(Number(item?.soldQuantity))
            ? Number(item.soldQuantity)
            : 0,
    };
}

export function HomePage() {
    const [activeSection, setActiveSection] = useState("home");
    const [statsState, setStatsState] = useState({
        loading: true,
        error: "",
        globalTopSellers: [],
        topByCategory: [],
    });
    const [regionalStats, setRegionalStats] = useState({
        loading: true,
        error: "",
        regional: [],
    });

    useEffect(() => {
        let isMounted = true;

        async function loadStats() {
            try {
                const [bestsellerData, regionalData] = await Promise.all([
                    fetchBestsellerStats({
                        globalLimit: 4,
                        categoryLimit: 8,
                    }),
                    fetchRegionalBestsellerStats({
                        limit: 3,
                    }),
                ]);

                if (!isMounted) return;

                setStatsState({
                    loading: false,
                    error: "",
                    globalTopSellers: bestsellerData.globalTopSellers || [],
                    topByCategory: bestsellerData.topByCategory || [],
                });

                setRegionalStats({
                    loading: false,
                    error: "",
                    regional: regionalData.regional || [],
                });
            } catch (error) {
                if (!isMounted) return;

                setStatsState({
                    loading: false,
                    error:
                        error?.response?.data?.error?.message ||
                        "Không tải được thống kê bestseller từ backend.",
                    globalTopSellers: [],
                    topByCategory: [],
                });

                setRegionalStats({
                    loading: false,
                    error:
                        error?.response?.data?.error?.message ||
                        "Không tải được dữ liệu regional bestseller từ backend.",
                    regional: [],
                });
            }
        }

        loadStats();
        return () => {
            isMounted = false;
        };
    }, []);

    const bestsellerCards = useMemo(
        () => statsState.globalTopSellers.map(toProductCard),
        [statsState.globalTopSellers],
    );

    // Use regional data from API if available, otherwise use the static data as fallback
    const effectiveRegionalData =
        regionalStats.regional.length > 0 ? regionalStats.regional : [];

    const regionalSpotlight =
        effectiveRegionalData[0] || regionalSpecialties[0];
    const regionalSpotlightStack =
        effectiveRegionalData.slice(1) || regionalSpecialties.slice(1);

    const handleSectionScroll = (targetId, options = {}) => {
        const didScroll = smoothScrollToId(targetId, options);
        if (!didScroll) {
            return;
        }

        setActiveSection(targetId);

        if (typeof window !== "undefined" && window.history?.replaceState) {
            const nextHash = targetId ? `#${targetId}` : "";
            window.history.replaceState(
                null,
                "",
                `${window.location.pathname}${nextHash}`,
            );
        }
    };

    const handleScrollLinkClick = (targetId) => (event) => {
        event.preventDefault();
        handleSectionScroll(targetId);
    };

    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") {
            return undefined;
        }

        let frameId = 0;

        const updateActiveSection = () => {
            const offset = 112;
            let currentSection = "home";

            for (const sectionId of SECTION_IDS) {
                const element = document.getElementById(sectionId);
                if (!element) {
                    continue;
                }

                const top = element.getBoundingClientRect().top;
                if (top - offset <= 0) {
                    currentSection = sectionId;
                }
            }

            setActiveSection((prev) =>
                prev === currentSection ? prev : currentSection,
            );
        };

        const handleScroll = () => {
            if (frameId) {
                return;
            }

            frameId = window.requestAnimationFrame(() => {
                frameId = 0;
                updateActiveSection();
            });
        };

        updateActiveSection();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }
        };
    }, []);

    return (
        <Box component="div" className="fg-page">
            <HomePageHeader
                activeSection={activeSection}
                onSectionClick={handleSectionScroll}
            />

            <Box component="section" className="fg-hero" id="home">
                <Box className="fg-wrap fg-hero-grid">
                    <Box className="fg-hero-copy">
                        <Typography component="span" className="fg-pill">
                            Khám phá theo vùng
                        </Typography>
                        <Typography component="h1">
                            Đặc Sản
                            <br />
                            Theo Vùng
                        </Typography>
                        <Typography component="p">
                            Từ phở Hà Nội thanh vị, bún bò Huế đậm đà đến cơm
                            tấm Sài Gòn thơm lửa. Chọn miền bạn yêu thích để
                            khám phá thực đơn đặc sản Việt Nam.
                        </Typography>
                        <Button
                            component="a"
                            className="fg-btn fg-btn-region"
                            href="#category-main"
                            onClick={handleScrollLinkClick("category-main")}
                        >
                            Xem danh mục
                        </Button>
                    </Box>

                    <Box className="fg-region-grid">
                        {regionalSpecialties.map((item) => (
                            <Box
                                component="article"
                                key={`${item.region}-${item.highlight}`}
                                className={`fg-region-card tone-${item.tone}`}
                            >
                                <img src={item.image} alt={item.highlight} />
                                <Box className="fg-region-overlay" />
                                <Box className="fg-region-content">
                                    <Typography component="span">
                                        {item.region}
                                    </Typography>
                                    <Typography component="h3">
                                        {item.highlight}
                                    </Typography>
                                    <Typography component="p">
                                        {item.description}
                                    </Typography>
                                    <Link
                                        to={item.route}
                                        className="fg-link-btn"
                                    >
                                        Xem món
                                    </Link>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Box component="section" className="fg-section" id="category-main">
                <Box className="fg-wrap">
                    <Box className="fg-category-shell">
                        <Box className="fg-section-head fg-section-head--soft">
                            <Box>
                                <Typography
                                    component="h2"
                                    className="fg-block-title"
                                    sx={{
                                        textTransform: "none",
                                        letterSpacing: 0,
                                        fontFamily: "Fraunces, serif",
                                        fontSize:
                                            "clamp(1.8rem, 1.6vw + 1rem, 2.6rem)",
                                        fontWeight: 800,
                                        lineHeight: 1.1,
                                        margin: 0,
                                    }}
                                >
                                    Danh mục của chúng tôi
                                </Typography>
                                <Typography
                                    component="p"
                                    className="fg-category-subtitle"
                                >
                                    5 danh mục chính để bạn vào món nhanh hơn và
                                    không phải tìm kiếm lan man.
                                </Typography>
                            </Box>
                        </Box>

                        <Box className="fg-category-grid">
                            {topCategories.map((item) => (
                                <Box
                                    component="article"
                                    className="fg-category-card"
                                    key={`${item.member}-${item.name}`}
                                >
                                    <img src={item.image} alt={item.name} />
                                    <Box className="fg-category-overlay" />
                                    <Box className="fg-category-content">
                                        <Typography component="span">
                                            Danh mục
                                        </Typography>
                                        <Typography component="h3">
                                            {item.name}
                                        </Typography>
                                        <Typography component="p">
                                            Nhấn vào để mở thực đơn nhóm món
                                            này.
                                        </Typography>
                                        <Link
                                            to={item.route}
                                            className="fg-link-btn"
                                        >
                                            Xem danh mục
                                        </Link>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box
                component="section"
                className="fg-section fg-dark-zone"
                id="bestsellers"
            >
                <Box className="fg-wrap">
                    <Box className="fg-section-head">
                        <Typography component="h2">Món ăn bán chạy</Typography>
                        <Button className="fg-btn fg-btn-sm" type="button">
                            Show more
                        </Button>
                    </Box>

                    {statsState.error ? (
                        <Typography
                            component="p"
                            className="fg-data-note fg-data-note--error"
                        >
                            {statsState.error}
                        </Typography>
                    ) : (
                        <Typography component="p" className="fg-data-note">
                            Dữ liệu bestseller được lấy trực tiếp từ thống kê
                            backend NodeJS.
                        </Typography>
                    )}

                    <Box className="fg-product-grid">
                        {statsState.loading ? (
                            <Typography
                                component="p"
                                className="fg-data-note fg-data-note--light"
                            >
                                Đang tải thống kê bestseller...
                            </Typography>
                        ) : bestsellerCards.length > 0 ? (
                            bestsellerCards
                                .slice(0, 4)
                                .map((item) => (
                                    <ProductCard
                                        item={item}
                                        dark
                                        key={`dark-${item.id || item.name}`}
                                    />
                                ))
                        ) : (
                            <Typography
                                component="p"
                                className="fg-data-note fg-data-note--light"
                            >
                                Chưa có dữ liệu bán hàng để hiển thị.
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>

            <Box
                component="section"
                className="fg-section"
                id="bestsellers-region"
            >
                <Box className="fg-wrap">
                    <Box className="fg-section-head">
                        <Typography component="h2">
                            Món ăn bán chạy theo vùng
                        </Typography>
                        <Button className="fg-btn fg-btn-sm" type="button">
                            Show more
                        </Button>
                    </Box>

                    <Typography component="p" className="fg-data-note">
                        Các món ăn bán chạy nhất ở từng vùng, cập nhật trực tiếp
                        từ dữ liệu bán hàng thực tế.
                    </Typography>

                    <Box className="fg-region-featured-grid">
                        <Box
                            component="article"
                            className={`fg-region-card fg-region-featured-card tone-${regionalSpotlight?.tone || "north"}`}
                        >
                            <img
                                src={regionalSpotlight.image}
                                alt={regionalSpotlight.highlight}
                            />
                            <Box className="fg-region-overlay" />
                            <Box className="fg-region-content">
                                <Typography component="span">
                                    {regionalSpotlight.region}
                                </Typography>
                                <Typography component="h3">
                                    {regionalSpotlight.highlight}
                                </Typography>
                                <Typography component="p">
                                    {regionalSpotlight.description}
                                </Typography>
                                <Link
                                    to={regionalSpotlight.route}
                                    className="fg-link-btn"
                                >
                                    Xem món
                                </Link>
                            </Box>
                        </Box>

                        <Box className="fg-region-stack">
                            {regionalSpotlightStack.map((item) => (
                                <Box
                                    component="article"
                                    key={`region-${item.region}-${item.highlight}`}
                                    className={`fg-region-card tone-${item.tone}`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.highlight}
                                    />
                                    <Box className="fg-region-overlay" />
                                    <Box className="fg-region-content">
                                        <Typography component="span">
                                            {item.region}
                                        </Typography>
                                        <Typography component="h3">
                                            {item.highlight}
                                        </Typography>
                                        <Typography component="p">
                                            {item.description}
                                        </Typography>
                                        <Link
                                            to={item.route}
                                            className="fg-link-btn"
                                        >
                                            Xem món
                                        </Link>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box component="section" className="fg-section" id="vi-sao-colau">
                <Box className="fg-wrap fg-why-grid">
                    <Box className="fg-why-intro">
                        <Typography component="h2">
                            Vì sao chọn Cỏ Lau
                        </Typography>
                        <Typography component="p">
                            Cỏ Lau - một loài cây chỉ mọc vào cuối mùa mưa bão
                            quê tôi. Cỏ Lau khi viết không dấu là Co Lau, có
                            cách đọc khá tương đồng với món ăn Cao Lầu (cô làu)
                            ở phố cổ Hội An.
                        </Typography>
                    </Box>

                    <Box className="fg-why-cards">
                        {whyChooseItems.map((item) => (
                            <Box
                                component="article"
                                className="fg-why-card"
                                key={item.badge}
                            >
                                <Typography
                                    component="span"
                                    className="fg-why-icon"
                                >
                                    {item.badge}
                                </Typography>
                                <Typography component="h3">
                                    {item.title}
                                </Typography>
                                <Typography component="p">
                                    {item.description}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Box
                component="section"
                className="fg-section fg-blog"
                id="dac-san-viet"
            >
                <Box className="fg-wrap">
                    <Typography component="h2">Đặc Sản Việt Nam</Typography>
                    <Typography component="p" className="fg-blog-intro">
                        Cùng khám phá câu chuyện phía sau những món ăn làm nên
                        bản sắc ẩm thực Việt từ Bắc vào Nam.
                    </Typography>
                    <Box className="fg-blog-grid">
                        {blogs.map((item) => (
                            <Box
                                component="article"
                                className="fg-blog-card"
                                key={item.title}
                            >
                                <img src={item.image} alt={item.title} />
                                <Typography component="h3">
                                    {item.title}
                                </Typography>
                                <Typography component="p">
                                    {item.summary}
                                </Typography>
                                <Button
                                    className="fg-btn fg-btn-sm"
                                    type="button"
                                >
                                    Đọc thêm
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            <HomePageFooter
                activeSection={activeSection}
                onSectionClick={handleSectionScroll}
            />
        </Box>
    );
}
