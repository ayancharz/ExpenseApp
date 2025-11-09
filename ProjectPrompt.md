# Build a Personal Expense Tracking Web Application

I need you to create a web application for tracking personal expenses across multiple bank accounts and credit cards. This app will help me analyze spending patterns and understand where my money goes each month.

## Core Technical Requirements

**Architecture:**
- Web application (Python Flask/FastAPI backend + modern HTML/JS frontend)
- Local SQLite database for data storage
- Design the data access layer to allow future migration to PostgreSQL/cloud database
- Responsive design that works on desktop and tablet

**Database Schema Requirements:**
Create tables for:
1. `accounts` - Store different accounts (Chase Checking, Chase Savings, Chase Card 1, Chase Card 2, Robinhood Gold)
2. `transactions` - Common format for all transactions with fields:
   - id, date, description, amount (negative for expenses, positive for income)
   - account_id, category, original_category (from bank), merchant_cleaned (edited name)
   - import_date, csv_source_file, raw_data (original CSV row for debugging)
   - is_deleted (soft delete), manually_added (boolean)
3. `categories` - Flat category list (Groceries, Dining, Transportation, Entertainment, Utilities, Shopping, Healthcare, Other)
4. `category_rules` - Auto-categorization rules (merchant patterns → category)
5. `import_logs` - Track which files have been imported to help with duplicate detection

## CSV Import System

**Multi-Format Parser:**
Build a parser system that auto-detects and handles 5 different CSV formats:
- Chase Checking (different column structure)
- Chase Savings (different column structure)
- Chase Credit Cards (different from checking/savings)
- Robinhood Gold Card

**Import Features:**
1. **Bulk upload** - Accept multiple CSV files at once via drag-and-drop
2. **Auto-detection** - Identify format by examining CSV headers
3. **Format memory** - Remember successful format identifications
4. **Preview** - Show parsed transactions before importing
5. **Error handling** - Stop on parsing errors and show which rows failed with clear messages
6. **Duplicate detection** - Use composite key (date + description + amount + account) to identify true duplicates
   - Don't remove legitimate duplicate transactions (e.g., two identical Starbucks purchases on same day)

## Auto-Categorization System

1. **Initial rules** - Start with common merchant→category mappings:
   - WHOLEFDS/WHOLE FOODS → Groceries
   - STARBUCKS/DUNKIN → Dining
   - SHELL/EXXON/CHEVRON → Transportation
   - NETFLIX/SPOTIFY/HULU → Entertainment
   - Default unknown → "Other"

2. **Learning system** - When user recategorizes a transaction:
   - Apply same category to all similar merchant names
   - Use fuzzy matching for merchant variations (STARBUCKS #1234 = STARBUCKS #5678)
   - Store new rule in category_rules table

## User Interface Requirements

**Dashboard Page:**
- Three key metrics at top:
  - Current month spending vs previous month (with % change)
  - Current month income vs previous month (with % change)  
  - Net (income - expenses) for current month
- Category breakdown pie chart for current month
- Quick filters for: This Month, Last Month, This Year
- Navigation to other views

**Transactions Page:**
- Searchable, filterable table of all transactions
- Search by merchant name, amount, or description
- Filter by: date range, category, account, amount range
- Inline editing for:
  - Category (dropdown)
  - Merchant name (click to edit and clean up)
  - Delete transaction (soft delete)
- Bulk actions: Recategorize selected, Delete selected
- Add manual transaction button (for cash expenses)

**Import Page:**
- Drag-and-drop zone for CSV files
- Show upload progress and file detection results
- Preview parsed transactions in table before confirming import
- Clear error messages if parsing fails
- Import history log showing past imports

**Reports Page:**
- Monthly view: Bar chart comparing spending across categories
- Yearly view: Line graph showing spending trends by month
- Year-over-year comparison: This year vs last year by month
- Export functionality:
  - Export filtered transactions to CSV
  - Export report/charts to PDF

**Manual Transaction Entry Modal:**
- Fields: Date, Description, Amount, Account, Category
- Option to mark as income or expense
- Save and add another option

## Implementation Guidelines

1. **Start with core functionality:**
   - Database setup and models
   - CSV parser for one format first, then add others
   - Basic transaction list view
   - Add features incrementally

2. **Use modern, lightweight libraries:**
   - Backend: FastAPI or Flask
   - Database ORM: SQLAlchemy
   - Frontend: Vanilla JS or Alpine.js (avoid heavy frameworks)
   - Charts: Chart.js or similar
   - CSS: Tailwind or simple custom CSS
   - CSV parsing: Python's csv module + pandas for complex operations

3. **File Structure:**
```
expense-tracker/
├── app.py (main application)
├── database.py (SQLAlchemy models)
├── parsers/
│   ├── base_parser.py
│   ├── chase_parser.py
│   └── robinhood_parser.py
├── static/
│   ├── css/
│   └── js/
├── templates/
│   ├── dashboard.html
│   ├── transactions.html
│   ├── import.html
│   └── reports.html
├── utils/
│   ├── categorizer.py
│   └── duplicate_detector.py
└── requirements.txt
```

4. **Sample categories to pre-populate:**
- Groceries, Dining, Transportation, Entertainment, Shopping
- Utilities, Healthcare, Insurance, Rent/Mortgage
- Travel, Personal Care, Education, Other

5. **Error handling priorities:**
- Never lose data during import
- Clear error messages for users
- Log all imports and changes for debugging

## Key Features to Focus On:

1. **Robust CSV parsing** that handles edge cases
2. **Smart duplicate detection** that doesn't remove legitimate duplicates  
3. **Intuitive categorization** that learns from user behavior
4. **Clean, simple UI** that makes daily use easy
5. **Fast search/filter** for finding specific transactions
6. **Accurate monthly/yearly comparisons**

Build this application step by step, starting with the database and CSV import functionality, then adding the UI and reporting features. Make the code modular and well-commented so I can extend it later with features like recurring expense detection and spending pattern analysis.