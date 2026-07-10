from app.auth.jwt_handler import create_access_token, verify_access_token

token = create_access_token(
    {"sub": "anshu@example.com"}
)

print("Token:")
print(token)

print("\nDecoded Payload:")
print(verify_access_token(token))