# ☸️ Kubernetes Task Manager (Stateful Microservices)

A full-stack Node.js application deployed on Kubernetes, demonstrating a **stateful microservices architecture**. This project showcases how to orchestrate a frontend application with a persistent MongoDB backend, ensuring data survival across pod restarts using PersistentVolumeClaims (PVC).

## 🚀 Architecture

* **Frontend:** Node.js (Express) web application.
* **Backend:** MongoDB (Stateful Database).
* **Orchestration:** Kubernetes (Deployments, Services, PVCs).
* **Storage:** PersistentVolumeClaim (PVC) mapping to local storage.
* **Networking:** ClusterIP for internal DB communication, LoadBalancer for external access.

## 🛠️ Prerequisites

* **Docker Desktop** (or Minikube)
* **kubectl** CLI
* **Git**

## 📦 How to Run

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yahelsharon-cell/k8s-task-manager.git](https://github.com/yahelsharon-cell/k8s-task-manager.git)
    cd k8s-task-manager
    ```

2.  **Start the Cluster:**
    ```bash
    minikube start
    ```

3.  **Deploy the Infrastructure:**
    This command applies the Storage, Database, and Application manifests in order.
    ```bash
    # 1. Create the Persistent Storage
    kubectl apply -f mongo-pvc.yaml

    # 2. Deploy the Database (and attach storage)
    kubectl apply -f mongo-deploy.yaml
    kubectl apply -f mongo-service.yaml

    # 3. Deploy the Web Application
    kubectl apply -f app-deploy.yaml
    kubectl apply -f app-service.yaml
    ```

4.  **Access the Application:**
    Since this uses a LoadBalancer, run this command to open the tunnel:
    ```bash
    minikube service task-app-svc
    ```

## 🧪 The "Chaos Test" (Proof of Persistence)

To verify data persistence:
1.  Add a task in the web UI.
2.  Delete the MongoDB pod: `kubectl delete pod <mongo-pod-name>`
3.  Kubernetes will automatically respawn the pod.
4.  Refresh the page—**the data remains intact**, proving the PVC is working correctly.

## 📂 Project Structure

* `server.js`: Node.js application logic.
* `Dockerfile`: Container definition for the frontend.
* `mongo-pvc.yaml`: Persistent Volume Claim definition.
* `mongo-deploy.yaml`: MongoDB Deployment configuration.
* `app-deploy.yaml`: Frontend Deployment configuration.

## Acknowledgments
This project was developed with the assistance of AI tools (Gemini) for troubleshooting and generating documentation.
