# 📄 ProCV Builder - Professional Resume Creator

ProCV Builder is a high-performance, responsive web application built with **React**, **Vite**, and **Tailwind CSS**. It allows users to create high-impact, ATS-friendly resumes with a real-time live preview and instant export to PDF and Word formats.

## ✨ Key Features

- **Live Preview**: See your changes instantly as you type.
- **Multiple Templates**: Choose between Classic, Modern, Minimal, and Professional layouts.
- **Dynamic Accent Colors**: Customize the CV's theme color to match your personal brand.
- **Auto-Sync & Local Persistence**: Data is automatically saved to LocalStorage, so you never lose your progress.
- **Export Capabilities**:
  - **Direct PDF Download**: High-quality A4 formatted PDF with smart page breaking.
  - **Word (DOCX) Export**: Editable Word documents for further customization.
- **Fully Responsive**: Optimized for high-performance usage on Mobile, Tablet, and Desktop.
- **ATS Friendly**: Structured data ensures your resume is easily read by automated recruitment systems.
- **SEO Optimized**: Fully prepared for search engine visibility with correct Meta Tags and OpenGraph data.

## 🚀 Tech Stack

- **Framework**: React 18+ (with Vite for blazing fast development)
- **Styling**: Tailwind CSS v4 (Vanilla CSS fallback for high customization)
- **Icons**: Lucide React
- **Form Management**: React Hook Form with Zod validation
- **Exports**: `html2pdf.js`, `html-docx-js-typescript`
- **Performance**: Memoized components and debounced state updates

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mahmoudhussein6/cv-builder.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `src/components/`: Reusable UI components (CVForm, CVPreview, FormFields).
- `src/lib/`: Utility functions and Zod schema definitions.
- `src/styles/`: Custom CSS including print and PDF optimization.
- `index.html`: SEO-optimized entry point.

## 👤 Author

**Mahmoud Hussein Kamal**
- [LinkedIn](https://www.linkedin.com/in/mahmoud-hussein-0bb055242/)
- [GitHub](https://github.com/Mahmoudhussein6)

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
