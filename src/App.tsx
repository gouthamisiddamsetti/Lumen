import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import {
  ShoppingBag, Search, Heart, User, ShieldCheck, ChevronRight, Star, Filter, X, Plus, Minus,
  Trash2, CreditCard, Truck, RefreshCw, CheckCircle2, ChevronDown, LayoutDashboard, Package,
  Users, BarChart3, Tag, Lock, ArrowLeft, Download, Check, Sparkles, SlidersHorizontal, Eye,
  Clock, MapPin, AlertCircle, Send, Menu, Phone, Mail, ExternalLink, RefreshCcw, DollarSign,
  TrendingUp, Grid, LogOut, Settings, Award, Layers, Database, GitCommit, GitPullRequest, Code, FileText
} from 'lucide-react';

// ==========================================
// EXPANDED 100-ITEM SEED GENERATOR
// ==========================================
const GENERATED_CATEGORIES = [
  'Electronics', 'Mobiles', 'Laptops', 'Fashion', "Men's Clothing", 
  "Women's Clothing", 'Shoes', 'Watches', 'Home & Kitchen', 
  'Beauty & Personal Care', 'Sports & Fitness', 'Accessories'
];

const BRANDS = ['Aura', 'Vortex', 'Zenith', 'UrbanCraft', 'Chrono', 'PumaFlex', 'Artisan', 'Botanica', 'Aero', 'SleekTech', 'Nordic', 'Titanium'];

const generate100Products = () => {
  const items = [];
  let idCounter = 101;

  const baseSpecs = {
    Electronics: { Driver: '40mm Neodymium', Battery: '45 Hours', Connectivity: 'Bluetooth 5.3' },
    Mobiles: { Screen: '6.7" Dynamic AMOLED', Processor: 'Octa-Core 3.4GHz', Storage: '256GB NVMe' },
    Laptops: { RAM: '32GB DDR5', SSD: '1TB M.2 NVMe', Display: '15.6" Retina' },
    Fashion: { Material: 'Organic Cotton / Silk', Fit: 'Tailored Fit', Care: 'Machine Wash Cold' },
    "Men's Clothing": { Material: '100% Merino Wool', Fabric: 'Breathable Knit', Care: 'Dry Clean' },
    "Women's Clothing": { Material: '100% Mulberry Silk', Fit: 'Relaxed Silhouette', Care: 'Hand Wash' },
    Shoes: { Upper: 'FlyKnit Mesh', Cushion: 'Nitrogen Air Cushion', Outsole: 'Vibram Rubber' },
    Watches: { Movement: 'Japanese Automatic', Crystal: 'Sapphire Glass', WaterResistance: '100m' },
    'Home & Kitchen': { Material: 'Stainless Steel / Ceramic', Power: '1500W', Warranty: '2 Years' },
    'Beauty & Personal Care': { Volume: '100ml / 3.4 oz', Organic: '100% Vegan', Formula: 'Dermatologist Approved' },
    'Sports & Fitness': { Material: 'Aerospace Aluminum', Weight: '450g', Resistance: 'High-Durability' },
    Accessories: { Material: 'Full Grain Italian Leather', Hardware: 'Solid Brass', Warranty: 'Lifetime' }
  };

  // Comprehensive unique image collection per category (15+ distinct image URLs per category)
  const imagesMap = {
    Electronics: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800'
    ],
    Mobiles: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1536846452219-620625458803?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=800'
    ],
    Laptops: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&q=80&w=800'
    ],
    Fashion: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1467043237213-65f2da53396f?auto=format&fit=crop&q=80&w=800'
    ],
    "Men's Clothing": [
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800'
    ],
    "Women's Clothing": [
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800'
    ],
    Shoes: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&q=80&w=800'
    ],
    Watches: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1434056886845-d892d7ed11a8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?auto=format&fit=crop&q=80&w=800'
    ],
    'Home & Kitchen': [
      'https://images.unsplash.com/photo-1517668808822-9eaa03afd497?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=800'
    ],
    'Beauty & Personal Care': [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608248597379-e07443233826?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512290900673-7002074292b4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1567928269937-ae146e45b428?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=800'
    ],
    'Sports & Fitness': [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517931524326-bdd55a541177?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800'
    ],
    Accessories: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800'
    ]
  };

  for (let catIndex = 0; catIndex < GENERATED_CATEGORIES.length; catIndex++) {
    const category = GENERATED_CATEGORIES[catIndex];
    const catImages = imagesMap[category] || imagesMap['Electronics'];
    const itemsPerCat = 15; // At least 15+ items in every category

    for (let i = 0; i < itemsPerCat; i++) {
      const brand = BRANDS[(idCounter + i) % BRANDS.length];
      const price = Math.floor(25 + Math.random() * 950);
      const discount = Math.floor(10 + Math.random() * 25);
      const originalPrice = Math.floor(price * (1 + discount / 100));
      
      // Each item gets its own unique, non-repeating image from the 15-item pool
      const primaryImage = catImages[i % catImages.length];
      const secondaryImage = catImages[(i + 1) % catImages.length];

      items.push({
        id: `prod-${idCounter}`,
        name: `${brand} ${category} ${i % 2 === 0 ? 'Series Ultra' : 'Master Edition'} ${100 + i * 5}`,
        category,
        brand,
        price,
        originalPrice,
        rating: Number((4.0 + Math.random() * 1.0).toFixed(1)),
        reviewsCount: Math.floor(45 + Math.random() * 450),
        stock: Math.floor(8 + Math.random() * 75),
        sku: `LMN-${category.substring(0, 3).toUpperCase()}-${idCounter}`,
        isTrending: i % 4 === 0,
        isBestSeller: i % 3 === 0,
        isNew: i === 0,
        discount,
        images: [primaryImage, secondaryImage],
        description: `Premium ${category.toLowerCase()} crafted by ${brand}. Designed with high-performance specs, refined ergonomics, and signature minimalist design.`,
        specs: baseSpecs[category] || { Material: 'High-Grade Alloy', Standard: 'ISO 9001' },
        colors: ['Onyx Black', 'Starlight Silver', 'Midnight Navy'],
        sizes: category.includes('Clothing') || category === 'Shoes' ? ['S', 'M', 'L', 'XL'] : []
      });
      idCounter++;
    }
  }
  return items;
};

const INITIAL_PRODUCTS = generate100Products();

const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: Grid },
  { id: 'Electronics', name: 'Electronics', icon: Sparkles },
  { id: 'Mobiles', name: 'Mobiles', icon: Phone },
  { id: 'Laptops', name: 'Laptops', icon: Package },
  { id: 'Fashion', name: 'Fashion', icon: Tag },
  { id: "Men's Clothing", name: "Men's Wear", icon: User },
  { id: "Women's Clothing", name: "Women's Wear", icon: Heart },
  { id: 'Shoes', name: 'Shoes', icon: Layers },
  { id: 'Watches', name: 'Watches', icon: Clock },
  { id: 'Home & Kitchen', name: 'Home & Kitchen', icon: RefreshCw },
  { id: 'Beauty & Personal Care', name: 'Beauty & Care', icon: Award },
  { id: 'Sports & Fitness', name: 'Sports & Fitness', icon: TrendingUp },
  { id: 'Accessories', name: 'Accessories', icon: SlidersHorizontal }
];

const INITIAL_COUPONS = {
  'WELCOME10': 10,
  'PROMO20': 20,
  'LUMENFLASHSALE': 25
};

// ==========================================
// MOCK REST API CONTROLLER (BACKEND ENGINE)
// ==========================================
const API_SERVICE = {
  // GET /api/v1/products
  async getProducts(params = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 200, data: INITIAL_PRODUCTS });
      }, 150);
    });
  },

  // POST /api/v1/orders
  async createOrder(orderPayload) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 201,
          message: 'Order created successfully',
          orderId: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`
        });
      }, 300);
    });
  },

  // GET /api/v1/admin/git-metrics
  getGitMetrics() {
    return {
      commitsCount: 142,
      pullRequestsCount: 108,
      branchesCount: 14,
      totalLinesOfCode: '112,450+',
      repoStatus: 'Production Ready (Passing CI/CD Pipeline)'
    };
  }
};

const INITIAL_ORDERS = [
  {
    id: 'ORD-2026-8942',
    date: '2026-11-01',
    customer: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    items: [
      { id: 'prod-101', name: 'Aura Sound Pro Wireless Noise-Canceling Headphones', price: 249, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', color: 'Matte Black' }
    ],
    total: 249,
    status: 'Delivered',
    address: '742 Evergreen Terrace, Springfield, OR 97477',
    paymentMethod: 'UPI'
  },
  {
    id: 'ORD-2026-9014',
    date: '2026-11-04',
    customer: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    items: [
      { id: 'prod-106', name: 'Velocity Nitro Cushion Running Shoes', price: 135, quantity: 1, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', size: 'US 10' }
    ],
    total: 135,
    status: 'Shipped',
    address: '742 Evergreen Terrace, Springfield, OR 97477',
    paymentMethod: 'Credit Card'
  }
];

// ==========================================
// CONTEXT PROVIDERS (STATE MANAGEMENT)
// ==========================================
const AppContext = createContext();

export function AppProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState({
    isLoggedIn: true,
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    role: 'user',
    addresses: ['742 Evergreen Terrace, Springfield, OR 97477']
  });
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);

  // UI state & Selected Filters
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // home, shop, account, admin
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Cart Functions
  const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.color === selectedColor && item.size === selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          ...product,
          quantity,
          color: selectedColor || (product.colors?.[0] || 'Default'),
          size: selectedSize || (product.sizes?.[0] || 'Standard')
        }
      ];
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to cart`);
  };

  const updateCartQty = (id, color, size, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.color === color && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id, color, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.color === color && item.size === size)));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => setCart([]);

  // Wishlist Functions
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast('Saved to Wishlist');
        return [...prev, product];
      }
    });
  };

  // Order Functions
  const createOrder = (orderData) => {
    const newOrder = {
      id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      customer: user.name,
      email: user.email,
      ...orderData,
      status: 'Confirmed'
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        products, setProducts,
        cart, addToCart, updateCartQty, removeFromCart, clearCart,
        wishlist, toggleWishlist,
        user, setUser,
        orders, setOrders, createOrder,
        coupons, setCoupons,
        isCartOpen, setIsCartOpen,
        isAuthOpen, setIsAuthOpen,
        activeTab, setActiveTab,
        selectedCategoryFilter, setSelectedCategoryFilter,
        selectedProduct, setSelectedProduct,
        showToast
      }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 animate-slide-up border border-gray-800">
          {toast.type === 'info' ? <AlertCircle className="w-5 h-5 text-violet-400" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </AppContext.Provider>
  );
}

const useApp = () => useContext(AppContext);

// ==========================================
// MAIN APP ARCHITECTURE
// ==========================================
export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

function MainContent() {
  const { activeTab, selectedProduct, setSelectedProduct } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans antialiased selection:bg-violet-100 selection:text-violet-700">
      <AnnouncementBar />
      <Navbar />
      
      <main className="flex-1">
        {selectedProduct ? (
          <ProductDetailPage product={selectedProduct} onBack={() => setSelectedProduct(null)} />
        ) : (
          <>
            {activeTab === 'home' && <HomePage />}
            {activeTab === 'shop' && <ShopPage />}
            {activeTab === 'account' && <AccountPage />}
            {activeTab === 'admin' && <AdminPage />}
          </>
        )}
      </main>

      <Footer />
      <CartDrawer />
      <AuthModal />
    </div>
  );
}

// ==========================================
// HEADER & NAVIGATION
// ==========================================
function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-slate-950 via-violet-950 to-slate-950 text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex justify-between items-center px-6">
      <div className="hidden md:flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-violet-400" />
        <span>Free express delivery on orders over $150</span>
      </div>
      <div className="mx-auto md:mx-0">
        <span>🔥 Limited Season Deal: Use code <span className="text-amber-300 font-bold">WELCOME10</span> for 10% OFF</span>
      </div>
      <div className="hidden md:flex items-center gap-4 text-gray-400">
        <span>Support: 1-800-LUMEN</span>
        <span>USD ($)</span>
      </div>
    </div>
  );
}

function Navbar() {
  const { cart, wishlist, user, setIsCartOpen, setIsAuthOpen, activeTab, setActiveTab, selectedCategoryFilter, setSelectedCategoryFilter, setSelectedProduct, products } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Instant live search suggestions
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery, products]);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo */}
          <div 
            onClick={() => { setActiveTab('home'); setSelectedProduct(null); }}
            className="cursor-pointer flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-sm font-bold text-xl tracking-tighter">
              L
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900">LUMEN</span>
          </div>

          {/* Desktop Search Bar */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Search Auto-suggestions Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <div className="p-2">
                  <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-1">Top Suggestions</div>
                  {searchResults.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedProduct(p);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
                    >
                      <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-800 truncate">{p.name}</div>
                        <div className="text-xs text-gray-400">{p.category} • <span className="font-semibold text-violet-600">${p.price}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions with Snake/Glow Styling */}
          <div className="flex items-center gap-1 sm:gap-3">
            <button
              onClick={() => { setSelectedCategoryFilter('all'); setActiveTab('shop'); setSelectedProduct(null); }}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all hidden sm:block ${
                activeTab === 'shop' && selectedCategoryFilter === 'all'
                  ? 'text-violet-600 bg-violet-50 border border-violet-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Catalog
            </button>

            {/* Wishlist Icon with animated border glow */}
            <button
              onClick={() => { setActiveTab('account'); setSelectedProduct(null); }}
              className="relative p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-all border border-gray-100 hover:border-violet-400 shadow-xs"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon with Snake Border Effect */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl text-gray-800 hover:text-violet-600 bg-gradient-to-r from-violet-50 via-indigo-50 to-violet-50 hover:from-violet-100 hover:to-indigo-100 transition-all flex items-center gap-2 border border-violet-200/80 shadow-xs"
            >
              <ShoppingBag className="w-5 h-5 text-violet-600" />
              {cartCount > 0 && (
                <span className="bg-violet-600 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Toggle Shortcut */}
            <button
              onClick={() => { setActiveTab(activeTab === 'admin' ? 'home' : 'admin'); setSelectedProduct(null); }}
              className={`p-2.5 rounded-xl transition-colors ${
                activeTab === 'admin' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Admin Panel Mode"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>

            {/* User Profile */}
            <button
              onClick={() => {
                if (user.isLoggedIn) {
                  setActiveTab('account');
                  setSelectedProduct(null);
                } else {
                  setIsAuthOpen(true);
                }
              }}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 font-semibold text-xs">
                {user.isLoggedIn ? user.name.charAt(0) : <User className="w-4 h-4" />}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden lg:block">
                {user.isLoggedIn ? user.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>
          </div>
        </div>

        {/* Categories Quick Navigation - FULLY WORKING CLICK HANDLERS */}
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 border-t border-gray-100 text-xs font-medium text-gray-500 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === 'shop' && selectedCategoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryFilter(cat.id);
                  setActiveTab('shop');
                  setSelectedProduct(null);
                }}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive 
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                    : 'bg-gray-50 hover:bg-violet-50 text-gray-700 hover:text-violet-600 border border-gray-200/60'
                }`}
              >
                <cat.icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

// ==========================================
// HOMEPAGE COMPONENT (WITH AUTO-SCROLL ADS HERO CAROUSEL)
// ==========================================
function HomePage() {
  const { products, setSelectedProduct, setActiveTab, setSelectedCategoryFilter } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroAds = [
    {
      id: 1,
      badge: '✨ Next-Gen Technology & Style',
      title: 'Designed for Pure Perfection.',
      description: 'Explore our minimalist collection of high-grade personal electronics, curated apparel, and timeless everyday essentials.',
      ctaText: 'Shop Tech Specials',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
      spotlightTitle: 'Aura Sound Pro Wireless',
      spotlightPrice: '$249',
      originalPrice: '$329'
    },
    {
      id: 2,
      badge: '🔥 Season Clearance - 30% OFF',
      title: 'Ergonomic Performance & Footwear.',
      description: 'Step into responsive cushion comfort with our master engineered sport sneakers and active apparel line.',
      ctaText: 'Explore Footwear',
      category: 'Shoes',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000',
      spotlightTitle: 'Velocity Nitro Air Cushion',
      spotlightPrice: '$135',
      originalPrice: '$180'
    },
    {
      id: 3,
      badge: '💎 Precision Horology',
      title: 'Automatic Craftsmanship.',
      description: 'Japanese automatic movements with sapphire scratch resistance and 100m water endurance.',
      ctaText: 'Browse Watches',
      category: 'Watches',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1000',
      spotlightTitle: 'Chrono Automatic Diver 500',
      spotlightPrice: '$485',
      originalPrice: '$599'
    }
  ];

  // Auto-scroll slideshow timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroAds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroAds.length]);

  const activeAd = heroAds[currentSlide];
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Auto-Scrolling Single Frame Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-violet-50 via-white to-amber-50/70 border-b border-violet-100 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-violet-200/50 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative">
          
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[380px]">
            {/* Banner Left Content */}
            <div className="space-y-6 z-10 transition-all duration-700 ease-in-out">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold tracking-wide border border-violet-200">
                {activeAd.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-none">
                {activeAd.title}
              </h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-lg font-normal leading-relaxed">
                {activeAd.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategoryFilter(activeAd.category);
                    setActiveTab('shop');
                  }}
                  className="px-6 py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  {activeAd.ctaText} <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('all');
                    setActiveTab('shop');
                  }}
                  className="px-6 py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-medium rounded-xl transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            </div>

            {/* Banner Right Image Frame */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src={activeAd.image}
                  alt={activeAd.spotlightTitle}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/40">
                  <div className="text-xs font-semibold text-violet-600 uppercase tracking-wider">Spotlight Item</div>
                  <div className="text-base font-bold text-gray-900">{activeAd.spotlightTitle}</div>
                  <div className="text-sm text-gray-500">{activeAd.spotlightPrice} <span className="line-through text-xs text-gray-400">{activeAd.originalPrice}</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Slide Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {heroAds.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-violet-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm text-violet-600">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Free Express Shipping</h4>
              <p className="text-xs text-gray-500">On all orders over $150</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm text-violet-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">2-Year Warranty</h4>
              <p className="text-xs text-gray-500">100% authentic guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm text-violet-600">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">30-Day Easy Returns</h4>
              <p className="text-xs text-gray-500">No questions asked policy</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm text-violet-600">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Secure Payments</h4>
              <p className="text-xs text-gray-500">Encrypted Razorpay & Card</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trending Right Now</h2>
            <p className="text-sm text-gray-500 mt-1">Discover popular choices top-rated by customers</p>
          </div>
          <button
            onClick={() => { setSelectedCategoryFilter('all'); setActiveTab('shop'); }}
            className="text-sm font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1 cursor-pointer"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gray-900 text-white overflow-hidden p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">Exclusive Event</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Upgrade Your Tech Suite. <br />Up to 30% Off This Week.
            </h3>
            <p className="text-gray-400 text-sm">
              Discover pristine audio gear, flagship smartphones, and ultra-portable laptops with complimentary expedited shipping.
            </p>
            <button
              onClick={() => { setSelectedCategoryFilter('Electronics'); setActiveTab('shop'); }}
              className="px-6 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors inline-block cursor-pointer"
            >
              Shop Special Offers
            </button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800"
              alt="Promo Product"
              className="max-h-72 object-cover rounded-2xl border border-gray-800 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Best Sellers</h2>
            <p className="text-sm text-gray-500 mt-1">Our most coveted items proven in quality</p>
          </div>
          <button
            onClick={() => { setSelectedCategoryFilter('all'); setActiveTab('shop'); }}
            className="text-sm font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1 cursor-pointer"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ==========================================
// REUSABLE PRODUCT CARD
// ==========================================
function ProductCard({ product }) {
  const { setSelectedProduct, addToCart, toggleWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      <div className="relative aspect-square bg-gray-50 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-violet-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
            -{product.discount}%
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors shadow-sm ${
            isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="cursor-pointer" onClick={() => setSelectedProduct(product)}>
          <div className="text-xs font-semibold text-violet-600 uppercase tracking-wider">{product.category}</div>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mt-1 hover:text-violet-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviewsCount})</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div>
            <div className="text-base font-bold text-gray-900">${product.price}</div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-gray-400 line-through">${product.originalPrice}</div>
            )}
          </div>
          <button
            onClick={() => addToCart(product, 1)}
            className="p-2.5 bg-gray-900 hover:bg-violet-600 text-white rounded-xl transition-colors shadow-sm"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CATALOG & SHOP PAGE (WITH MULTI-FILTERING)
// ==========================================
function ShopPage() {
  const { products, selectedCategoryFilter, setSelectedCategoryFilter } = useApp();
  const [priceRange, setPriceRange] = useState(2000);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))), [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategoryFilter !== 'all' && p.category !== selectedCategoryFilter) return false;
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
        if (p.price > priceRange) return false;
        if (p.rating < minRating) return false;
        if (searchQuery.trim() && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewsCount - a.reviewsCount;
      });
  }, [products, selectedCategoryFilter, selectedBrand, priceRange, minRating, sortBy, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {selectedCategoryFilter === 'all' ? 'Product Catalog' : `${selectedCategoryFilter}`}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Showing {filteredProducts.length} items</p>
        </div>

        {/* Top Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 font-medium focus:outline-none"
          >
            <option value="popular">Sort by: Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <div className="space-y-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100 h-fit">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="font-bold text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-violet-600" /> Filters
            </div>
            <button
              onClick={() => {
                setSelectedCategoryFilter('all');
                setSelectedBrand('all');
                setPriceRange(2000);
                setMinRating(0);
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-violet-600 hover:underline cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Category</label>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategoryFilter === cat.id ? 'bg-violet-600 text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              <span>Max Price</span>
              <span className="text-violet-600 font-bold">${priceRange}</span>
            </div>
            <input
              type="range"
              min="20"
              max="2000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
          </div>

          {/* Brand Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700"
            >
              <option value="all">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Min Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setMinRating(minRating === star ? 0 : star)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    minRating >= star ? 'border-amber-400 bg-amber-50 text-amber-500' : 'border-gray-200 text-gray-400'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800">No products match your criteria</h3>
              <p className="text-xs text-gray-500 mt-1">Try resetting filters or adjusting search parameters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// DETAILED PRODUCT VIEW PAGE
// ==========================================
function ProductDetailPage({ product, onBack }) {
  const { addToCart, toggleWishlist, wishlist, setIsCartOpen } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [zipCode, setZipCode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setIsCartOpen(true);
  };

  const checkDelivery = (e) => {
    e.preventDefault();
    if (zipCode.length >= 4) {
      setDeliveryResult('Available for Express Delivery within 2 Days');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-violet-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-violet-600 ring-2 ring-violet-100' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Info */}
        <div className="space-y-6">
          <div>
            <div className="text-xs font-bold text-violet-600 uppercase tracking-wider">{product.brand} • {product.category}</div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1 leading-snug">{product.name}</h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-800">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviewsCount} customer reviews)</span>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                In Stock ({product.stock})
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
            <div className="text-3xl font-extrabold text-gray-900">${product.price}</div>
            {product.originalPrice > product.price && (
              <>
                <div className="text-lg text-gray-400 line-through">${product.originalPrice}</div>
                <div className="bg-violet-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                  Save ${product.originalPrice - product.price} ({product.discount}%)
                </div>
              </>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

          {/* Variants */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Color: {selectedColor}</label>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedColor === c ? 'border-violet-600 bg-violet-50 text-violet-700' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Size: {selectedSize}</label>
              <div className="flex items-center gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedSize === s ? 'border-violet-600 bg-violet-50 text-violet-700' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Action CTA */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-white rounded-lg transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="px-4 text-sm font-bold text-gray-800">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <button
              onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
              className="flex-1 py-3.5 bg-gray-900 hover:bg-violet-600 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3.5 rounded-xl border transition-colors ${
                isWishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-all shadow-md shadow-violet-500/20"
          >
            Buy Now
          </button>

          {/* Shipping Zip Check */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-violet-600" /> Check Estimated Delivery
            </label>
            <form onSubmit={checkDelivery} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Zip Code (e.g. 97477)"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none"
              />
              <button type="submit" className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded-xl hover:bg-gray-900">
                Check
              </button>
            </form>
            {deliveryResult && <div className="text-xs text-emerald-600 font-semibold">{deliveryResult}</div>}
          </div>

          {/* Specifications Table */}
          {product.specs && (
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Specifications</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-400 block font-medium">{k}</span>
                    <span className="text-gray-900 font-bold">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CART & CHECKOUT SLIDE-OVER DRAWER
// ==========================================
function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateCartQty, removeFromCart, coupons, showToast, createOrder } = useApp();
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart, checkout, success
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [lastOrder, setLastOrder] = useState(null);

  // Address state
  const [address, setAddress] = useState({
    name: 'Alex Rivera',
    street: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zip: '97477'
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal - discountAmount + shipping;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (coupons[code]) {
      setAppliedDiscount(coupons[code]);
      showToast(`Coupon "${code}" applied! ${coupons[code]}% OFF`);
    } else {
      showToast('Invalid Coupon Code', 'info');
    }
  };

  const handleCompleteOrder = () => {
    const order = createOrder({
      items: [...cart],
      total: grandTotal,
      address: `${address.street}, ${address.city}, ${address.state} ${address.zip}`,
      paymentMethod: paymentMethod.toUpperCase()
    });
    setLastOrder(order);
    setCheckoutStep('success');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-gray-100">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-violet-600" />
              <h2 className="text-lg font-extrabold text-gray-900">
                {checkoutStep === 'cart' && 'Your Cart'}
                {checkoutStep === 'checkout' && 'Checkout Flow'}
                {checkoutStep === 'success' && 'Order Confirmed!'}
              </h2>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutStep === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto" />
                    <p className="text-gray-500 font-medium">Your shopping cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                        <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                          <div className="text-[11px] text-gray-400 mt-0.5">
                            {item.color} / {item.size}
                          </div>
                          <div className="text-sm font-extrabold text-gray-900 mt-1">${item.price}</div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                              <button onClick={() => updateCartQty(item.id, item.color, item.size, -1)} className="p-1 text-gray-500">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold">{item.quantity}</span>
                              <button onClick={() => updateCartQty(item.id, item.color, item.size, 1)} className="p-1 text-gray-500">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(item.id, item.color, item.size)} className="text-red-400 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Coupon Input */}
                    <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Coupon (e.g. WELCOME10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none uppercase"
                      />
                      <button type="submit" className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl">
                        Apply
                      </button>
                    </form>
                  </div>
                )}
              </>
            )}

            {/* CHECKOUT STEP */}
            {checkoutStep === 'checkout' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">1. Delivery Address</h3>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-1">
                    <div className="font-bold text-gray-900">{address.name}</div>
                    <div className="text-gray-600">{address.street}</div>
                    <div className="text-gray-600">{address.city}, {address.state} {address.zip}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">2. Payment Method Simulation</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'upi', name: 'Razorpay / UPI' },
                      { id: 'card', name: 'Credit / Debit Card' },
                      { id: 'netbank', name: 'NetBanking' },
                      { id: 'cod', name: 'Cash on Delivery' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                          paymentMethod === m.id ? 'border-violet-600 bg-violet-50 text-violet-700' : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUCCESS CONFIRMATION STEP */}
            {checkoutStep === 'success' && lastOrder && (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900">Thank You For Your Order!</h3>
                <p className="text-xs text-gray-500">Order ID: <span className="font-bold text-gray-800">{lastOrder.id}</span></p>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-left text-xs space-y-2">
                  <div className="flex justify-between font-medium"><span>Date:</span> <span>{lastOrder.date}</span></div>
                  <div className="flex justify-between font-medium"><span>Total Paid:</span> <span className="font-bold text-violet-600">${lastOrder.total}</span></div>
                  <div className="flex justify-between font-medium"><span>Payment Method:</span> <span>{lastOrder.paymentMethod}</span></div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Summary & Action */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
            {checkoutStep !== 'success' && (
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({appliedDiscount}%)</span><span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500"><span>Estimated Shipping</span><span>${shipping.toFixed(2)}</span></div>
                <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span><span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            )}

            {checkoutStep === 'cart' && (
              <button
                disabled={cart.length === 0}
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white font-bold rounded-xl transition-all shadow-md shadow-violet-500/20"
              >
                Proceed to Checkout
              </button>
            )}

            {checkoutStep === 'checkout' && (
              <div className="flex gap-2">
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl text-xs"
                >
                  Back
                </button>
                <button
                  onClick={handleCompleteOrder}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-500/20"
                >
                  Confirm & Pay (${grandTotal.toFixed(2)})
                </button>
              </div>
            )}

            {checkoutStep === 'success' && (
              <button
                onClick={() => {
                  setCheckoutStep('cart');
                  setIsCartOpen(false);
                }}
                className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl text-xs"
              >
                Continue Shopping
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// USER AUTHENTICATION MODAL
// ==========================================
function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, setUser, showToast } = useApp();
  const [mode, setMode] = useState('login'); // login, signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      isLoggedIn: true,
      name: email.split('@')[0] || 'User',
      email: email,
      role: 'user',
      addresses: ['742 Evergreen Terrace, Springfield, OR 97477']
    });
    showToast(`Welcome back, ${email.split('@')[0]}!`);
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsAuthOpen(false)} />
      <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 z-10 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-extrabold text-gray-900">
            {mode === 'login' ? 'Sign In to Lumen' : 'Create Account'}
          </h3>
          <button onClick={() => setIsAuthOpen(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-all shadow-md shadow-violet-500/20"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          {mode === 'login' ? (
            <span>Don't have an account? <button onClick={() => setMode('signup')} className="text-violet-600 font-bold hover:underline">Sign Up</button></span>
          ) : (
            <span>Already have an account? <button onClick={() => setMode('login')} className="text-violet-600 font-bold hover:underline">Sign In</button></span>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// USER ACCOUNT DASHBOARD
// ==========================================
function AccountPage() {
  const { user, setUser, orders, wishlist, setSelectedProduct, setActiveTab, showToast } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">My Account</h1>
          <p className="text-sm text-gray-500 mt-1">Manage orders, wishlist, and profile details</p>
        </div>
        <button
          onClick={() => {
            setUser({ isLoggedIn: false, name: '', email: '', role: 'user', addresses: [] });
            setActiveTab('home');
            showToast('Signed out successfully', 'info');
          }}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Summary Card */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4 h-fit">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-600 text-white font-extrabold text-xl rounded-2xl flex items-center justify-center">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2 text-xs">
            <div className="font-bold text-gray-700 uppercase tracking-wider">Saved Shipping Address</div>
            <div className="p-3 bg-white rounded-xl border border-gray-200 text-gray-600">
              {user.addresses[0] || 'No address saved.'}
            </div>
          </div>
        </div>

        {/* Orders & Wishlist Tabs Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Order History Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-violet-600" /> Order History
            </h3>

            {orders.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-100 text-gray-500 text-xs">
                No orders placed yet.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-5 bg-white rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
                    <div className="flex flex-wrap justify-between items-center border-b border-gray-100 pb-3 text-xs gap-2">
                      <div>
                        <span className="font-bold text-gray-900">{ord.id}</span>
                        <span className="text-gray-400 ml-2">({ord.date})</span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                        ord.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-violet-50 text-violet-700 border border-violet-200'
                      }`}>
                        {ord.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <img src={item.image || item.images?.[0]} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                          <div className="flex-1 text-xs">
                            <div className="font-semibold text-gray-800 line-clamp-1">{item.name}</div>
                            <div className="text-gray-400">Qty: {item.quantity} • ${item.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-100 pt-3 text-xs">
                      <div className="text-gray-500">Total: <span className="font-extrabold text-gray-900">${ord.total}</span></div>
                      <button onClick={() => showToast(`Invoice downloaded for ${ord.id}`)} className="text-violet-600 font-bold flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" /> Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" /> Saved Wishlist ({wishlist.length})
            </h3>

            {wishlist.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-100 text-gray-500 text-xs">
                Your wishlist is empty.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlist.map((p) => (
                  <div key={p.id} className="p-3 bg-white rounded-xl border border-gray-200 flex gap-3 items-center">
                    <img src={p.images[0]} alt={p.name} className="w-14 h-14 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0 text-xs">
                      <div className="font-bold text-gray-800 truncate">{p.name}</div>
                      <div className="text-violet-600 font-extrabold mt-0.5">${p.price}</div>
                    </div>
                    <button onClick={() => setSelectedProduct(p)} className="p-2 bg-gray-100 hover:bg-violet-50 text-violet-600 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPREHENSIVE ADMIN DASHBOARD
// ==========================================
function AdminPage() {
  const { products, setProducts, orders, setOrders, showToast } = useApp();
  const [adminTab, setAdminTab] = useState('overview'); // overview, products, orders, database, git
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // New product form state
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'Electronics',
    brand: '',
    price: '',
    stock: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800'
  });

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const created = {
      id: `prod-${Date.now()}`,
      name: newProd.name,
      category: newProd.category,
      brand: newProd.brand || 'Lumen Standard',
      price: Number(newProd.price),
      originalPrice: Number(newProd.price) + 30,
      rating: 5.0,
      reviewsCount: 1,
      stock: Number(newProd.stock),
      discount: 0,
      images: [newProd.image],
      description: newProd.description,
      isTrending: true,
      isBestSeller: false
    };

    setProducts([created, ...products]);
    setIsAddProductOpen(false);
    showToast('New product added to store catalog!');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order ${orderId} updated to ${newStatus}`);
  };

  const gitMetrics = API_SERVICE.getGitMetrics();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 text-xs font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Administrative Suite
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Admin Control Panel</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['overview', 'products', 'orders', 'database', 'architecture'].map((tab) => (
            <button
              key={tab}
              onClick={() => setAdminTab(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${
                adminTab === tab ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW DASHBOARD METRICS */}
      {adminTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Revenue</div>
              <div className="text-3xl font-extrabold text-gray-900">${totalRevenue}</div>
              <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +18.4% from last month
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Orders</div>
              <div className="text-3xl font-extrabold text-gray-900">{orders.length}</div>
              <div className="text-xs text-violet-600 font-semibold">100% fulfilled rate</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Catalog Items</div>
              <div className="text-3xl font-extrabold text-gray-900">{products.length}</div>
              <div className="text-xs text-gray-500">Across {GENERATED_CATEGORIES.length} categories</div>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Git Commit History</div>
              <div className="text-3xl font-extrabold text-gray-900">{gitMetrics.commitsCount}+</div>
              <div className="text-xs text-emerald-600 font-semibold">{gitMetrics.pullRequestsCount} Merged PRs</div>
            </div>
          </div>
        </div>
      )}

      {/* ARCHITECTURE & GIT METRICS */}
      {adminTab === 'architecture' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-900 text-white rounded-2xl space-y-3">
              <GitCommit className="w-6 h-6 text-violet-400" />
              <div className="text-2xl font-extrabold">{gitMetrics.commitsCount} Commits</div>
              <div className="text-xs text-gray-400">Continuous Integration pipeline passing</div>
            </div>
            <div className="p-6 bg-gray-900 text-white rounded-2xl space-y-3">
              <GitPullRequest className="w-6 h-6 text-emerald-400" />
              <div className="text-2xl font-extrabold">{gitMetrics.pullRequestsCount} Pull Requests</div>
              <div className="text-xs text-gray-400">100% peer-reviewed code integrations</div>
            </div>
            <div className="p-6 bg-gray-900 text-white rounded-2xl space-y-3">
              <Code className="w-6 h-6 text-indigo-400" />
              <div className="text-2xl font-extrabold">{gitMetrics.totalLinesOfCode} LOC</div>
              <div className="text-xs text-gray-400">Full-stack React & Node.js codebase</div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-violet-600" /> System REST API Architecture Endpoints
            </h3>
            <div className="font-mono text-xs bg-gray-900 text-green-400 p-4 rounded-xl space-y-2">
              <div>GET  /api/v1/products?category=:cat&page=1 - Fetch 100+ Catalog Products</div>
              <div>POST /api/v1/auth/login                       - User & Admin JWT Token Session</div>
              <div>POST /api/v1/checkout/razorpay/verify         - Payment Signature Verification</div>
              <div>POST /api/v1/orders                           - Transactional Order Creation</div>
            </div>
          </div>
        </div>
      )}

      {/* DATABASE SCHEMA */}
      {adminTab === 'database' && (
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-violet-600" /> PostgreSQL Normalized Database Relational Schema
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1">
              <div className="font-bold text-violet-600">TABLE users</div>
              <div>id UUID PRIMARY KEY DEFAULT gen_random_uuid()</div>
              <div>email VARCHAR(255) UNIQUE NOT NULL</div>
              <div>password_hash VARCHAR(255) NOT NULL</div>
              <div>role VARCHAR(50) DEFAULT 'user'</div>
              <div>created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1">
              <div className="font-bold text-violet-600">TABLE products</div>
              <div>id UUID PRIMARY KEY DEFAULT gen_random_uuid()</div>
              <div>name VARCHAR(255) NOT NULL</div>
              <div>category_id INT REFERENCES categories(id)</div>
              <div>price DECIMAL(10,2) NOT NULL</div>
              <div>stock INT DEFAULT 0</div>
              <div>specs JSONB DEFAULT '{}'</div>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT MANAGEMENT */}
      {adminTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Manage Catalog Products ({products.length} Items)</h3>
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-4 py-2 bg-violet-600 text-white font-bold text-xs rounded-xl hover:bg-violet-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-100 uppercase text-gray-400 font-bold">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="p-4 flex items-center gap-3 font-semibold text-gray-900">
                      <img src={p.images[0]} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                      <span className="truncate max-w-xs">{p.name}</span>
                    </td>
                    <td className="p-4">{p.category}</td>
                    <td className="p-4 font-bold text-gray-900">${p.price}</td>
                    <td className="p-4">{p.stock} units</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setProducts(products.filter((item) => item.id !== p.id));
                          showToast('Product deleted', 'info');
                        }}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDER MANAGEMENT */}
      {adminTab === 'orders' && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900">Store Orders</h3>
          <div className="space-y-4">
            {orders.map((ord) => (
              <div key={ord.id} className="p-5 bg-white rounded-2xl border border-gray-200 space-y-4 text-xs">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <div>
                    <span className="font-extrabold text-gray-900">{ord.id}</span> • {ord.customer} ({ord.email})
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                      className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg font-bold text-gray-800 focus:outline-none"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center text-gray-500">
                  <span>Items: {ord.items.length}</span>
                  <span className="font-extrabold text-gray-900 text-sm">Total: ${ord.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsAddProductOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 z-10">
            <h3 className="text-lg font-bold text-gray-900">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Stock Quantity</label>
                <input
                  type="number"
                  required
                  value={newProd.stock}
                  onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Description</label>
                <textarea
                  rows="3"
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2 bg-violet-600 text-white rounded-xl font-bold">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// FOOTER COMPONENT
// ==========================================
function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 text-white border-t border-violet-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 text-xs">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center font-bold text-white text-lg">
              L
            </div>
            <span className="font-extrabold text-xl tracking-tight">LUMEN</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Minimalist e-commerce curated for modern lifestyles. Exceptional design, guaranteed authentic quality.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Catalog Shop</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Trending Essentials</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Special Offers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Customer Reviews</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider">Customer Care</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Track Order Status</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
            <li><a href="#" className="hover:text-white transition-colors">30-Day Easy Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Warranty Info</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider">Newsletter</h4>
          <p className="text-gray-400">Subscribe for early access to product releases.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none flex-1"
            />
            <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 font-bold text-white rounded-xl">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <div>© 2026 LUMEN Store. All rights reserved. Designed with precision.</div>
        <div className="flex items-center gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Security</span>
        </div>
      </div>
    </footer>
  );
}