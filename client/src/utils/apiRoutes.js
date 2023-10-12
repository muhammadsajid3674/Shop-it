export const apiRoute = {
   login: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
   becomeMerchant: `${process.env.NEXT_PUBLIC_API_BASE_URL}/client/becomeMerchant`,
   addProduct: `${process.env.NEXT_PUBLIC_API_BASE_URL}/merchant/addProduct`,
   getProduct: `${process.env.NEXT_PUBLIC_API_BASE_URL}/merchant/getProduct?page=1&limit=5`,
   deleteProduct: `${process.env.NEXT_PUBLIC_API_BASE_URL}/merchant/deleteProduct`,
   getAllProducts: `${process.env.NEXT_PUBLIC_API_BASE_URL}/client/getProduct?page=1&limit=10`,
   addToCart: `${process.env.NEXT_PUBLIC_API_BASE_URL}/client/updateCart`,
   viewCart: `${process.env.NEXT_PUBLIC_API_BASE_URL}/client/viewCart`,
   cartCount: `${process.env.NEXT_PUBLIC_API_BASE_URL}/client/cartCount`,
};
