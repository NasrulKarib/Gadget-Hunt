import pytest, os
from env_setup import main
from django.conf import settings

@pytest.fixture(scope='session', autouse=True)
def set_test_database_url():
    """
    This fixture runs once per test session before any tests.
    It sets the DATABASE_URL to the NeonDB test branch automatically.
    """
    main()
    



