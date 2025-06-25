import requests
import unittest
import json
import os
from datetime import datetime

class BackendAPITest(unittest.TestCase):
    def setUp(self):
        # Get the backend URL from the frontend .env file
        self.base_url = "https://6b8f01c2-f824-41c4-9505-8757d8a803b9.preview.emergentagent.com/api"
        self.client_name = f"test_client_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
    def test_01_root_endpoint(self):
        """Test the root endpoint returns Hello World message"""
        print(f"\n🔍 Testing root endpoint...")
        response = requests.get(f"{self.base_url}/")
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Hello World"})
        print(f"✅ Root endpoint test passed")
        
    def test_02_create_status_check(self):
        """Test creating a status check"""
        print(f"\n🔍 Testing status check creation...")
        payload = {"client_name": self.client_name}
        response = requests.post(f"{self.base_url}/status", json=payload)
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["client_name"], self.client_name)
        self.assertIn("id", data)
        self.assertIn("timestamp", data)
        print(f"✅ Status check creation test passed")
        
    def test_03_get_status_checks(self):
        """Test retrieving status checks"""
        print(f"\n🔍 Testing status check retrieval...")
        response = requests.get(f"{self.base_url}/status")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        
        # Check if our test client is in the list
        found = False
        for status in data:
            if status.get("client_name") == self.client_name:
                found = True
                break
                
        self.assertTrue(found, f"Could not find our test client {self.client_name} in the status checks")
        print(f"✅ Status check retrieval test passed")

if __name__ == "__main__":
    unittest.main()