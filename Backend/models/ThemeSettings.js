import mongoose from 'mongoose';

const themeSettingsSchema = new mongoose.Schema({
  heroImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2940&auto=format&fit=crop'
  },
  heroTitle: {
    type: String,
    default: 'Transform Your Events Into Unforgettable Experiences'
  },
  heroSubtitle: {
    type: String,
    default: 'From elegant weddings to corporate galas, we create magical moments that last a lifetime.'
  },
  primaryColor: {
    type: String,
    default: '#2563eb'
  },
  secondaryColor: {
    type: String,
    default: '#7c3aed'
  },
  accentColor: {
    type: String,
    default: '#fbbf24'
  },
  companyName: {
    type: String,
    default: 'EventPro'
  },
  companyTagline: {
    type: String,
    default: 'Your dream event, our expertise.'
  }
}, {
  timestamps: true
});

// Only allow one theme settings document
themeSettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const ThemeSettings = mongoose.model('ThemeSettings', themeSettingsSchema);

export default ThemeSettings;

