# Development Guide

## 🚀 **Static Website Development**

This is now a **100% static website** with no server-side dependencies.

### **Development Commands:**

```bash
# Start development server
npm run dev

# Alternative development server command
npm run dev:client

# Build for production
npm run build

# Preview production build locally
npm run preview

# Serve built files
npm run start

# Type checking
npm run check
```

### **Development Server:**

The development server runs on **http://localhost:5000**

- Hot reload enabled
- TypeScript support
- Tailwind CSS compilation
- WebGL effects work in development

### **Project Structure:**

```
client/
├── src/
│   ├── components/
│   │   ├── hero.tsx          # Hero section with LightPillar
│   │   ├── services.tsx      # Services section (clean)
│   │   ├── projects.tsx      # Projects section (clean)
│   │   ├── LightPillar.tsx   # WebGL background effect
│   │   ├── Logo.tsx          # SVG logo component
│   │   └── ...
│   ├── hooks/
│   ├── lib/
│   └── pages/
├── public/
└── index.html
```

### **Key Features:**

- **Single Background Effect**: Only LightPillar in hero section
- **Clean Sections**: Services and Projects have minimal backgrounds
- **Optimized Performance**: Fast loading, mobile-friendly
- **Interactive**: LightPillar responds to mouse movement
- **Responsive**: Works on all device sizes

### **Development Tips:**

1. **Hot Reload**: Changes appear instantly in browser
2. **TypeScript**: Full type checking and IntelliSense
3. **Tailwind**: Utility-first CSS with JIT compilation
4. **WebGL**: LightPillar effect works in development mode
5. **Mobile Testing**: Use browser dev tools for mobile simulation

### **Deployment:**

```bash
# Build for production
npm run build

# Files will be in dist/ folder
# Upload dist/ contents to any static hosting service
```

### **Hosting Options:**

- **Netlify**: Drag & drop dist/ folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Push dist/ to gh-pages branch
- **Any Static Host**: Upload dist/ contents

### **Performance:**

- **Initial Load**: ~300kB gzipped
- **LightPillar**: Loads separately (~122kB)
- **Mobile Optimized**: Reduced quality on mobile devices
- **Fast**: Optimized for low bandwidth connections

The website is now ready for development and deployment! 🎉