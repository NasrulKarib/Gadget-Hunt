import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import Users

@pytest.mark.django_db
def test_user_signup_success():
    client = APIClient()
    signup_url = reverse('signup')

    # Arrange - Set up the test environment and data
    user_data = {
        "email": "testuser@example.com",
        "password": "securepassword",
        "name": "Test User",
        "role": "Customer"
    }

    # Act - Perform the action under the test
    response = client.post(signup_url,user_data, format='json')
    print(response)

    # Assert - Verify the outcome
    assert response.status_code == 200 or response.status_code == 201
    assert Users.objects.filter(email = "testuser@example.com").exists()

# @pytest.mark.django_db
# def test_user_duplicate_email():
    client = APIClient()
    signup_url = reverse('signup')

    # Arrange - Set up the test environment and data
    user_data = {
        "email": "testuser@example.com",
        "password": "securepassword",
        "name": "Test User",
        "role": "Customer"
    }
    Users.objects.create(**user_data)

    response = client.post(signup_url,user_data, format='json')
    print(response)

    # Assert - Verify the outcome
    assert response.status_code == 400 or response.status_code == 409
    assert "email" in response.data or "non_field_errors" in response.data