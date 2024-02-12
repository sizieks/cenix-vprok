const selectors = {
  price: {
    old: '[class*="Price_size_XS"][class*="Price_role_old_"]',
    regular: '[class*="Price_size_XL"][class*="Price_role_regular"]',
    discount: '[class*="Price_size_XL"][class*="Price_role_discount"]',
  },
  rating: '[class^="Rating_value"]',
  reviewCount: '[class^="ActionsRow_reviews_"]',
};

module.exports = { selectors };
