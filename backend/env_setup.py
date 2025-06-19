# This is for automating neon test branch setup

import os, requests
from dotenv import load_dotenv

load_dotenv()

NEON_API_KEY = os.getenv("NEON_API_KEY")
PROJECT_ID = os.getenv("NEON_PROJECT_ID")
DB_NAME = os.getenv("NEON_DB_NAME")
DB_USER = os.getenv("NEON_DB_USER")
DB_PASSWORD = os.getenv("NEON_DB_PASSWORD")

TEST_BRANCH = "test"
NEON_API_BASE = f"https://console.neon.tech/api/v2/projects/{PROJECT_ID}"

HEADERS = {
        "Accept": "application/json",
        "Authorization": f"Bearer {NEON_API_KEY}",
        "Content-Type": "application/json"
    }

def get_branch_id(branch_name):
    url = f"{NEON_API_BASE}/branches"
    response = requests.get(url, headers=HEADERS)
    if response.status_code != 200:
        print(f"Failed to get branches")
        return None

    branches = response.json()['branches']
    for branch in branches:
        if branch['name'] == branch_name:
            return branch['id']
    return None


def get_main_branch_id():
    url = f"{NEON_API_BASE}/branches"
    response = requests.get(url, headers = HEADERS)
    if response.status_code != 200:
        print(f"Failed to get branches")
        return None
    
    branches = response.json()["branches"]
    for branch in branches:
        if branch["name"] == "main":
            return branch["id"]


def delete_branch(branch_id):
    url = f"{NEON_API_BASE}/branches/{branch_id}"
    response = requests.delete(url, headers=HEADERS)
    if response.status_code == 200:
        print(f"Deleted branch with id '{branch_id}' successfully.")
    else:
        print(f"Failed to delete branch with id '{branch_id}'")
    
    url = f"{NEON_API_BASE}/{TEST_BRANCH}"
    response = requests.delete(url, headers=HEADERS)




def create_branch(parent_id):
    url = f"{NEON_API_BASE}/branches"
    data = {
        "branch":{
            "name": TEST_BRANCH,
            "parent_id": parent_id,
            "init_source": "schema-only"
        },
        "endpoints": [
                {
                    "type": "read_write"
                }
            ]
    }

    response = requests.post(url, headers=HEADERS, json=data)
    branch = response.json()["branch"]

    if response.status_code == 201:
        print(f"Created branch test branch successfully.")
    else:
        print(f"Failed to create branch test: {response.text}")
    return branch

def build_database_url(branch):
     return (
        f"postgresql://{DB_USER}:{DB_PASSWORD}"
        f"@{TEST_BRANCH}--{PROJECT_ID}.neon.tech/{DB_NAME}"
        f"?sslmode=require&options=-csearch_path=%22GadgetHunt%22"
    )


def main():
    branch_id = get_branch_id(TEST_BRANCH)
    main_id = get_main_branch_id()

    if branch_id:
        print(f"Branch found with ID {branch_id}. Deleting...")
        delete_branch(branch_id)
    else:
        print(f"No branch named '{TEST_BRANCH}' found. Skipping deletion.")
    
    print("Creating fresh test branch...")
    branch = create_branch(main_id)
    
    test_db_url = build_database_url(branch)
    print(f"\n✅ Use this test DATABASE_URL in your test session:\n{test_db_url}\n")

    # Optional: directly override the environment for subprocesses
    # os.environ["DATABASE_URL"] = test_db_url

if __name__ == "__main__":
    main()