import { jwtVerify, importSPKI, JWTPayload } from "jose";

// Fetch the public key from the external API
export const getKey = async (): Promise<string> => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_DYNAMIC_BEARER_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `https://app.dynamicauth.com/api/v0/environments/${process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID}/keys`,
      options
    );

    const json = await response.json();
    const publicKey = json.key.publicKey; // Public key in Base64 format

    // Convert the Base64 public key to PEM format
    const pemPublicKey = Buffer.from(publicKey, "base64").toString("ascii");
    return pemPublicKey;
  } catch {
    throw new Error("Unable to fetch public key");
  }
};

// Function to validate the JWT using the jose library
export const validateJWT = async (
  token: string
): Promise<JWTPayload | null> => {
  try {
    // Get the PEM public key
    const pemPublicKey = await getKey();

    // Convert the PEM-formatted public key to a format jose can work with
    const publicKey = await importSPKI(pemPublicKey, "RS256");

    // Verify the token using the jose library
    const { payload } = await jwtVerify(token, publicKey, {
      algorithms: ["RS256"],
    });

    return payload; // Return the decoded JWT payload
  } catch {
    return null;
  }
};
