# Task API

RESTful Task Management API that lets you add, view and delete tasks and is built with Node.js and Express.js. containerized using Docker, and configured for deployment via Kubernetes.


---


## Technologies Used

* **Backend:** Node.js / Express.js
* **Containerization:** Docker / Docker Compose
* **Orchestration:** Kubernetes


---


## Getting Started 

### Prerequisites

Following software must be installed:

* **Docker Desktop**
* **Node.js**


## Steps

1) **Clone repository**
    ```bash
    git clone https://github.com/Kevin8941743/task-api.git
    cd task-api
    ```

2) **Build and Run the Containers:**
   Command builds the Docker image and starts the application.
   ```bash
    docker-compose up --build
    ```
    The API should now be running on port `3000` (or the port you defined in docker-compose.yaml)


---


## Deployment (Kubernetes)

### Prerequisities 

* `kubectl` installed and configured to connect to your cluster.
* A running Kubernetes cluster


### Steps

1. **Apply Configuration:**
   Command applies changes to existing resources in the Kubernetes Custer
   ```bash
    kubectl apply -f kubernetes/
    ```

2. **Verify Deployment:**
   Comamnd to check that the application Pods are running.
   ```bash
    kubectl get pods
    ```


---


## 5. API Endpoints (Usage)


| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | Retrieves a list of all tasks. |
| `POST` | `/api/tasks` | Creates a new task. Requires a JSON body (e.g., `{"task": "New task"}`). |
| `DELETE` | `/api/tasks/:id` | Deletes a task by its unique ID. |
