/**
 * API सर्विस - बैकएंड API कॉल्स के लिए
 * फ्रंटएंड और बैकएंड के बीच कनेक्शन प्रबंधित करने के लिए
 */

// API बेस URL
const API_URL = '/api';

// सामान्य API अनुरोध हैंडलर
async function fetchAPI(endpoint, options = {}) {
  try {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'कुछ गलत हो गया');
    }

    return data;
  } catch (error) {
    console.error('API अनुरोध में त्रुटि:', error);
    throw error;
  }
}

// API सर्विसेज
const apiService = {
  // ऑथेंटिकेशन API
  auth: {
    // स्टूडेंट रजिस्ट्रेशन
    registerStudent: (userData) => 
      fetchAPI('/auth/register/student', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    
    // सेलर रजिस्ट्रेशन
    registerSeller: (userData) => 
      fetchAPI('/auth/register/seller', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    
    // लॉगिन
    login: (credentials) => 
      fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
  },
  
  // प्रोडक्ट API
  products: {
    // सभी प्रोडक्ट्स प्राप्त करें
    getAll: () => fetchAPI('/products'),
    
    // पॉपुलर प्रोडक्ट्स प्राप्त करें
    getPopular: () => fetchAPI('/products/popular'),
    
    // नए प्रोडक्ट्स प्राप्त करें
    getNew: () => fetchAPI('/products/new'),
    
    // आईडी से प्रोडक्ट प्राप्त करें
    getById: (id) => fetchAPI(`/products/${id}`),
    
    // केटेगरी से प्रोडक्ट्स प्राप्त करें
    getByCategory: (category) => fetchAPI(`/products/category/${category}`),
  },
  
  // ऑर्डर API
  orders: {
    // ऑर्डर बनाएं
    create: (orderData) => 
      fetchAPI('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      }),
    
    // यूजर ऑर्डर्स प्राप्त करें
    getUserOrders: () => fetchAPI('/orders/user'),
    
    // ऑर्डर स्टेटस अपडेट करें
    updateStatus: (orderId, status) => 
      fetchAPI(`/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }),
    
    // ऑर्डर ट्रैक करें
    track: (orderId) => fetchAPI(`/orders/${orderId}/track`),
  },
  
  // पेमेंट API
  payments: {
    // पेमेंट इंटेंट बनाएं
    createIntent: (paymentData) => 
      fetchAPI('/payments/create-intent', {
        method: 'POST',
        body: JSON.stringify(paymentData),
      }),
    
    // पेमेंट वेरिफाई करें
    verify: (paymentId) => fetchAPI(`/payments/verify/${paymentId}`),
  },
};

export default apiService; 