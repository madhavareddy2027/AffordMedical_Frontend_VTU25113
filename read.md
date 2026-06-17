Notification Dashboard

This is a React-based Notification Dashboard application that fetches notification data from a secured API using Bearer Token authentication. The application displays notifications in responsive card layouts with pagination support.

Features
Fetch notifications from REST API using fetch()
Secure API access with Bearer Token authorization
Display notification details in card format
Pagination with Previous and Next navigation buttons
Responsive user interface using CSS
React Class Component lifecycle methods (componentDidMount)
Technologies Used
React JS
JavaScript (ES6)
HTML5
CSS3
REST API

How It Works
When the application loads, componentDidMount() calls the API.
The API response is stored in the component state using setState.
Notifications are displayed as cards showing:
Notification Type
Message
Unique ID
Timestamp
Pagination limits the number of cards displayed per page.
Users can navigate between pages using Prev and Next buttons.