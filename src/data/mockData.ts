import { Product, Review, Order } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'The Complete JavaScript Mastery',
    description: 'Master JavaScript from fundamentals to advanced concepts. This comprehensive eBook covers ES6+, async programming, design patterns, and real-world project examples. Perfect for developers who want to deepen their understanding of the most popular programming language.\n\nIncludes 15 chapters, 200+ code examples, and 10 mini-projects to practice your skills. Updated for 2025 with the latest ECMAScript features.',
    price: 29.99,
    category: 'ebooks',
    coverImage: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    downloadLink: '#download-js-mastery',
    rating: 4.8,
    reviewCount: 142,
    status: 'published',
    features: ['15 In-depth Chapters', '200+ Code Examples', '10 Mini Projects', 'ES2025 Coverage', 'PDF + EPUB Format'],
    createdAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'prod-2',
    name: 'UI/UX Design System Kit',
    description: 'A complete design system template with 500+ components, ready-to-use screens, and a comprehensive style guide. Built for Figma with auto-layout and variants support.\n\nPerfect for startups and design teams who want to ship faster. Includes dashboard, e-commerce, SaaS, and mobile app templates.',
    price: 49.99,
    category: 'templates',
    coverImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    downloadLink: '#download-design-kit',
    rating: 4.6,
    reviewCount: 89,
    status: 'published',
    features: ['500+ Components', 'Auto-layout Support', 'Dark & Light Themes', 'Responsive Variants', 'Figma File Included'],
    createdAt: '2025-02-20T10:00:00Z'
  },
  {
    id: 'prod-3',
    name: 'Full-Stack Web Development Bootcamp',
    description: 'A self-paced online course covering React, Node.js, PostgreSQL, and deployment. Build 5 real-world projects from scratch including a social media app, e-commerce platform, and real-time chat application.\n\n40+ hours of HD video content with lifetime access and free updates.',
    price: 89.99,
    category: 'courses',
    coverImage: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    downloadLink: '#access-bootcamp',
    rating: 4.9,
    reviewCount: 234,
    status: 'published',
    features: ['40+ Hours of Content', '5 Real Projects', 'Certificate Included', 'Lifetime Access', 'Community Support'],
    createdAt: '2025-03-10T10:00:00Z'
  },
  {
    id: 'prod-4',
    name: 'Startup Pitch Deck Templates',
    description: 'Professional pitch deck templates designed for startups seeking funding. Includes 10 unique themes with 30+ slide layouts each. Fully customizable in PowerPoint and Google Slides.\n\nBased on successful pitch decks that helped raise $50M+ in funding across various industries.',
    price: 34.99,
    category: 'templates',
    coverImage: 'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    downloadLink: '#download-pitch-deck',
    rating: 4.5,
    reviewCount: 67,
    status: 'published',
    features: ['10 Unique Themes', '300+ Slide Layouts', 'PPTX + Google Slides', 'Investor-Ready Design', 'Easy Customization'],
    createdAt: '2025-01-28T10:00:00Z'
  },
  {
    id: 'prod-5',
    name: 'Python for Data Science Handbook',
    description: 'Comprehensive guide to data science with Python. Covers NumPy, Pandas, Matplotlib, Scikit-learn, and TensorFlow basics. Includes real datasets and hands-on exercises.\n\nFrom data cleaning to machine learning model deployment — everything you need to start your data science journey.',
    price: 24.99,
    category: 'ebooks',
    coverImage: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    downloadLink: '#download-python-ds',
    rating: 4.7,
    reviewCount: 198,
    status: 'published',
    features: ['12 Chapters', 'Real Datasets', 'Jupyter Notebooks', 'ML Fundamentals', 'PDF + EPUB Format'],
    createdAt: '2025-02-05T10:00:00Z'
  },
  {
    id: 'prod-6',
    name: 'Advanced React & TypeScript Course',
    description: 'Take your React skills to the next level with TypeScript, advanced patterns, performance optimization, and testing. Learn compound components, render props, custom hooks, and state machines.\n\n25 hours of expert-level content with real-world enterprise patterns.',
    price: 69.99,
    category: 'courses',
    coverImage: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    downloadLink: '#access-react-ts',
    rating: 4.8,
    reviewCount: 156,
    status: 'published',
    features: ['25 Hours of Content', 'TypeScript Deep Dive', 'Testing Strategies', 'Performance Patterns', 'Enterprise Architecture'],
    createdAt: '2025-04-01T10:00:00Z'
  },
  {
    id: 'prod-7',
    name: 'Social Media Marketing eBook',
    description: 'Learn the latest social media marketing strategies for 2025. Covers Instagram, TikTok, LinkedIn, and X (Twitter) growth hacking techniques with real case studies.',
    price: 19.99,
    category: 'ebooks',
    coverImage: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    downloadLink: '#download-smm',
    rating: 4.3,
    reviewCount: 45,
    status: 'draft',
    features: ['8 Chapters', 'Case Studies', 'Growth Templates', 'Analytics Guide', 'PDF Format'],
    createdAt: '2025-04-15T10:00:00Z'
  }
];

export const mockReviews: Review[] = [
  { id: 'rev-1', productId: 'prod-1', customerName: 'Alex Johnson', rating: 5, comment: 'Absolutely fantastic book! The code examples are clear and practical. I went from intermediate to advanced JS in just 2 weeks.', createdAt: '2025-03-20T10:00:00Z' },
  { id: 'rev-2', productId: 'prod-1', customerName: 'Sarah Chen', rating: 5, comment: 'Best JavaScript resource I\'ve found. The design patterns chapter alone is worth the price.', createdAt: '2025-03-25T10:00:00Z' },
  { id: 'rev-3', productId: 'prod-1', customerName: 'Marcus Williams', rating: 4, comment: 'Great content overall. Would love to see more on Web APIs in the next edition.', createdAt: '2025-04-01T10:00:00Z' },
  { id: 'rev-4', productId: 'prod-2', customerName: 'Emily Rodriguez', rating: 5, comment: 'This design kit saved me weeks of work. The components are beautifully crafted and super customizable.', createdAt: '2025-03-15T10:00:00Z' },
  { id: 'rev-5', productId: 'prod-2', customerName: 'David Kim', rating: 4, comment: 'Very comprehensive kit. The auto-layout support is perfect for responsive designs.', createdAt: '2025-04-05T10:00:00Z' },
  { id: 'rev-6', productId: 'prod-3', customerName: 'Lisa Thompson', rating: 5, comment: 'Hands down the best full-stack course. The project-based approach makes everything stick.', createdAt: '2025-04-10T10:00:00Z' },
  { id: 'rev-7', productId: 'prod-3', customerName: 'James Park', rating: 5, comment: 'Got a job as a full-stack developer after completing this course. Life-changing!', createdAt: '2025-04-12T10:00:00Z' },
  { id: 'rev-8', productId: 'prod-4', customerName: 'Anna Foster', rating: 5, comment: 'Used this for our Series A pitch and investors were impressed with the design quality.', createdAt: '2025-03-28T10:00:00Z' },
  { id: 'rev-9', productId: 'prod-5', customerName: 'Robert Martinez', rating: 5, comment: 'Perfect for transitioning into data science. The hands-on exercises are invaluable.', createdAt: '2025-04-08T10:00:00Z' },
  { id: 'rev-10', productId: 'prod-6', customerName: 'Jennifer Lee', rating: 5, comment: 'Advanced patterns explained clearly. The TypeScript integration patterns are gold.', createdAt: '2025-04-15T10:00:00Z' },
  { id: 'rev-11', productId: 'prod-6', customerName: 'Michael Brown', rating: 4, comment: 'Excellent course for senior devs. Some sections could use more real-world examples though.', createdAt: '2025-04-18T10:00:00Z' },
];

export const mockOrders: Order[] = [
  {
    id: 'ord-1',
    items: [{ product: mockProducts[0], quantity: 1 }, { product: mockProducts[2], quantity: 1 }],
    total: 119.98,
    customerName: 'Alex Johnson',
    customerEmail: 'alex@example.com',
    createdAt: '2025-03-20T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'ord-2',
    items: [{ product: mockProducts[1], quantity: 1 }],
    total: 49.99,
    customerName: 'Emily Rodriguez',
    customerEmail: 'emily@example.com',
    createdAt: '2025-03-25T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'ord-3',
    items: [{ product: mockProducts[4], quantity: 1 }, { product: mockProducts[5], quantity: 1 }],
    total: 94.98,
    customerName: 'Robert Martinez',
    customerEmail: 'robert@example.com',
    createdAt: '2025-04-08T10:00:00Z',
    status: 'completed'
  },
];
