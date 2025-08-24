# Submission Service API

A Node.js/Express TypeScript service for managing code submissions for a LeetCode-like platform.

## Setup Instructions

1. Clone the project
```bash
git clone https://github.com/singhsanket143/Express-Typescript-Starter-Project.git <ProjectName>
```

2. Move into the folder structure
```bash
cd <ProjectName>
```

3. Install npm dependencies
```bash
npm i
```

4. Create a new .env file in the root directory and add the required environment variables
```bash
echo PORT=3000 >> .env
echo MONGODB_URI=mongodb://localhost:27017/submission-service >> .env
echo REDIS_URL=redis://localhost:6379 >> .env
echo PROBLEM_SERVICE=http://localhost:3001 >> .env
```

5. Start the express server
```bash
npm run dev
```

## API Documentation

### Base URL
- Development: `http://localhost:3000`
- API Versions: `/api/v1` and `/api/v2`

### Authentication
Currently, the API doesn't require authentication. In production, you should implement proper authentication middleware.

### Endpoints

#### Health Check
- **GET** `/api/v1/ping` - Health check endpoint
- **GET** `/api/v1/ping/health` - Simple health status

#### Submissions

##### Create Submission
- **POST** `/api/v1/submissions`
- **Description**: Create a new code submission
- **Request Body**:
```json
{
  "problemId": "string",
  "code": "string",
  "language": "cpp" | "python"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Submission created successfully",
  "data": {
    "id": "string",
    "problemId": "string",
    "code": "string",
    "language": "cpp",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

##### Get Submission by ID
- **GET** `/api/v1/submissions/:id`
- **Description**: Retrieve a specific submission by its ID
- **Response**:
```json
{
  "success": true,
  "message": "Submission fetched successfully",
  "data": {
    "id": "string",
    "problemId": "string",
    "code": "string",
    "language": "cpp",
    "status": "accepted",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

##### Get Submissions by Problem ID
- **GET** `/api/v1/submissions/problem/:problemId`
- **Description**: Retrieve all submissions for a specific problem
- **Query Parameters** (optional):
  - `status`: Filter by submission status
  - `language`: Filter by programming language
  - `limit`: Number of results to return (1-100, default: 10)
  - `page`: Page number for pagination (default: 1)
- **Response**:
```json
{
  "success": true,
  "message": "Submissions fetched successfully",
  "data": [
    {
      "id": "string",
      "problemId": "string",
      "code": "string",
      "language": "cpp",
      "status": "accepted",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

##### Update Submission Status
- **PATCH** `/api/v1/submissions/:id/status`
- **Description**: Update the status of a submission
- **Request Body**:
```json
{
  "status": "pending" | "compiling" | "running" | "accepted" | "wrong_answer"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Submission status updated successfully",
  "data": {
    "id": "string",
    "problemId": "string",
    "code": "string",
    "language": "cpp",
    "status": "accepted",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

##### Delete Submission
- **DELETE** `/api/v1/submissions/:id`
- **Description**: Delete a submission by its ID
- **Response**:
```json
{
  "success": true,
  "message": "Submission deleted successfully"
}
```

### Data Models

#### Submission Status
- `pending`: Submission is queued for processing
- `compiling`: Code is being compiled
- `running`: Code is being executed against test cases
- `accepted`: All test cases passed
- `wrong_answer`: Some test cases failed

#### Programming Languages
- `cpp`: C++
- `python`: Python

### Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "details": "Additional error information"
  }
}
```

Common HTTP status codes:
- `400` - Bad Request (validation errors)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

### Architecture

The service follows a layered architecture:

1. **Controllers** (`src/controllers/`) - Handle HTTP requests and responses
2. **Services** (`src/services/`) - Business logic layer
3. **Repositories** (`src/repositories/`) - Data access layer
4. **Models** (`src/models/`) - Data models and schemas
5. **Validators** (`src/validators/`) - Request validation using Zod
6. **Middlewares** (`src/middlewares/`) - Express middlewares
7. **Routers** (`src/routers/`) - Route definitions

### Dependencies

- **Express** - Web framework
- **Mongoose** - MongoDB ODM
- **Zod** - Schema validation
- **Winston** - Logging
- **BullMQ** - Job queue management
- **Axios** - HTTP client for external API calls

### Development

To run the service in development mode:
```bash
npm run dev
```

To run in production:
```bash
npm start
```

The service will be available at `http://localhost:3000` (or the port specified in your `.env` file).