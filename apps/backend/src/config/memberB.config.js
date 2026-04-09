/**
 * Member B Configuration & Data Fixtures
 * For category: Thực phẩm hữu cơ (Organic Food)
 */

export const memberBConfig = {
    id: 'b',
    name: 'Cửa hàng B',
    displayName: 'Thực phẩm Hữu Cơ',
    description: 'Cơ sở kinh doanh chuyên cung cấp thực phẩm hữu cơ chất lượng cao',
    logo: '🥬',
    color: '#2ecc71',
    primaryCategory: 'organic-food',
    owner: 'Founder B',
    location: 'Quận 1, TP.HCM',
    phone: '+84 28 1234 5678',
    email: 'memberb@refood.vn',
    website: 'https://memberb.refood.vn',
    socialLinks: {
        facebook: 'https://facebook.com/memberb',
        instagram: 'https://instagram.com/memberb',
    },
}

/**
 * Member B Product Fixtures
 */
export const memberBProducts = [
    {
        id: 'b-prod-001',
        name: 'Rau cuống hữu cơ',
        description: 'Rau cuống tươi ngon, trồng theo tiêu chuẩn hữu cơ',
        category: 'organic-food',
        price: 25000,
        imageUrl: '/images/products/rau-cuong.jpg',
        stock: 50,
        rating: 4.8,
        reviews: 132,
        isActive: true,
    },
    {
        id: 'b-prod-002',
        name: 'Cà chua hữu cơ',
        description: 'Cà chua đỏ chín tự nhiên, không sử dụng hóa chất',
        category: 'organic-food',
        price: 35000,
        imageUrl: '/images/products/ca-chua.jpg',
        stock: 45,
        rating: 4.9,
        reviews: 156,
        isActive: true,
    },
    {
        id: 'b-prod-003',
        name: 'Rau bó cải hữu cơ',
        description: 'Cải xinh, cải cúc, cải ngọt - hữu cơ tự nhiên',
        category: 'organic-food',
        price: 30000,
        imageUrl: '/images/products/rau-cai.jpg',
        stock: 60,
        rating: 4.7,
        reviews: 98,
        isActive: true,
    },
    {
        id: 'b-prod-004',
        name: 'Khoai tây hữu cơ',
        description: 'Khoai tây tím, khoai tây vàng - hữu cơ',
        category: 'organic-food',
        price: 28000,
        imageUrl: '/images/products/khoai-tay.jpg',
        stock: 55,
        rating: 4.6,
        reviews: 87,
        isActive: true,
    },
    {
        id: 'b-prod-005',
        name: 'Hộp rau sạch hữu cơ',
        description: 'Combo 5 loại rau sạch, giao tập trung',
        category: 'organic-food',
        price: 120000,
        imageUrl: '/images/products/hop-rau.jpg',
        stock: 30,
        rating: 5.0,
        reviews: 234,
        isActive: true,
    },
]

/**
 * Member B Order History (Sample)
 */
export const memberBSampleOrders = [
    {
        id: 'b-order-001',
        status: 'delivered',
        totalPrice: 155000,
        createdAt: new Date('2026-04-05'),
        items: [
            { productId: 'b-prod-001', quantity: 2, price: 25000 },
            { productId: 'b-prod-002', quantity: 1, price: 35000 },
            { productId: 'b-prod-003', quantity: 2, price: 30000 },
        ],
    },
    {
        id: 'b-order-002',
        status: 'shipping',
        totalPrice: 120000,
        createdAt: new Date('2026-04-08'),
        items: [{ productId: 'b-prod-005', quantity: 1, price: 120000 }],
    },
]

/**
 * Member B Statistics
 */
export const memberBStats = {
    totalProducts: 5,
    activeListings: 5,
    totalSales: 2500000,
    totalOrders: 156,
    averageRating: 4.8,
    totalReviews: 707,
    memberSince: '2024-01-15',
    bestSeller: 'b-prod-005',
}
