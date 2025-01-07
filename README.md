# AI Tour Planner - CreateTrip Component

## Overview
The `CreateTrip` component in the AI Tour Planner application is a React-based form that allows users to input their travel preferences and generate a customized itinerary using AI. The component utilizes several technologies and libraries to provide a seamless and interactive user experience.

## Key Features
- **User Input Form**: Collects information such as location, number of days, budget, and travel companions.
- **Google OAuth Integration**: Authenticates users via Google Login.
- **AI-Powered Itinerary Generation**: Sends user input to an AI model to generate a personalized travel plan.
- **Firebase Integration**: Stores user-generated trips in a Firestore database.
- **Responsive Design**: Ensures usability across different devices and screen sizes.

## Technologies Used

### Frontend
- **React (with Vite)**: Utilized for building the user interface.
- **TypeScript (TSX)**: Ensures type safety and helps in writing more predictable code.
- **Tailwind CSS**: Provides utility-first CSS classes to style the component efficiently.

### UI Components
- **shadcn/ui**: Used for creating reusable and accessible UI components such as Dialog and Button.

### Authentication
- **@react-oauth/google**: Handles Google OAuth for secure user authentication.

### Backend Services
- **Axios**: Makes HTTP requests to the Google User Info API for fetching user profile data.
- **Firebase Firestore**: Stores trip data securely in the cloud.

### State Management
- **React State Hook (`useState`)**: Manages form data and component states.
- **React Effect Hook (`useEffect`)**: Tracks changes in form data.

### Notifications
- **Custom Toast Hook (`use-toast`)**: Provides user feedback for form validation and errors.

### Routing
- **React Router (`useNavigate`)**: Handles navigation within the application.

## Component Breakdown

### Form Data Interface
```typescript
interface FormData {
  location: string;
  days: number;
  budget: string;
  travelWith: string;
}
```
Defines the structure of the form data collected from the user.

### State Variables
- `formData`: Holds the input values.
- `openDialog`: Manages the visibility of the Google Sign-In dialog.
- `loading`: Indicates whether the trip generation process is ongoing.

### Functions
- `handleInputChange`: Updates the form data state based on user input.
- `login`: Initiates Google OAuth login.
- `onGenerateTrip`: Validates input, generates a prompt for the AI model, and handles the response.
- `saveAiTrip`: Saves the generated trip data to Firebase Firestore.
- `getUserProfile`: Fetches and stores user profile data post-login.

### Components
- **Input Fields**: Collect user preferences.
- **Button**: Triggers trip generation.
- **Dialog**: Prompts users to log in via Google if not already authenticated.

## How to Run
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/ai-tour-planner.git
   cd ai-tour-planner
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the Application**:
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Conclusion
The `CreateTrip` component showcases a comprehensive integration of modern web technologies to deliver an intuitive and dynamic user experience. With its AI-driven itinerary generation and secure user authentication, the component serves as a pivotal feature of the AI Tour Planner application.

