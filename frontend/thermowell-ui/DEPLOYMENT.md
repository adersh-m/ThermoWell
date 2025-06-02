# ThermoWell Deployment Guide

## Deployment Details

The ThermoWell application is deployed on Vercel, a cloud platform for static sites and Serverless Functions.

- **Production URL**: https://thermo-well-1rgily7gx-adersh-ms-projects.vercel.app
- **Deployment Date**: June 2, 2025
- **Vercel Project**: thermo-well

## Deployment Configuration

The application is deployed with the following configuration:

1. **Framework**: Vite
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Node.js Version**: 20.x (default)

## Configuration Files

- **vercel.json**: Contains deployment configuration
  ```json
  {
    "framework": "vite",
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "routes": [
      { "src": "/(.*)", "dest": "/index.html" }
    ]
  }
  ```

- **.vercelignore**: Excludes unnecessary files from deployment
  ```
  .git
  node_modules
  .vscode
  README.md
  ARCHITECTURE.md
  APP_FLOW.md
  BUTTON_STANDARDIZATION.md
  DEMO_SCRIPT.md
  PAGES_DOCUMENTATION.md
  ROADMAP.md
  TODO.md
  USER_JOURNEY.md
  ```

## Deployment Process

1. **Install Vercel CLI**: 
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

## Updating the Application

To update the deployed application:

1. Make your changes to the codebase
2. Test locally with `npm run dev`
3. Deploy the updated application:
   ```bash
   vercel --prod
   ```

## Environment Variables

If you need to add environment variables in the future:

1. Create a `.env` file locally for development
2. Add environment variables to your Vercel project:
   ```bash
   vercel env add NAME_OF_ENV_VAR
   ```

## Custom Domains

To add a custom domain:

1. Run:
   ```bash
   vercel domains add yourdomain.com
   ```
2. Follow the verification steps provided by Vercel

## Monitoring and Logs

1. **View recent deployments**:
   ```bash
   vercel ls
   ```

2. **View logs**:
   ```bash
   vercel logs https://thermo-well-1rgily7gx-adersh-ms-projects.vercel.app
   ```

3. **Dashboard**: Visit [Vercel Dashboard](https://vercel.com/dashboard) for comprehensive monitoring

## Troubleshooting

If you encounter deployment issues:

1. **Check build logs**:
   ```bash
   vercel logs https://thermo-well-1rgily7gx-adersh-ms-projects.vercel.app
   ```

2. **Inspect deployment**:
   ```bash
   vercel inspect https://thermo-well-1rgily7gx-adersh-ms-projects.vercel.app
   ```

3. **Test locally**:
   ```bash
   npm run build
   npm run preview
   ```
