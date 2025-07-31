// src/lib/constants/products.ts
export interface Product {
    handle: string;
    sku: string;
    name: string;
    barcode: string;
    cost_price: number;
    full_price: number;
    discount_price: number;
    stock: number;
    sync_status: '✅' | '🕗' | '❌';
    last_updated: string;
    max_discount: number;
    max_discount_active: boolean;
    custom_discount: number | null;
    custom_discount_active: boolean;
  }
  
  const products: Product[] = [
    {
      handle: 'crema-viso-idratante-spf30',
      sku: 'PROD-001',
      name: 'Crema Viso Idratante SPF30+',
      barcode: '8056446456789',
      cost_price: 8.50,
      full_price: 16.90,
      discount_price: 16.90,
      stock: 23,
      sync_status: '✅',
      last_updated: '2025-07-07',
      max_discount: 20,
      max_discount_active: false,
      custom_discount: 15,
      custom_discount_active: true
    },
    {
      handle: 'shampoo-delicato',
      sku: 'PROD-002',
      name: 'Shampoo Delicato',
      barcode: '8056446456790',
      cost_price: 7.00,
      full_price: 14.00,
      discount_price: 12.60,
      stock: 12,
      sync_status: '🕗',
      last_updated: '2025-07-05',
      max_discount: 10,
      max_discount_active: true,
      custom_discount: null,
      custom_discount_active: false
    },
    {
      handle: 'integratore-multivitaminico',
      sku: 'PROD-003',
      name: 'Integratore Multivitaminico',
      barcode: '8056446456791',
      cost_price: 12.00,
      full_price: 22.00,
      discount_price: 22.00,
      stock: 0,
      sync_status: '❌',
      last_updated: '2025-06-29',
      max_discount: 0,
      max_discount_active: false,
      custom_discount: null,
      custom_discount_active: false
    },
    {
      handle: 'gel-dentifricio-sbiancante',
      sku: 'PROD-004',
      name: 'Gel Dentifricio Sbiancante',
      barcode: '8056446456792',
      cost_price: 3.75,
      full_price: 8.50,
      discount_price: 7.65,
      stock: 45,
      sync_status: '✅',
      last_updated: '2025-07-08',
      max_discount: 10,
      max_discount_active: true,
      custom_discount: 5,
      custom_discount_active: true
    },
    {
      handle: 'olio-essenziale-lavanda',
      sku: 'PROD-005',
      name: 'Olio Essenziale di Lavanda',
      barcode: '8056446456793',
      cost_price: 4.20,
      full_price: 9.99,
      discount_price: 9.99,
      stock: 30,
      sync_status: '✅',
      last_updated: '2025-07-03',
      max_discount: 0,
      max_discount_active: false,
      custom_discount: null,
      custom_discount_active: false
    },
    {
      handle: 'balsamo-labbra-nutriente',
      sku: 'PROD-006',
      name: 'Balsamo Labbra Nutriente',
      barcode: '8056446456794',
      cost_price: 2.50,
      full_price: 6.00,
      discount_price: 6.00,
      stock: 18,
      sync_status: '🕗',
      last_updated: '2025-07-01',
      max_discount: 15,
      max_discount_active: true,
      custom_discount: null,
      custom_discount_active: false
    },
    {
      handle: 'crema-corpo-idratante',
      sku: 'PROD-007',
      name: 'Crema Corpo Idratante',
      barcode: '8056446456795',
      cost_price: 5.00,
      full_price: 12.00,
      discount_price: 10.20,
      stock: 27,
      sync_status: '✅',
      last_updated: '2025-07-06',
      max_discount: 15,
      max_discount_active: false,
      custom_discount: 10,
      custom_discount_active: true
    }
  ];
  
  export default products;
  