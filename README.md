# CVE Tracking System

Screenshots

![image](https://github.com/user-attachments/assets/3a023339-8a33-42f4-a382-9fbb0052bdf1)

![image](https://github.com/user-attachments/assets/f14e54ea-9dcc-4705-aa3c-76428c206daa)


## Solution Approach

### 1.  Design
- **Modular Structure**: The application is divided into smaller, focused components to improve maintainability and scalability.
- **Clean Architecture**: Separation of concerns between data
- **RESTful API Design**: APIs follow REST principles for consistent endpoint structuring and easy integration.

### 2. Implementation Strategy
- **Iterative Development Approach**: Features are implemented incrementally to allow continuous feedback and improvements
- **Regular Code Reviews and Refactoring**: Code is reviewed for quality assurance and improved through refactoring.

### 3. Data Management
- **Efficient Data Synchronization with NVD API**: Data is fetched and stored efficiently to ensure up-to-date vulnerability tracking.
- **Data Validation and Sanitization**: Input data is validated and sanitized to prevent inconsistencies and security issues.
- **Deduplication Strategies**: Redundant data is removed to optimize storage and processing.

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- PostgreSQL or any preferred relational database
- Express.js




### API Endpoints
- `GET /api/cves` - Retrieve a list of CVEs
- `GET /api/cves/:id` - Retrieve details of a specific CVE


### Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: React.js

### Future Enhancements
- Introduce machine learning-based CVE severity prediction
- Improve dashboard analytics and visualization




