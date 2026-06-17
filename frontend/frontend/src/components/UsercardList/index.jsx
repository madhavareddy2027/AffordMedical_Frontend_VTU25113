import { Component } from "react";
import "./index.css";

class UserCardList extends Component {
    state = {
        notifications: [],
        currentPage: 1
    };

    getDetails = async () => {
        const url = "http://4.224.186.213/evaluation-service/notifications";

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2dHUyNTExM0B2ZWx0ZWNoLmVkdS5pbiIsImV4cCI6MTc4MTY4MTAyNCwiaWF0IjoxNzgxNjgwMTI0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZmFlMDIzMTctZjBjMi00OTFhLThkYjgtN2Q4NzUwNTYzNDAyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidnR1MjUxMTMiLCJzdWIiOiIzOWVjNWE1NS03NDdkLTQ4OGYtYWNmNi01YzZkZWNmMDhjYWIifSwiZW1haWwiOiJ2dHUyNTExM0B2ZWx0ZWNoLmVkdS5pbiIsIm5hbWUiOiJ2dHUyNTExMyIsInJvbGxObyI6IjIzdWVpdDAwMjEiLCJhY2Nlc3NDb2RlIjoianVGcGh2IiwiY2xpZW50SUQiOiIzOWVjNWE1NS03NDdkLTQ4OGYtYWNmNi01YzZkZWNmMDhjYWIiLCJjbGllbnRTZWNyZXQiOiJZZVJQWlBLQkRNaGp5SHduIn0.tS98-5xo9KKzjpu7zMcupsnxFRPGR9mgzjfW96xjU9I";

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            console.log(data);

            this.setState({
                notifications: data.notifications
            });
        } catch (error) {
            console.log("Error:", error);
        }
    };

    componentDidMount() {
        this.getDetails();
    }

    handleClick = (message) => {
        alert(message);
    };

    goToNextPage = () => {
        const { notifications, currentPage } = this.state;
        const itemsPerPage = 5;

        const totalPages = Math.ceil(
            notifications.length / itemsPerPage
        );

        if (currentPage < totalPages) {
            this.setState({
                currentPage: currentPage + 1
            });
        }
    };

    goToPrevPage = () => {
        const { currentPage } = this.state;

        if (currentPage > 1) {
            this.setState({
                currentPage: currentPage - 1
            });
        }
    };

    render() {
        const { notifications, currentPage } = this.state;

        const itemsPerPage = 2;

        const totalPages = Math.ceil(
            notifications.length / itemsPerPage
        );

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const currentNotifications = notifications.slice(
            startIndex,
            endIndex
        );

        return (
            <div className="main-container">
                <h1>Notifications</h1>

                <div className="card-container">
                    {currentNotifications.map((item) => (
                        <div className="card" key={item.ID}>
                            <h2>{item.Type}</h2>

                            <p>
                                <strong>Message:</strong>
                                {" "}
                                {item.Message}
                            </p>

                            <p>
                                <strong>ID:</strong>
                                {" "}
                                {item.ID}
                            </p>

                            <p>
                                <strong>Date:</strong>
                                {" "}
                                {item.Timestamp}
                            </p>

                            <button
                                onClick={() =>
                                    this.handleClick(item.Message)
                                }
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div>

                {notifications.length > 0 && (
                    <div className="pagination">
                        <button
                            onClick={this.goToPrevPage}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>

                        <span>
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={this.goToNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default UserCardList;