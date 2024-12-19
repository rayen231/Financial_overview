# Finance Frontend

This repository contains the Angular-based frontend of the Finance Insights project.

## Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [Angular CLI](https://angular.io/cli) (v15 or higher)

## Steps to Run the Frontend

### 1. Navigate to the Frontend Directory
```bash
cd back
```

### 2. Install Dependencies
Install all required Node modules:
```bash
npm install
```

### 3. Serve the Application
Run the development server:
```bash
ng serve
```

The application will be available at `http://localhost:4200/` by default.

## Build for Production
To create a production-ready build:
```bash
ng build --prod
```

The compiled application files will be located in the `dist/` directory.

## Project Structure
Below is a quick overview of the main files and directories:

```plaintext
finance/
├── src/
│   ├── app/
│   │   ├── components/         # All reusable components
│   │   ├── services/           # Angular services (e.g., StockService)
│   │   ├── dashboard/          # Dashboard feature
│   │   └── app.component.ts    # Root component
│   ├── assets/                 # Static files (e.g., images)
│   ├── environments/           # Environment-specific configurations
│   └── index.html              # Main HTML file
├── angular.json                # Angular CLI configuration
├── package.json                # Node dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Notes
- Ensure the backend is running and accessible for API calls (see backend README for setup).
- Update `environment.ts` files to configure API endpoints and other environment-specific settings.

### Troubleshooting
- If `ng serve` fails, try clearing the Angular cache:
  ```bash
  ng cache clean
  ```
- Ensure all dependencies are installed correctly:
  ```bash
  npm install
  ```

For any issues, feel free to open a ticket in this repository.
