import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Event from '../models/Event.js';
import Category from '../models/Category.js';
import ThemeSettings from '../models/ThemeSettings.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await Event.deleteMany();
    // await Category.deleteMany();

    // Seed Categories
    const categories = [
      'Marriage/Wedding',
      'Naming Ceremony',
      'Birthday Party',
      'Anniversary',
      'Corporate Event',
      'Graduation',
      'Baby Shower',
      'Engagement',
      'Reception',
      'Other'
    ];

    for (const catName of categories) {
      const existing = await Category.findOne({ name: catName });
      if (!existing) {
        await Category.create({ name: catName });
        console.log(`Created category: ${catName}`);
      }
    }

    // Seed Theme Settings
    const existingTheme = await ThemeSettings.findOne();
    if (!existingTheme) {
      await ThemeSettings.create({
        heroImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2940&auto=format&fit=crop',
        heroTitle: 'Transform Your Events Into Unforgettable Experiences',
        heroSubtitle: 'From elegant weddings to corporate galas, we create magical moments that last a lifetime.',
        primaryColor: '#2563eb',
        secondaryColor: '#7c3aed',
        accentColor: '#fbbf24',
        companyName: 'EventPro',
        companyTagline: 'Your dream event, our expertise.'
      });
      console.log('Created theme settings');
    }

    // Seed Sample Events (optional)
    const sampleEvents = [
      {
        title: 'Elegant Wedding Package',
        description: 'A complete wedding planning service with venue decoration, catering, photography, and music. Perfect for your special day.',
        category: 'Marriage/Wedding',
        price: 5000,
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop'
      },
      {
        title: 'Corporate Conference',
        description: 'Professional event management for corporate conferences, seminars, and business meetings with all necessary arrangements.',
        category: 'Corporate Event',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop'
      },
      {
        title: 'Birthday Celebration',
        description: 'Make your birthday memorable with our complete party planning service including decorations, cake, and entertainment.',
        category: 'Birthday Party',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop'
      }
    ];

    for (const eventData of sampleEvents) {
      const existing = await Event.findOne({ title: eventData.title });
      if (!existing) {
        await Event.create(eventData);
        console.log(`Created event: ${eventData.title}`);
      }
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

